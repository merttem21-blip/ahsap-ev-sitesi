# Onay bekleyenler

- **Tarih:** 12 Ekim 2026
- **Kapsam:** Yasal sayfalarda (`/kvkk`, `/gizlilik`, `/cerez-politikasi`) karşılığı henüz olmayan bilgiler ve onay gerektiren metin önerileri.
- **Firma bilgilerinin kaynağı:** `src/data/site.ts` (`firma`). Bir bilgi netleşince orada doldurulur; yasal sayfalar kendiliğinden güncellenir.

## Hukukçuya sorulacaklar

Bu dosyadaki açık soruların özeti. Ayrıntı, her maddenin sonundaki bölümde. Yanıt gelince ilgili bölüm güncellenir, madde buradan silinir.

**Hukukçu**

- **VERBİS:** Kayıt yükümlülüğü var mı, yoksa muafiyet mi? Metinde şu an bu konuda hiçbir ifade yok. → §1, VERBİS satırı
- **Yurt dışına aktarım:** Vercel, Web3Forms, e-posta sağlayıcısı ve WhatsApp/Meta için KVKK md. 9 dayanağı nedir? Metinde yalnızca genel bir cümle var. → §1, yurt dışı aktarım satırı
- **Saklama süresi:** Form verisi ne kadar tutulmalı, sitede süre yazılmalı mı? (`guvenlik-kurallari` "en fazla 1 yıl" diyor; CLAUDE.md kesin süre yazılmasını yasaklıyor.) → §1, saklama ve imha satırı
- **KVKK kutusu metni:** Kutu rıza istemiyor, yalnızca aydınlatma metninin okunduğunu belirtiyor. Talebi yanıtlamak için veri işlemenin dayanağı açık rıza değil, KVKK md. 5/2-c (sözleşmenin kurulması) olarak kuruldu. Bu gerekçe doğru mu? → §3
- **Form taslağı:** Tarayıcıda saklanması için çerez politikası ve gizlilik metnine eklenen cümle yeterli mi? Onay istenmemesi doğru mu? → §5
- **Metinde anılmayanlar:** `2k-ahsap-son-gonderim` kaydı (30 sn bekleme) ve `/iletisim`'de tıklanınca yüklenen Google Haritalar penceresi metinde anılmalı mı? Eklenmeleri sizin onayınızı da bekliyor. → §4, §5

**Muhasebeci**

- **Vergi numarası:** Sitede yayınlanmalı mı? 11 hane, T.C. kimlik no olabilir; şu an hiçbir yerde görünmüyor. → §2
- **Ticari unvan:** "Azra Ahşap Ev" vergi levhasındaki unvanla birebir aynı mı? Şahıs işletmesinde unvan sahibin adını ve soyadını içerir (TTK md. 40). → §2
- **MERSİS numarası** (varsa). → §1, MERSİS satırı
- **KEP adresi** (varsa). → §1, KEP satırı

**Sizden gereken bilgi (yasal metin için)**

- **E-posta sağlayıcısı:** info@2kahsap.com hangi sağlayıcıda, sunucuları yurt dışında mı? Yurt dışı aktarım sorusunu da etkiler. → §1, e-posta hizmet sağlayıcısı satırı
- **İş ortakları:** Gerçekte veri paylaşılan iş ortağı türleri, metindeki "nakliye, kurulum, muhasebe ve mali müşavirlik" listesiyle örtüşüyor mu? → §1, iş ortağı türleri satırı

## 1. Metinden çıkarılan yer tutucular

Bu yer tutucuların karşılığı yoktu. Sitede artık görünmüyorlar; ne yapıldığı aşağıda.

