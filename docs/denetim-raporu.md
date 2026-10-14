# Denetim raporu

- **Tarih:** 12 Ekim 2026
- **Sürüm:** `onayli-tasarim` etiketi (57268a2), `gelistirme-2026` dalı
- **Yöntem:** Kaynak kod incelendi. Derleme çıktısı (`dist/`, 48 sayfa) incelendi ve Playwright (Chromium) ile yerelde açıldı: üçüncü taraf istekler, çerezler ve yerel depolama ölçüldü. Canlı alan adı `curl` ile denetlendi.
- **Kapsam:** Bu rapor yalnızca durumu tespit eder. Hiçbir sayfa veya bileşen değiştirilmedi.

## Özet

| # | Konu | Durum | Dosya yolu |
|---|---|---|---|
| 1 | sitemap.xml | Var (adı farklı) | `astro.config.mjs` (@astrojs/sitemap), çıktı: `dist/sitemap-index.xml` ve `dist/sitemap-0.xml` |
| 2 | robots.txt | Var | `public/robots.txt` |
| 3 | JSON-LD | Var | `src/layouts/Layout.astro`, `src/components/Breadcrumb.astro`, `src/components/SssBolumu.astro`, `src/pages/sss.astro` |
| 4 | Canonical | Var | `src/components/SEO.astro` |
| 5 | Open Graph | Var | `src/components/SEO.astro` |
| 6 | 404 sayfası ve durum kodu | Yok (özel sayfa yok) | `src/pages/404.astro` yok |
| 7 | Form spam koruması | Kısmen | `src/components/form/FormOrtak.astro`, `src/scripts/form.ts`, `src/styles/form.css` |
| 8 | Üçüncü taraf betikler | Yok | Harici kaynak olarak yalnızca Google Fonts: `src/layouts/Layout.astro` (14 Ekim 2026'dan beri o da yok; fontlar yerel, rapor sonundaki bölüm) |
| 8 | Çerezler | Yok | Ölçümde hiçbir sayfada çerez oluşmadı |
| 9 | Görsel formatları (WebP) | Var | `public/images/`, `src/lib/gorsel.ts` |
| 9 | Lazy load | Var | `src/components/*.astro`, `src/pages/*.astro` |
| 10 | [ONAY: …] yer tutucuları | Var (12 farklı, sitede 16 kez görünüyor) | `src/pages/kvkk.astro`, `src/layouts/YasalLayout.astro` |
| 11 | Proje ve kategori verisi | Markdown + TypeScript (JSON yok) | `src/content/projeler/*.md`, `src/data/site.ts` |
| 12 | Build uyarıları | Yok | `astro build` |
| 12 | Lint | Yok (araç tanımlı değil) | `package.json` (lint script'i yok), `tsconfig.json` yok |

## Öne çıkan bulgular

1. **Canlı alan adı bu siteyi sunmuyor.** `https://2kahsap.com` şu an bir alan adı park sayfası gösteriyor. Sayfa JS ile `/lander` adresine yönlendiriyor. DNS kaydı 3.33.130.190 ve 15.197.148.33 adreslerine gidiyor, Vercel'e değil. Olmayan bir adres de `200` dönüyor. Sitedeki şu adreslerin hepsi `https://2kahsap.com` alan adını kullanıyor:
   - canonical
   - `og:url` ve `og:image`
   - sitemap
   - robots.txt'deki `Sitemap:` satırı
   - formun JS kapalıyken kullandığı `redirect` alanı (`https://2kahsap.com/tesekkurler`)

   Alan adı Vercel'e bağlanana kadar JS kapalı bir tarayıcıdan form gönderen kişi park sayfasına düşer. JS açıkken yönlendirme göreli (`/tesekkurler`) olduğu için bu sorun yok.
2. **28 proje detay sayfasının tamamı `noindex` ve sitemap'te yok.** `src/pages/[kategori]/[proje].astro` içindeki kural, açıklaması ve teknik şartnamesi olmayan sayfayı "zayıf içerik" sayıyor. 28 proje dosyasının hepsinde gövde metni ve şartname alanları boş. Bu yüzden arama motorlarına yalnızca ana sayfa, 9 kategori, galeri ve kurumsal/yasal sayfalar açık (19 adres). Proje sayfası, açıklama ya da şartname eklendiğinde kendiliğinden indekslenir.
3. **KVKK metni taslak.** Yasal sayfalarda 16 `[ONAY: …]` yer tutucusu ziyaretçiye görünüyor (madde 10).
4. **Bağımlılık güvenlik uyarıları.** `npm audit` 15 açık raporluyor: 1 kritik, 7 yüksek, 7 orta. Hepsi `astro@4.16.19` ve `sharp@0.33.5` zincirinden geliyor. Düzeltmek için astro 5'e ve sharp 0.35'e geçmek gerekiyor; ikisi de major sürüm değişikliği. Güvenli Mod kuralına göre bu ayrı ve planlı bir görev olmalı: tek major adım, ardından form-kontrol ve gorsel-kontrol.

## Ayrıntılar

### 1. sitemap.xml: Var (adı farklı)

- `@astrojs/sitemap` (3.2.1) `astro.config.mjs` içinde tanımlı. Derleme `sitemap-index.xml` ve `sitemap-0.xml` dosyalarını üretiyor. `/sitemap.xml` adında bir dosya yok; bu adres 404 döner. Arama motorları dizini robots.txt'deki satırdan buluyor.
- `noindex-tara` entegrasyonu (`astro.config.mjs`), `noindex` taşıyan sayfaları sitemap'ten çıkarıyor. Sitemap'teki adresler: ana sayfa, 9 kategori, `/projeler`, `/galeri`, `/hakkimizda`, `/sss`, `/iletisim`, `/teklif-al` ve 3 yasal sayfa (toplam 19).
- `<lastmod>` yok.

### 2. robots.txt: Var

`public/robots.txt` tüm tarayıcılara izin veriyor ve `Sitemap: https://2kahsap.com/sitemap-index.xml` satırını içeriyor.

### 3. JSON-LD: Var

| Şema | Kaynak | Sayfa |
|---|---|---|
| `HomeAndConstructionBusiness` (adres, telefon, kurucu, sosyal hesaplar) | `src/layouts/Layout.astro` | 48/48 |
| `BreadcrumbList` | `src/components/Breadcrumb.astro` | 46 (ana sayfa ve teşekkürler hariç) |
| `FAQPage` | `src/components/SssBolumu.astro`, `src/pages/sss.astro` | 11 |

- Proje sayfalarında yapıya özel bir şema yok (ör. `ImageGallery` veya `CreativeWork`).
- Breadcrumb ve SSS şemaları `src/lib/projeler.ts` içindeki `jsonLd()` ile `</script>` kaçışlı yazılıyor. İşletme şeması sabit veriden `JSON.stringify` ile yazılıyor.

### 4. Canonical: Var

`src/components/SEO.astro` 48/48 sayfada tek bir canonical yazıyor. Canonical sorgu parametresi içermiyor ve sonunda `/` yok (`trailingSlash: 'never'`). Örneğin `/teklif-al?proje=…` adresinin canonical'ı `/teklif-al`.

### 5. Open Graph: Var

- `src/components/SEO.astro` 48/48 sayfada şunları yazıyor: `og:type`, `og:locale`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` ve `twitter:card`.
- `og:image`, sayfanın gerçek proje fotoğrafı. Sayfaya özel görsel yoksa `src/data/site.ts` içindeki `varsayilanGorsel` kullanılıyor.
- `og:image:width`, `og:image:height` ve `og:image:alt` yok. Bunlar isteğe bağlı.

### 6. 404 davranışı ve durum kodu: Yok (özel sayfa yok)

- `src/pages/404.astro` olmadığı için `dist/404.html` üretilmiyor.
- Yerel statik sunucuda olmayan bir adres `404` dönüyor (`scripts/guvenli-mod/ortak.mjs`).
- Vercel'de `404.html` yoksa Vercel kendi varsayılan 404 sayfasını `404` koduyla gösterir. Bu sayfada marka, menü ve iletişim bağlantıları yoktur. seo-kurallar skill'i (§12) `src/pages/404.astro` oluşturulmasını öngörüyor.
- Canlı alan adında doğrulanamadı: alan adı şu an park sayfası gösteriyor ve olmayan adreslere `200` dönüyor (Öne çıkan bulgular, madde 1).

### 7. Form spam koruması: Kısmen

Var olanlar:

- **Honeypot:** `botcheck` onay kutusu (`FormOrtak.astro`, `.bal-kupu { display: none }` kuralı `src/styles/form.css` içinde). İşaretliyse JS hiçbir şey göndermez. Web3Forms da bu alanı denetler.
- **30 saniye bekleme:** İki gönderim arasında en az 30 sn bekleniyor (`src/scripts/form.ts`, localStorage). Bu yalnızca istemci tarafında çalışır; atlanabilir.
- **İstemci tarafı doğrulama:** ad, telefon, e-posta ve KVKK onayı.

Olmayanlar:

- CAPTCHA (hCaptcha, Cloudflare Turnstile vb.) yok.
- Sunucu tarafında oran sınırı yalnızca Web3Forms'un kendi korumasına bağlı.
- JS kapalıyken yalnızca honeypot çalışıyor.

Web3Forms erişim anahtarı herkese açık bir anahtar ve HTML'de görünüyor. Bu, Web3Forms'un normal kullanımı. Anahtarın yeri: `src/data/site.ts` (`web3formsAnahtari`). Form envanteri: `docs/guvenli-mod/form-envanteri.json`.

### 8. Üçüncü taraf betikler ve çerezler

Playwright ile 48 sayfanın hepsi 1280 px genişlikte açıldı ve sayfa sonuna kadar kaydırıldı.

| Kaynak | Ne zaman | Alan adı | Dosya |
|---|---|---|---|
| Google Fonts CSS (Inter, Poppins) | Her sayfada | `fonts.googleapis.com` | `src/layouts/Layout.astro` |
| Google Fonts dosyaları | Her sayfada | `fonts.gstatic.com` | `src/layouts/Layout.astro` |

> **14 Ekim 2026:** Google Fonts kaldırıldı; fontlar `public/fonts/` içinden yükleniyor (rapor sonundaki "Hız ve erişilebilirlik" bölümü). Sayfa yüklenirken dış alan adına istek gitmiyor.
| Google Haritalar iframe'i | Yalnızca `/iletisim` sayfasında "Haritayı göster" tıklanınca | `www.google.com`, `maps.googleapis.com`, `maps.gstatic.com` | `src/pages/iletisim.astro` |
| Web3Forms API | Yalnızca form gönderilince | `api.web3forms.com` | `src/scripts/form.ts` |

- **Harici `<script src>`:** Yok. Analitik, reklam veya izleme betiği yok. Lenis (yumuşak kaydırma) npm paketi olarak siteyle birlikte paketleniyor.
- **Çerez:** Hiçbir sayfada çerez oluşmadı. Harita yüklendikten sonra da ölçümde çerez görülmedi. Gerçek tarayıcılarda, üçüncü taraf çerez ayarına bağlı olarak Google alan adları harita açıldığında çerez bırakabilir.
- **Yerel depolama:** Yalnızca form başarıyla gönderildiğinde `localStorage` içine `2k-ahsap-son-gonderim` (son gönderim zamanı) yazılıyor.
- **Çerez politikasıyla uyum:** `src/pages/cerez-politikasi.astro` Google Fonts'u doğru anlatıyor. Sayfa içinde açılan Google Haritalar'ı ve localStorage kaydını ayrıca anmıyor; metin yalnızca dış bağlantılardan söz ediyor. Metni değiştirmek görünür bir değişiklik olduğu için onay gerektirir.
- **Gömülü haritadaki "Haritalar'da aç" (bilinen durum, 14 Ekim 2026):** Google'ın iframe içindeki kendi düğmesi telefonda (Android Chrome, önizleme) açılmıyor. Neden bizim kodumuz değil:
  - Iframe'de `sandbox` niteliği yok.
  - CSP yalnızca Report-Only. Hiçbir şeyi engellemez, açılan yeni sekmeye de uygulanmaz.
  - Düğme, `maps.google.com/maps?…&cid=8383073593410855210` adresine giden düz bir `target="_blank"` bağlantısı. Android taklidinde (masaüstü Chromium) açılıyor.

  Kod değiştirilmedi. Ziyaretçi işletme profilini haritanın üstündeki adres linkiyle açabilir (`firma.harita`, `maps.google.com/?cid=…`; telefonda doğrulandı). Kısa link (`maps.app.goo.gl`) Android Chrome'da `about:blank#blocked` açtığı için kullanılmıyor.

### 9. Görsel formatları ve lazy load: Var

`public/` dosyaları:

| Tür | Adet | Not |
|---|---|---|
| WebP | 1017 | Fotoğraflar |
| SVG | 4 | Logolar ve favicon |
| PNG | 4 | Logo PNG'leri ve `apple-touch-icon.png` |
| ICO | 1 | Favicon |
| JPEG | 1 | `public/images/ahsap-ev/hero-anasayfa.jpeg` (346 KB) |

JPEG dosyası hero'nun kaynak dosyası. Sayfalarda kullanılmıyor ama `public/` altında olduğu için yayına çıkıyor ve doğrudan adresle açılabiliyor. gorsel-yonetimi skill'ine göre orijinaller git dışındaki `ham-gorseller/` klasöründe durur.

Derleme çıktısındaki 832 `<img>`:

- **Format:** 707 WebP, 96 SVG (logo), 29 `src`'siz (ışık kutusu yer tutucuları; JS ile doluyor).
- **Yükleme:** `loading="lazy"` 715, `loading="eager"` 88 (ilk ekran), niteliksiz 29 (yalnızca ışık kutusu yer tutucuları). 48 sayfanın 40'ında ilk görselde `fetchpriority="high"` var.
- **Boyut ve alt metin:** `src`'si olan her görselde `width`, `height` ve `alt` var. Fotoğraflar 600, 1000 ve 1600 px `srcset` ile veriliyor (`src/lib/gorsel.ts`).

`npm run check:images` sonucu: 48 sayfa, 885 dosya. 1 sorun raporlanıyor: `/galeri → boş görsel adresi (img src)`. Bu, `src/pages/galeri.astro` içindeki ışık kutusu `<img>`'inin `src`'siz olması; kırık bir dosya değil.

> **Not:** Galerideki boş `src` konusu Prompt 8'de ele alınacak. O zamana kadar `check:images` bu sorunu her çalıştırmada raporlar; beklenen bir sonuçtur.

### 10. [ONAY: …] yer tutucuları: Var

Sitede ziyaretçiye görünüyorlar: `/kvkk` sayfasında 14, `/gizlilik` ve `/cerez-politikasi` sayfalarında 1'er kez.

| Yer tutucu | Dosya ve satır |
|---|---|
| `[ONAY: yürürlük tarihi]` | `src/layouts/YasalLayout.astro:24` (3 yasal sayfanın hepsinde) |
| `[ONAY: ticari unvan]` | `src/pages/kvkk.astro:15`, `:24` |
| `[ONAY: veri sorumlusu e-posta adresi]` | `src/pages/kvkk.astro:36`, `:164` |
| `[ONAY: KEP adresi, varsa]` | `src/pages/kvkk.astro:40` |
| `[ONAY: MERSİS numarası]` | `src/pages/kvkk.astro:44` |
| `[ONAY: vergi dairesi / vergi numarası]` | `src/pages/kvkk.astro:48` |
| `[ONAY: VERBİS kayıt durumu veya muafiyet bilgisi]` | `src/pages/kvkk.astro:52` |
| `[ONAY: ticari elektronik ileti gönderilecek mi?]` | `src/pages/kvkk.astro:84` |
| `[ONAY: iş ortağı türleri]` | `src/pages/kvkk.astro:118` |
| `[ONAY: e-posta hizmet sağlayıcısı]` | `src/pages/kvkk.astro:123` |
| `[ONAY: yurt dışı aktarım dayanağı, ör. standart sözleşme ve Kurul'a bildirim]` | `src/pages/kvkk.astro:126` |
| `[ONAY: kişisel veri saklama ve imha politikası]` | `src/pages/kvkk.astro:134` |

`src/pages/gizlilik.astro` dosyasının başındaki yorum metni "TASLAK" diyor. Sayfa gövdesinde yürürlük tarihi dışında yer tutucu yok.

### 11. Proje ve kategori verisinin kaynağı

- **Projeler:** `src/content/projeler/*.md` (28 dosya). Bunlar Astro içerik koleksiyonu; şema `src/content/config.ts` içinde. Frontmatter alanları: `baslik`, `kategori`, `kapak`, `konum`, `fotograflar[]` (`dosya`, `alt`) ve 12 teknik şartname alanı. Koleksiyon `src/lib/projeler.ts` içinde `getCollection('projeler')` ile okunuyor. Şu an 28 dosyanın hepsinde gövde metni, şartname alanları ve `konum` boş.
- **Kategoriler:** `src/data/site.ts` içindeki `kategoriler` dizisi. 9 kategori var: Ahşap Ev, Bungalov, Villa, Tiny House, A-Frame, Çardak, Otel-Bar, Çocuk Oyun Parkı, Özel Tasarım. Her birinin slug, h1, giriş, title, description ve vitrin projesi tanımlı. `CLAUDE.md` ise 8 kategori sayıyor ve sonuncusu "Diğer".
- **Fotoğraflar:** `public/images/<kategori>/<proje>/<dosya>-{600,1000,1600}.webp`. Yollar `src/lib/projeler.ts` (`fotoYolu`) ve `src/lib/gorsel.ts` içinde üretiliyor.
- **Diğer veriler:**
  - SSS: `src/data/sss.ts`
  - İller: `src/data/iller.ts`
  - İkonlar: `src/data/ikonlar.ts`
  - İletişim bilgileri ve menü: `src/data/site.ts`
- `CLAUDE.md` "JSON dosyalar" ve bir admin paneli öngörüyor. Projede JSON veri dosyası ya da `/admin` sayfası yok. `/referanslar` sayfası da yok.

### 12. Build ve lint uyarıları

**Build: uyarı yok.** `astro build` başarılı: 48 sayfa, yaklaşık 20 sn.

Oturumun ilk derlemesinde bir kez `X [ERROR] The build was canceled` satırı görüldü. Hemen öncesinde "Re-optimizing dependencies because vite config has changed" yazıyordu. Bu, Vite bağımlılıkları yeniden hazırlarken çıkan geçici bir mesaj: o derleme de başarıyla tamamlandı ve ikinci derlemede satır tekrarlanmadı.

**Lint: yapılandırılmış araç yok.**

- ESLint, Prettier veya `astro check` kurulu değil.
- `package.json` içinde `lint` script'i yok.
- `tsconfig.json` yok.

Bilgi almak için `astro check`, `package.json`'a yazılmadan geçici olarak çalıştırıldı ve ardından kaldırıldı. Kullanılan sürüm @astrojs/check 0.9.4 ve @astrojs/language-server 2.15.4; güncel 0.9.10 Node 20 ile çalışmıyor (`ERR_REQUIRE_ESM`). Sonuç: **11 hata, 16 ipucu.**

- **8 hata, `src/pages/[kategori]/[proje].astro`:** `Property 'data' does not exist on type 'never'`. Proje tipi çözülemiyor. Muhtemel neden `tsconfig.json` olmaması: içerik koleksiyonu tipleri (`.astro/types.d.ts`) denetime girmiyor. Derleme ve çalışma etkilenmiyor.
- **3 hata, `src/components/AltMenu.astro` (satır 24, 30, 36):** `aria-current` için `string` tipi `'page'` beklenen yere veriliyor. Bu yalnızca bir tip uyumsuzluğu; çıktı doğru.
- **İpuçları:**
  - örtük `any` parametreler (ts 7044)
  - kullanılmayan `Props` arayüzü: `AltMenu.astro`, `WhatsAppButton.astro`
  - `type` nitelikli `<script>`'lerin `is:inline` sayılması (astro 4000): `SssBolumu.astro`, `galeri.astro`, `sss.astro`. Bu bilinçli bir kullanım ve uyarının işlevsel etkisi yok.

**npm audit:** 15 açık. Ayrıntısı Öne çıkan bulgular, madde 4'te. Bu oturumda eklenen geliştirme paketleri (`playwright`, `pixelmatch`, `pngjs`, `node-html-parser`) yeni açık getirmedi.

---

# Hız ve erişilebilirlik (14 Ekim 2026)

- **Sürüm:** `gelistirme-2026`, b0cca36 üzerine bu bölümü ekleyen commit
- **Kapsam (harita kodları):** A1 hero, A2 Ürünlerimiz kartları, A5 ana sayfa SSS, D2 proje galerisi ve ışık kutusu, G3 galeri ızgarası, G4 galeri görüntüleyicisi, K3 kategori SSS, S2 SSS sayfası, O1 mobil menü paneli
- **Güvenli Mod:** Görünüm değişmedi. Kullanıcı onayıyla yalnızca iki yasal sayfadan Google Fonts maddeleri kaldırıldı (`docs/onay-bekleyenler.md` §6). Kontrast ve odak bulguları yalnızca listelendi, düzeltilmedi.

## Lighthouse (mobil): önce ve sonra

**Yöntem:** Lighthouse 12.8.2, varsayılan mobil ayar (Moto G Power benzetimi, yavaş 4G, 4 kat CPU yavaşlatma), Chrome 155 headless. `dist/` bu bilgisayarda gzip'li yerel sunucuyla yayınlandı. Önceki derleme (b0cca36) ile yeni derleme sırayla, dönüşümlü ölçüldü (önce, sonra, önce, sonra…); tabloda medyan var. Bu bilgisayarda tek koşular çok dalgalı olduğu için (aynı derleme bir koşuda TBT 0, diğerinde 4 sn) dönüşümlü ölçüm seçildi. Vercel'de (HTTP/2, brotli, CDN) sayılar farklı çıkar; karşılaştırma için anlamlı olan önce/sonra farkıdır.

| Sayfa | Performans | FCP | LCP | TBT | CLS | Speed Index | Erişilebilirlik | En iyi uygulamalar | SEO |
|---|---|---|---|---|---|---|---|---|---|
| Ana sayfa `/` | 85 → **90** | 2,98 → **1,84 sn** | 3,48 → **3,17 sn** | 0 → 0 ms | 0 → 0 | 3,21 → 4,12 sn | 100 → 100 | 100 → 100 | 100 → 100 |
| Kategori `/bungalov` | 81 → 76 | 2,95 → **1,90 sn** | 4,15 → 4,37 sn | 0 → 335 ms | 0,032 → **0** | 3,10 → 2,62 sn | 100 → 100 | 100 → 100 | 100 → 100 |
| Proje `/bungalov/asma-katli-verandali-bungalov` | 75 → 75 | 2,95 → **1,84 sn** | 5,19 → **4,23 sn** | 0 → 324 ms | 0,001 → 0 | 2,99 → 3,95 sn | 100 → 100 | 100 → 100 | 69 → 69 |
| Galeri `/galeri` | 87 → 89 ¹ | 3,14 → **2,06 sn** ² | 3,14 → 3,33 sn ² | 0 → 360 ms ¹ | 0,001 → 0 ² | 3,14 → 4,01 sn ² | 100 → 100 | 100 → 100 | 100 → 100 |
| Diğer sayfalar | ölçülmedi | | | | | | | | |

Koşular (önce / sonra): ana sayfa 85/86/85/85/85 → 92/90/90/90/90; kategori 75/81/41/81/81 → 78/73/76/76/82; proje 75/76/75/71/76 → 75/75/74/82/75; galeri 87/68/86/99 → 94/69/88/90.

1. Galeri ölçümü kullanıcı kararıyla 4 + 4 koşuda kesildi; medyan ortadaki iki koşunun ortalaması.
2. Bu koşularda FCP, LCP, CLS ve Speed Index kaydedilmedi. Değerler aynı gün ayrı yapılan 5'er koşuluk ölçümden (önce ve sonra ayrı ayrı, dönüşümlü değil).

**Değerlendirme:**

- **İlk boyama (FCP) dört sayfada da ~1,1 sn erken.** Önceden her sayfa, Google'a ayrı bağlantı kurulup font CSS'i inene kadar çizilmiyordu; bu engel kalktı. Lighthouse'un "render-blocking" önerisi 1,9–2,2 sn'den 0,8–1,0 sn'ye indi; kalan kısım sitenin kendi CSS dosyaları (`docs/onay-bekleyenler.md` §7).
- **LCP** ana sayfada 0,3 sn, proje sayfasında 1 sn iyileşti; kategori ve galeride ölçüm dalgalanması içinde.
- **Kategori sayfasındaki yerleşim kayması (CLS 0,032) kalktı.**
- **TBT neden arttı (muhtemel neden, kesinleştirilmedi):** Lighthouse yalnızca FCP'den sonraki uzun görevleri sayar. Sitenin ana betiğinde (`_astro/hoisted.*.js`) iki derlemede de ~600 ms'lik (4 kat yavaşlatılmış) bir uzun görev görüldü. Sayfa artık ~1 sn erken çizildiği için bu görev TBT'nin sayıldığı aralığa giriyor olmalı. Bu turda eklenen JS gzip'li ~0,6 KB; yüklemede yalnızca dinleyici kurup birkaç nitelik ekliyor. Kategori sayfasının performans puanındaki düşüş (81 → 76) büyük ölçüde bu sayımdan geliyor. Uzun görevin kaynağı (büyük olasılıkla kaydırınca ortaya çıkma kurulumundaki düzen ölçümleri, `src/scripts/hareket.ts`) sonraki işte incelenmeli.
- **TBT kaynağı (14 Ekim 2026, CPU profiliyle bulundu):** ilk yerleşim hesabı (kategori ~800–840 ms, proje ~690–760 ms, 4x CPU). Yüklemede yerleşimi ilk okuyan betik bu hesabı kendi içinde yaptırır ve süre ona yazılır. Klavye ve odak kodu yüklemede çalışmadığı için neden o değil. `ortayaCikma` ertelemesi (ilk boyamadan sonra, önce okuma sonra yazma) denendi, kazanç yok: yük header'ın küçülme kontrolüne (`window.scrollY`) geçti; değişiklik geri alındı. Header kontrolünü ertelemek denenmedi: sayfa kaydırılmış açılınca header bir kare büyük görünebilir. Sonraki iş: bu hesabın neden ağır olduğu incelenecek.
- **Speed Index** ana sayfada ve proje sayfasında ~1 sn kötüleşti, kategori sayfasında iyileşti; nedeni bu turda incelenmedi.
- Proje sayfasında SEO 69: sayfa bilinçli olarak `noindex` (açıklama ve şartname boş, denetim raporu madde 2).

## Yapılanlar

| Kod | Değişiklik | Dosya |
|---|---|---|
| Tüm sayfalar | Google Fonts kaldırıldı; Inter ve Poppins sitenin kendi dosyaları (aynı woff2 dosyaları, aynı ağırlıklar, aynı `unicode-range`, `font-display: swap`). Inter latin önceden yükleniyor (preload). Ziyaretçinin IP adresi Google'a gitmiyor; sayfalardan dış alan adına istek kalmadı. | `public/fonts/`, `src/styles/fontlar.css`, `src/layouts/Layout.astro`, `vercel.json` |
| Tüm sayfalar | Inter'in yedek fontu (Arial; Android'de Roboto), "0" genişliği Inter'inkine eşit olacak şekilde ölçeklendi. 65ch ile sınırlı metin sütunları Inter geç gelse de dar kalmıyor (aşağıda kanıt). | `src/styles/fontlar.css`, `src/styles/global.css` (`--font-metin`) |
| G3 | Galeri fotoğraflarının alt metni artık projenin verisinden geliyor (ör. "Asma katlı verandalı bungalov – shingle çatı ve dağ manzaralı veranda"). Önceden "Proje adı, Kategori – 3. görsel" biçimindeydi. | `src/pages/galeri.astro` |
| O1 | Panel açıkken sayfa içeriği, footer ve yüzen buton `inert`; Tab header ile mobil alt menü arasında döner. Aşağı/Yukarı, Home ve End ile menü bağlantıları arasında gezilir. Esc paneli kapatır, odak açan düğmeye döner. Alt menüdeki "Menü" klavyeyle açılınca odak ilk bağlantıya geçer. Önceden geçmiyordu: odak, panelin `visibility` geçişi sürerken veriliyordu. Dokunma ve farede odak eskisi gibi düğmede kalır. | `src/components/Header.astro`, `src/scripts/odak.ts` |
| A5, K3, S2 | SSS sorularında Aşağı/Yukarı, Home ve End ile gezinme. Akordeon doğal `<details>/<summary>` olduğu için açık/kapalı durumunu tarayıcı zaten bildiriyor; ek ARIA niteliği gerekmedi. | `src/components/SssAkordeon.astro` |
| D2, G4 | Fotoğraf bağlantıları "iletişim kutusu açar" diye okunuyor (`aria-haspopup="dialog"`, yalnızca JS varken). Tab ışık kutusunun içinde döner. Sağ/Sol ok önceden de vardı; Home ve End ilk ve son fotoğrafa gider. Fotoğraf değişince sırası ve açıklaması görünmeyen bir durum alanından okunur ("Fotoğraf 3 / 12: …"). Esc ile kapanma ve odağın açan öğeye dönmesi `<dialog>` ile zaten çalışıyordu; test edildi. | `src/components/Galeri.astro`, `src/pages/galeri.astro` |
| A1, A2, D2, G3, K | Görseller zaten WebP, `srcset`/`sizes` ve `width`/`height` ile veriliyordu. İlk ekran görseli (A1 hero, D2 kapak, kategoride ve galeride ilk görsel) `eager` + `fetchpriority="high"`, diğerleri `lazy`. Değişiklik gerekmedi (aşağıdaki notlar). | — |

Klavye davranışı Playwright ile denendi: O1 375 ve 768 px'te, SSS üç sayfada, D2, G4 375 ve 1280 px'te. Odak 40 Tab boyunca menüde, 10 Tab boyunca ışık kutusunda kaldı. Esc'ten sonra odak açan öğeye döndü. Fareyle aç/kapa değişmedi. Konsol hatası yok.

## Fontlar ve 65ch sütunları: kanıt

Sorun (`docs/guvenli-mod/README.md`, Bilinen sınırlar): stil Inter yüklenmeden hesaplanırsa `ch` yedek fontla belirleniyor ve Chromium bunu her zaman güncellemiyor; sütun dar kalıyordu (ör. hakkımızda 1280 px'te 715 yerine 585 px).

Çözüm: yedek fontun "0" genişliği Inter'inkine eşitlendi (Arial 400 için `size-adjust: 113.4328%`; 500, 600 ve Roboto için ayrı değerler, `src/styles/fontlar.css`). Böylece `ch` Inter gelmeden önce de sonra da aynıdır; değer bayat kalsa bile görünür bir fark doğmaz. Inter latin ayrıca önceden yükleniyor.

| Deneme | Önceki derleme (Google Fonts) | Yeni derleme (yerel font) |
|---|---|---|
| Fontlar hiç gelmez. ch ile sınırlı her sütunun `max-width`'i fontlu ölçümle karşılaştırıldı (12 sayfa × 375/768/1280 px, 228 sütun). | 228 / 228 sütun dar (ör. 650 → 585 px, 715 → 650 px) | 0 / 228 fark |
| Fontlar yapay olarak 0,5 / 1,5 / 3 sn geciktirildi. Sayfa oturunca sütunlar ölçüldü, stil zorla yeniden hesaplatılıp yeniden ölçüldü (fark = bayat ch). | 165 açılışın 8'inde bayat sütun (hakkımızda 1280 px: 6/60, galeri 768 px: 2/60, diğer 3 sayfa: 0/45). Örnek: `p.giris` 585 → 715 px, sayfa boyu 1856 → 1825 px. | 165 açılışın 0'ında |

- Geciktirme Playwright `route` ile yapıldı: önceki derlemede `fonts.gstatic.com`, yenisinde `/fonts/*.woff2` istekleri bekletildi (önceden yüklenen dosya dahil).
- Ölçümler bu bilgisayarda Chromium ile yapıldı (Windows, Arial yüklü). Roboto yedeği (Android) aynı yöntemle hesaplandı ama gerçek bir Android cihazda denenmedi.
- gorsel-kontrol: fontlar yerele alındıktan sonra 45/45 çekim %0 fark.

## Kontrast (yalnızca tespit, düzeltilmedi)

**Yöntem:**

- axe-core 4.14 (WCAG 2.2 A/AA): 13 sayfa × 375/1280 px; ayrıca SSS'ler açık, mobil menü açık, D2 ışık kutusu ve G4 görüntüleyici açık (toplam 37 durum). Hiç ihlal yok.
- axe'in "elle incelenmeli" dediği metinler (fotoğraf, karartma ya da sözde öğe üzerindekiler) piksel ölçümüyle denetlendi. Metinler saydam yapılıp gerçek arka plan çekildi; her metnin rengi bu piksellere karşı ölçüldü ve metin kutusundaki en kötü %5'lik piksel esas alındı. Kapsam: 12 sayfa × 375/1280 px, ana sayfa ayrıca 1024/1440/1920 px, mobil menü, alt menü, yüzen düğme ve iki ışık kutusu.

| # | Yer | Genişlik | Ölçülen (en kötü %5 / ortanca) | Gereken | Not |
|---|---|---|---|---|---|
| 1 | Ana sayfa header menüsü, sayfa en üstteyken (şeffaf header, hero fotoğrafının üzerinde): "Hakkımızda", "SSS", "İletişim" | 1024, 1280, 1440, 1920 px | 4,03–4,44 / 4,30–4,58 | 4,5:1 (14 px) | Renk `--color-metin` (#C2B6A4). Gökyüzünün açık bölgesine denk gelen bağlantılar. Aktif "Ana Sayfa" (krem), "Projeler" ve "Galeri" geçiyor. Kaydırınca header zemini opak olduğu için sorun kalmıyor. Olası çözüm (görünür değişiklik, onay gerekir): şeffaf header'da menü metnini krem yapmak ya da karartmayı artırmak. |
| 2 | A2 Ürünlerimiz kartlarındaki sıra numaraları ("01"–"04", `.urun-no`) | 1024 ve 1920 px | 2,68–4,18 / 2,96–4,46 | 4,5:1 (12 px) | Numara `aria-hidden` ve süs amaçlı; WCAG 1.4.3'ün salt süsleme istisnasına girebilir. Fotoğrafın açık köşesine denk geldiğinde zayıflıyor. |

Diğer tüm metinler eşiği geçti: hero başlığı, açıklaması ve düğmeleri, kart metinleri, galeri bilgi şeridi, ışık kutuları, menü paneli, alt menü.

## Odak göstergesi (yalnızca tespit, düzeltilmedi)

**Yöntem:** 13 sayfa × 375/1280 px'te Tab ile 1141 odak durağı gezildi. Her durakta öğenin çevresi odaklıyken ve odak kaldırılınca çekildi, iki görüntü karşılaştırıldı. Göstergesi olmayan öğe bulunmadı. Şüpheli çıkan 21 durak elle incelendi: teklif formundaki seçim kartlarının halkası kartın kenarına çizildiği için ölçüm alanının dışında kalmıştı; "İçeriğe geç" bağlantısı odaklanınca görünüyor.

| # | Bulgu | Nerede | Not |
|---|---|---|---|
| 1 | Sağ alttaki yüzen WhatsApp düğmesi, Tab ile ekranın en altına gelen öğenin sağ ucunu örtebiliyor; odak halkasının alt kenarı ekranın dışında kalabiliyor. | ≥ 768 px. Örnekler (1280 px): `/sss` "Ahşap ev için ödeme planı nasıl olur?", `/iletisim` "teklif formunu doldurun", `/cerez-politikasi` "Gizlilik Politikası" | ≥ 768 px'te `scroll-padding-bottom` 0. Öğe kısmen görünür kaldığı için WCAG 2.4.11 (AA) sağlanıyor, 2.4.12 (AAA) sağlanmıyor. Olası çözüm: ≥ 768 px'te yüzen düğme kadar `scroll-padding-bottom`. |

## Görseller: notlar

- Fotoğrafların tamamı WebP ve üç genişlikte (600/1000/1600) `srcset` ile veriliyor; `sizes` görüntülenen genişliği anlatıyor; her görselde `width`/`height` var.
- **AVIF eklenmedi.** Her fotoğraf için yeni dosya üretmek gerekir; farklı sıkıştırma her fotoğrafın piksellerini değiştirir ve gorsel-kontrol farkı %0'ın üstüne çıkar. Orijinaller (`ham-gorseller/`) bu bilgisayarda yok; AVIF ancak WebP'den yeniden kodlanabilirdi (kayıplıdan kayıplıya).
- **Kalan Lighthouse önerisi (uses-responsive-images):** Lighthouse'un mobil ekranı 412 px genişliğinde ve 1,75 piksel yoğunluğunda. Telefonda ~380 px genişliğindeki kart ve kapak için ~665 px'lik dosya gerekiyor; 600 px yetmediği için 1000 px'lik dosya iniyor. Ara bir genişlik (ör. 800 px) bunu küçültür, ama yukarıdaki nedenle yeni dosya üretmeyi gerektirir ve test genişliklerinde seçilen dosyayı değiştirir (D 768 px). Sonraki iş olarak bırakıldı.
- Sayfa çizilmeden önce beklenen CSS dosyaları (render-blocking) kalan en büyük öneri; CSS'i sayfaya gömmek kullanıcı kararıyla sonraki işe bırakıldı (`docs/onay-bekleyenler.md` §7).
