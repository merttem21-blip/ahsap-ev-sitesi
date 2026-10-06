// Site genelinde ortak veriler. İletişim bilgileri CLAUDE.md ile birebir aynı olmalı
// (ad-adres-telefon tutarlılığı SEO için önemli).

export const siteAdresi = 'https://2kahsap.com';

// Web3Forms erişim anahtarı (web3forms.com). Teklif ve iletişim formları bu anahtarla doğrudan e-postaya gider.
// Herkese açık bir anahtardır, gizli değildir. Boşken formlar bilgileri WhatsApp mesajı olarak açar.
export const web3formsAnahtari = '7b3caa3b-25bf-4df9-9829-471af2739c78';

// Open Graph ve schema.org için varsayılan görsel (gerçek proje fotoğrafı)
export const varsayilanGorsel = '/images/a-frame/a-frame-bungalov/a-frame-bungalov-01-1600.webp';

export const firma = {
  telefonGorunen: '0532 250 40 77',
  telefonLink: 'tel:+905322504077',
  whatsapp: 'https://wa.me/905322504077',
  eposta: 'info@2kahsap.com',
  adres: 'Kaynarca, Akdeniz Cd. No:4/A, 34893 Pendik/İstanbul',
  harita:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('2K AHŞAP Kaynarca Akdeniz Cd. No:4/A Pendik İstanbul'),
  instagram: 'https://www.instagram.com/2kahsap/',
  facebook: 'https://www.facebook.com/profile.php?id=61594732547189',
  linkedin: 'https://www.linkedin.com/in/kadir-avc%C4%B1-a069b1440/',
};

// WhatsApp linki hazır mesajla açılır; mesaj bulunulan sayfaya göre değişir (Layout'un whatsappMesaj prop'u).
export const varsayilanWhatsappMesaji =
  'Merhaba, 2K AHŞAP web sitenizden yazıyorum. Ahşap yapı projem hakkında bilgi almak istiyorum.';

export const whatsappLinki = (mesaj = varsayilanWhatsappMesaji) =>
  `${firma.whatsapp}?text=${encodeURIComponent(mesaj)}`;

// Footer alt şeridi ve yasal sayfalar
export const yasalSayfalar = [
  { ad: 'KVKK Aydınlatma Metni', href: '/kvkk' },
  { ad: 'Gizlilik Politikası', href: '/gizlilik' },
  { ad: 'Çerez Politikası', href: '/cerez-politikasi' },
];

export const menu = [
  { ad: 'Ana Sayfa', href: '/' },
  { ad: 'Projeler', href: '/projeler' },
  { ad: 'Hakkımızda', href: '/hakkimizda' },
  { ad: 'SSS', href: '/sss' },
  { ad: 'İletişim', href: '/iletisim' },
];

// Kategori sayfaları (/<slug>). Fotoğraflar public/images/<slug>/<proje-slug>/ altında,
// projeler src/content/projeler/ altında. title/description sayfanın meta bilgisidir,
// giris sayfadaki ilk paragraftır (birincil anahtar kelime burada geçer).
// vitrin: kapak fotoğrafı kategoriyi temsil eden projenin slug'ı.
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
  },
  {
    ad: 'Tiny House',
    slug: 'tiny-house',
    vitrin: 'lombar-pencereli-modern-tiny-house',
    h1: 'Tiny House Projeleri',
    giris: 'Az alanda konforlu yaşam için tasarlayıp ürettiğimiz tiny house ve kompakt ahşap yapı projeleri.',
    title: 'Tiny House Modelleri ve Küçük Ahşap Ev Projeleri | 2K AHŞAP',
    description:
      "Az alanda konforlu yaşam sunan tiny house projelerimizin fotoğraflarını inceleyin. Size özel tasarlanacak tiny house için 2K AHŞAP'tan teklif alın.",
  },
  {
    ad: 'A-Frame',
    slug: 'a-frame',
    vitrin: 'a-frame-bungalov',
    h1: 'A-Frame Ev ve Bungalov Projeleri',
    giris: 'Üçgen formuyla öne çıkan a-frame ev ve bungalov projelerimiz.',
    title: 'A-Frame Ev Modelleri ve Bungalov Projeleri | 2K AHŞAP',
    description:
      "Üçgen formlu a-frame ev ve bungalov projelerimizin fotoğraflarını inceleyin. Size özel ölçülerde a-frame ev için 2K AHŞAP'tan hemen teklif alın.",
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
  },
  {
    ad: 'Özel Tasarım',
    slug: 'ozel-tasarim',
    vitrin: 'iki-katli-ahsap-cami',
    h1: 'Özel Tasarım Ahşap Yapılar',
    giris: 'Cami, vitrin, kulübe, kabin ve depo gibi ihtiyaca göre özel tasarım ahşap yapı projelerimiz.',
    title: 'Özel Tasarım Ahşap Yapılar: Kabin, Kulübe, Vitrin | 2K AHŞAP',
    description:
      "Cami, vitrin, kulübe, kabin ve depo gibi ihtiyaca özel tasarlayıp ürettiğimiz ahşap yapıların fotoğraflarını inceleyin. 2K AHŞAP'tan teklif alın.",
  },
];

export type Kategori = (typeof kategoriler)[number];
