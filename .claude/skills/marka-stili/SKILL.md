---
name: marka-stili
description: 2K AHŞAP marka tasarım kuralları — koyu tema renk paleti, tipografi, marka tonu, hareket kuralları, yasaklar ve her sayfada olması gereken bileşenler (hero, header, footer, mobile-first, SEO). 2K AHŞAP web sitesinde sayfa, bileşen, layout, CSS/stil, buton, animasyon, görsel yerleşimi veya arayüz metni oluştururken ya da düzenlerken mutlaka kullan.
---

# 2K AHŞAP — Marka Stili

Bu kurallar sitedeki her sayfa ve bileşen için geçerlidir. Bir tasarım kararı bu dosyayla çelişirse bu dosya geçerlidir.

**Site baştan sona koyu temadır.** Görsel referans: `.claude/referans/marka-mockup.jpg` (sol üstteki laptop ve telefon ekranı hedef görünümdür; kartvizit ve tabela aynı hissi verir): koyu antrasit yüzey, ahşap dokusu, sıcak ışık, ince çizgiler.

## 1. Marka Kişiliği

| İlke | Tasarımdaki karşılığı |
|---|---|
| **Doğal** | Gerçek ahşap dokusu ve sıcak ışıklı proje fotoğrafları öne çıkar. Koyu antrasit yüzeyler, krem ve ahşap tonları. Neon, parlak renk, gradyan yığını yok. |
| **Premium** | Koyu zemin, geniş boşluklar, büyük ve kaliteli görseller, ince çizgiler, sınırlı renk, özenli tipografi. Kalabalık değil, seçilmiş. |
| **Modern** | Temiz grid, net hiyerarşi, çizgi stili sade ikonlar, minimum süsleme. |
| **Güvenilir** | Gerçek projeler, somut rakamlar (2015'ten beri, 300+ proje), her yerden ulaşılabilen iletişim bilgileri, tutarlı arayüz. |

**Metin tonu:** Samimi ama profesyonel, "siz" hitabı, abartısız. "Türkiye'nin en iyisi" gibi iddialar yerine somut bilgi kullan ("300+ tamamlanmış proje").

## 2. Renk Paleti

### Marka renkleri

| Renk | Hex | CSS değişkeni | Kullanım |
|---|---|---|---|
| Gece | `#1E1E1E` | `--color-gece` | Ana sayfa zemini (antrasitin koyu tonu) |
| Antrasit | `#2E2E2E` | `--color-antrasit` | Bölümler arası ton farkı, alt sayfa header'ı, footer |
| Krem | `#EBDCC6` | `--color-krem` | Başlıklar, buton çerçevesi ve metni, odak halkası |
| Ahşap | `#A67C52` | `--color-ahsap` | İnce çizgi, ayraç, ikon, hover vurgusu; metinde yalnızca büyük boyut |
| Yeşil | `#2E7D32` | `--color-yesil` | Yalnızca aktif menü alt çizgisi ve küçük vurgular (logodaki pencere gibi) |
| Beyaz | `#FFFFFF` | `--color-beyaz` | En güçlü vurgu gereken başlık (ör. hero); isteğe bağlı |

### Koyu tema rolleri

Sayfa ve bileşenler marka renklerini değil, önce bu rol token'larını kullanır.

| Rol | Token | Değer | Kullanım |
|---|---|---|---|
| Sayfa zemini | `--color-zemin` | gece `#1E1E1E` | `body` ve varsayılan bölüm zemini |
| Ara bölüm zemini | `--color-zemin-ara` | antrasit `#2E2E2E` | Bölümleri ayırmak için dönüşümlü kullanılır |
| Ara bölüm zemini, yumuşak | `--color-zemin-ara-yumusak` | `#262625` (gece + krem %4) | Ana sayfanın ara bölümleri; gece ile ton farkı sezilir düzeyde (§8) |
| Kart yüzeyi | `--color-yuzey` | krem %4 saydam | Zeminden biraz açık: gece üstünde ≈ `#262625`, antrasit üstünde ≈ `#363534` |
| Başlık | `--color-baslik` | krem `#EBDCC6` | h1–h3, kart başlıkları |
| Gövde metni | `--color-metin` | `#C2B6A4` (krem %80 + gece) | Paragraflar, liste ve link metni |
| İkincil metin | `--color-metin-soluk` | `#AEA394` (krem %70 + gece) | Meta bilgi, telif, kısa açıklama |
| Ahşap tonlu küçük metin | `--color-ahsap-acik` | `#BB9975` (ahşap %70 + krem %30) | Küçük etiketler, ahşap tonlu link ve eylem metni |
| İnce çizgi | `--color-cizgi` | krem %14 saydam | Kart kenarı, ayraç, bölüm çizgisi (dekoratif) |
| Fotoğraf karartması | `--color-karartma` | gece %70 saydam | Fotoğraf üstündeki metnin altı |

- **Beyaz, krem veya açık zeminli bölüm yoktur.** Bölümler `#1E1E1E` ↔ `#2E2E2E` ton farkı ve ince çizgiyle ayrılır. Ana sayfada yalnızca ton farkıyla ayrılır, çizgi yoktur (§8).
- Saydam türevler yalnızca bu paletten türetilir ve `src/styles/global.css` içinde token olarak tanımlanır. Sayfa ve bileşenlerde sabit hex/rgba yazılmaz; yeni bir ton gerekirse önce token eklenir.
- **Dağılım:** ~%85 koyu zemin (gece + antrasit), ~%10 krem metin, ~%5 ahşap + yeşil vurgu. Yeşil çok az kullanılır; büyük yeşil alan veya yeşil buton yoktur.

```css
:root {
  --color-gece: #1E1E1E;
  --color-antrasit: #2E2E2E;
  --color-krem: #EBDCC6;
  --color-ahsap: #A67C52;
  --color-yesil: #2E7D32;
  --color-beyaz: #FFFFFF;

  --color-zemin: var(--color-gece);
  --color-zemin-ara: var(--color-antrasit);
  --color-yuzey: rgba(235, 220, 198, 0.04);
  --color-baslik: var(--color-krem);
  --color-metin: #C2B6A4;
  --color-metin-soluk: #AEA394;
  --color-ahsap-acik: #BB9975;
  --color-cizgi: rgba(235, 220, 198, 0.14);
  --color-karartma: rgba(30, 30, 30, 0.7);
}
```

### Kontrast kuralları (WCAG AA)

En kötü durum, antrasit bölümdeki kart yüzeyidir (≈ `#363534`).

| Metin | Gece `#1E1E1E` | Antrasit `#2E2E2E` | Kart (antrasit üstünde) | Karar |
|---|---|---|---|---|
| Beyaz | 16.7:1 | 13.6:1 | 12.2:1 | ✅ Her yerde |
| Krem (başlık) | 12.4:1 | 10.1:1 | 9.1:1 | ✅ Her yerde |
| Gövde metni `#C2B6A4` | 8.4:1 | 6.8:1 | 6.1:1 | ✅ Her yerde |
| İkincil metin `#AEA394` | 6.7:1 | 5.5:1 | 4.9:1 | ✅ Küçük metin dahil |
| Ahşap açık `#BB9975` | 6.3:1 | 5.1:1 | 4.6:1 | ✅ Küçük etiket ve link |
| Ahşap `#A67C52` | 4.47:1 | 3.6:1 | 3.3:1 | ⚠️ Yalnızca büyük metin (≥24px veya ≥19px kalın), ikon ve çizgi |
| Yeşil `#2E7D32` | 3.3:1 | 2.7:1 | 2.4:1 | ❌ Metin olarak asla; yalnızca çizgi/nokta gibi vurgu |

- Yeşil alt çizgi aktif sayfanın **tek** göstergesi olamaz: aktif link ayrıca daha parlak metin rengi (krem) ve `aria-current="page"` taşır.
- **Fotoğraf üstündeki metin:** metnin altındaki bölgede gece karartmasının etkin opaklığı en az %70 olur. Böylece fotoğrafın en açık pikselinde bile krem 4.5:1, beyaz 6.1:1 sağlanır. Fotoğraf üstünde yalnızca krem veya beyaz metin kullanılır; soluk tonlar kullanılmaz.

## 3. Tipografi

- **Başlıklar:** Poppins — 600 (SemiBold), 700 (Bold)
- **Metinler:** Inter — 400 (Regular), 500 (Medium), 600 (butonlar)

Fontlar sitenin kendi dosyalarıdır (14 Ekim 2026'dan beri); Google Fonts'a bağlantı eklenmez (ziyaretçinin IP adresi Google'a gitmez, sayfa daha hızlı açılır):

- Dosyalar `public/fonts/` içinde: Google Fonts'un verdiği woff2 dosyalarının aynısı, adında sürüm var (`inter-v20-latin.woff2`, `poppins-v24-600-latin.woff2` …). Sürüm değişmeden dosya değiştirilmez; `/fonts/` uzun süre önbellekte tutulur (`vercel.json`).
- `@font-face` kuralları `src/styles/fontlar.css` içinde (`font-display: swap`, alt kümeler `unicode-range` ile); `Layout.astro` içe aktarır ve `inter-v20-latin.woff2` dosyasını `preload` eder.
- Inter'in yedeği `'Inter Yedek'` (Arial) ve `'Inter Yedek Roboto'`: `size-adjust` ile "0" genişliği Inter'e eşitlenmiştir. Metin sütunları `ch` ile sınırlı olduğu için Inter geç gelse de sütun genişliği değişmez. Font değişirse bu ölçüler yeniden hesaplanır (yöntem dosyanın başında).

```css
:root {
  --font-baslik: 'Poppins', system-ui, sans-serif;
  --font-metin: 'Inter', 'Inter Yedek', 'Inter Yedek Roboto', system-ui, sans-serif;
}
```

| Öğe | Font | Boyut (mobil → masaüstü) | Ağırlık |
|---|---|---|---|
| H1 (hero) | Poppins | `clamp(2.5rem, 7vw, 5.5rem)`, harf aralığı -0.02em | 600 |
| H2 | Poppins | `clamp(1.75rem, 4vw, 3rem)`, harf aralığı -0.015em | 600 |
| H3 | Poppins | `clamp(1.25rem, 2.5vw, 1.5rem)` | 600 |
| Gövde | Inter | `1rem`, satır yüksekliği 1.6–1.7 | 400 |
| Küçük metin | Inter | `0.875rem` | 400 |
| Etiket (büyük harf) | Inter | `0.75rem`, harf aralığı 0.14em | 500 |
| Buton | Inter | `0.9375rem`, harf aralığı 0.02em | 600 |

- Lüks his süsten değil ölçekten gelir: başlıklar büyük ve sıkı, etiketler küçük ve geniş aralıklı, aralarında net boyut farkı.
- Başlıklar krem (`--color-baslik`), gövde metni `--color-metin`. Koyu zeminde açık metin daha kalın görünür; gövde metni 400 ağırlıkta kalır, kalınlaştırılmaz.
- Gövde metni 16px'in altına inmez; satır uzunluğu en fazla ~70 karakter (`max-width: 65ch`).
- `<html lang="tr">` zorunlu — `text-transform: uppercase` kullanıldığında "i → İ" dönüşümü doğru çalışsın.
- Türkçe karakterler (ç ğ ı İ ö ş ü) her başlık ve ağırlıkta kontrol edilir.
- Başlıklar asla italik değildir.
- Tamamen büyük harf yalnızca kısa etiketlerde (kart üstündeki kategori/konum, bölüm etiketi, bilgi şeridi, masaüstü menü), harf aralığı 0.14em. Etiket rengi `--color-ahsap-acik` veya `--color-metin-soluk`; saf ahşap (`#A67C52`) küçük etikette kullanılmaz.
- Bölüm etiketi (başlığın üstündeki küçük büyük harfli satır) sayfa başına en fazla 2 kez kullanılır ve başlığın hemen üstünde, aynı sütunda durur.

## 4. Logo

Sitede kullanılan dosyalar `public/logo/`, yalnızca kaynak olarak duranlar (açık zemin ve ikon SVG'leri, PNG kaynaklar; schema.org PNG'si hariç) `arsiv/logo/` klasöründe. Sadece bu dosyalar kullanılır; logo yeniden çizilmez, renkleri değiştirilmez, oranı bozulmaz.

| Dosya | Nerede kullanılır | Neden |
|---|---|---|
| `2k-ahsap-logo-koyu-zemin.svg` | **Sitenin tamamı:** header, footer ve diğer tüm koyu alanlar | "AHŞAP" yazısı krem; koyu zeminde okunur |
| `2k-ahsap-logo-acik-zemin.svg` | Yalnızca site dışı açık zeminli kullanımlar (baskı, belge) | "2" ve "AHŞAP" antrasit; koyu zeminde kaybolur |
| `2k-ahsap-ikon.svg` | Favicon kaynağı (bkz. **Favicon**) | Yazısız "2K" ev simgesi |

> **Format: SVG.** Sitede logo olarak SVG kullanılır.
> ✅ Üç SVG de mevcut. `2k-ahsap-logo-koyu-zemin.svg` (içindeki "2" krem) header ve footer'da plakasız kullanılır; `favicon.svg` ikon SVG'sinden üretildi.
> Aynı adlı `.png` dosyaları (~0.9 MB, 2240px) yalnızca kaynak olarak durur; sayfada kullanılmaz. İstisna: schema.org `logo` alanı açık zemin logosunun PNG'sini kullanır (Google logoyu beyaz zeminde ve raster olarak gösterir; bkz. `seo-kurallar`).

**Zemin kuralı**
- Site koyu olduğu için sayfalarda yalnızca koyu zemin logosu kullanılır; gece, antrasit veya karartılmış fotoğraf üzerinde durur. Açık zemin logosu site içinde kullanılmaz.
- Logo plakasız kullanılır: arkasına kutu, çerçeve veya renkli zemin konmaz.

**Kullanım**
- Logo ana sayfaya link verir: `<a href="/" aria-label="2K AHŞAP ana sayfa">`, görselde `alt="2K AHŞAP"`. Logo H1 değildir.
- Boyut (yükseklik): ana sayfada hero üzerinde belirgin büyük — mobilde 90px, masaüstünde 130–150px (140px). Diğer sayfalarda mobilde 64px, masaüstünde 72px. Sayfa kaydırılınca header sabit kalır ve logo 64px'e küçülür (bkz. §6). Footer'da 140–180px genişlik. Logo dikey yapıda olduğu için alt slogan ("DOĞALLIK • MİMARLIK • TASARIM") küçük boyutta okunmaz. Yatay (simge ve yazı yan yana) bir sürüm gelirse header'da o kullanılır.
- Etrafında, logo yüksekliğinin en az %25'i kadar boş alan bırakılır.
- Gölge, filtre, kontur, animasyon eklenmez; CSS ile renk değiştirilmez; esnetilmez (`width`/`height` orantılı, `object-fit: contain`). Sayfa geçişlerinde logo ve header yerinde sabit kalır (bkz. §6).

**Performans**
- SVG logo doğrudan kullanılır: `<img src="/logo/2k-ahsap-logo-koyu-zemin.svg" width="…" height="…" alt="2K AHŞAP">`. SVG'nin içinde base64 olarak gömülü büyük bir PNG olmadığı kontrol edilir; öyle bir dosya gerçek vektör değildir ve ağırdır.
- PNG logolar sayfaya konmaz (`public/` içindeki dosyalar Astro tarafından optimize edilmez).
- Header logosu `loading="eager"` ile yüklenir; layout kaymasını önlemek için `width` ve `height` belirtilir.

**Favicon** — dosyalar `public/` kökündedir ve ikondan üretilir. İkon kare olmadığı için (424×344) kare tuvale ortalanır.

| Dosya | Özellik | Durum |
|---|---|---|
| `favicon.ico` | 16, 32, 48px katmanlı, şeffaf zemin | ✅ Var (PNG ikondan üretildi) |
| `apple-touch-icon.png` | 180×180, krem (`#EBDCC6`) zemin, ~%10 iç boşluk (iOS şeffaf alanı siyah gösterir) | ✅ Var |
| `favicon.svg` | Vektör, kare `viewBox="90 -40 424 424"`; gri "2" ve ahşap "K" açık ve koyu sekme zemininde okunur | ✅ Var (`2k-ahsap-ikon.svg`'den üretildi) |

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

## 5. Görsel Dil

- Sadece 2K AHŞAP'ın gerçek proje fotoğrafları (`public/images/<kategori>/`). Görsel işleme ve optimizasyon için `gorsel-yonetimi` skill'ine bak.
- **Sıcak ışık:** Koyu temayla en iyi uyumu akşam/gece çekilmiş, içi ışıklı proje fotoğrafları verir; hero ve büyük görsellerde bunlar önceliklidir. Ahşap dokusu fotoğraflardan gelir; CSS veya görselle doku taklit edilmez.
- **Köşe:** yumuşak ama abartısız; değerler yalnızca token olarak kullanılır (`src/styles/global.css`), sayfada sabit px yazılmaz.
  - Kart ve kutu (proje/kategori kartı, teklif kutusu): **16px** (`--radius-kart`). Karta yaslı görsel ayrıca yuvarlatılmaz; kartın köşesine kırpılır (`overflow: hidden`).
  - Tek başına duran görsel (galeri kapağı, küçük görseller, ışık kutusu): **12px** (`--radius-gorsel`).
  - Buton, kategori linki, rozet ve küçük ikon butonları: tam yuvarlak (pill, `--radius-tam`). Yuvarlak öğeler (WhatsApp butonu) tam yuvarlak.
  - Tam genişlikteki hero fotoğrafı ve sayfa bölümleri köşesizdir.
- **Gölge:** kullanılmaz. Yüzeyler arası ayrım ince çizgiyle (`1px solid var(--color-cizgi)`) ve zemin tonu farkıyla verilir. İstisna: yüzen WhatsApp butonu.
- **Çizgiler:** 1px. Krem çizgi (`--color-cizgi`) yapıyı, ahşap çizgi (`--color-ahsap`) vurguyu taşır (ayraç, hover, ikon şeridi bölücüsü).
- **İkonlar:** tek set, çizgi (outline) stili, 1.5px kalınlık (Lucide). Dekoratif ikonlar ahşap, işlevsel ikonlar (menü, kapat) krem. Emoji ikon olarak kullanılmaz.
- **Boşluk:** 8px tabanlı ölçek (8, 16, 24, 32, 48, 64, 96, 128, 160). Bölüm boşlukları her yerde aynı değildir; ritim için değişir: mobilde 64–96px, masaüstünde 96–160px.

## 6. Hareket

Hareket sakin ve tek seferliktir; içeriği öne çıkarır, dikkat dağıtmaz. **Yalnızca `transform` ve `opacity` animasyonu yapılır** (`width`, `height`, `top`, `left`, `margin`, `box-shadow`, `filter`, renk geçişi animasyonu yok; renk değişimi gereken yerde ikinci bir katmanın `opacity`'si değiştirilir). Tek istisna SSS akordeonudur (aşağıdaki tablo).

| Hareket | Kural | Süre |
|---|---|---|
| Sayfa geçişi | Astro View Transitions (Astro 4: `astro:transitions` içindeki `<ViewTransitions />`) ile yumuşak geçiş. Header ve logo `transition:persist` ile yerinde sabit kalır. | Tarayıcı varsayılanı (~300ms) |
| Kaydırınca ortaya çıkma | Bölümler ve kartlar ekrana girerken `opacity: 0 → 1` ve `translateY(24px) → 0`, `--ease-ortaya` (`cubic-bezier(0.2, 0.7, 0.2, 1)`). IntersectionObserver ile, **tek seferlik** (`data-ortaya`, `src/scripts/hareket.ts`). Kartlarda 80ms kademeli gecikme. Yatay kaydırmalı şeritte kapsayıcıya `data-ortaya-grup` verilir: şerit ekrana girince ekran dışındaki kartlar dahil hepsi sırayla belirir. Sayfa açıldığında zaten görünen öğeler gizlenmez. Zıplama, büyüme, döndürme yok. | 700ms (`--sure-ortaya`) |
| Hero | Fotoğrafta çok yavaş yakınlaşma (`scale(1) → scale(1.06)`, tek yön). Birden fazla fotoğraf varsa 7 sn'de bir çapraz geçişli slayt ve altta ince ilerleme çizgisi; ok veya nokta yok. İlk fotoğraf hemen, diğerleri sayfa yüklendikten sonra yüklenir. Başlık, metin, butonlar ve ikon şeridi sırayla belirir. | Tek fotoğrafta 18 sn; slaytta 7 sn + 1.5 sn geçiş; metin 700ms |
| Parallax | Yalnızca hero fotoğrafında, kaydırma hızının %30'u (`data-parallax`, yalnızca transform). Yalnızca Lenis açıkken çalışır. | — |
| Yumuşak kaydırma | Lenis; yalnızca fare/trackpad'li cihazlarda (`hover: hover` ve `pointer: fine`). Mobilde ve `prefers-reduced-motion` açıkken kapalı. | Lenis varsayılanı |
| Header küçülmesi | Kaydırınca header sabit kalır; yalnızca transform ile küçülür (logo 64px), zemin tam opak antrasite döner (`--color-ust-kucuk`; arkadan geçen sayfa metni görünmez), altında ince çizgi. `backdrop-filter` kullanılmaz (kaydırmada takılma yapar). | 300ms (`--sure`) |
| Proje kartı hover | Görsel `scale(1.04)`, üstündeki karartma azalır (`opacity`), alt çizgi soldan sağa uzar (`scaleX(0 → 1)`, `transform-origin: left`). | 300–500ms |
| Fotoğraflı kart hover (ana sayfa kategori kartı) | Kart 6px yukarı kalkar, ahşap çerçeveli katman ve alttan sıcak iç ışık belirir (`opacity`), görsel `scale(1.06)`, ok 6px sağa kayar, açıklama %85'ten tam opaklığa çıkar. Gölge yok. Odakta da aynısı. | 400ms (`--sure-kart`) |
| Menü linki | Alt çizgi soldan sağa uzar (`scaleX`). | 200–300ms |
| Buton hover | Çerçeve ahşaba döner (ahşap çerçeveli katmanın `opacity`'si), ok 4px sağa kayar. | 200–300ms |
| SSS akordeonu (müşteri onaylı istisna, 15 Ekim 2026) | Sayfada tek cevap açık (`<details name="sss">`). Cevabın yüksekliği `::details-content` + `interpolate-size` ile açılır/kapanır; desteklemeyen tarayıcıda anında. Tıklanan soru ekrandaki yerinde kalır (yukarıdaki cevap kapanırken sayfa dengelenir). Ayrıntı `SssAkordeon.astro`. | Açılma 250ms (`--sure-akordeon`), kapanma 200ms |

- Eğri: kısa etkileşimlerde `--ease-out` (`cubic-bezier(0.22, 1, 0.36, 1)`), ortaya çıkmada `--ease-ortaya`.
- **JS kapalıyken içerik görünür:** başlangıçtaki gizli durum yalnızca JS'nin eklediği bir sınıf altında uygulanır (ör. `html.hareket .ortaya-cik { opacity: 0 }`); JS yoksa sınıf eklenmez, içerik doğrudan görünür.
- **`prefers-reduced-motion: reduce`:** tüm hareket kapanır ve içerik doğrudan görünür. Gizli başlangıç durumu da uygulanmaz (yalnızca süreyi kısaltmak yetmez). Ken Burns ve sayfa geçişi animasyonu çalışmaz.
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- **Yok:** hero dışında otomatik dönen slider/karusel, hero fotoğrafı dışında parallax, sürekli dönen veya zıplayan öğeler, scroll-jacking, aynı anda birden çok dikkat çeken hareket, her kaydırmada tekrarlanan animasyon.

## 7. Yapma ❌

- **Stok fotoğraf kullanma.** Unsplash, Pexels, Shutterstock ve yapay zekâyla üretilmiş "temsili" görseller dahil. Sadece müşteri projeleri. Uygun görsel yoksa açıkça işaretli bir placeholder koy ve not düş; stok görselle doldurma.
- **Açık zeminli bölüm yapma.** Beyaz, krem veya açık gri zemin yok; açık renge dönen header yok.
- **Dolu veya yeşil buton yapma.** Butonlar içi boş, krem çerçeveli pill'dir (bkz. §9).
- **Aşırı animasyon kullanma** (bkz. §6).
- Palet dışı renk ekleme (özellikle parlak mavi, mor, neon, yoğun gradyan). Tek izinli gradyan, fotoğraf üstündeki gece karartmasıdır; istisnası fotoğraflı kart hover'ında alttan gelen hafif ahşap iç ışıktır (`--color-ahsap-isik`, yalnızca hover/odakta).
- Ahşap veya yeşil rengi küçük metin rengi olarak kullanma (kontrast yetersiz; ahşap tonu gerekiyorsa `--color-ahsap-acik`).
- Gölge ile yüzey ayırma.
- Poppins ve Inter dışında font ekleme.

## 8. Olmalı ✅

### Hero section
- Ana sayfada tam ekran (`100svh`) gerçek proje fotoğrafı: tercihen akşam/gece çekilmiş ve içi ışıklı; yoksa sıcak renk düzeltmesi yapılmış, kadrajı temiz (kablo, klima, çit, dağınıklık yok) bir fotoğraf. Metin sola yaslı, ortalanmaz.
- **Karartma:** soldan sağa açılan gece gradyanı — metnin durduğu sol tarafta en koyu (etkin opaklık ≥ %70), sağa doğru azalır ve fotoğrafın ışıklı kısmı görünür kalır. Mobilde metin genişliği kapladığı için karartma metin bölgesinde en az %70 kalır.
- Tek `<h1>`: net değer önerisi. Altında 1–2 cümlelik açıklama ve güven unsuru ("2015'ten beri · 300+ proje").
- Butonlar: pill çerçeveli "Teklif Al" ve "Projeleri İncele" (bkz. §9). Yeşil veya dolu buton yok.
- Fotoğraf masaüstünde metin sütununun bittiği yerden başlar (en az %42) ve sola doğru zemine erir; başlık evin üstüne binmez. Hero'nun alt %25'i sayfa zeminine erir, sonraki bölüm aynı zemin renginden başlar. Ana sayfada sonraki bölümün (Ürünlerimiz) başlığı ve kartları tamamen bu gece zeminde durur. Kartların alt kenarından başlayan ara yumuşak tonda (`--color-zemin-ara-yumusak`) bir bant, kategori linklerini taşır ve bölümün sonuna kadar uzanır. Bandın kenarı kartların ortasından geçmez. Sınırda çizgi ve gradyan yoktur.
- **Ana sayfa bölüm geçişleri** (müşteri onaylı, 13 Ekim 2026; ayrıntı `docs/gecis-secenekleri/README.md`):
  - Tek boşluk ritmi: her bölümün üst ve alt iç boşluğu `--bolum-ritim`, mobilde 64px, ≥ 768px'te 96px. Hero → Ürünlerimiz aynı zeminde sürdüğü için ikon şeridinden bölüm etiketine 2 ritim.
  - Ara bölümler (Ürünlerimiz bandı, Neden Ahşap) antrasit yerine `--color-zemin-ara-yumusak` (`#262625`) kullanır.
  - Bölümleri yalnızca ton farkı ayırır; bölüm sınırlarında 1px çizgi ve gradyan yoktur.
- Altında, ince dikey çizgilerle ayrılmış **3 ikonlu bilgi şeridi**: "Doğal Malzeme" (yaprak), "Modern Tasarım" (ev), "Güvenilir Uygulama" (kalkan). Ahşap çizgi ikon + büyük harfli etiket; rakam kullanılmaz.
- Hero fotoğrafları `scripts/hero-gorseli.mjs` ile üretilir (kadraj, sıcak renk düzeltmesi, netlik; kaynak dosyaya dokunulmaz).
- Hero görseli LCP öğesidir: `loading="eager"`, `fetchpriority="high"`, WebP/AVIF, `srcset` ile boyutlandırılmış. Lazy-load yapılmaz.
- **Alt sayfa başlık bandı** (müşteri onaylı, 15 Ekim 2026; `docs/baslik-bandi/`): Breadcrumb, tek H1 ve giriş metni her alt sayfada tek ortak bileşenden gelir: `src/components/SayfaBasi.astro`. Sayfalar kendi bandını yazmaz. İki varyant:
  - **Fotoğraflı** (`foto` verilir): Projeler, Galeri, İletişim, SSS ve kategori sayfaları (kategorinin vitrin projesinin kapak fotoğrafı). Hakkımızda açılışının kısa hali: mobil 42svh, ≥ 768px 45svh, ≥ 1024px 50svh. Breadcrumb ve H1 fotoğrafın sol altında, giriş metni fotoğrafın altında düz gece zeminde (krem). Karartma Hakkımızda ve ana sayfa hero'suyla birebir aynıdır; yeni karartma icat edilmez, fotoğrafın üstünde sert kenarlı bant/blok olmaz. Fotoğraf yalnızca proje galerilerinde yayında olan, bitmiş, kadrajı temiz bir fotoğraftır (naylon, şantiye, dağınıklık yok); akşam/gece ışıklı olanlar önceliklidir. Telefonda yapı başlık bloğunun ve erimenin altında kalıyorsa (ör. Galeri) `foto.mobil` ile yalnızca ≤ 640px'te odak noktası etrafında sabit yakınlaştırılır; yapı ve ışıklı kısmı kutunun üstünde kalır.
  - **Sade** (`foto` verilmez): Teklif Al, proje detayı (altında büyük proje galerisi olduğu için fotoğraf tekrarlanmaz) ve yasal sayfalar. Fotoğrafsız gece zemin; antrasit header'dan ton farkıyla ayrılır, çizgi yoktur. Breadcrumb, altında kısa (64px) 1px ahşap ayraç ve büyük H1 (`clamp(2.25rem, 6vw, 4.5rem)`). ≥ 1024px'te başlık solda, giriş metni sağda, ikisi alta hizalı.
  - Giriş metnindeki tireli sözcükler ("e-postayla") satır sonunda tireden bölünmez (bileşen sözcüğü bölünmez span'e alır).
- **Hakkımızda istisnası** (müşteri onaylı, 15 Ekim 2026; `docs/hakkimizda/yeniden-tasarim/`, açılış `docs/hakkimizda/acilis-v3/`): Açılış tam genişlikte bir proje fotoğrafıdır (mobil 60svh, ≥ 768px 55svh, ≥ 1024px 70svh). Breadcrumb ve H1 fotoğrafın sol altında durur; karartma ana sayfa hero'sununkiyle birebir aynıdır (≥ 641px'te `--karartma-yatay` + alt %30'un zemine erimesi; telefonda alt %45'in erimesi + başlık bloğuna bağlı %70 rampa). Fotoğrafı yatayda kesen sert kenarlı bant kullanılmaz. Tanıtım metni fotoğrafın altında, düz gece zeminde durur. Header antrasit kalır.

### Header (her sayfada)
- Koyu: ana sayfada hero fotoğrafının üzerinde şeffaf; diğer sayfalarda antrasit zemin. Kaydırınca sabitlenen header da koyu kalır.
- Logo solda ve büyük (bkz. §4), menü linkleri sağda.
- Aktif sayfanın altında ince yeşil çizgi (2px) ve krem metin; diğer linkler `--color-metin`. Hover'da 1px ahşap alt çizgi soldan sağa uzar (bkz. §6).
- Ana sayfada şeffaf header'ın arkasında, menü metninin altında ≥ %70 olan ve aşağı doğru şeffaflaşan gece karartması bulunur (fotoğraf ne olursa olsun menü okunur).
- Mobilde hamburger menü; açılan panel koyu zeminlidir.

### Footer (her sayfada)
- Antrasit zemin, krem başlıklar, `--color-metin` metin, ahşap ikon vurguları; plakasız koyu zemin SVG logosu. Sade ve alçak tutulur.
- İçerik (yukarıdan aşağı):
  - İnce CTA bandı: "Projenizi birlikte konuşalım" + "Teklif Al" (dolu krem pill, `.dugme-dolu`) + "WhatsApp'tan Hemen Danışın" (çerçeveli pill, WhatsApp ikonlu)
  - 4 sütun (≥ 1024px; 640px'te 2 × 2, mobilde sıkı tek sütun): küçük logo (96px) + kısa tanım + sosyal ikonlar | Kurumsal (menü, SSS dahil) | Kategoriler (2 sütun) | İletişim: telefon (`tel:`, normal boyut), e-posta (`mailto:`), adres (Google Haritalar), WhatsApp
  - Alt şerit: "© {yıl} 2K AHŞAP" (yıl dinamik) | KVKK Aydınlatma Metni · Gizlilik Politikası · Çerez Politikası
- WhatsApp linkleri bulunulan sayfaya göre hazır mesajla açılır (`whatsappLinki()`, Layout'un `whatsappMesaj` prop'u).
- Telefon numarası büyük başlık olarak gösterilmez; diğer iletişim bilgileriyle aynı ölçektedir.
- İletişim bilgileri CLAUDE.md'deki şirket bilgileriyle birebir aynı olmalı (ad-adres-telefon tutarlılığı SEO için önemlidir).

### Mobile-first
- CSS önce mobil için yazılır; büyük ekranlar `min-width` medya sorgularıyla eklenir. `max-width` ile mobil yamalanmaz.
- Kırılım noktaları: 640px, 768px, 1024px, 1280px. İçerik genişliği en fazla 1280px.
- Dokunma hedefleri en az 44×44px, aralarında yeterli boşluk.
- Mobilde hamburger menü; telefon ve WhatsApp'a tek dokunuşla erişim (tek bir yüzen WhatsApp butonu veya sabit alt eylem çubuğu — ikisi birden değil).
- 320px genişlikte yatay kaydırma olmamalı. 320 / 768 / 1280 / 1440 / 1920px'te test et. Düzen kalıpları (konteyner, Grid, Flexbox) için `responsive-duzen` skill'ine bak.
- Görseller `srcset` + `sizes` ile; mobile gereğinden büyük görsel gönderilmez.

### SEO (tasarıma dokunan kısmı — ayrıntılar `seo-kurallar` skill'inde)
- Semantik HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Sayfa başına tek `<h1>`; başlık sırası atlanmaz (h1 → h2 → h3). Seviye yapıya göre seçilir, görünüm CSS ile ayarlanır.
- Her görselde anlamlı Türkçe `alt` metni (ör. "Ön verandalı iki katlı ahşap bungalov"). Dekoratif görsellerde `alt=""`.
- Her sayfada benzersiz `<title>` ve meta description; Open Graph görseli ana sayfada hero fotoğrafı, proje ve kategori sayfalarında gerçek proje fotoğrafı (kapak), diğer genel sayfalarda logolu varsayılan görsel (`seo-kurallar` §14).
- Açıklayıcı link metinleri ("buraya tıklayın" değil, "Bungalov projelerini inceleyin").
- Hız da SEO'dur: WebP/AVIF, hero dışındaki görsellerde lazy-load, `width`/`height` belirterek layout kaymasını (CLS) önle. Ortaya çıkma animasyonu yer kaplamayı değiştirmez (yalnızca `transform`/`opacity`), CLS üretmez.

## 9. Bileşen Hızlı Referansı

| Bileşen | Stil |
|---|---|
| Buton | Tam yuvarlak (pill), içi boş, 1px krem çerçeve, krem metin, sağında → ok ikonu; en az 48px yükseklik. Hover/odak: çerçeve ahşaba döner, ok 4px sağa kayar; basınca `scale: 0.98`. Dolu, yeşil veya gölgeli buton yok. Tek istisna: footer CTA bandındaki "Teklif Al" dolu krem pill (`.dugme-dolu`). |
| Metin linki | `--color-metin` veya krem, altı çizili; hover `--color-ahsap-acik` |
| Kart | `--color-yuzey` zemin, 1px `--color-cizgi` kenar, 16px köşe (`--radius-kart`), gölge yok. Görsel üstte; altında büyük harfli etiket (`--color-ahsap-acik`) · krem başlık · doluysa bilgi satırı. Görsel oranı ızgaradaki yerine göre değişebilir. Hover: bkz. §6. |
| Menü linki | `--color-metin`; hover ve aktifte krem. Aktifte 2px yeşil alt çizgi; hover'da 1px ahşap alt çizgi soldan sağa uzar |
| Fotoğraflı kart (ana sayfa kategori kartı) | Dikey 4:5, görsel tüm kartı kaplar; 16px köşe, 1px krem %8 çerçeve (`--color-cizgi-ince`), gölge yok. Sol üstte dekoratif `01`–`04` numarası (`--color-ahsap-acik`, büyük harf etiket ölçüsü, `aria-hidden`); altında hafif gece karartması (`--color-karartma-orta`). Metin alttaki karartmanın üzerinde: krem başlık, krem açıklama (%85 opak), ince ahşap çizgi, krem eylem ve ahşap ok. Karartma metin bloğuna bağlıdır: başlığın üstünde %70, açıklama ve eylemde %90 (`--color-karartma-yogun`). Vitrin fotoğrafları `scripts/vitrin-gorseli.mjs` ile aynı ışıkta üretilir (bkz. `gorsel-yonetimi`). Hover: bkz. §6. |
| Kategori linki | Pill, 1px `--color-cizgi` çerçeve, `--color-metin` metin, en az 44px yükseklik. Hover/odak: ahşap çerçeveli katman belirir, metin krem. |
| Ayraç | 1px `--color-cizgi`; vurgu gereken yerde 1px `--color-ahsap` |
| Bilgi şeridi | 3 sütun, aralarında 1px dikey ayraç; ahşap çizgi ikon + büyük harfli etiket |
| Odak halkası | `outline: 2px solid var(--color-krem)`, `outline-offset: 2px`. Asla kaldırılmaz. |

## 10. Teslim Öncesi Kontrol Listesi

- [ ] Yalnızca palet renkleri ve rol token'ları kullanıldı; sayfada sabit hex/rgba yok
- [ ] Açık (beyaz/krem) zeminli bölüm yok; bölümler ton farkı ve ince çizgiyle ayrıldı
- [ ] Başlıklar Poppins, metinler Inter
- [ ] Her yerde koyu zemin SVG logosu, plakasız; logo boyutu kurala uygun
- [ ] Favicon ve apple-touch-icon tanımlı
- [ ] Metin kontrastları AA'yı geçiyor (küçük metinde saf ahşap veya yeşil yok)
- [ ] Stok veya temsili görsel yok
- [ ] Butonlar pill, çerçeveli, içi boş; yeşil buton yok
- [ ] Hareketler yalnızca `transform`/`opacity`; `prefers-reduced-motion` ve JS kapalıyken içerik görünür; slayt yalnızca hero'da
- [ ] Hero: gerçek gece/akşam fotoğrafı, tek H1, metin bölgesinde ≥ %70 karartma
- [ ] Footer: iletişim, sosyal medya, telif; bilgiler CLAUDE.md ile aynı
- [ ] 320px'te yatay kaydırma yok, dokunma hedefleri ≥44px
- [ ] Tek H1, semantik etiketler, tüm görsellerde alt metni
- [ ] Türkçe yazım kontrol edildi
