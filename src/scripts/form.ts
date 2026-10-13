// Teklif ve iletişim formlarının ortak davranışı (guvenlik-kurallari §2, §4, §6, §10).
// - Doğrulama istemci tarafında: hata mesajı alanın altında ve aria-describedby ile bağlı;
//   biçim hataları alandan çıkınca, düzeltilen hata yazarken kalkar.
// - Gönderim Web3Forms'a istemci tarafı fetch ile. Anahtar boşsa (src/data/site.ts) ya da gönderim
//   başarısızsa aynı bilgiler biçimli bir WhatsApp mesajı olarak açılır.
// - Honeypot (botcheck) işaretliyse hiçbir şey gönderilmez. İki e-posta gönderimi arasında en az 30 sn.
// - Kullanıcı verisi sayfaya yalnızca textContent ile yazılır ve konsola yazdırılmaz.

type Kural = (deger: string) => string | null; // hata mesajı ya da null
type Alan = [ad: string, etiket: string, bicim?: (deger: string) => string];

export interface FormAyari {
  /** WhatsApp mesajının ilk satırı */
  giris: string;
  /** E-posta ve WhatsApp mesajındaki bölümler; boş alanlar yazılmaz */
  bolumler: { baslik: string; alanlar: Alan[] }[];
  konu: (deger: (ad: string) => string) => string;
  kurallar: Record<string, Kural>;
  /** false dönerse gönderilmez (çok adımlı formda son adıma kadar Enter "Devam et" gibi çalışır) */
  gondermedenOnce?: () => boolean;
  /** Hatalı alan gizli bir adımdaysa o adımı açar */
  alanaGit?: (kap: HTMLElement) => void;
}

const WEB3FORMS = 'https://api.web3forms.com/submit';
const BEKLEME = 30_000;
const ZAMAN_ASIMI = 15_000;
const SON_GONDERIM = '2k-ahsap-son-gonderim';
const SAYAC_UYARI = 100; // kalan karakter bu sayıya inince ekran okuyucuya da duyurulur
const SAYAC_BEKLEME = 1_000; // duyuru, yazmaya bu kadar ara verilince yapılır (her tuşta değil)

export const kural = {
  zorunlu:
    (mesaj: string): Kural =>
    (d) =>
      d ? null : mesaj,
  adSoyad: (d: string) => (d.length >= 3 ? null : 'Lütfen adınızı ve soyadınızı yazın.'),
  telefon: (d: string) => {
    if (!d) return 'Size ulaşabilmemiz için telefon numaranızı yazın.';
    const rakam = d.replace(/\D/g, '').length;
    return /^[+\d\s().-]+$/.test(d) && rakam >= 10 && rakam <= 15
      ? null
      : 'Telefon numaranızı alan koduyla yazın, ör. 0532 123 45 67.';
  },
  eposta: (d: string) =>
    !d || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d) ? null : 'E-posta adresinizi kontrol edin, ör. adiniz@ornek.com.',
  kvkk: (d: string) => (d ? null : "Formu gönderebilmek için KVKK Aydınlatma Metni'ni okuduğunuzu işaretleyin."),
};

