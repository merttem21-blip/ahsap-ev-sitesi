// Site genelinde ortak veriler. İletişim bilgileri CLAUDE.md ile birebir aynı olmalı
// (ad-adres-telefon tutarlılığı SEO için önemli).

export const siteAdresi = 'https://2kahsap.com';

// Web3Forms erişim anahtarı (web3forms.com). Teklif ve iletişim formları bu anahtarla doğrudan e-postaya gider.
// Herkese açık bir anahtardır, gizli değildir. Boşken formlar bilgileri WhatsApp mesajı olarak açar.
export const web3formsAnahtari = '7b3caa3b-25bf-4df9-9829-471af2739c78';

// Analitik ve pazarlama araçlarının kimlikleri. İkisi de boşken sitede bu araçlar yoktur: hiçbir betik yüklenmez ve
// ziyaretçiye yalnızca zorunlu çerez bilgilendirme bandı ("Anladım") gösterilir (src/components/CerezBandi.astro).
// Bir kimlik girilince bant Kabul Et / Reddet'li onay paneline döner ve footer'a "Çerez Tercihleri" eklenir. Araç
// yalnızca ziyaretçi o türe izin verince yüklenir (src/scripts/cerez.ts). Kimlik girmeden önce:
// - /cerez-politikasi ve /gizlilik, aracı, amacını ve bıraktığı çerezleri anlatacak şekilde güncellenmeli.
// - vercel.json'daki Content-Security-Policy aracın alan adlarını içermeli (Google Analytics: googletagmanager.com,
//   google-analytics.com; Meta Pixel: connect.facebook.net, facebook.com). CSP şimdilik yalnızca rapor modundadır.
export const izleme = {
  googleAnalytics: 'G-EY24MZYBJH', // analitik çerezler: GA4 ölçüm kimliği, ör. 'G-XXXXXXXXXX'
  metaPixel: '', // pazarlama çerezleri: Meta Pixel kimliği (yalnızca rakam)
};

/** En az bir araç tanımlıysa çerez bandı onay panelidir (Kabul Et / Reddet); değilse bilgilendirme bandıdır. */
export const cerezOnayiGerekli = Boolean(izleme.googleAnalytics || izleme.metaPixel);

// schema.org işletme şemasının görseli (gerçek proje fotoğrafı). Bağlantı önizlemesi (Open Graph) görselleri
// ayrıca üretilir: src/lib/paylasim.ts
export const varsayilanGorsel = '/images/ucgen-ev/a-frame-bungalov/a-frame-bungalov-01-1600.webp';

// Ana sayfa hero fotoğrafı: kaynak arsiv/gorseller/ahsap-ev/hero-anasayfa.jpeg. Mobil sürüm üçgen eve kırpılmış
// dikey kesimdir. Ana sayfanın bağlantı önizlemesi de masaüstü sürümden üretilir (src/lib/paylasim.ts).
export const heroGorseli = {
  mobil: '/images/hero/hero-mobile.webp',
  mobilWidth: 612,
  mobilHeight: 768,
  tablet: '/images/hero/hero-tablet.webp',
  masaustu: '/images/hero/hero-desktop.webp',
  width: 1376,
  height: 768,
  alt: 'Doğa içinde üçgen ev ve kütük ahşap ev',
};

// schema.org logo alanı: Google logoyu beyaz zeminde ve raster gösterdiği için açık zemin logosunun PNG'si
export const semaLogosu = '/logo/2k-ahsap-logo-acik-zemin.png';

// Firma bilgilerinin tek kaynağı: sitede bu bilgilerin geçtiği her yer buradan okur.
// Sitede görünen ad marka adıdır; yasal metinlerde "Unvan (Marka)" biçimi kullanılır (yasalAd).
// mersis ve kep boşken yasal sayfalarda etiketleriyle birlikte hiç görünmez, doldurulunca kendiliğinden çıkar.
// Henüz bilinmeyen bilgiler: docs/onay-bekleyenler.md
// Adres, Google İşletme Profili'ndeki resmi adresle birebir aynıdır (firma.adres bu parçalardan oluşur).
const adresParcalari = {
  sokak: 'Kaynarca Akdeniz Cd, İpek Yolu Sokağı No:4/A',
  ilce: 'Pendik',
  il: 'İstanbul',
  postaKodu: '34890',
};

