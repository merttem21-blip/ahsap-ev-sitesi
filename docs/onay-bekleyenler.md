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
- **Web3Forms sunucu konumu ve yurt dışına aktarım:** Form bilgileri (ad, telefon, e-posta, talep bilgileri) Web3Forms'un sunucularından geçerek e-postaya iletiliyor. Sunucuların hangi ülkede olduğu ve verinin orada saklanıp saklanmadığı Web3Forms'tan yazılı olarak öğrenilmeli. Yurt dışındaysa KVKK md. 9 dayanağı nedir? Metin bugün yalnızca "sunucuları yurt dışında bulunabilir" diyor. → §13
- **IP adresi ve Google Haritalar:** Form gönderilirken Web3Forms, harita yüklenince Google ziyaretçinin IP adresini görüyor. KVKK metnine yazılmalı mı? Metin önerisi hazır. → §13, öneri 3 ve 4
- **"Açık rızanız (md. 5/1)":** `/kvkk`, hukuki sebepler listesinin son maddesi: "Bu sebeplerin bulunmadığı işlemler için açık rızanız (md. 5/1)." Site hiçbir işlemi açık rızaya dayandırmıyor (form md. 5/2-c, KVKK kutusu yalnızca aydınlatma teyidi). Bu madde kalmalı mı, kalacaksa nasıl yazılmalı? → §14, ifade taraması
- **"Kabul etmiş sayılırsınız":** `/kullanim-kosullari` giriş paragrafı: "Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız." Bu ifade uygun mu (KVK Kurulu 2026/347 ilke kararı aydınlatma metniyle ilgili; kullanım koşulları için ayrıca değerlendirilmeli)? → §14, ifade taraması

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

- **Vergi numarası.** Vergi no (11 hane, T.C. kimlik no olabilir) bilinçli olarak gizlendi; yayınlanması gerekip gerekmediği muhasebeciye sorulacak. Numara depoda tutulmuyor (26 Ekim 2026'da `src/data/site.ts`'ten çıkarıldı); yayınlanacaksa muhasebeciden teyitli hâli alınır. Hiçbir sayfada, meta veride veya JSON-LD'de kullanılmıyor. KVKK sayfasında yalnızca vergi dairesi görünüyor.
- **Ticari unvan.** Şahıs işletmesinde ticaret unvanı işletme sahibinin adı ve soyadını içerir (TTK md. 40). "Azra Ahşap Ev" bir işletme adı olabilir. Vergi levhasındaki unvanla birebir aynı olmalı.
- **Marka yazımı.** Prompt'ta "2K Ahşap" yazıyordu. Sitenin her yerinde "2K AHŞAP" kullanıldığı için yasal metinlerde de bu yazım kullanıldı: "Azra Ahşap Ev (2K AHŞAP)". Değiştirmek için `firma.marka` yeterli. Bu durumda header, footer ve schema.org'daki ad da değişir. **Kapandı (14 Ekim 2026):** "2K AHŞAP" yazımı kalır.

## 3. KVKK onay kutusu metni (onaylandı ve uygulandı, 12 Ekim 2026; güncellendi 28 Ekim 2026)

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

**Güncelleme (onaylandı ve uygulandı, 28 Ekim 2026):** KVK Kurulu'nun 2026/347 sayılı ilke kararına göre aydınlatma metni "onaylıyorum / kabul ediyorum" ifadesiyle onaya bağlanmaz, "okudum ve anladım" kullanılır.

| Yer | Önceki | Şimdi |
|---|---|---|
| Kutu metni (`KvkkOnay.astro`) | KVKK Aydınlatma Metni'ni okudum. | KVKK Aydınlatma Metni'ni okudum ve anladım. |
| Hata mesajı (`form.ts`) | … okuduğunuzu işaretleyin. | … okuyup anladığınızı işaretleyin. |
| WhatsApp mesajının son satırı | KVKK Aydınlatma Metni'ni okudum (tarih). | KVKK Aydınlatma Metni'ni okudum ve anladım (tarih). |
| E-posta alanı | "KVKK onayı": Evet. KVKK Aydınlatma Metni'ni okuduğunu işaretledi. | "Aydınlatma teyidi": Evet. KVKK Aydınlatma Metni'ni okuyup anladığını işaretledi. |
| E-posta alanı | "KVKK onay zamanı" | "Aydınlatma teyidi zamanı" |