| Eski yer tutucu | Ne yapıldı | Gereken bilgi |
|---|---|---|
| `[ONAY: MERSİS numarası]` | `firma.mersis` boş. Boşken satır etiketiyle birlikte hiç görünmüyor. | MERSİS numarası. Doldurulunca KVKK sayfasındaki "Veri Sorumlusu" tablosunda kendiliğinden çıkar. |
| `[ONAY: KEP adresi, varsa]` | `firma.kep` boş. Boşken hem tablo satırı hem §8'deki "KEP adresimize" ifadesi görünmüyor. | KEP adresi. Doldurulunca iki yerde de kendiliğinden çıkar. |
| `[ONAY: VERBİS kayıt durumu veya muafiyet bilgisi]` | Satır tamamen kaldırıldı. VERBİS kaydı veya muafiyeti hakkında hiçbir ifade yok. | Bir şey yazılacaksa önce hukukçu onayı. |
| `[ONAY: ticari elektronik ileti gönderilecek mi?]` | §3'teki "Açık rızanız olması hâlinde bilgilendirme ve tanıtım iletileri göndermek" maddesi kaldırıldı. **Kaldırılması onaylandı (12 Ekim 2026).** | Kampanya veya SMS gönderilmeye başlanırsa madde metne geri eklenecek ve formlara ayrı, isteğe bağlı bir izin kutusu konacak (zorunlu KVKK kutusundan bağımsız). İYS kaydı da gerekir. |
| `[ONAY: iş ortağı türleri]` | Yalnızca yer tutucu silindi. "Nakliye, kurulum, muhasebe ve mali müşavirlik gibi hizmet aldığımız iş ortaklarına" cümlesi kaldı. | Gerçekte veri paylaşılan iş ortağı türlerinin listesi. |
| `[ONAY: e-posta hizmet sağlayıcısı]` | Yalnızca yer tutucu silindi. Metin genel: "e-posta hizmet sağlayıcımıza". | info@2kahsap.com kutusunun sağlayıcısı (ör. Google Workspace, Yandex, barındırma firması) ve sunucularının yurt dışında olup olmadığı. |
| `[ONAY: yurt dışı aktarım dayanağı, ör. standart sözleşme ve Kurul'a bildirim]` | Yalnızca yer tutucu silindi. "Yurt dışına aktarım KVKK'nın 9. maddesindeki şartlara uygun olarak yapılır" cümlesi kaldı. | Vercel, Web3Forms, e-posta sağlayıcısı ve WhatsApp/Meta için 9. madde dayanağı. Hukukçu teyidi gerekir. |
| `[ONAY: kişisel veri saklama ve imha politikası]` | Yalnızca yer tutucu silindi. Metin genel: "amaç için gereken süre ve mevzuattaki süreler". | Saklama süreleri. Not: `guvenlik-kurallari` skill'i form verisi için "en fazla 1 yıl" diyor. CLAUDE.md Metin Kuralı ise kesin süre yazılmasını yasaklıyor. Sitede süre yazılacaksa önce karar verilmeli. |

## 2. Uygulandı, teyit edilmeli

- **Vergi numarası.** Vergi no (11 hane, T.C. kimlik no olabilir) bilinçli olarak gizlendi; yayınlanması gerekip gerekmediği muhasebeciye sorulacak. Numara `src/data/site.ts` içinde `firma.vergiNo` alanında duruyor. Hiçbir sayfada, meta veride veya JSON-LD'de kullanılmıyor. KVKK sayfasında yalnızca vergi dairesi görünüyor.
- **Ticari unvan.** Şahıs işletmesinde ticaret unvanı işletme sahibinin adı ve soyadını içerir (TTK md. 40). "Azra Ahşap Ev" bir işletme adı olabilir. Vergi levhasındaki unvanla birebir aynı olmalı.
- **Marka yazımı.** Prompt'ta "2K Ahşap" yazıyordu. Sitenin her yerinde "2K AHŞAP" kullanıldığı için yasal metinlerde de bu yazım kullanıldı: "Azra Ahşap Ev (2K AHŞAP)". Değiştirmek için `firma.marka` yeterli. Bu durumda header, footer ve schema.org'daki ad da değişir. **Kapandı (14 Ekim 2026):** "2K AHŞAP" yazımı kalır.

