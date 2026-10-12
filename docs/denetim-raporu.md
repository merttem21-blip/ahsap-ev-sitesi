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
| 8 | Üçüncü taraf betikler | Yok | Harici kaynak olarak yalnızca Google Fonts: `src/layouts/Layout.astro` |
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
| Google Haritalar iframe'i | Yalnızca `/iletisim` sayfasında "Haritayı göster" tıklanınca | `www.google.com`, `maps.googleapis.com`, `maps.gstatic.com` | `src/pages/iletisim.astro` |
| Web3Forms API | Yalnızca form gönderilince | `api.web3forms.com` | `src/scripts/form.ts` |

- **Harici `<script src>`:** Yok. Analitik, reklam veya izleme betiği yok. Lenis (yumuşak kaydırma) npm paketi olarak siteyle birlikte paketleniyor.
- **Çerez:** Hiçbir sayfada çerez oluşmadı. Harita yüklendikten sonra da ölçümde çerez görülmedi. Gerçek tarayıcılarda, üçüncü taraf çerez ayarına bağlı olarak Google alan adları harita açıldığında çerez bırakabilir.
- **Yerel depolama:** Yalnızca form başarıyla gönderildiğinde `localStorage` içine `2k-ahsap-son-gonderim` (son gönderim zamanı) yazılıyor.
- **Çerez politikasıyla uyum:** `src/pages/cerez-politikasi.astro` Google Fonts'u doğru anlatıyor. Sayfa içinde açılan Google Haritalar'ı ve localStorage kaydını ayrıca anmıyor; metin yalnızca dış bağlantılardan söz ediyor. Metni değiştirmek görünür bir değişiklik olduğu için onay gerektirir.

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
