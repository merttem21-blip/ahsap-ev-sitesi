// Çerez bandı ve onaya bağlı betik yükleyici (bant: src/components/CerezBandi.astro, kimlikler: izleme, src/data/site.ts).
//
// Seçim localStorage'da tek kayıtta tutulur: { zaman, analitik?, pazarlama? }. Bant, sayfada listelenen türlerden
// biri kayıtta yoksa gösterilir. Bilgilendirme bandının kaydında tür yoktur ({ zaman }); bu yüzden bir kimlik
// girildiğinde onay paneli bandı daha önce kapatmış ziyaretçiye de çıkar, sonradan eklenen bir tür de yeniden sorulur.
// Analitik ve pazarlama betikleri yalnızca o türe izin verilmişse yüklenir. İzin geri alınırsa türün çerezleri silinir
// ve yüklenmiş betik sayfadan çıksın diye sayfa yenilenir. Depolama kapalıysa seçim yalnızca o sayfa için geçerlidir.

export const CEREZ_TERCIHI = '2k-ahsap-cerez-tercihi';

type Tur = 'analitik' | 'pazarlama';
type Kayit = { zaman: number } & Partial<Record<Tur, boolean>>;

// İzin geri alınınca silinen çerezler: Google Analytics (_ga, _ga_<kimlik>, _gid, _gat…), Meta Pixel (_fbp, _fbc)
const CEREZ_ADLARI: Record<Tur, RegExp> = {
  analitik: /^(_ga|_gid|_gat)/,
  pazarlama: /^_fb[pc]$/,
};

function kayitOku(): Kayit | null {
  try {
    const kayit = JSON.parse(localStorage.getItem(CEREZ_TERCIHI) ?? 'null');
    return kayit && typeof kayit.zaman === 'number' ? kayit : null;
  } catch {
    return null; // depolama kapalı ya da kayıt bozuk
  }
}

function kayitYaz(kayit: Kayit) {
  try {
    localStorage.setItem(CEREZ_TERCIHI, JSON.stringify(kayit));
  } catch {
    /* depolama kapalı */
  }
}

/** Adı desene uyan çerezleri bu alan adından ve üst alan adlarından siler (araçlar çerezi üst alan adına yazar). */
function cerezleriSil(desen: RegExp) {
  const parcalar = location.hostname.split('.');
  for (const cerez of document.cookie.split(';')) {
    const ad = cerez.split('=')[0].trim();
    if (!desen.test(ad)) continue;
    document.cookie = `${ad}=; max-age=0; path=/`;
    for (let i = 0; i < parcalar.length - 1; i++) {
      document.cookie = `${ad}=; max-age=0; path=/; domain=${parcalar.slice(i).join('.')}`;
    }
  }
}

function betikEkle(src: string) {
  const betik = document.createElement('script');
  betik.async = true;
  betik.src = src;
  document.head.append(betik);
}

type Kuyruk = { (...args: unknown[]): void; callMethod?: (...args: unknown[]) => void; queue: unknown[] };
const pencere = window as unknown as {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: Kuyruk;
  _fbq?: Kuyruk;
};