const tarih = (t: Date) =>
  t.toLocaleString('tr-TR', {
    timeZone: 'Europe/Istanbul',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) + ' (Türkiye saati)';

export function formuKur(form: HTMLFormElement, ayar: FormAyari) {
  form.noValidate = true; // JS açıkken doğrulamayı bu dosya yapar
  form.querySelectorAll<HTMLElement>('[data-js]').forEach((o) => (o.hidden = false));

  const whatsapp = form.dataset.whatsapp ?? '';
  const gonderDugmesi = form.querySelector<HTMLButtonElement>('[data-gonder]');
  const canli = form.querySelector<HTMLElement>('[data-durum-canli]');
  const durum = form.querySelector<HTMLElement>('[data-durum]');
  let onayZamani: Date | null = null;
  let gonderiliyor = false;
  let sonGonderimBellek = 0;

  const deger = (ad: string) => {
    const oge = form.elements.namedItem(ad);
    if (oge instanceof RadioNodeList) return oge.value.trim();
    if (oge instanceof HTMLInputElement && (oge.type === 'checkbox' || oge.type === 'radio'))
      return oge.checked ? oge.value : '';
    if (oge instanceof HTMLInputElement || oge instanceof HTMLTextAreaElement || oge instanceof HTMLSelectElement)
      return oge.value.trim();
    return '';
  };

  const alanKabi = (ad: string) => form.querySelector<HTMLElement>(`[data-alan="${ad}"]`);

  const hataYaz = (ad: string, mesaj: string | null) => {
    const kap = alanKabi(ad);
    if (!kap) return;
    kap.classList.toggle('alan-hatali', !!mesaj);
    const hata = kap.querySelector<HTMLElement>('[data-hata]');
    if (hata) hata.textContent = mesaj ?? '';
    kap.querySelectorAll('input, select, textarea').forEach((g) =>
      mesaj ? g.setAttribute('aria-invalid', 'true') : g.removeAttribute('aria-invalid'),
    );
  };

  const alaniDogrula = (ad: string) => {
    const k = ayar.kurallar[ad];
    if (!k) return true;
    const mesaj = k(deger(ad));
    hataYaz(ad, mesaj);
    return !mesaj;
  };

  /** Verilen alanları doğrular; hatalı ilk alana odaklanır. */
  const dogrula = (adlar = Object.keys(ayar.kurallar)) => {
    const hatalilar = adlar.filter((ad) => !alaniDogrula(ad));
    const kap = hatalilar.length ? alanKabi(hatalilar[0]) : null;
    if (kap) {
      ayar.alanaGit?.(kap);
      kap.querySelector<HTMLElement>('input, select, textarea')?.focus();
    }
    return hatalilar.length === 0;
  };

  const hataGosteriyor = (ad: string) => !!alanKabi(ad)?.classList.contains('alan-hatali');

  // Kalan karakter sayacı (GirdiAlani'nın sayac seçeneği). Görünen sayı her tuşta güncellenir; ekran okuyucuya
  // yalnızca sınıra yaklaşınca ve yazmaya ara verilince "… karakter kaldı" diye duyurulur.
  form.querySelectorAll<HTMLElement>('[data-sayac]').forEach((sayac) => {
    const kap = sayac.closest<HTMLElement>('[data-alan]');
    const alan = kap?.querySelector<HTMLTextAreaElement>('textarea');
    const canli = kap?.querySelector<HTMLElement>('[data-sayac-canli]');
    if (!alan || alan.maxLength < 0) return;
    let zamanlayici = 0;
    const metin = () => `${alan.maxLength - alan.value.length} karakter kaldı`;
    sayac.textContent = metin();
    alan.addEventListener('input', () => {
      sayac.textContent = metin();
      clearTimeout(zamanlayici);
      if (canli && alan.maxLength - alan.value.length <= SAYAC_UYARI)
        zamanlayici = window.setTimeout(() => (canli.textContent = metin()), SAYAC_BEKLEME);
    });
  });

  form.addEventListener('input', (e) => {
    const ad = (e.target as HTMLInputElement).name;
    if (ad && hataGosteriyor(ad)) alaniDogrula(ad);
  });

  form.addEventListener('change', (e) => {
    const g = e.target as HTMLInputElement;
    if (g.name === 'kvkk') onayZamani = g.checked ? new Date() : null;
    if (g.name && hataGosteriyor(g.name)) alaniDogrula(g.name);
  });

  // Biçim hatası (telefon, e-posta) alandan çıkınca gösterilir; boş alan için gönderimi bekler
  form.addEventListener('focusout', (e) => {
    const g = e.target as HTMLInputElement;
    if (g.type !== 'radio' && g.type !== 'checkbox' && ayar.kurallar[g.name] && g.value?.trim()) alaniDogrula(g.name);
  });

  const doluAlanlar = (alanlar: Alan[]) =>
    alanlar.flatMap(([ad, etiket, bicim]) => {
      const d = deger(ad);
      return d ? [[etiket, bicim ? bicim(d) : d] as const] : [];
    });

  const whatsappMesaji = () => {
    const satirlar = [ayar.giris, ''];
    for (const b of ayar.bolumler) {
      const dolu = doluAlanlar(b.alanlar);
      if (dolu.length) satirlar.push(`*${b.baslik}*`, ...dolu.map(([e, d]) => `${e}: ${d}`), '');
    }
    satirlar.push(`KVKK Aydınlatma Metni'ni okudum (${tarih(onayZamani ?? new Date())}).`);
    return satirlar.join('\n');
  };

  const epostaVerisi = () => {
    const veri: Record<string, string> = {
      access_key: deger('access_key'),
      subject: ayar.konu(deger),
      from_name: deger('from_name'),
    };
    const eposta = deger('eposta');
    if (eposta) veri.replyto = eposta;
    for (const b of ayar.bolumler) for (const [e, d] of doluAlanlar(b.alanlar)) veri[e] = d;
    const t = onayZamani ?? new Date();
    veri['KVKK onayı'] = "Evet. KVKK Aydınlatma Metni'ni okuduğunu işaretledi.";
    veri['KVKK onay zamanı'] = `${tarih(t)} · ${t.toISOString()}`;
    veri['Gönderildiği sayfa'] = location.href;
    return veri;
  };

  const durumGoster = (metin: string, link?: string) => {
    if (canli) canli.textContent = metin;
    if (!durum) return;
    const p = durum.querySelector<HTMLElement>('[data-durum-metin]');
    const a = durum.querySelector<HTMLAnchorElement>('[data-durum-link]');
    if (p) p.textContent = metin;
    if (a) {
      a.hidden = !link;
      if (link) a.href = link;
    }
    durum.hidden = false;
  };

  const whatsappAc = (neden: string) => {
    const link = `${whatsapp}?text=${encodeURIComponent(whatsappMesaji())}`;
    const pencere = window.open(link, '_blank');
    if (pencere) pencere.opener = null;
    durumGoster(
      `${neden} ${
        pencere
          ? "Göndermek için WhatsApp'taki gönder tuşuna dokunmanız yeterli."
          : "WhatsApp açılmadıysa aşağıdaki butona dokunun."
      }`,
      link,
    );
  };

  const yukleniyor = (acik: boolean) => {
    gonderiliyor = acik;
    if (!gonderDugmesi) return;
    gonderDugmesi.dataset.metin ??= gonderDugmesi.textContent?.trim() ?? '';
    gonderDugmesi.disabled = acik;
    gonderDugmesi.setAttribute('aria-busy', String(acik));
    gonderDugmesi.textContent = acik ? 'Gönderiliyor…' : gonderDugmesi.dataset.metin;
  };

  const sonGonderim = () => {
    try {
      return Math.max(Number(localStorage.getItem(SON_GONDERIM)) || 0, sonGonderimBellek);
    } catch {
      return sonGonderimBellek;
    }
  };

  const gonderimiKaydet = () => {
    sonGonderimBellek = Date.now();
    try {
      localStorage.setItem(SON_GONDERIM, String(sonGonderimBellek));
    } catch {
      /* depolama kapalıysa bellekteki zaman yeter */
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (gonderiliyor) return;
    if (ayar.gondermedenOnce && !ayar.gondermedenOnce()) return;
    if (!dogrula()) return;

    if ((form.elements.namedItem('botcheck') as HTMLInputElement | null)?.checked) {
      location.href = '/tesekkurler';
      return;
    }
    // Anahtar yoksa pencere, tıklamayla aynı anda açılır (açılır pencere engeline takılmaz)
    if (!deger('access_key')) {
      whatsappAc('Bilgileriniz WhatsApp mesajı olarak hazırlandı.');
      return;
    }
    if (Date.now() - sonGonderim() < BEKLEME) {
      durumGoster('Az önce bir talep gönderdiniz. Yeni bir gönderim için lütfen 30 saniye bekleyin.');
      return;
    }

    yukleniyor(true);
    const iptal = new AbortController();
    const zamanlayici = setTimeout(() => iptal.abort(), ZAMAN_ASIMI);
    try {
      const yanit = await fetch(WEB3FORMS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(epostaVerisi()),
        signal: iptal.signal,
      });
      const sonuc = await yanit.json().catch(() => null);
      if (!yanit.ok || !sonuc?.success) throw new Error('Gönderilemedi');
      gonderimiKaydet();
      location.href = '/tesekkurler';
    } catch {
      yukleniyor(false);
      whatsappAc('Formu şu an e-postayla iletemedik; bilgileriniz WhatsApp mesajı olarak hazırlandı.');
    } finally {
      clearTimeout(zamanlayici);
    }
  });

  form.querySelector('[data-whatsapp-gonder]')?.addEventListener('click', () => {
    if (dogrula()) whatsappAc('Bilgileriniz WhatsApp mesajı olarak hazırlandı.');
  });

  // Geri tuşuyla dönülürse buton "Gönderiliyor…" durumunda kalmaz. Sayfa geri-ileri önbelleğinden
  // dönerse KVKK kutusu boşaltılır: önceki gönderimin işareti ve onay zamanı yeni talebe taşınmaz.
  window.addEventListener('pageshow', (e) => {
    yukleniyor(false);
    if (!e.persisted) return;
    const kvkk = form.elements.namedItem('kvkk');
    if (kvkk instanceof HTMLInputElement) kvkk.checked = false;
    onayZamani = null;
  });

  return { dogrula, deger, alaniDogrula, hataGosteriyor };
}