## 3. KVKK onay kutusu metni (onaylandı ve uygulandı, 12 Ekim 2026)

Teklif formu (`/teklif-al`, 3. adım) ve iletişim formu (`/iletisim`) aynı bileşeni kullanır: `src/components/form/KvkkOnay.astro`.

**Eski metin:**

> KVKK Aydınlatma Metni kapsamında kişisel verilerimin, talebimin yanıtlanması amacıyla işlenmesini kabul ediyorum.

**Neden değişti:** Eski metin, kutunun işaretlenmesini bir rıza beyanı gibi kuruyordu ("işlenmesini kabul ediyorum"). Kutu zorunlu olduğu için talep göndermek bu rızaya bağlanmış oluyordu. Talebi yanıtlamak için veri işlemenin dayanağı açık rıza değil, KVKK md. 5/2-c'dir (sözleşmenin kurulması). Aydınlatma ile açık rıza ayrı tutulur ve açık rıza bir hizmetin ön şartı yapılmaz.

**Yeni metin:**

> KVKK [Aydınlatma Metni](/kvkk)'ni okudum.

"Aydınlatma Metni" `/kvkk` sayfasına yeni sekmede açılan linktir. Kutunun `name="kvkk"`, `value="Evet"`, zorunluluğu ve stili aynı. Kutu her zaman boş gelir.

**Birlikte güncellenen metinler** (aynı ifadeyi tekrarlıyorlardı):

| Yer | Eski | Yeni |
|---|---|---|
| `src/scripts/form.ts`, hata mesajı | Formu gönderebilmek için KVKK Aydınlatma Metni'ni onaylamanız gerekiyor. | Formu gönderebilmek için KVKK Aydınlatma Metni'ni okuduğunuzu işaretleyin. |
| `src/scripts/form.ts`, e-postadaki "KVKK onayı" alanı | Evet. KVKK Aydınlatma Metni kapsamında kişisel verilerinin talebinin yanıtlanması amacıyla işlenmesini kabul etti. | Evet. KVKK Aydınlatma Metni'ni okuduğunu işaretledi. |
| `src/scripts/form.ts`, WhatsApp mesajının son satırı | KVKK Aydınlatma Metni'ni okudum ve onaylıyorum (tarih). | KVKK Aydınlatma Metni'ni okudum (tarih). |
| `src/pages/kvkk.astro`, §4 "Web sitesi formları" | Formdaki onayınız ve onay zamanı da talebinizle birlikte iletilir. | Aydınlatma metnini okuduğunuzu işaretlediğiniz bilgisi ve zamanı da talebinizle birlikte iletilir. |
| `.claude/skills/guvenlik-kurallari/SKILL.md` §4, örnek onay metni | Kişisel verilerimin, KVKK Aydınlatma Metni kapsamında … işlenmesini kabul ediyorum. | Yeni metin ve kısa gerekçesi. |

E-postadaki alan adı ("KVKK onayı") ve gönderim akışı değişmedi; yalnızca değerler değişti. Form envanteri etkilenmedi.

**Hukukçu kontrolü (yayından önce):** md. 5/2-c gerekçesi bir hukukçu tarafından teyit edilmedi (bkz. "Hukukçuya sorulacaklar").

## 4. Çerez politikası (bilgi)

Sitede onay gerektiren çerez veya betik yok. `/cerez-politikasi` ve `/gizlilik` iki şeyden söz etmiyor:

- `/iletisim`'de tıklanınca yüklenen Google Haritalar penceresi
- form gönderildikten sonra tarayıcıya yazılan `2k-ahsap-son-gonderim` kaydı (30 sn bekleme için, zorunlu işlev)

