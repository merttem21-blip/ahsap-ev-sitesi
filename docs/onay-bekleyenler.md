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
- **Form denemesi.** Yayından sonra teklif formundan bir deneme gönderilir; Teşekkürler sayfasının açıldığı ve mailin info@2kahsap.com'a geldiği kontrol edilir.

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