// Telefon ve WhatsApp numarasının tek kaynağı: ülke koduyla, yalnızca rakamlar. Görünen biçimler, tel: ve
// wa.me linkleri buradan üretilir; numara değişince yalnızca bu satır güncellenir.
const telefonNumarasi = '905322504077';
const telefonGruplari = [
  telefonNumarasi.slice(2, 5),
  telefonNumarasi.slice(5, 8),
  telefonNumarasi.slice(8, 10),
  telefonNumarasi.slice(10),
].join(' '); // "532 250 40 77"

export const firma = {
  marka: '2K AHŞAP',
  unvan: 'Azra Ahşap Ev',
  kurulusYili: '2015',
  kurucu: 'Kadir Avcı',
  telefonGorunen: `0${telefonGruplari}`, // 0532 250 40 77
  telefonLink: `tel:+${telefonNumarasi}`,
  telefonUluslararasi: `+90 ${telefonGruplari}`, // schema.org
  whatsapp: `https://wa.me/${telefonNumarasi}`,
  eposta: 'info@2kahsap.com',
  kvkkEposta: 'info@2kahsap.com', // veri sorumlusu iletişim e-postası (KVKK başvuruları)
  adres: `${adresParcalari.sokak}, ${adresParcalari.postaKodu} ${adresParcalari.ilce}/${adresParcalari.il}`,
  adresParcalari,
  // Google İşletme Profili: adres linkleri (footer, /iletisim) ve schema.org hasMap bu linke gider. cid, profilin
  // kimliğidir. Kısa link (maps.app.goo.gl/nE8jAvDeUaF3w6KTA) Android Chrome'da "about:blank#blocked" açtığı için kullanılmaz.
  harita: 'https://maps.google.com/?cid=8383073593410855210',
  // /iletisim'de "Haritayı yükle" ile açılan gömülü haritanın adresi (Google Haritalar → Paylaş → Harita yerleştirme)
  haritaYerlestirme:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3016.799859476108!2d29.256386499999998!3d40.876266199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cadd121ba2fb5f%3A0x7456a9048d36212a!2zMmthaMWfYXA!5e0!3m2!1str!2str!4v1791987225622!5m2!1str!2str',
  // İşletme profilindeki konum (schema.org geo)
  konum: { enlem: 40.8762662, boylam: 29.2563865 },
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

// WhatsApp linki hazır mesajla açılır; mesaj bulunulan sayfaya göre değişir (Layout'un whatsappMesaj prop'u):
// proje sayfasında proje adı ve sayfa linki, kategori sayfasında kategori adı, mesajı olmayan sayfalarda bu genel mesaj.
export const varsayilanWhatsappMesaji =
  'Merhaba, 2K AHŞAP web sitenizden yazıyorum. Ahşap yapı projem hakkında bilgi almak istiyorum.';

export const whatsappLinki = (mesaj = varsayilanWhatsappMesaji) =>
  `${firma.whatsapp}?text=${encodeURIComponent(mesaj)}`;

// Yasal sayfaların "Son güncelleme" tarihi (YYYY-AA-GG); metin değiştikçe güncellenir.
export const yasalGuncelleme = '2026-10-30';

// Footer alt şeridi ve yasal sayfalar
export const yasalSayfalar = [
  { ad: 'KVKK Aydınlatma Metni', href: '/kvkk' },
  { ad: 'Gizlilik Politikası', href: '/gizlilik' },
  { ad: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
  // Çerez Politikası sonda kalır: footer "Çerez Tercihleri" düğmesini bunun önüne ekler (Footer.astro)
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
// giris sayfadaki ilk paragraftır (birincil anahtar kelime burada geçer). Meta başlık h1'den, meta açıklama
// giris'ten üretilir (src/lib/projeler.ts); böylece arama sonucundaki metin sayfada görünenle aynı kalır.
// metaGiris (isteğe bağlı): meta açıklamada giris yerine kullanılır; yalnızca eski adı bir kez parantezde
// taşıyan kategorilerde doludur (Üçgen Ev, Kamelya). Eski adlar sayfada görünmez.
// googleBasligi (isteğe bağlı): arama sonucundaki başlık, h1'de olmayan aranan kelimeyi ("… Modelleri") taşımak için.
// " | 2K AHŞAP" eki kodda eklenir, toplam en fazla 60 karakter. Boşsa başlık h1'den üretilir; sayfadaki H1 değişmez.
// vitrin: kapak fotoğrafı kategoriyi temsil eden projenin slug'ı (yoksa ilk proje).
// teklifIpucu: teklif formunda yapı tipi seçeneğinin altındaki kısa açıklama.
// anaSayfa: ana sayfadaki "Ürünlerimiz" kart şeridindeki kart. Kart fotoğrafı
// public/images/vitrin/<slug>-vitrin-*.webp (scripts/vitrin-gorseli.mjs, kaynağı vitrin projesinin fotoğrafı);
// alt, o fotoğrafın alt metnidir. anaSayfa'sı olmayan kategori ana sayfada gösterilmez.
export const kategoriler = [
  {
    ad: 'Ahşap Ev',
    slug: 'ahsap-ev',
    vitrin: 'kiremit-catili-ahsap-ev',
    h1: 'Ahşap Ev Modelleri ve Projeleri',
    giris: 'Ailenizin ihtiyaçlarına göre tasarlayıp ürettiğimiz ahşap ev projeleri.',
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
    googleBasligi: 'Ahşap Bungalov Modelleri ve Projeleri',
    giris: 'Bahçeniz, tatil eviniz veya turizm tesisiniz için ürettiğimiz ahşap bungalov projeleri.',
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
    googleBasligi: 'Ahşap Villa Modelleri ve Projeleri',
    giris: 'Geniş verandalı, ferah planlı; modern mimariyle doğal ahşabı buluşturan ahşap villa projelerimiz.',
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
    googleBasligi: 'Tiny House Modelleri ve Küçük Ahşap Ev Projeleri',
    giris: 'Az alanda konforlu yaşam için tasarlayıp ürettiğimiz tiny house ve kompakt ahşap yapı projeleri.',
    teklifIpucu: 'Az alanda konforlu yaşam',
    anaSayfa: {
      aciklama: 'Az alanda konforlu yaşam: kompakt, işlevsel ve size özel tasarım.',
      alt: 'Römorklu tiny house – çevresi teraslı yan cephe',
    },
  },
  {
    ad: 'Üçgen Ev',
    slug: 'ucgen-ev',
    vitrin: 'ucgen-ev-bungalov',
    h1: 'Üçgen Ev ve Bungalov Projeleri',
    googleBasligi: 'Üçgen Ev Modelleri ve Projeleri',
    giris: 'Üçgen ev formunda tasarlayıp ürettiğimiz ahşap yapı ve bungalov projeleri.',
    // Eski ad ("A-frame") aramalarda da kullanıldığı için yalnızca meta açıklamada bir kez parantezde geçer
    metaGiris: 'Üçgen ev (A-frame) formunda tasarlayıp ürettiğimiz ahşap yapı ve bungalov projeleri.',
    teklifIpucu: 'Üçgen formlu ev ve bungalov',
    anaSayfa: {
      aciklama: 'Zemine kadar inen çatısıyla doğayla iç içe, karakterli üçgen ev ve bungalovlar.',
      alt: 'Üçgen ev bungalov – gece ışıklandırılmış cam üçgen cephe',
    },
  },
  {
    ad: 'Kamelya',
    slug: 'kamelya',
    vitrin: 'sekizgen-otel-kamelyasi',
    h1: 'Ahşap Kamelya Projeleri',
    googleBasligi: 'Ahşap Kamelya Modelleri ve Bahçe Kamelyaları',
    giris: 'Bahçeler, oteller ve tesisler için tasarlayıp ürettiğimiz ahşap kamelya projeleri.',
    // Eski ad ("çardak") aramalarda da kullanıldığı için yalnızca meta açıklamada bir kez parantezde geçer
    metaGiris: 'Bahçeler, oteller ve tesisler için tasarlayıp ürettiğimiz ahşap kamelya (çardak) projeleri.',
    teklifIpucu: 'Bahçe, otel ve tesisler',
    anaSayfa: {
      aciklama: 'Bahçeler, oteller ve tesisler için gölgeli ve sıcak buluşma alanları.',
      alt: 'Sekizgen otel kamelyası – kemerli girişli açık kamelya',
    },
  },
  {
    ad: 'Otel-Bar',
    slug: 'otel-bar',
    vitrin: 'deniz-ustu-ahsap-otel-odalari',
    h1: 'Ahşap Bar ve Otel Yapıları',
    giris: 'Otel ve plaj işletmeleri için tasarlayıp ürettiğimiz ahşap bar ve konaklama yapıları.',
    teklifIpucu: 'Otel, plaj ve işletmeler',
    anaSayfa: {
      aciklama: 'Otel ve plaj işletmeleri için tasarlanan ahşap bar ve konaklama yapıları.',
      alt: 'Deniz üstü ahşap otel odaları – su üzerindeki sıra odalar ve teraslar',
    },
  },
  {
    ad: 'Çocuk Oyun Parkı',
    slug: 'cocuk-oyun-parki',
    vitrin: 'kaydirakli-sato-oyun-evi',
    h1: 'Ahşap Çocuk Oyun Parkı ve Oyun Evleri',
    googleBasligi: 'Ahşap Çocuk Oyun Parkı ve Oyun Evi Modelleri',
    giris: 'Bahçeler için tasarlayıp ürettiğimiz ahşap çocuk oyun parkı ve oyun evi projeleri.',
    teklifIpucu: 'Oyun evi ve oyun parkı',
    anaSayfa: {
      aciklama: 'Bahçeniz için çocukların keyifle oynayacağı ahşap oyun evleri ve oyun parkları.',
      alt: 'Kaydıraklı şato oyun evi – akşam ışıklandırmasıyla çatı pencereli ön cephe',
    },
  },
  {
    ad: 'Ahşap Cami',
    slug: 'ahsap-cami',
    vitrin: 'iki-katli-ahsap-cami',
    h1: 'Ahşap Cami Projeleri',
    googleBasligi: 'Ahşap Cami Modelleri ve Projeleri',
    giris: 'Cemaatin ihtiyaçlarına göre tasarlayıp ürettiğimiz ahşap cami projeleri.',
    teklifIpucu: 'Tek ve iki katlı, minareli',
    anaSayfa: {
      aciklama: 'Cemaatin ihtiyaçlarına göre tasarlanan, sıcak ve huzurlu ahşap camiler.',
      alt: 'İki katlı ahşap cami – minare ve ahşap süslemeli giriş revakı',
    },
  },
  {
    ad: 'Özel Tasarım',
    slug: 'ozel-tasarim',
    vitrin: 'iskele-giris-kulubesi',
    h1: 'Özel Tasarım Ahşap Yapılar',
    googleBasligi: 'Özel Tasarım Ahşap Yapılar: Kabin, Kulübe, Vitrin',
    giris: 'Vitrin, kulübe, kabin ve depo gibi ihtiyaca göre özel tasarım ahşap yapı projelerimiz.',
    teklifIpucu: 'Kabin, kulübe, vitrin ve diğerleri',
    anaSayfa: {
      aciklama: 'Vitrin, kulübe, kabin ve depo gibi ihtiyacınıza göre tasarlanan ahşap yapılar.',
      alt: 'İskele giriş kulübesi – deniz kıyısında saçaklı ahşap kulübe',
    },
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