Bu, `docs/denetim-raporu.md` madde 8'de de not edilmişti. Eklenmesi bir metin değişikliği olduğu için onay bekliyor.

## 5. Form taslağı tarayıcıda saklanır (onaylandı ve uygulandı, 14 Ekim 2026)

Teklif ve iletişim formuna yazılanlar ziyaretçinin kendi tarayıcısında taslak olarak saklanır (`localStorage`: `2k-ahsap-taslak-teklif`, `2k-ahsap-taslak-iletisim`). Sayfaya dönülünce alanlar dolu gelir. Kod: `src/scripts/form.ts`, `src/scripts/taslak.ts`.

- Saklanmayanlar: KVKK kutusu, honeypot ve gizli alanlar.
- Silinme: e-posta gönderimi başarılı olunca. Gönderilmezse son değişiklikten 7 gün sonra, siteyi ilk ziyarette (her sayfa açılırken denetlenir). Ziyaretçi siteye hiç dönmezse kayıt kendi tarayıcısında kalır; tarayıcı verisini silince gider.
- Taslak sunucuya, bize veya üçüncü kişilere gönderilmez. Yalnızca ziyaretçi formu gönderince bilgiler Web3Forms üzerinden iletilir.
- `proje_aciklamasi` alanı da taslağa dahil. Taslaktan "Diğer" geri yüklenince alanın zorunlu durumu ve kalan karakter sayacı da güncellenir.
- Metne eklenen cümle (`/cerez-politikasi` §2 ayrı paragraf, `/gizlilik` §4 paragraf içinde):

  > Teklif ve iletişim formlarına yazdığınız bilgiler, sayfadan ayrılsanız da kaybolmaması için yalnızca kendi tarayıcınızda saklanır; formu gönderdiğinizde, gönderilmezse de 7 gün sonra siteyi ilk ziyaretinizde silinir. Bu bilgiler siz formu göndermedikçe bize veya üçüncü kişilere iletilmez.

- Yasal sayfaların "Son güncelleme" tarihi 14 Ekim 2026 oldu (`src/data/site.ts`, `yasalGuncelleme`).

**Hukukçu kontrolü (yayından önce): form taslağının tarayıcıda saklanması.** Sorulacak: bu işlev için yukarıdaki cümlenin yeterli olup olmadığı. Taslak, ziyaretçinin istediği işlev için cihazında tutulan zorunlu bir kayıttır ve çerez onayı istenmiyor. Aynı soru `2k-ahsap-son-gonderim` kaydı için de geçerli (§4).

## 6. Yazı tipleri artık Google'dan yüklenmiyor (onaylandı ve uygulandı, 14 Ekim 2026)

Fontlar (Inter, Poppins) sitenin kendi dosyalarına alındı (`public/fonts/`). Ziyaretçinin tarayıcısı Google'a bağlanmıyor; IP adresi Google'a gitmiyor. İki yasal sayfa eski durumu anlatıyordu; kullanıcı onayıyla Google Fonts maddeleri kaldırıldı. Google Haritalar'ı anan "Dış bağlantılar" maddesi olduğu gibi duruyor.

| Sayfa | Kaldırılan madde |
|---|---|
| `/gizlilik` (`src/pages/gizlilik.astro`, §3) | **Google Fonts:** Sitedeki yazı tipleri Google sunucularından yüklenir; bu sırada tarayıcınız IP adresinizi Google'a iletir. Google Fonts çerez kullanmaz. |
| `/cerez-politikasi` (`src/pages/cerez-politikasi.astro`, §3) | **Google Fonts:** Yazı tipleri Google sunucularından yüklenir. Google Fonts çerez bırakmaz; ancak bu sırada tarayıcınız IP adresinizi Google'a iletir. |