Kutu yine boş gelir ve zorunludur; link, `name="kvkk"`, `value="Evet"` ve gönderim akışı aynı. Form envanteri değişmedi. Tıklama alanı görünmez katmanla en az 44 px (`dokunma-alani`); hata satırının uyarı ikonu bu alanı örtmesin diye tıklamayı geçirir. İ ve T3 referansları yenilendi (6 çekim; 375 px'te metin iki satıra iner, sayfa 22 px uzar). `/kvkk` §4'teki "Aydınlatma metnini okuduğunuzu işaretlediğiniz bilgisi…" cümlesi değişmedi.

**Hukukçu kontrolü (yayından önce):** md. 5/2-c gerekçesi bir hukukçu tarafından teyit edilmedi (bkz. "Hukukçuya sorulacaklar").

## 4. Çerez politikası ve çerez bandı (çözüldü, 20 Ekim 2026)

**Çözüldü:** Her sayfada bilgilendirme bandı ve "Anladım" var (`src/components/CerezBandi.astro`; güncel metin aşağıda). `/cerez-politikasi` buna uyduruldu: "Bu nedenle çerez onay bildirimi gösterilmez" cümlesi kaldırıldı, bandı ve `2k-ahsap-cerez-tercihi` kaydını anlatan §3 eklendi (amacı, ne zaman oluşur, nasıl silinir), sonraki bölümler bir numara kaydı. Yasal sayfaların ortak "Son güncelleme" tarihi 20 Ekim 2026 oldu (`yasalGuncelleme`; üç sayfada birden görünür).

**GA veya Pixel eklenince (yapılacak):** `src/data/site.ts` → `izleme` alanına bir kimlik girilince bant kendiliğinden Kabul Et / Reddet'li onay paneline döner ve "İzninizle, sitemizi geliştirmek amacıyla çerezler kullanıyoruz." metnini gösterir. "Sitemiz çerez kullanmaz" cümlesi o zaman doğru olmaz. Kimlik girilmeden önce:

- Onay panelinin metni ve "Çerez ayarları"ndaki tür açıklamaları eklenen araca göre gözden geçirilmeli (`CerezBandi.astro`).
- `/cerez-politikasi` (§2 "Kullanılmaz" maddeleri, §3) ve `/gizlilik` §4 aracı, amacını ve bıraktığı çerezleri anlatacak şekilde güncellenmeli; `yasalGuncelleme` yenilenmeli.
- `vercel.json` CSP'sine aracın alan adları eklenmeli.

**Metinde anılmayanlar, çözüldü (20 Ekim 2026, kullanıcı kararı):** `docs/denetim-raporu.md` madde 8'deki iki eksik kapandı.

- **Google Haritalar:** `/iletisim`'de sayfa açılınca yalnızca sitede barındırılan statik bir harita görseli durur (`scripts/statik-harita.mjs`, OpenStreetMap verisi, görselin üstünde atıf). Google haritası yalnızca "Haritayı yükle" ile açılır; düğmenin altında "Harita yüklendiğinde Google çerez kullanabilir." notu, kutunun altında "Google Haritalar'da aç" linki var. `/cerez-politikasi` §4 ve `/gizlilik` §3'e birer madde eklendi.
- **`2k-ahsap-son-gonderim`:** `/cerez-politikasi` §3 (amacı, içeriği, nasıl silinir) ve `/gizlilik` §4'te (bir cümle) anlatıldı.
- Bant metni de buna göre değişti: "Sitemiz izleme veya reklam çerezi kullanmaz. Yalnızca sitenin çalışması için gereken bilgiler (bu bildirimi kapattığınız ve form taslaklarınız) tarayıcınızda tutulur. Ayrıntılar için Çerez Politikası'na göz atabilirsiniz."

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
- **Bırakıldı (26 Ekim 2026, kullanıcı kararı):** Türkçe font alt kümesinden sonra Lighthouse'un tahmini kazancı 100–590 ms'den 0–150 ms'ye indi (§12).

## 8. Yayın günü yapılacaklar

- **Alan adını bağlama (www → 2kahsap.com).** Karar (26 Ekim 2026): bütün aşamalar bitip `main`'e birleştirildikten sonra yapılır. 2kahsap.com henüz bu siteye bağlı değil; `2kahsap.com` ve `www.2kahsap.com` GoDaddy'nin park sayfasını gösteriyor (A: 15.197.148.33, 3.33.130.190; `/` → `/lander`) ve `http` HTTPS'e yönlenmiyor (26 Ekim 2026). Vercel → proje → Settings → Domains:
  1. `2kahsap.com` eklenir ve ana adres yapılır. Canonical, sitemap, paylaşım görselleri ve form sonrası yönlendirme (`/tesekkurler`) bu adresi kullanır (`src/data/site.ts`, `siteAdresi`).
  2. `www.2kahsap.com` eklenir ve "Redirect to 2kahsap.com" (308) seçilir.
  3. DNS'te (GoDaddy) park sayfasının iki A kaydı ve varsa yönlendirme (forwarding) kaldırılır, Vercel'in gösterdiği A ve CNAME kayıtları girilir. E-posta (MX), SPF, DMARC ve `google-site-verification` kayıtlarına dokunulmaz; info@2kahsap.com çalışmaya devam etmeli.
  4. Alan adı ve SSL çalışınca `ahsap-ev-sitesi.vercel.app` → Edit → Redirect to `2kahsap.com`. Bu adres şu an herkese açık ve `noindex` taşımıyor (canonical 2kahsap.com'u gösteriyor). Önizlemeler Vercel girişi ister ve `X-Robots-Tag: noindex` döner; değişiklik gerekmez.
  5. Kontrol: `https://www.2kahsap.com/iletisim` 308 ile `https://2kahsap.com/iletisim`'e, `http://2kahsap.com/` HTTPS'e yönlenmeli; `/iletisim/` ve `/iletisim/index.html` `/iletisim`'e yönlenmeli (`vercel.json`: `trailingSlash: false`, `cleanUrls: true`).
- **Google Search Console.** "Alan adı" mülkü olarak eklenir (www, http, https birlikte), GoDaddy'ye TXT kaydıyla doğrulanır; mevcut `google-site-verification` kaydı silinmez. Sonra `https://2kahsap.com/sitemap.xml` gönderilir.
- **Bing Webmaster.** "Google Search Console'dan içe aktar" ile eklenir (ek DNS kaydı gerekmez).
- **Google İşletme Profili.** ✅ Tamamlandı (14 Ekim 2026). Profilin linki (`maps.google.com/?cid=…`; kısa link Android Chrome'da açılmadığı için kullanılmıyor) `src/data/site.ts` → `firma.harita` (footer ve `/iletisim` adres linkleri, JSON-LD `hasMap`); "Haritayı göster" ile açılan harita `firma.haritaYerlestirme`, konum `firma.konum` (JSON-LD `geo`). Sitedeki adres, profildeki resmi adresle birebir aynı yapıldı: Kaynarca Akdeniz Cd, İpek Yolu Sokağı No:4/A, 34890 Pendik/İstanbul.
- **Form denemesi (gerçek gönderim).** Alan adı bağlanıp `main`'e birleştirildikten sonra, telefonda ve bilgisayarda yapılır; her mesaja "TEST" yazılır.

  Önce:
  1. Web3Forms panelinde anahtarın (`7b3c…`, `src/data/site.ts`) bağlı olduğu e-posta: **info@2kahsap.com** olmalı.
  2. Panelde aylık gönderim sınırı ve spam filtresi. Alan adı kısıtlaması varsa yalnızca alan adı bağlandıktan sonra açılır; önce açılırsa `vercel.app`'teki formlar çalışmaz.
  3. `https://2kahsap.com/tesekkurler` 200 dönüyor (JS kapalı gönderim buraya döner).
  4. Web3Forms'tan gelen mail info@ kutusunda spam'e düşmüyor.

  Gönderim:
  5. `/iletisim` boş gönderilir: her alanın altında hata, odak ilk hatalı alanda. Yanlış telefon ve e-posta biçiminde uyarı çıkar.
  6. `/iletisim` doldurulup gönderilir: `/tesekkurler` açılır, mail gelir. Mailde konu, gönderen adı "2K AHŞAP Web Sitesi", ğ/ş/İ harfleri, KVKK onayı ve zamanı, gönderildiği sayfa var.
  7. Mailde "Yanıtla": alıcı müşterinin e-postası (replyto). E-posta yazılmadan gönderilen formda da mail gelir.
  8. Bir proje sayfasında "Teklif Al" → `/teklif-al?proje=…`, bütün adımlar doldurulur: mailde proje, yapı tipi, bütçe, il/ilçe, arsa durumu var.
  9. Hemen ikinci gönderim: "30 saniye bekleyin" uyarısı, ikinci mail gelmez.
  10. Uçak modunda gönderim: bilgiler WhatsApp mesajı olarak hazırlanır (gönderilmeden kapatılır), alanlar formda kalır.
  11. Form yarım doldurulup sayfadan çıkılır, geri dönülür: alanlar dolu. Başarılı gönderimden sonra boş.
  12. KVKK linki `/kvkk`'yi yeni sekmede açar; geri tuşuyla dönünce kutu boş.
  13. Tarayıcıda JS kapatılıp gönderilir: Web3Forms üzerinden `https://2kahsap.com/tesekkurler` açılır, mail gelir.
  14. Konsolda `document.querySelector('[name=botcheck]').checked = true` yazılıp gönderilir: `/tesekkurler` açılır, mail gelmez.
  15. `/iletisim`, `/teklif-al`, `/tesekkurler`'de konsolda CSP hatası yok; "Haritayı yükle" haritayı açar.
  16. Test mailleri silinir (KVKK).

## 9. Yarım kalan işler (21 Ekim 2026)

- **SSS kayması.** Canlıda gerçek tıklamayla görülüyor. Şüpheliler: URL hash yazımı (`SssAkordeon.astro` → `adresiGuncelle`) ve cevabın geç dolması / yüksekliğin sonradan değişmesi. Kalıcı kontrol eklendi: `npm run check:sss` (gerçek dokunma/tıklama, Chromium ve WebKit, 375 ve 1280 px, 3 sn kare kare ölçüm). Şu anki sonuç:
  - Modern tarayıcıda /sss, / ve /bungalov'da başlık en çok 0,5 px oynuyor; ekrana çizilen karelerde de (Chromium screencast, WebKit video) başlık yerinde.
  - ✅ Çözüldü (26 Ekim 2026, 1c727aa): `<details name>` desteği olmayan tarayıcıda (iOS 17.2 öncesi Safari; testte `¹`) başlık 105–237 px kayıyordu. Tıklama işleyicisi başlığın yerini diğer cevabı kapattıktan sonra ölçüyordu; artık önce ölçüp kapatmayla aynı anda dengeliyor.
  - ✅ Çözüldü (26 Ekim 2026, 1c727aa): kaydırılmış header'ın görünmeyen iç kabı (`.ust-ic`) ve logo linkinin kutusu header'ın altına taşıp tıklamayı yutuyordu (ana sayfada 17 / 50 px, diğer sayfalarda ≥ 1024 px'te 12 px). Taşan kısım artık tıklamayı almıyor. `check:sss` 96/96.
- **Proje sayfası ışık kutusundaki adressiz görsel.** `Galeri.astro`'daki büyük görsel (`data-ik-gorsel`) HTML'de `src`'siz duruyor; `check:images` onu istisnayla atlıyor. `/galeri`'deki gibi (db7a2a8) görseli JS ile oluşturup istisnayı kaldırmak gerekiyor. Yapılmadı.

## 10. Çalışma saatlerinin /iletisim'de gösterimi (onaylandı ve uygulandı, 26 Ekim 2026)

- Saatler: Pazartesi–Cumartesi 08:00–19:00, Pazar kapalı (kullanıcı). Kaynak `src/data/site.ts` → `firma.calismaSaatleri` (`metin` sayfada, `sema` JSON-LD'de `openingHours: "Mo-Sa 08:00-19:00"`).
- `/iletisim`'deki "Bize ulaşın" listesinde beşinci satır: saat ikonu, "Çalışma saatleri" etiketi. Bağlantı olmadığı için üzerine gelince renk değiştirmez (`a.kanal:hover`). 1280 px'te form kartı sol sütunla aynı boyda durduğu için 27 px uzadı (onaylandı). İ'nin 3 referansı yenilendi (`docs/guvenli-mod/README.md`, Referans geçmişi).

## 11. SEO aşaması (kapandı, 26 Ekim 2026)

**Denetim** (derlenmiş site, 49 sayfa): title 27–60 karakter, description 132–157 karakter, ikisinde de tekrar yok; her sayfada tek H1; canonical mutlak ve sayfanın kendisini gösteriyor; `og:image` 49/49, hepsi 1200×630; `lang="tr"` 49/49. Alt metin 833 görselin hepsinde dolu, Türkçe ve anlamlı. JSON-LD: firma şeması 49, Breadcrumb 46, proje CreativeWork + ImageObject 26/26, FAQPage 12. Kaynakta ve derlemede `vercel.app` geçmiyor; ad, adres ve telefon tek biçimde.

**Yapılanlar** (her biri `form-kontrol` ve `gorsel-kontrol`'den geçti):

- Projeler, Galeri ve Hakkımızda'nın paylaşım görseli logo yerine sayfanın kendi fotoğrafı (a580894).
- Firma şemasına `legalName: "Azra Ahşap Ev"` (afee57c). Ünvanın vergi levhasıyla teyidi §2'de açık.
- Çalışma saatleri: şemada `openingHours` (c0873ac), `/iletisim`'de "Çalışma saatleri" satırı (446eab0, §10).
- Bungalov ve tiny house için rakam vermeyen fiyat soruları (e0c6323). Fiyat sorusu bulunduğu her sayfada ilk sırada.
- Vergi numarası depodan çıkarıldı (10f3679); git geçmişinde duruyor, geçmiş yeniden yazılmadı.
- Karar: "prefabrik" ifadesi sitenin hiçbir yerinde kullanılmaz.
- Değişmeyenler: başlıklar, H1'ler ve sayfa metinleri (anahtar kelimeleri zaten doğal biçimde taşıyor); şehir adlarıyla çoğaltılmış sayfa yok.

**Kalanlar:**

- Yayın günü (§8): alan adı bağlantısı `main`'e birleştirildikten sonra; `ahsap-ev-sitesi.vercel.app` → 2kahsap.com yönlendirmesi; Search Console alan adı mülkü (TXT) ve sitemap; Bing'e içe aktarma.
- Google İşletme Profili: web sitesi alanı `https://2kahsap.com` olmalı; profildeki ad, adres, telefon ve saatler sitedekiyle karşılaştırılmalı (2K AHŞAP · Kaynarca Akdeniz Cd, İpek Yolu Sokağı No:4/A, 34890 Pendik/İstanbul · 0532 250 40 77 · Pazartesi–Cumartesi 08:00–19:00, Pazar kapalı).
- Yayından birkaç hafta sonra: anahtar kelime listesi Search Console verisine göre gözden geçirilir (`seo-kurallar` §1); arama hacmi uydurulmaz.

## 12. Performans aşaması (kapandı, 26 Ekim 2026)

**Yapılanlar** (ikisi de `form-kontrol` ve `gorsel-kontrol` 48/48'den geçti):

- Türkçe font alt kümesi (23cb3f6): Ğ ğ İ Ş ş latin-ext'ten ayrı küçük dosyalarda; her sayfada font 143 → 59 KB. Lighthouse mobil LCP: `/` 3,33 → 2,77 sn, `/bungalov` 3,50 → 2,97, `/galeri` 5,16 → 3,14, `/iletisim` 3,38 → 2,94.
- Geç font kayması (ef2aa00): sütunlar `ch` yerine eşdeğer `em` ile (`--ch-inter`, `--ch-poppins`), yedek font ortalama harf genişliğine göre ölçekli. Proje sayfası ve `/iletisim`'de CLS 0,14 / 0,13 → 0. Inter geciktirilince 0,02'yi aşan sayfa 412 px'te 9 → 1, 375 px'te 11 → 0 (kalan: `/ahsap-ev/tas-kaideli-verandali-ahsap-ev` 412 px, breadcrumb 1–2 px taşıyor).
- Denetlendi, sorun yok: LCP görselleri hiçbir sayfada lazy değil; GA ve Meta Pixel hiçbir sayfada yüklenmiyor, çerez bandı metni gerçekle tutarlı; `/_astro` ve `/fonts` bir yıl önbellekte (immutable).

**Kararlar:** CSS gömme (§7) bırakıldı; Lenis'i yalnızca masaüstünde yükleme atlandı.

**Yayından sonra:**

- Galeri küçük resimleri için 300 px boyutu: proje sayfası başına ~470 KB az (26 projede 15,1 → 4,2 MB). Yalnızca küçük resimlerin srcset'ine eklenir; `gorsel.ts`'de `src` genişliğe göre seçilmeli, `optimize-images` yalnızca eksik çıktıyı üretmeli, mevcut fotoğraflar `-1600`'den türetilir (`ham-gorseller/` bu bilgisayarda yok). Proje detayı (D) referansları yenilenir.
- Kartlar için 800 px ara boyutu: 341 px'lik kart bugün 1000 px'lik dosya alıyor, kart başına ~%30 az.
- `/images`, `/logo`, `/paylasim` için orta süreli önbellek (ör. 7 gün; şu an her sayfa geçişinde görsel başına bir 304 isteği). Aynı adla değiştirilen görsel bu süre kadar eski görünebilir; `immutable` kullanılmaz.

## 13. Formlar, güvenlik ve KVKK aşaması (27 Ekim 2026)

**Yapılanlar:**

- CSP zorunlu modda: `vercel.json`'da başlık `Content-Security-Policy-Report-Only` → `Content-Security-Policy`, değer aynı. Önce yerelde zorunlu modla denendi: Chromium'da 50 sayfa, WebKit'te 8 sayfa; harita, iletişim formu (JS açık ve kapalı), galeri ve proje ışık kutusu, SSS → 0 ihlal.
- Derleme kontrolü (`astro.config.mjs`, `csp-kontrol`): `dist/`'teki her satır içi betiğin sha256 özeti `script-src`'de yoksa derleme hata verir (Vercel'de de). Kullanılmayan özet uyarı verir. Bugün 2 özet: `CerezBandi.astro`, `galeri.astro`.

**Kararlar:**

- `vercel.live` CSP'ye eklenmez; önizlemede Vercel Toolbar'ın çalışmaması kabul.
- Form taslağının silinme kodu değişmez; metin öneri 2'ye göre düzeltilecek.
- CSP ihlal raporu toplanmıyor (`report-uri` yok); toplamak yeni bir servis gerektirir.

**Denetim, değişiklik gerekmedi:** HSTS, `nosniff`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy` yerinde. Formlarda doğrulama, honeypot (`botcheck`), 30 sn bekleme, başarı (`/tesekkurler`) ve hata (WhatsApp'a aktarım) durumları, KVKK kutusu yerinde. Bilinen sınırlar: sunucu tarafında alan doğrulaması yok (Web3Forms yapmıyor), captcha yok; herkese açık anahtarla doğrudan gönderime karşı tek savunma Web3Forms'un spam filtresi.

**Kalanlar:** HSTS `includeSubDomains`, alan adı ve e-posta alt alan adları netleşince değerlendirilir; `preload` önerilmez (geri alması zor).

### Yasal metin önerileri (1, 2, 5 ve 7 uygulandı, 28 Ekim 2026; 6 görsel onay bekliyor; 3 ve 4 hukukçudan sonra)

Uygulanınca `yasalGuncelleme` (`src/data/site.ts`) o günün tarihiyle güncellenir. Tarih bütün yasal sayfalarda (`/kvkk` dahil, Y referansı) göründüğü için 1, 2, 5 ve 7 için öneri 6 ile birlikte güncellenir.

**Öneri 1. Gizlilik §3, Üçüncü Taraf Hizmetler** (`src/pages/gizlilik.astro`). ✅ Uygulandı (28 Ekim 2026). Neden: form bilgileri Web3Forms'a gidiyor; KVKK metninde yazıyor, Gizlilik'te hiç geçmiyor. "Vercel" maddesinden sonra yeni madde:

> **Web3Forms:** Teklif ve iletişim formlarına yazdığınız bilgiler, form hizmeti sağlayıcısı Web3Forms aracılığıyla e-posta adresimize iletilir. Formu gönderdiğinizde tarayıcınız Web3Forms'a bağlanır.

**Öneri 2. Gizlilik §4 ve Çerez Politikası §2, form taslağı** (`gizlilik.astro`, `cerez-politikasi.astro`; iki sayfada aynı cümle). ✅ Uygulandı (28 Ekim 2026). Neden: metin "formu gönderdiğinizde silinir" diyor; kod taslağı yalnızca e-postayla başarılı gönderimde siliyor, WhatsApp ile gönderimde 7 gün tutuyor.

Şu an:

> Teklif ve iletişim formlarına yazdığınız bilgiler, sayfadan ayrılsanız da kaybolmaması için yalnızca kendi tarayıcınızda saklanır; formu gönderdiğinizde, gönderilmezse de 7 gün sonra siteyi ilk ziyaretinizde silinir.

Öneri:

> Teklif ve iletişim formlarına yazdığınız bilgiler, sayfadan ayrılsanız da kaybolmaması için yalnızca kendi tarayıcınızda saklanır. Bu taslak, formu e-postayla başarıyla gönderdiğinizde silinir; aksi hâlde (örneğin bilgileri WhatsApp ile gönderdiğinizde) son değişikliğinizden 7 gün sonra, siteyi ilk açtığınızda kendiliğinden silinir.

Not: "en geç 7 gün sonra silinir" tek başına yazılmadı. Kod taslağı 7 gün sonra kullanmaz ve siteyi ilk açışta siler (`src/scripts/taslak.ts`); site hiç açılmazsa kayıt tarayıcıda kalır.

**Öneri 3. KVKK §5, Kişisel Verilerin Aktarılması** (`src/pages/kvkk.astro`). Hukukçudan sonra. Neden: harita yüklenince tarayıcı Google'a bağlanıyor; Gizlilik ve Çerez metninde yazıyor, KVKK'da yok. Hukukçu onayı gerekir. Hizmet sağlayıcılar maddesinin sonu:

Şu an:

> … e-posta hizmet sağlayıcımıza ve WhatsApp üzerinden yazmanız hâlinde mesajlaşma altyapısını sağlayan WhatsApp/Meta'ya.

Öneri:

> … e-posta hizmet sağlayıcımıza, WhatsApp üzerinden yazmanız hâlinde mesajlaşma altyapısını sağlayan WhatsApp/Meta'ya ve iletişim sayfasındaki haritayı yüklemeniz hâlinde, tarayıcınızın doğrudan bağlandığı Google'a.

**Öneri 4. KVKK §2, İşlem güvenliği** (`kvkk.astro`). Hukukçudan sonra. Neden: metin IP adresini yalnızca barındırma sağlayıcısına bağlıyor; form gönderiminde Web3Forms, harita yüklenince Google da görüyor. Hukukçu onayı gerekir.

Şu an:

> **İşlem güvenliği:** siteye erişim sırasında barındırma hizmeti sağlayıcısının tuttuğu IP adresi, tarayıcı bilgisi ve erişim kayıtları.

Öneri:

> **İşlem güvenliği:** siteye erişim sırasında barındırma hizmeti sağlayıcısının tuttuğu IP adresi, tarayıcı bilgisi ve erişim kayıtları; formu gönderdiğinizde form hizmeti sağlayıcısının, haritayı yüklediğinizde Google'ın gördüğü IP adresi ve tarayıcı bilgisi.

**Öneri 5. Çerez Politikası §3, Tarayıcı Kayıtları** (`cerez-politikasi.astro`). ✅ Uygulandı (28 Ekim 2026). Neden: bölüm kayıtları adıyla sayıyor (`2k-ahsap-cerez-tercihi`, `2k-ahsap-son-gonderim`), taslak kayıtları adıyla geçmiyor. "Son gönderim" paragrafından sonra yeni paragraf:

> Formlara yazdığınız bilgiler "2k-ahsap-taslak-teklif" ve "2k-ahsap-taslak-iletisim" adlı kayıtlarla tarayıcınızda tutulur; ne zaman silindikleri 2. bölümde anlatılır. Bu kayıtlar çerez değildir ve siz formu göndermedikçe bize veya üçüncü kişilere iletilmez.

**Öneri 6. Çerez bandı** (`src/components/CerezBandi.astro`, bilgilendirme metni). Neden: tarayıcıda son form gönderiminin zamanı da tutuluyor. Görünür değişiklik: metin uzar, dar ekranda bant bir satır uzayabilir; uygulanırsa çerez bandı (Ç) referansları ve ana sayfa hero'su kontrol edilir.

Şu an:

> Yalnızca sitenin çalışması için gereken bilgiler (bu bildirimi kapattığınız ve form taslaklarınız) tarayıcınızda tutulur.

Öneri:

> Yalnızca sitenin çalışması için gereken bilgiler (bu bildirimi kapattığınız, form taslaklarınız ve son form gönderiminizin zamanı) tarayıcınızda tutulur.

**Öneri 7. Kullanım Koşulları §1** (`src/pages/kullanim-kosullari.astro`). ✅ Uygulandı (28 Ekim 2026). Neden: sitede süre bilgisi yok (CLAUDE.md Metin Kuralı).

Şu an:

> Sitedeki proje fotoğrafları, ölçüler, malzeme ve süre bilgileri tanıtım ve bilgilendirme amaçlıdır.

Öneri:

> Sitedeki proje fotoğrafları, ölçü ve malzeme bilgileri tanıtım ve bilgilendirme amaçlıdır.

## 14. Erişilebilirlik ve yayın hazırlığı (Aşama 6, 27 Ekim 2026)

Sitede değişiklik yapılmadı. Tarama derlenmiş sitede (49 sayfa), Playwright Chromium ve axe-core 4.10.3 ile yapıldı; betikler depoya eklenmedi.

**Erişilebilirlik:**

- **axe, 375 ve 1280 px:** ciddi ve kritik bulgu yok (49/49 sayfa). Başka düzeyde de ihlal yok; sayfa başına 40–46 kural geçiyor.
- **Fotoğraf üzerindeki metin:** axe bu metinlerin kontrastını ölçemiyor. 579 öğe piksel ölçümüyle kontrol edildi. Tek bulgu: ana sayfada 1024 px ve üstünde, şeffaf header'daki "SSS" ve "İletişim" yazıları hero fotoğrafının açık göğü üzerinde kalıyor. Krem renkli 14 px yazının kontrastı medyan 4,3–4,5:1, eşik 4,5:1. 1280 px'te "Hakkımızda" da 4,6:1 ile sınırda. Diğer sayfalarda header koyu zemin üzerinde. Çözüm görünümü değiştirir; onay bekliyor.
- **Klavye, 37/37:**
  - Menü: 375 px'te alt menü, 768 px'te header düğmesi, 1280 px'te satır içi menü.
  - SSS: Enter ve Boşluk soruyu açar; aynı anda tek soru açık kalır.
  - Galeri ve proje ışık kutusu: Enter açar, odak kutunun içine geçer, oklar fotoğraf değiştirir, Tab kutunun dışına çıkmaz. Esc kapatır ve odak açan öğeye döner.
  - İki form: boş gönderimde odak ilk hatalı alana gider. Form yalnızca klavyeyle doldurulup gönderilebiliyor. Testte dış istekler engellendiği için WhatsApp yedeği devreye girdi.
  - Çerez bandı: 3. Tab durağında, Enter ile kapanıyor.
- **Odak görünürlüğü:** 7 sayfada, 375 ve 1280 px'te bütün Tab durakları denendi (750 durak). Odak her durakta görünüyor; header'ın veya alt menünün altında kalan durak yok.
- **360 px:** 49 sayfada yatay kaydırma yok, ekran dışına taşan öğe yok.
- **Dokunma alanı (375 px, hedef 44 px, cümle içindeki metin linkleri hariç):**
  - Footer'daki kısa linkler (49 sayfa): "Galeri" 40 px, "SSS" 28 px, "Villa" 29 px genişlikte. Yükseklikleri 44 px.
  - KVKK onay kutusu (`/iletisim`, `/teklif-al` 3. adım): yaklaşık 24 px yükseklikte.
  - `/kvkk`'deki telefon ve e-posta linkleri 20–21 px, `/iletisim`'deki harita atıf linki 24 px yükseklikte.
  - `/villa/genis-verandali-ahsap-villa`'daki breadcrumb "Villa" linki 27 px genişlikte.
  - Hepsi WCAG 2.2 AA'nın 24 px sınırını karşılıyor, 44 px'in altında.
  - ✅ Düzeltildi (28 Ekim 2026), görünüm değişmeden: footer, breadcrumb, `/kvkk` linkleri, harita atfı (214707e); KVKK kutusu (7694b59); 1024 px ve üstünde header "SSS" linki (34 px, eee0f7c). İki yardımcı sınıf `global.css`'te: `dokunma-genislik` (konumsuz, inline-flex linkler) ve `dokunma-alani` (ortadan genişleyen katman). Doğrulama: 49 sayfa, 375 ve 1280 px, 44 px altında hedef yok, genişleyen alan komşu hedefe taşmıyor.
  - Açık: 768–1365 px'te sayfanın sonunda yüzen WhatsApp düğmesi footer'daki "Çerez Politikası" yazısının son 40–48 px'ini örtüyor (1366 px ve üstünde örtüşme yok). Görsel kusur; görünüm değişmeden düzeltilemiyor, karar bekliyor.
- **İfade taraması (28 Ekim 2026):** "onaylıyorum" ve "kabul ediyorum" sitede geçmiyor. "Açık rıza" iki yerde: `/kvkk` hukuki sebepler listesi ("açık rızanız (md. 5/1)") ve `/cerez-politikasi` §6 ("çerezler yerleştirilmeden önce açık rızanızı alırız"). Benzeri: `/kullanim-kosullari` "kabul etmiş sayılırsınız". Metinler değişmedi; iki ifade hukukçu listesinde.
- **Ünvan:** tek kaynak `src/data/site.ts` → `firma.unvan`. Görünen metinde `/kvkk` (giriş cümlesi, "Ticari unvan" satırı) ve `/kullanim-kosullari` (giriş, fikri mülkiyet), ikişer kez; JSON-LD `legalName` 49 sayfada. Yeni ünvan gelince tek satır değişir; `yasalGuncelleme` ve Y referansı güncellenir.

**Yayın öncesi kontroller (tek tur, gelistirme-2026 = acfb34f):**

| Kontrol | Sonuç |
| --- | --- |
| `check` | 0 hata, 0 uyarı, 0 ipucu (70 dosya) |
| `build` | 49 sayfa; sitemap 47 adres; csp-kontrol: 50 satır içi betik, 2 özet `vercel.json`'da |
| `check:images` | 4149 başvuru, 929 dosya, kırık görsel yok |
| `jsonld-kontrol` | 49 sayfa geçerli, görünen içerikle aynı |
| `form-kontrol` | 2 form, 30 alan envanterle aynı |
| `gorsel-kontrol` | 48/48 referansla aynı |
| `check:sss` | 96/96 senaryo (Chromium ve WebKit, 375 ve 1280 px) |

**Birleştirme planı:**

- **Fark:** `main` (f562a68) gelistirme-2026'nın atası. gelistirme-2026'da 23 commit önde, `main`'de ayrı commit yok. Birleştirme ileri sarmadır (fast-forward), çakışma olmaz.
- **Üretimi etkileyen değişiklikler:**
  - CSP zorunlu moda geçiyor; ilk kez üretimde zorunlu olacak.
  - Vercel derlemesi `engines` ayarı nedeniyle Node 22'ye geçiyor.
  - Türkçe font alt kümesi, header tıklama düzeltmesi, 404'te Teklif Al düğmesi, SEO şeması ve iletişim sayfasında çalışma saatleri.
  - Önizleme dağıtımı (7367860887) aynı ayarlarla derlendi ve CSP kontrolünden geçti. Ortam değişkeni kullanılmıyor.
- **Uyarı, bu bilgisayardaki çalışma kopyası:** f8fa96f, `arsiv/gorseller/` klasöründeki 148 dosyayı git takibinden çıkardı. Dosyalar diskte duruyor. Bu klasörde `git switch main` ve ardından `git merge` yapılırsa, ileri sarma bu 148 dosyayı **diskten siler**. Bu yüzden birleştirme `main`'e geçmeden, doğrudan push ile yapılır.
- **Yöntem:** önerilen yöntem yerelden ileri sarma push'udur. Böylece önizlemede denenen SHA, üretime çıkan SHA ile aynı olur. Kayıt için GitHub'da PR açılabilir, ama GitHub'daki "Merge" düğmesi kullanılmaz: "Create a merge commit" yeni bir SHA üretir, "Rebase" ve "Squash" commit'leri yeniden yazar. Push yapılınca GitHub, açık PR'ı kendiliğinden "merged" olarak işaretler.
  1. `git fetch origin`; `git status` temiz olmalı.
  2. `git merge-base --is-ancestor origin/main gelistirme-2026 && echo tamam`: ileri sarma mümkün mü?
  3. Geri dönüş etiketi: `git tag uretim-oncesi-2026 origin/main && git push origin uretim-oncesi-2026`.
  4. `git push origin gelistirme-2026:main`. İleri sarma değilse GitHub reddeder; `--force` kullanılmaz.
  5. `git fetch origin main:main`: yerel `main` dal adını, dala geçmeden günceller.
- **Üretim dağıtımının doğrulanması:**
  1. Vercel → Deployments: yeni SHA'nın "Production" dağıtımı "Ready" olmalı. Komut satırından: `gh api "repos/{owner}/{repo}/deployments?sha=<sha>&environment=Production"`, ardından `…/deployments/<id>/statuses` → `success`.
  2. `curl -sI https://ahsap-ev-sitesi.vercel.app/` yanıtında `content-security-policy` başlığı olmalı (`-report-only` değil).
  3. `/`, `/iletisim`, `/galeri` ve bir proje sayfasının HTML'i yerel `dist/` ile bayt bayt aynı olmalı: `curl -s <adres> | cmp - dist/…/index.html`.
  4. Tarayıcıda `/`, `/iletisim` ("Haritayı yükle"), `/galeri` (ışık kutusu), `/sss`, `/teklif-al`, `/404` açılır. Konsolda CSP hatası olmamalı.
  5. `/cardak` → 301 → `/kamelya`; `/a-frame` → `/ucgen-ev` (iki adım).
  6. İsteğe bağlı: `npm run check:sss -- --adres=https://ahsap-ev-sitesi.vercel.app`.
- **Geri alma:**
  1. Önce Vercel'de geri dönülür; git'e dokunulmaz. Vercel → Deployments → f562a68'in üretim dağıtımı (7307983020) → ⋯ → Instant Rollback. Birkaç saniye sürer. Hobby planında yalnızca bir önceki üretim dağıtımına dönülebilir.
  2. Rollback'ten sonra Vercel, yeni push'ları üretime kendiliğinden almaz. Düzeltme gelistirme-2026'da yapılıp yine `git push origin gelistirme-2026:main` ile gönderilir. Ardından Vercel'de yeni dağıtım "Promote to Production" ile ya da "Undo Rollback" ile üretime alınır.
  3. `main`'i zorla geri almak (`--force`) önerilmez. Aynı SHA'ya Vercel ikinci dağıtım açmayabilir; üretimi geri almanın yolu Instant Rollback'tir.

**Yayın günü sırası:** hafta içi, mesai saatinde başlanır. Ayrıntılar §8'de.

| # | Adım | Süre | Geri dönüş |
| --- | --- | --- | --- |
| 1 | Birleştirme: yukarıdaki 5 adım | 5 dk + Vercel derlemesi ~2 dk | Vercel Instant Rollback (f562a68) |
| 2 | Üretim kontrolü (`ahsap-ev-sitesi.vercel.app`): yukarıdaki 6 madde | 15–20 dk | Vercel Instant Rollback |
| 3 | DNS. Önce GoDaddy DNS kayıtlarının ekran görüntüsü alınır. Vercel → Domains'e `2kahsap.com` (ana adres) ve `www.2kahsap.com` (Redirect to 2kahsap.com, 308) eklenir. GoDaddy'de park sayfasının iki A kaydı (15.197.148.33, 3.33.130.190) ve varsa yönlendirme kaldırılır. Vercel'in gösterdiği A kaydı ve www CNAME'i girilir; www şu an `2kahsap.com`'a CNAME. MX (5 kayıt), SPF, `_dmarc` ve `google-site-verification` kayıtlarına dokunulmaz. | Giriş 10 dk; yayılma genellikle 10–30 dk (A kayıtlarının TTL'i 600 sn) | Eski A kayıtları ekran görüntüsünden geri girilir (~10 dk). Site bu sırada `vercel.app`'te açık kalır, e-posta etkilenmez. |
| 4 | SSL: DNS doğrulanınca Vercel sertifikayı kendiliğinden alır; CAA kaydı olmadığı için engel yok. Kontrol: Domains'te "Valid Configuration", `curl -sI https://2kahsap.com/` → 200. | 5–30 dk | Sertifika gelmezse DNS kayıtları Vercel'in gösterdiğiyle karşılaştırılır. Gerekirse 3. adımdaki geri dönüş uygulanır. |
| 5 | Yönlendirmeler: `ahsap-ev-sitesi.vercel.app` → Edit → Redirect to `2kahsap.com`. Kontrol: `https://www.2kahsap.com/iletisim` → 308 → `https://2kahsap.com/iletisim`; `http://2kahsap.com/` → HTTPS; `/iletisim/` ve `/iletisim/index.html` → `/iletisim`; `/cardak` → `/kamelya`. | 10–15 dk | Domains'te yönlendirme kaldırılır (anında). |
| 6 | Form testi: §8'deki 16 adım, telefonda ve bilgisayarda; her mesaja "TEST" yazılır. Web3Forms'ta alan adı kısıtlaması ancak bu adımdan sonra açılır. | 30–45 dk | Web3Forms çalışmazsa form ziyaretçiyi zaten WhatsApp'a yönlendirir. Panelde anahtar ve e-posta kontrol edilir; kısıtlama açıldıysa kapatılır. |
| 7 | Search Console: "Alan adı" mülkü, GoDaddy'ye yeni TXT kaydıyla doğrulanır (mevcut `google-site-verification` silinmez). `https://2kahsap.com/sitemap.xml` gönderilir, `/` için URL denetimi yapılır. Ardından Bing'e Search Console'dan içe aktarılır. Google İşletme Profili'nde web sitesi alanı `https://2kahsap.com` yapılır. | 15–20 dk; doğrulama dakikalar–birkaç saat | Geri alınacak bir şey yok; TXT kaydı zararsızdır. |

Toplam aktif süre yaklaşık 2–2,5 saat; DNS için 1 saat pay bırakılır.

Not: Site 2kahsap.com'da HTTPS ile açılınca HSTS başlığı (2 yıl) tarayıcılara gider. O andan sonra DNS'i park sayfasına geri almak, siteyi ziyaret etmiş kişilerde sertifika hatası verebilir. İlk birkaç saatten sonra sorun çıkarsa DNS'e değil, Vercel'deki önceki dağıtıma dönülür.