// Araçların resmi yükleme kodlarının okunur hâli
const YUKLE: Record<Tur, (kimlik: string) => void> = {
  // Google Analytics 4 (gtag.js). gtag.js kuyrukta dizi değil, arguments nesnesi bekler.
  analitik: (kimlik) => {
    const katman = (pencere.dataLayer ??= []);
    pencere.gtag = function () {
      katman.push(arguments);
    };
    pencere.gtag('js', new Date());
    pencere.gtag('config', kimlik);
    betikEkle(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(kimlik)}`);
  },
  // Meta Pixel (fbevents.js): betik gelene kadar çağrılar kuyrukta bekler
  pazarlama: (kimlik) => {
    if (pencere.fbq) return;
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Kuyruk & { push: Kuyruk; loaded: boolean; version: string };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    pencere.fbq = fbq;
    pencere._fbq ??= fbq;
    betikEkle('https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', kimlik);
    fbq('track', 'PageView');
  },
};

// Dönüşüm ölçümü: WhatsApp ve telefon tıklamaları ile form gönderimi. Olaylar yalnızca ilgili araç izinle
// yüklenmişse gider (gtag/fbq yoksa hiçbir şey yapılmaz). Adlar Google Analytics'te "temel etkinlik" olarak işaretlenir.
// - whatsapp_click / Meta "Contact": wa.me veya api.whatsapp.com linkine tıklama; konum: yuzen, alt-menu, footer, sayfa
// - telefon_click / Meta "Contact": tel: linkine tıklama
// - generate_lead / Meta "Lead": form gönderildikten sonra açılan /tesekkurler (site içinden gelindiyse)
function olay(gaAdi: string, meta: 'Contact' | 'Lead', ayrinti: Record<string, string>) {
  pencere.gtag?.('event', gaAdi, ayrinti);
  pencere.fbq?.('track', meta, { content_name: ayrinti.kanal ?? gaAdi });
}

function linkKonumu(link: Element) {
  if (link.closest('.whatsapp')) return 'yuzen';
  if (link.closest('.alt-menu')) return 'alt-menu';
  if (link.closest('footer')) return 'footer';
  return 'sayfa';
}

let olcumBagli = false;
function olcumuBagla() {
  if (olcumBagli) return;
  olcumBagli = true;

  document.addEventListener(
    'click',
    (e) => {
      const link = (e.target as Element | null)?.closest?.('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      const ayrinti = { konum: linkKonumu(link), sayfa: location.pathname };
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) olay('whatsapp_click', 'Contact', { ...ayrinti, kanal: 'WhatsApp' });
      else if (href.startsWith('tel:')) olay('telefon_click', 'Contact', { ...ayrinti, kanal: 'Telefon' });
    },
    { capture: true }
  );

  // Form başarıyla gönderilince form.ts /tesekkurler'e yönlendirir; adres doğrudan açıldıysa sayılmaz
  if (location.pathname.replace(/\/$/, '') === '/tesekkurler') {
    let gelinen: URL | null = null;
    try {
      gelinen = document.referrer ? new URL(document.referrer) : null;
    } catch {
      /* geçersiz referrer */
    }
    if (gelinen?.origin === location.origin) {
      olay('generate_lead', 'Lead', { kanal: 'Form', form_sayfasi: gelinen.pathname });
    }
  }
}

export function cerezBandi() {
  const bant = document.querySelector<HTMLElement>('[data-cerez]');
  if (!bant) return;

  const kimlikler: Record<Tur, string | undefined> = { analitik: bant.dataset.ga, pazarlama: bant.dataset.pixel };
  const turler = (Object.keys(kimlikler) as Tur[]).filter((t) => kimlikler[t]);
  const ayarlar = bant.querySelector<HTMLElement>('[data-cerez-ayarlar]');
  const ayarDugmesi = bant.querySelector<HTMLButtonElement>('[data-cerez-ayar-dugmesi]');
  const kutular = [...bant.querySelectorAll<HTMLInputElement>('[data-cerez-tur]')];
  const yuklenen = new Set<Tur>();
  let kayit = kayitOku();
  let donus: HTMLElement | null = null; // panel footer'dan açıldıysa kapanınca odak oraya döner

  const secimVar = () => (turler.length ? turler.every((t) => typeof kayit?.[t] === 'boolean') : !!kayit);
  const herTur = (izin: boolean) => Object.fromEntries(turler.map((t) => [t, izin]));

  const izinlileriYukle = () => {
    for (const t of turler) {
      if (kayit?.[t] !== true || yuklenen.has(t)) continue;
      yuklenen.add(t);
      YUKLE[t](kimlikler[t]!);
    }
    if (yuklenen.size) olcumuBagla();
  };

  const ayarlariGoster = (acik: boolean) => {
    if (!ayarlar || !ayarDugmesi) return;
    ayarlar.hidden = !acik;
    ayarDugmesi.setAttribute('aria-expanded', String(acik));
  };

  const ac = (ayarlarAcik: boolean) => {
    for (const k of kutular) k.checked = kayit?.[k.dataset.cerezTur as Tur] === true;
    ayarlariGoster(ayarlarAcik);
    bant.hidden = false;
  };

  const kapat = () => {
    bant.hidden = true;
    donus?.focus();
    donus = null;
  };

  const kaydet = (secim: Partial<Record<Tur, boolean>>) => {
    const geriAlinan = turler.filter((t) => kayit?.[t] === true && secim[t] !== true);
    kayit = { zaman: Date.now(), ...secim };
    kayitYaz(kayit);
    for (const t of geriAlinan) cerezleriSil(CEREZ_ADLARI[t]);
    if (geriAlinan.some((t) => yuklenen.has(t))) {
      location.reload();
      return;
    }
    izinlileriYukle();
    kapat();
  };

  bant.querySelector('[data-cerez-tamam]')?.addEventListener('click', () => kaydet({}));
  bant.querySelector('[data-cerez-kabul]')?.addEventListener('click', () => kaydet(herTur(true)));
  bant.querySelector('[data-cerez-reddet]')?.addEventListener('click', () => kaydet(herTur(false)));
  bant
    .querySelector('[data-cerez-kaydet]')
    ?.addEventListener('click', () => kaydet(Object.fromEntries(kutular.map((k) => [k.dataset.cerezTur, k.checked]))));
  ayarDugmesi?.addEventListener('click', () => ayarlariGoster(!!ayarlar?.hidden));

  // Seçim yapılmışsa (panel footer'dan yeniden açıldıysa) Esc değişiklik yapmadan kapatır
  bant.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && secimVar()) kapat();
  });

  // Footer'daki "Çerez Tercihleri" (yalnızca onay panelinde): panel ayarlar açık gelir, odak panele geçer
  for (const d of document.querySelectorAll<HTMLElement>('[data-cerez-tercih]')) {
    d.addEventListener('click', () => {
      donus = d;
      ac(true);
      bant.focus();
    });
  }

  // Bilgilendirme bandı sayfa kaydırılınca açılır: kısa ekranda (CerezBandi.astro'daki satır içi betik data-ertele
  // verir) ve bant ana sayfa hero metnini örtecekse.
  const kaydirincaAc = () => {
    const kaydirinca = () => {
      if (scrollY <= 0) return;
      removeEventListener('scroll', kaydirinca);
      ac(false);
    };
    addEventListener('scroll', kaydirinca, { passive: true });
    kaydirinca(); // sayfa kaydırılmış açıldıysa (#çapa, geri dönüş) hemen
  };

  // Örtmemesi gereken blok (ana sayfa hero metni, data-cerez-ortmesin) bandın kaldırdığı yerde bile bandın altında
  // kalıyor mu: dar ve orta boy ekranda metin header'ın altından başlar, yukarı çıkamaz. Bant ölçüm için bir anlığına
  // açılır (boyanmaz). Bloğun kendi kutusu ölçülür; içindekilerin giriş animasyonu (translateY) sonucu değiştirmez.
  const bantOrtecek = (blok: Element) => {
    bant.hidden = false;
    const bantUst = bant.getBoundingClientRect().top;
    bant.hidden = true;
    return blok.getBoundingClientRect().bottom > bantUst;
  };

  izinlileriYukle();
  if (secimVar()) return;

  if (bant.hasAttribute('data-ertele')) {
    kaydirincaAc();
    return;
  }

  // --cerez-alan (hero'nun bandın üstünde bıraktığı yer) ilk boyamadan önce yazılır ve sonra değişmez: yazı tipi
  // yüklenince bant birkaç piksel kısalsa da hero metni kaymaz. Örtme kararı ise yazı tipleri yüklendikten sonra
  // verilir; yedek yazı tipiyle bant ve hero metni farklı satırlara kırılabilir (en fazla 3 sn beklenir).
  const blok = bant.dataset.kip === 'bilgi' ? document.querySelector('[data-cerez-ortmesin]') : null;
  if (!blok) {
    ac(false);
    return;
  }
  Promise.race([document.fonts.ready, new Promise((tamam) => setTimeout(tamam, 3000))]).then(() => {
    if (bantOrtecek(blok)) kaydirincaAc();
    else ac(false);
  });
}
