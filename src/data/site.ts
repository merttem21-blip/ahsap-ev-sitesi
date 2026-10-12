// Site genelinde ortak veriler. İletişim bilgileri CLAUDE.md ile birebir aynı olmalı
// (ad-adres-telefon tutarlılığı SEO için önemli).

export const siteAdresi = 'https://2kahsap.com';

// Web3Forms erişim anahtarı (web3forms.com). Teklif ve iletişim formları bu anahtarla doğrudan e-postaya gider.
// Herkese açık bir anahtardır, gizli değildir. Boşken formlar bilgileri WhatsApp mesajı olarak açar.
export const web3formsAnahtari = '7b3caa3b-25bf-4df9-9829-471af2739c78';

// Open Graph ve schema.org için varsayılan görsel (gerçek proje fotoğrafı)
export const varsayilanGorsel = '/images/ucgen-ev/a-frame-bungalov/a-frame-bungalov-01-1600.webp';

// Firma bilgilerinin tek kaynağı: sitede bu bilgilerin geçtiği her yer buradan okur.
// Sitede görünen ad marka adıdır; yasal metinlerde "Unvan (Marka)" biçimi kullanılır (yasalAd).
// mersis ve kep boşken yasal sayfalarda etiketleriyle birlikte hiç görünmez, doldurulunca kendiliğinden çıkar.
// Henüz bilinmeyen bilgiler: docs/onay-bekleyenler.md
const adresParcalari = {
  sokak: 'Kaynarca, Akdeniz Cd. No:4/A',
  ilce: 'Pendik',
  il: 'İstanbul',
  postaKodu: '34893',
};

export const firma = {
  marka: '2K AHŞAP',
  unvan: 'Azra Ahşap Ev',
  kurulusYili: '2015',
  kurucu: 'Kadir Avcı',
  telefonGorunen: '0532 250 40 77',
  telefonLink: 'tel:+905322504077',
  telefonUluslararasi: '+90 532 250 40 77', // schema.org
  whatsapp: 'https://wa.me/905322504077',
  eposta: 'info@2kahsap.com',
  kvkkEposta: 'info@2kahsap.com', // veri sorumlusu iletişim e-postası (KVKK başvuruları)
  adres: `${adresParcalari.sokak}, ${adresParcalari.postaKodu} ${adresParcalari.ilce}/${adresParcalari.il}`,
  adresParcalari,
  harita:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('2K AHŞAP Kaynarca Akdeniz Cd. No:4/A Pendik İstanbul'),
  vergiDairesi: 'Sarıgazi Vergi Dairesi',
  // Yalnızca kayıt için: hiçbir sayfada, meta veride veya JSON-LD'de yayınlanmaz (11 hane, T.C. kimlik no
  // olabilir). Yayınlanıp yayınlanmayacağı muhasebeciye sorulacak: docs/onay-bekleyenler.md
  vergiNo: '41998593334',
  mersis: '',
  kep: '',
  instagram: 'https://www.instagram.com/2kahsap/',
  facebook: 'https://www.facebook.com/profile.php?id=61594732547189',
  linkedin: 'https://www.linkedin.com/in/kadir-avc%C4%B1-a069b1440/',
};

/** Yasal metinlerdeki veri sorumlusu adı: "Azra Ahşap Ev (2K AHŞAP)" */
export const yasalAd = `${firma.unvan} (${firma.marka})`;

// WhatsApp linki hazır mesajla açılır; mesaj bulunulan sayfaya göre değişir (Layout'un whatsappMesaj prop'u).
export const varsayilanWhatsappMesaji =
  'Merhaba, 2K AHŞAP web sitenizden yazıyorum. Ahşap yapı projem hakkında bilgi almak istiyorum.';

export const whatsappLinki = (mesaj = varsayilanWhatsappMesaji) =>
  `${firma.whatsapp}?text=${encodeURIComponent(mesaj)}`;

// Yasal sayfaların "Son güncelleme" tarihi (YYYY-AA-GG); metin değiştikçe güncellenir.
export const yasalGuncelleme = '2026-10-12';

// Footer alt şeridi ve yasal sayfalar
export const yasalSayfalar = [
  { ad: 'KVKK Aydınlatma Metni', href: '/kvkk' },
  { ad: 'Gizlilik Politikası', href: '/gizlilik' },
  { ad: 'Çerez Politikası', href: '/cerez-politikasi' },
];

export const menu = [
  { ad: 'Ana Sayfa', href: '/' },
  { ad: 'Projeler', href: '/projeler' },
  { ad: 'Galeri', href: '/galeri' },
  { ad: 'Hakkımızda', href: '/hakkimizda' },
  { ad: 'SSS', href: '/sss' },
  { ad: 'İletişim', href: '/iletisim' },
];

