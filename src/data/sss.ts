// Sıkça sorulan sorular: sitedeki tüm SSS gösterimlerinin tek kaynağı (/sss, ana sayfa, kategori sayfaları).
// Metin kuralı (CLAUDE.md): kesin süre, fiyat, garanti, sertifika veya proje sayısı yazılmaz;
// "projeye göre değişir, teklifte netleştirilir" gibi güvenli ifadeler kullanılır.
//
// kategoriler: sorunun gösterileceği kategori sayfaları (site.ts'deki slug'lar); her kategoride 3–4 soru.
// anaSayfa: ana sayfadaki en kritik 6 soru.

export const sssGruplari = [
  { id: 'fiyat-ve-odeme', ad: 'Fiyat ve Ödeme' },
  { id: 'surec-ve-sure', ad: 'Süreç ve Süre' },
  { id: 'izin-ve-ruhsat', ad: 'İzin ve Ruhsat' },
  { id: 'teknik-ve-malzeme', ad: 'Teknik ve Malzeme' },
  { id: 'teslimat-ve-kurulum', ad: 'Teslimat ve Kurulum' },
  { id: 'garanti-ve-destek', ad: 'Garanti ve Destek' },
  { id: 'ozel-tasarim', ad: 'Özel Tasarım' },
] as const;

export type SssGrubu = (typeof sssGruplari)[number]['id'];

export interface Soru {
  soru: string;
  cevap: string;
  grup: SssGrubu;
  kategoriler?: string[];
  anaSayfa?: boolean;
}