- Yerine yeni bir madde yazılmadı. Önerilen madde: **Yazı tipleri:** Sitedeki yazı tipleri kendi sunucumuzdan yüklenir; bu sırada üçüncü bir tarafa bilgi gönderilmez. **Kapandı (14 Ekim 2026):** madde eklenmeyecek; fontlar sitenin kendi dosyalarından geldiği için üçüncü tarafa bilgi gitmiyor.
- gorsel-kontrol bu iki sayfayı çekmez (yasal sayfa örneği `/kvkk`); referans yenilemesi gerekmedi.

## 7. Sonraki iş: CSS'i sayfaya gömme (14 Ekim 2026)

Lighthouse'un kalan en büyük önerisi, sayfa çizilmeden önce beklenen CSS dosyalarıdır (render-blocking): her sayfada ortak stil dosyası (~27 KB, sıkıştırılmış ~7 KB) ve sayfanın kendi dosyası ayrı istekle gelir.

- **Öneri:** `astro.config.mjs` içinde `build: { inlineStylesheets: 'always' }`. CSS, `<link>` yerine aynı sırayla `<style>` olarak sayfaya gömülür. Görünüm değişmemeli; her sayfanın HTML'i yaklaşık 7–9 KB (sıkıştırılmış) büyür, CSS sayfalar arasında önbellekten gelmez.
- **Kazanç beklentisi:** Mobilde ilk açılışta bir istek turu (Lighthouse benzetiminde yaklaşık 150–450 ms FCP/LCP).
- **Yapılmadı:** kullanıcı kararıyla bu turda denenmedi. Yapılırsa önce/sonra Lighthouse, form-kontrol ve gorsel-kontrol (fark %0 beklenir) birlikte çalıştırılır.

## 8. Yayın günü yapılacaklar

- **Alan adını bağlama (www → 2kahsap.com).** 2kahsap.com henüz bu siteye bağlı değil; şu an hem `2kahsap.com` hem `www.2kahsap.com` başka bir sunucudan yanıt veriyor ve biri diğerine yönlenmiyor (14 Ekim 2026). Vercel → proje → Settings → Domains:
  1. `2kahsap.com` eklenir ve ana adres yapılır. Canonical, sitemap, paylaşım görselleri ve form sonrası yönlendirme (`/tesekkurler`) bu adresi kullanır (`src/data/site.ts`, `siteAdresi`).
  2. `www.2kahsap.com` eklenir ve "Redirect to 2kahsap.com" (308) seçilir.
  3. DNS'te Vercel'in gösterdiği A ve CNAME kayıtları girilir. E-posta (MX) kayıtlarına dokunulmaz; info@2kahsap.com çalışmaya devam etmeli.
  4. Kontrol: `https://www.2kahsap.com/iletisim` 308 ile `https://2kahsap.com/iletisim`'e, `http://2kahsap.com/` HTTPS'e yönlenmeli; `/iletisim/` ve `/iletisim/index.html` `/iletisim`'e yönlenmeli (`vercel.json`: `trailingSlash: false`, `cleanUrls: true`).
- **Google Search Console.** 2kahsap.com mülk olarak eklenir ve `https://2kahsap.com/sitemap.xml` gönderilir.
- **Google İşletme Profili.** ✅ Tamamlandı (14 Ekim 2026). Profilin linki (`maps.google.com/?cid=…`; kısa link Android Chrome'da açılmadığı için kullanılmıyor) `src/data/site.ts` → `firma.harita` (footer ve `/iletisim` adres linkleri, JSON-LD `hasMap`); "Haritayı göster" ile açılan harita `firma.haritaYerlestirme`, konum `firma.konum` (JSON-LD `geo`). Sitedeki adres, profildeki resmi adresle birebir aynı yapıldı: Kaynarca Akdeniz Cd, İpek Yolu Sokağı No:4/A, 34890 Pendik/İstanbul.
- **Form denemesi.** Yayından sonra teklif formundan bir deneme gönderilir; Teşekkürler sayfasının açıldığı ve mailin info@2kahsap.com'a geldiği kontrol edilir.