// Kategorilerin tek kaynağı (/<slug> sayfaları, menüler, teklif formu, ana sayfa kartları; sıra da buradan gelir).
// Fotoğraflar public/images/<slug>/<proje-slug>/ altında, projeler src/content/projeler/ altında.
// title/description sayfanın meta bilgisidir, giris sayfadaki ilk paragraftır (birincil anahtar kelime burada geçer).
// vitrin: kapak fotoğrafı kategoriyi temsil eden projenin slug'ı (yoksa ilk proje).
// teklifIpucu: teklif formunda yapı tipi seçeneğinin altındaki kısa açıklama.
// anaSayfa: ana sayfadaki "Ürünlerimiz" kartı (yalnızca kartı olan kategorilerde). Kart fotoğrafı
// public/images/vitrin/<slug>-vitrin-*.webp (scripts/vitrin-gorseli.mjs); alt, o fotoğrafın alt metnidir.
// anaSayfa'sı olmayan kategoriler kartların altında link olarak listelenir.
export const kategoriler = [
  {
    ad: 'Ahşap Ev',
    slug: 'ahsap-ev',
    vitrin: 'kiremit-catili-ahsap-ev',
    h1: 'Ahşap Ev Modelleri ve Projeleri',
    giris: 'Ailenizin ihtiyaçlarına göre tasarlayıp ürettiğimiz ahşap ev projeleri.',
    title: 'Ahşap Ev Modelleri ve Tamamlanan Projelerimiz | 2K AHŞAP',
    description:
      "Ailenizin ihtiyaçlarına göre tasarlayıp ürettiğimiz ahşap ev projelerinin fotoğraflarını inceleyin. Size özel ahşap ev için 2K AHŞAP'tan teklif alın.",
    teklifIpucu: 'Kalıcı konut ve yazlık',
    anaSayfa: {
      aciklama: 'Ailenizin ihtiyaçlarına göre tasarlanan, uzun ömürlü ve sıcak yaşam alanları.',
      alt: 'Taş kaideli verandalı ahşap ev – gri çatılı köşe veranda',
    },
  },
  {
    ad: 'Bungalov',
    slug: 'bungalov',
    vitrin: 'asma-katli-verandali-bungalov',
    h1: 'Ahşap Bungalov Projeleri',
    giris: 'Bahçeniz, tatil eviniz veya turizm tesisiniz için ürettiğimiz ahşap bungalov projeleri.',
    title: 'Ahşap Bungalov Modelleri ve Özel Projeler | 2K AHŞAP',
    description:
      "Doğayla uyumlu ahşap bungalov projelerimizin fotoğraflarını inceleyin. Özel ölçülerde tasarlanan bungalovunuz için 2K AHŞAP'tan hemen teklif alın.",
    teklifIpucu: 'Bahçe, tatil ve turizm',
    anaSayfa: {
      aciklama: 'Bahçeniz, tatil eviniz veya turizm tesisiniz için doğayla uyumlu bungalovlar.',
      alt: 'Geniş verandalı asma katlı bungalov – cam üçgen cephe ve ön veranda',
    },
  },
  {
    ad: 'Villa',
    slug: 'villa',
    vitrin: 'genis-verandali-ahsap-villa',
    h1: 'Ahşap Villa Projeleri',
    giris: 'Geniş verandalı, ferah planlı; modern mimariyle doğal ahşabı buluşturan ahşap villa projelerimiz.',
    title: 'Özel Tasarım Ahşap Villa Modelleri ve Projeleri | 2K AHŞAP',
    description:
      "Geniş verandalı, ferah planlı ahşap villa projelerimizin fotoğraflarını inceleyin. Size özel tasarlanacak ahşap villa için 2K AHŞAP'tan teklif alın.",
    teklifIpucu: 'Geniş, ferah planlı yaşam',
    anaSayfa: {
      aciklama: 'Geniş verandalı, ferah planlı; modern mimariyle doğal ahşabı buluşturan villalar.',
      alt: 'Geniş verandalı ahşap villa – köşeden uzun kavisli saçak ve veranda',
    },
  },
  {
    ad: 'Tiny House',
    slug: 'tiny-house',
    vitrin: 'romorklu-tiny-house',
    h1: 'Tiny House Projeleri',
    giris: 'Az alanda konforlu yaşam için tasarlayıp ürettiğimiz tiny house ve kompakt ahşap yapı projeleri.',
    title: 'Tiny House Modelleri ve Küçük Ahşap Ev Projeleri | 2K AHŞAP',
    description:
      "Az alanda konforlu yaşam sunan tiny house projelerimizin fotoğraflarını inceleyin. Size özel tasarlanacak tiny house için 2K AHŞAP'tan teklif alın.",
    teklifIpucu: 'Az alanda konforlu yaşam',
    anaSayfa: {
      aciklama: 'Az alanda konforlu yaşam: kompakt, işlevsel ve size özel tasarım.',
      alt: 'Römorklu tiny house – çevresi teraslı yan cephe',
    },
  },
  {
    ad: 'Üçgen Ev',
    slug: 'ucgen-ev',
    vitrin: 'a-frame-bungalov',
    h1: 'Üçgen Ev ve Bungalov Projeleri',
    // Eski adı "A-frame" aramalarda da kullanıldığı için giriş ve açıklamada bir kez parantezde geçer
    giris: 'Üçgen ev (A-frame) formunda tasarlayıp ürettiğimiz ahşap yapı ve bungalov projeleri.',
    title: 'Üçgen Ev Modelleri ve Bungalov Projeleri | 2K AHŞAP',
    description:
      "Üçgen ev (A-frame) ve bungalov projelerimizin fotoğraflarını inceleyin. Size özel ölçülerde üçgen ev için 2K AHŞAP'tan hemen teklif alın.",
    teklifIpucu: 'Üçgen formlu ev ve bungalov',
  },
  {
    ad: 'Çardak',
    slug: 'cardak',
    vitrin: 'sekizgen-otel-cardagi',
    h1: 'Ahşap Çardak Projeleri',
    giris: 'Bahçeler, oteller ve tesisler için tasarlayıp ürettiğimiz ahşap çardak projeleri.',
    title: 'Ahşap Çardak Modelleri ve Bahçe Çardakları | 2K AHŞAP',
    description:
      "Bahçe, otel ve tesisler için ürettiğimiz ahşap çardak projelerinin fotoğraflarını inceleyin. Size özel ahşap çardak için 2K AHŞAP'tan teklif alın.",
    teklifIpucu: 'Bahçe, otel ve tesisler',
  },
  {
    ad: 'Otel-Bar',
    slug: 'otel-bar',
    vitrin: 'deniz-ustu-ahsap-otel-odalari',
    h1: 'Ahşap Bar ve Otel Yapıları',
    giris: 'Otel ve plaj işletmeleri için tasarlayıp ürettiğimiz ahşap bar ve konaklama yapıları.',
    title: 'Otel ve Plajlar İçin Ahşap Bar ve Yapılar | 2K AHŞAP',
    description:
      "Otel ve plaj işletmeleri için ürettiğimiz ahşap bar ve konaklama yapılarının fotoğraflarını inceleyin. İşletmeniz için 2K AHŞAP'tan teklif alın.",
    teklifIpucu: 'Otel, plaj ve işletmeler',
  },
  {
    ad: 'Çocuk Oyun Parkı',
    slug: 'cocuk-oyun-parki',
    vitrin: 'kaydirakli-sato-oyun-evi',
    h1: 'Ahşap Çocuk Oyun Parkı ve Oyun Evleri',
    giris: 'Bahçeler için tasarlayıp ürettiğimiz ahşap çocuk oyun parkı ve oyun evi projeleri.',
    title: 'Ahşap Çocuk Oyun Parkı ve Oyun Evi Modelleri | 2K AHŞAP',
    description:
      "Bahçeniz için tasarlayıp ürettiğimiz ahşap çocuk oyun evi ve oyun parkı projelerinin fotoğraflarını inceleyin. 2K AHŞAP'tan hemen teklif alın.",
    teklifIpucu: 'Oyun evi ve oyun parkı',
  },
  {
    ad: 'Ahşap Cami',
    slug: 'ahsap-cami',
    vitrin: 'iki-katli-ahsap-cami',
    h1: 'Ahşap Cami Projeleri',
    giris: 'Cemaatin ihtiyaçlarına göre tasarlayıp ürettiğimiz ahşap cami projeleri.',
    title: 'Ahşap Cami Modelleri ve Tamamlanan Projelerimiz | 2K AHŞAP',
    description:
      "Cemaatin ihtiyaçlarına göre tasarlayıp ürettiğimiz ahşap cami projelerinin fotoğraflarını inceleyin. Size özel ahşap cami için 2K AHŞAP'tan teklif alın.",
    teklifIpucu: 'Tek ve iki katlı, minareli',
  },
  {
    ad: 'Özel Tasarım',
    slug: 'ozel-tasarim',
    vitrin: 'iskele-giris-kulubesi',
    h1: 'Özel Tasarım Ahşap Yapılar',
    giris: 'Vitrin, kulübe, kabin ve depo gibi ihtiyaca göre özel tasarım ahşap yapı projelerimiz.',
    title: 'Özel Tasarım Ahşap Yapılar: Kabin, Kulübe, Vitrin | 2K AHŞAP',
    description:
      "Vitrin, kulübe, kabin ve depo gibi ihtiyaca özel tasarlayıp ürettiğimiz ahşap yapıların fotoğraflarını inceleyin. 2K AHŞAP'tan teklif alın.",
    teklifIpucu: 'Kabin, kulübe, vitrin ve diğerleri',
  },
];

export type Kategori = (typeof kategoriler)[number];

/** Menü linki bulunulan sayfaya mı ait? Kategori ve proje sayfaları (/bungalov, /bungalov/proje)
    "Projeler"e aittir. yol sonda eğik çizgisiz verilir ("/" hariç). Header ve mobil alt menü kullanır. */
export function menuAktifMi(yol: string, href: string) {
  if (href === '/') return yol === '/';
  if (yol === href || yol.startsWith(`${href}/`)) return true;
  return href === '/projeler' && kategoriler.some((k) => yol === `/${k.slug}` || yol.startsWith(`/${k.slug}/`));
}