export const sorular: Soru[] = [
  // Fiyat ve Ödeme
  {
    soru: 'Ahşap ev fiyatları neye göre belirlenir?',
    cevap:
      'Fiyat; yapının alanına, planına, kat sayısına, ahşap türüne, yalıtım ve kaplama tercihlerine göre değişir. Arazinin konumu ve kurulum koşulları da maliyeti etkiler. Bu yüzden sabit bir m² fiyatı yerine, projenize özel teklifte tüm kalemleri açıkça netleştiriyoruz.',
    grup: 'fiyat-ve-odeme',
    kategoriler: ['ahsap-ev', 'villa', 'ahsap-cami', 'ozel-tasarim'],
    anaSayfa: true,
  },
  {
    soru: 'Ahşap ev için nasıl teklif alabilirim?',
    cevap:
      "Teklif formunu doldurabilir, bizi arayabilir ya da WhatsApp'tan yazabilirsiniz. Yapının türünü, yaklaşık ölçülerini ve arazinizin konumunu paylaşmanız yeterli; varsa örnek fotoğraf veya çizim de gönderebilirsiniz. İhtiyaçlarınızı birlikte netleştirdikten sonra size özel teklifimizi hazırlıyoruz.",
    grup: 'fiyat-ve-odeme',
    kategoriler: ['ozel-tasarim'],
  },
  {
    soru: 'Ahşap ev için ödeme planı nasıl olur?',
    cevap:
      'Ödeme planı projenin kapsamına ve takvimine göre belirlenir. Ödeme adımları ve tutarları teklifte ve sözleşmede yazılı olarak netleştirilir. Size uygun planı teklif aşamasında birlikte konuşabiliriz.',
    grup: 'fiyat-ve-odeme',
  },

  // Süreç ve Süre
  {
    soru: 'Ahşap ev yaptırma süreci nasıl işler?',
    cevap:
      'İlk görüşmede ihtiyaçlarınızı dinliyor, ardından arazinizi ve beklentilerinizi birlikte değerlendiriyoruz. Tasarım ve teklif onaylandıktan sonra üretim, nakliye ve kurulum adımlarıyla yapınızı teslim ediyoruz. Her adımda ne olacağını önceden bilirsiniz.',
    grup: 'surec-ve-sure',
  },
  {
    soru: 'Ahşap ev kaç ayda yapılır?',
    cevap:
      'Üretim ve kurulum süresi; yapının büyüklüğüne, tasarımın ayrıntısına, arazi koşullarına ve mevsime göre değişir. Parçalar atölyede hazırlandığı için yerinde kurulum genellikle geleneksel yapılara göre daha kısa sürer. Projenize özel takvim teklifte netleştirilir.',
    grup: 'surec-ve-sure',
    anaSayfa: true,
  },

  // İzin ve Ruhsat
  {
    soru: 'Ahşap ev için ruhsat gerekir mi?',
    cevap:
      'Ahşap ev de diğer kalıcı yapılar gibi imar mevzuatına tabidir. Ruhsat gerekip gerekmediği, arazinin imar durumuna ve yapının niteliğine göre değişir. Projeye başlamadan önce arazinizin bağlı olduğu belediyeden imar durumunu öğrenmenizi öneririz.',
    grup: 'izin-ve-ruhsat',
    kategoriler: ['ahsap-ev', 'tiny-house'],
    anaSayfa: true,
  },
  {
    soru: 'Bungalov için ruhsat gerekir mi?',
    cevap:
      'Bungalov için izin gerekip gerekmediği; arazinin imar durumuna, yapının büyüklüğüne ve kullanım amacına göre değişir. Kesin bilgiyi arazinizin bağlı olduğu belediye verir. İmar durumunu öğrendikten sonra tasarımı bu bilgiye göre birlikte şekillendiririz.',
    grup: 'izin-ve-ruhsat',
    kategoriler: ['bungalov', 'ucgen-ev'],
  },
  {
    soru: 'Arsanın imar durumu nasıl öğrenilir?',
    cevap:
      'Arsanızın imar durumunu, bağlı olduğu belediyenin imar birimine ada ve parsel bilgisiyle başvurarak öğrenebilirsiniz. Birçok belediye bu bilgiyi e-belediye hizmetleri üzerinden de sunar. Bu bilgi, yapının boyutunu ve konumunu planlamanın ilk adımıdır.',
    grup: 'izin-ve-ruhsat',
  },
  {
    soru: 'Ahşap ev yaptırmak için hangi belgeler gerekir?',
    cevap:
      'Gereken belgeler arazinin imar durumuna ve yapının niteliğine göre değişir. Süreç genellikle tapu ve imar durumu bilgisiyle başlar; ruhsat gereken yapılarda belediyenin istediği proje ve belgeler hazırlanır. Projenize özel gereklilikleri teklif aşamasında birlikte konuşuruz.',
    grup: 'izin-ve-ruhsat',
  },

  // Teknik ve Malzeme
  {
    soru: 'Ahşap ev kışın soğuk olur mu?',
    cevap:
      'Hayır. Ahşap ısıyı yavaş ileten doğal bir malzemedir; duvar, çatı ve döşemedeki yalıtımla birlikte ahşap ev kışın sıcak, yazın serin kalır. Yalıtım malzemesi ve kalınlığı bölgenizin iklimine göre belirlenir ve teklifte yazılır.',
    grup: 'teknik-ve-malzeme',
    kategoriler: ['bungalov', 'tiny-house', 'ucgen-ev'],
  },
  {
    soru: 'Ahşap ev depreme dayanıklı mı?',
    cevap:
      'Ahşap, ağırlığına oranla dayanıklı ve esnek bir malzemedir; hafif olduğu için deprem anında yapıya daha az yük biner. Yapının depremdeki davranışı en çok doğru tasarlanmış taşıyıcı sisteme ve işçiliğe bağlıdır. Bu yüzden taşıyıcı sistemi her projede ayrıca planlıyoruz.',
    grup: 'teknik-ve-malzeme',
    kategoriler: ['ahsap-ev', 'villa', 'ahsap-cami'],
    anaSayfa: true,
  },
  {
    soru: 'Ahşap ev yangına dayanıklı mı?',
    cevap:
      'Kalın kesitli ahşap yanarken dış yüzeyinde kömürleşmiş bir tabaka oluşur; bu tabaka içerideki ahşabın yanmasını yavaşlatır. Yangın güvenliği ayrıca kaplama, yalıtım ve elektrik tesisatı seçimlerine de bağlıdır. Bu seçenekleri teklif aşamasında sizinle birlikte değerlendiriyoruz.',
    grup: 'teknik-ve-malzeme',
    kategoriler: ['villa', 'otel-bar'],
  },
  {
    soru: 'Ahşap ev kaç yıl dayanır?',
    cevap:
      'Ahşap evin ömrü; kullanılan ahşabın kalitesine, doğru işçiliğe ve düzenli bakıma bağlıdır. Nemden korunan ve bakımı aksatılmayan ahşap yapılar uzun yıllar kullanılabilir; dünyada yüzyıllardır ayakta duran ahşap yapılar bunun örneğidir.',
    grup: 'teknik-ve-malzeme',
    kategoriler: ['ahsap-ev', 'ahsap-cami'],
    anaSayfa: true,
  },
  {
    soru: 'Ahşap ev bakımı nasıl yapılır?',
    cevap:
      'Dış cephedeki koruyucu boya veya vernik, ahşabı güneş ve yağıştan korumak için belirli aralıklarla yenilenir. Bu aralık iklime, cephenin yönüne ve kullanılan ürüne göre değişir. Teslimde yapınıza uygun bakım önerilerini sizinle paylaşıyoruz.',
    grup: 'teknik-ve-malzeme',
    kategoriler: ['ucgen-ev', 'cardak', 'otel-bar', 'cocuk-oyun-parki'],
  },
  {
    soru: 'Ahşap evde hangi ahşap kullanılır?',
    cevap:
      'Ahşap yapılarda genellikle çam ve ladin gibi iğne yapraklı ağaçların kurutulmuş ve koruyucu işlemden geçirilmiş kerestesi tercih edilir. Projenizde kullanılacak ahşap türü ve koruyucu işlemler yapının kullanım amacına göre seçilir ve teklifte açıkça belirtilir.',
    grup: 'teknik-ve-malzeme',
    kategoriler: ['cardak', 'cocuk-oyun-parki'],
  },

  // Teslimat ve Kurulum
  {
    soru: "Türkiye'nin her yerine ahşap ev yapıyor musunuz?",
    cevap:
      "Evet, İstanbul'daki merkezimizden Türkiye'nin farklı bölgelerindeki projelere üretim ve kurulum yapıyoruz. Nakliye ve kurulum koşulları arazinizin konumuna ve ulaşım durumuna göre değişir; bu kalemler teklifte ayrıca netleştirilir.",
    grup: 'teslimat-ve-kurulum',
    anaSayfa: true,
  },
  {
    soru: 'Ahşap ev için arazi nasıl hazırlanır?',
    cevap:
      'Kurulumdan önce arazinin araç erişimine uygun, düzgün ve temele hazır olması gerekir. Zemin durumu, eğim, elektrik ve su gibi altyapı ihtiyaçlarını keşif aşamasında birlikte değerlendiriyor, hangi hazırlıkların gerektiğini önceden paylaşıyoruz.',
    grup: 'teslimat-ve-kurulum',
    kategoriler: ['bungalov', 'tiny-house'],
  },
  {
    soru: 'Ahşap ev için temel gerekir mi?',
    cevap:
      'Kalıcı ahşap yapılar sağlam ve düzgün bir temele oturur. Temelin türü; yapının büyüklüğüne, zemin özelliklerine ve arazinin eğimine göre belirlenir. Temel işinin kapsamı ve kimin tarafından yapılacağı teklifte açıkça yazılır.',
    grup: 'teslimat-ve-kurulum',
    kategoriler: ['cardak'],
  },

  // Garanti ve Destek
  {
    soru: 'Ahşap evin garantisi var mı?',
    cevap:
      'Garanti kapsamı ve süresi; yapının türüne ve kullanılan malzemelere göre belirlenir ve teklifte yazılı olarak belirtilir. Merak ettiğiniz her konuyu sözleşme öncesinde birlikte netleştiriyoruz.',
    grup: 'garanti-ve-destek',
  },
  {
    soru: 'Teslimden sonra destek veriyor musunuz?',
    cevap:
      "Evet, teslimden sonra da yapınızla ilgili sorularınızda yanınızdayız. Bakım önerileri, onarım veya ek ihtiyaçlarınız için bize telefonla ya da WhatsApp'tan ulaşabilirsiniz.",
    grup: 'garanti-ve-destek',
    kategoriler: ['otel-bar'],
  },

  // Özel Tasarım
  {
    soru: 'Kendi planımla ahşap ev yaptırabilir miyim?',
    cevap:
      'Evet. Elinizdeki plan, çizim veya örnek fotoğraf üzerinden çalışabiliriz. Planı ahşap yapıya ve arazinize uygun hâle getirmek için gereken düzenlemeleri sizinle birlikte yapıyoruz.',
    grup: 'ozel-tasarim',
    kategoriler: ['villa', 'tiny-house', 'cardak', 'ahsap-cami', 'ozel-tasarim'],
  },
  {
    soru: 'Ahşap ev tasarımında sonradan değişiklik yapılabilir mi?',
    cevap:
      'Üretim başlamadan önce tasarımda değişiklik yapabilirsiniz. Üretim başladıktan sonraki değişiklikler yapılan işe ve malzemeye göre değerlendirilir; süreye ve maliyete etkisi önceden sizinle paylaşılır.',
    grup: 'ozel-tasarim',
    kategoriler: ['ozel-tasarim'],
  },
  {
    soru: 'Otel ve işletmeler için ahşap yapı yapıyor musunuz?',
    cevap:
      'Evet. Otel, kamp ve tatil işletmeleri için bungalov, çardak, bar ve konaklama yapıları tasarlayıp üretiyoruz. Yapıların sayısı, yerleşimi ve takvimi işletmenize göre planlanır ve teklifte netleştirilir.',
    grup: 'ozel-tasarim',
    kategoriler: ['bungalov', 'otel-bar'],
  },
  {
    soru: 'Bahçe için ahşap oyun evi yaptırabilir miyim?',
    cevap:
      'Evet. Bahçenizin ölçüsüne ve isteklerinize göre ahşap oyun evi ve çocuk oyun parkı tasarlayıp üretiyoruz. Kaydırak, merdiven veya veranda gibi detaylar projeye göre birlikte belirlenir.',
    grup: 'ozel-tasarim',
    kategoriler: ['cocuk-oyun-parki'],
  },
];

export const grubunSorulari = (grup: SssGrubu) => sorular.filter((s) => s.grup === grup);
export const anaSayfaSorulari = sorular.filter((s) => s.anaSayfa);
export const kategoriSorulari = (kategori: string) => sorular.filter((s) => s.kategoriler?.includes(kategori));

/** FAQPage JSON-LD: yalnızca sayfada görünen sorularla kurulur. */
export const sssSemasi = (liste: Soru[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: liste.map((s) => ({
    '@type': 'Question',
    name: s.soru,
    acceptedAnswer: { '@type': 'Answer', text: s.cevap },
  })),
});
