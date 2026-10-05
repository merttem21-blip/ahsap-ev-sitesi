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
| Kart yüzeyi | `--color-yuzey` | krem %4 saydam | Zeminden biraz açık: gece üstünde ≈ `#262625`, antrasit üstünde ≈ `#363534` |
| Başlık | `--color-baslik` | krem `#EBDCC6` | h1–h3, kart başlıkları |
| Gövde metni | `--color-metin` | `#C2B6A4` (krem %80 + gece) | Paragraflar, liste ve link metni |
| İkincil metin | `--color-metin-soluk` | `#AEA394` (krem %70 + gece) | Meta bilgi, telif, kısa açıklama |
| Ahşap tonlu küçük metin | `--color-ahsap-acik` | `#BB9975` (ahşap %70 + krem %30) | Küçük etiketler, ahşap tonlu link ve eylem metni |
| İnce çizgi | `--color-cizgi` | krem %14 saydam | Kart kenarı, ayraç, bölüm çizgisi (dekoratif) |
| Fotoğraf karartması | `--color-karartma` | gece %70 saydam | Fotoğraf üstündeki metnin altı |

- **Beyaz, krem veya açık zeminli bölüm yoktur.** Bölümler `#1E1E1E` ↔ `#2E2E2E` ton farkı ve ince çizgiyle ayrılır.
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

Astro layout `<head>` içinde yükle (alternatif: `@fontsource/poppins` + `@fontsource/inter` ile self-host — harici istek olmaz, daha hızlı):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --font-baslik: 'Poppins', system-ui, sans-serif;
  --font-metin: 'Inter', system-ui, sans-serif;
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

Dosyalar `public/logo/` klasöründe. Sadece bu dosyalar kullanılır; logo yeniden çizilmez, renkleri değiştirilmez, oranı bozulmaz.

| Dosya | Nerede kullanılır | Neden |
|---|---|---|
| `2k-ahsap-logo-koyu-zemin.svg` | **Sitenin tamamı:** header, footer ve diğer tüm koyu alanlar | "AHŞAP" yazısı krem; koyu zeminde okunur |
| `2k-ahsap-logo-acik-zemin.svg` | Yalnızca site dışı açık zeminli kullanımlar (baskı, belge) | "2" ve "AHŞAP" antrasit; koyu zeminde kaybolur |
| `2k-ahsap-ikon.svg` | Favicon kaynağı (bkz. **Favicon**) | Yazısız "2K" ev simgesi |

> **Format: SVG.** Sitede logo olarak SVG kullanılır.
> ✅ `2k-ahsap-logo-koyu-zemin.svg` mevcut (içindeki "2" krem; koyu zeminde okunur) ve header ile footer'da plakasız kullanılır.
> ⚠️ `2k-ahsap-logo-acik-zemin.svg` ve `2k-ahsap-ikon.svg` henüz yok; eklenene kadar PNG'lerin küçültülmüş sürümü geçici olarak kullanılır (bkz. **Performans**). schema.org `logo` alanında açık zemin logosunun PNG sürümü kalır.

**Zemin kuralı**
- Site koyu olduğu için sayfalarda yalnızca koyu zemin logosu kullanılır; gece, antrasit veya karartılmış fotoğraf üzerinde durur. Açık zemin logosu site içinde kullanılmaz.
- Logo plakasız kullanılır: arkasına kutu, çerçeve veya renkli zemin konmaz.

**Kullanım**
- Logo ana sayfaya link verir: `<a href="/" aria-label="2K AHŞAP ana sayfa">`, görselde `alt="2K AHŞAP"`. Logo H1 değildir.
- Boyut (yükseklik): ana sayfada hero üzerinde belirgin büyük — mobilde ~72px, masaüstünde ~100px. Diğer sayfalarda mobilde 48–56px, masaüstünde 64–72px. Footer'da 140–180px genişlik. Logo dikey yapıda olduğu için alt slogan ("DOĞALLIK • MİMARLIK • TASARIM") küçük boyutta okunmaz. Yatay (simge ve yazı yan yana) bir sürüm gelirse header'da o kullanılır.
- Etrafında, logo yüksekliğinin en az %25'i kadar boş alan bırakılır.
- Gölge, filtre, kontur, animasyon eklenmez; CSS ile renk değiştirilmez; esnetilmez (`width`/`height` orantılı, `object-fit: contain`). Sayfa geçişlerinde logo ve header yerinde sabit kalır (bkz. §6).

**Performans**
- SVG logo doğrudan kullanılır: `<img src="/logo/2k-ahsap-logo-koyu-zemin.svg" width="…" height="…" alt="2K AHŞAP">`. SVG'nin içinde base64 olarak gömülü büyük bir PNG olmadığı kontrol edilir; öyle bir dosya gerçek vektör değildir ve ağırdır.
- Geçici PNG'ler ~0.9 MB ve 2240px genişlikte; sayfaya **olduğu gibi konmaz** (`public/` içindeki dosyalar Astro tarafından optimize edilmez). Görüntülenme boyutunun 2 katına küçültülmüş WebP sürümleri kullanılır.
- Header logosu `loading="eager"` ile yüklenir; layout kaymasını önlemek için `width` ve `height` belirtilir.

**Favicon** — dosyalar `public/` kökündedir ve ikondan üretilir. İkon kare olmadığı için (1696×1376) kare tuvale ortalanır.

| Dosya | Özellik | Durum |
|---|---|---|
| `favicon.ico` | 16, 32, 48px katmanlı, şeffaf zemin | ✅ Var (PNG ikondan üretildi) |
| `apple-touch-icon.png` | 180×180, krem (`#EBDCC6`) zemin, ~%10 iç boşluk (iOS şeffaf alanı siyah gösterir) | ✅ Var |
| `favicon.svg` | Vektör, kare `viewBox` | ⏳ `2k-ahsap-ikon.svg` gelince üretilecek |

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<!-- favicon.svg eklenince açılacak: -->
<!-- <link rel="icon" href="/favicon.svg" type="image/svg+xml"> -->
```

## 5. Görsel Dil

- Sadece 2K AHŞAP'ın gerçek proje fotoğrafları (`public/images/<kategori>/`). Görsel işleme ve optimizasyon için `gorsel-yonetimi` skill'ine bak.
- **Sıcak ışık:** Koyu temayla en iyi uyumu akşam/gece çekilmiş, içi ışıklı proje fotoğrafları verir; hero ve büyük görsellerde bunlar önceliklidir. Ahşap dokusu fotoğraflardan gelir; CSS veya görselle doku taklit edilmez.
- **Köşe:** butonlar tam yuvarlak (pill, `--radius-tam`); kartlar ve görseller 4px (`--radius`); yuvarlak öğeler (WhatsApp butonu) tam yuvarlak.
- **Gölge:** kullanılmaz. Yüzeyler arası ayrım ince çizgiyle (`1px solid var(--color-cizgi)`) ve zemin tonu farkıyla verilir. İstisna: yüzen WhatsApp butonu.
- **Çizgiler:** 1px. Krem çizgi (`--color-cizgi`) yapıyı, ahşap çizgi (`--color-ahsap`) vurguyu taşır (ayraç, hover, ikon şeridi bölücüsü).
- **İkonlar:** tek set, çizgi (outline) stili, 1.5px kalınlık (Lucide). Dekoratif ikonlar ahşap, işlevsel ikonlar (menü, kapat) krem. Emoji ikon olarak kullanılmaz.
- **Boşluk:** 8px tabanlı ölçek (8, 16, 24, 32, 48, 64, 96, 128, 160). Bölüm boşlukları her yerde aynı değildir; ritim için değişir: mobilde 64–96px, masaüstünde 96–160px.

## 6. Hareket

Hareket sakin ve tek seferliktir; içeriği öne çıkarır, dikkat dağıtmaz. **Yalnızca `transform` ve `opacity` animasyonu yapılır** (`width`, `height`, `top`, `left`, `margin`, `box-shadow`, `filter`, renk geçişi animasyonu yok; renk değişimi gereken yerde ikinci bir katmanın `opacity`'si değiştirilir).

| Hareket | Kural | Süre |
|---|---|---|
| Sayfa geçişi | Astro View Transitions (Astro 4: `astro:transitions` içindeki `<ViewTransitions />`) ile yumuşak geçiş. Header ve logo `transition:persist` ile yerinde sabit kalır. | Tarayıcı varsayılanı (~300ms) |
| Kaydırınca ortaya çıkma | Bölümler ve kartlar ekrana girerken `opacity: 0 → 1` ve `translateY(24px) → 0`. IntersectionObserver ile, **tek seferlik**. Kartlarda kademeli gecikme (~80ms aralık, en fazla ~400ms). | 400–600ms (`--sure-giris`) |
| Hero | Fotoğrafta çok yavaş yakınlaşma (Ken Burns, `scale(1) → scale(1.06)`, tek yön). Başlık, metin ve butonlar sırayla belirir. | 15–20 sn (`--sure-kenburns`); metin 500–600ms |
| Proje kartı hover | Görsel `scale(1.04)`, üstündeki karartma azalır (`opacity`), alt çizgi soldan sağa uzar (`scaleX(0 → 1)`, `transform-origin: left`). | 300–500ms |
| Menü linki | Alt çizgi soldan sağa uzar (`scaleX`). | 200–300ms |
| Buton hover | Çerçeve ahşaba döner (ahşap çerçeveli katmanın `opacity`'si), ok 4px sağa kayar. | 200–300ms |

- Eğri: `--ease-out` (`cubic-bezier(0.22, 1, 0.36, 1)`).
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
- **Yok:** otomatik dönen slider/karusel, parallax, sürekli dönen veya zıplayan öğeler, scroll-jacking, aynı anda birden çok dikkat çeken hareket, her kaydırmada tekrarlanan animasyon.

## 7. Yapma ❌

- **Stok fotoğraf kullanma.** Unsplash, Pexels, Shutterstock ve yapay zekâyla üretilmiş "temsili" görseller dahil. Sadece müşteri projeleri. Uygun görsel yoksa açıkça işaretli bir placeholder koy ve not düş; stok görselle doldurma.
- **Açık zeminli bölüm yapma.** Beyaz, krem veya açık gri zemin yok; açık renge dönen header yok.
- **Dolu veya yeşil buton yapma.** Butonlar içi boş, krem çerçeveli pill'dir (bkz. §9).
- **Aşırı animasyon kullanma** (bkz. §6).
- Palet dışı renk ekleme (özellikle parlak mavi, mor, neon, yoğun gradyan). Tek izinli gradyan, fotoğraf üstündeki gece karartmasıdır.
- Ahşap veya yeşil rengi küçük metin rengi olarak kullanma (kontrast yetersiz; ahşap tonu gerekiyorsa `--color-ahsap-acik`).
- Gölge ile yüzey ayırma.
- Poppins ve Inter dışında font ekleme.

## 8. Olmalı ✅

### Hero section
- Ana sayfada tam ekran (`100svh`), akşam/gece çekilmiş, içi ışıklı gerçek proje fotoğrafı; metin sola yaslı, ortalanmaz.
- **Karartma:** soldan sağa açılan gece gradyanı — metnin durduğu sol tarafta en koyu (etkin opaklık ≥ %70), sağa doğru azalır ve fotoğrafın ışıklı kısmı görünür kalır. Mobilde metin genişliği kapladığı için karartma metin bölgesinde en az %70 kalır.
- Tek `<h1>`: net değer önerisi. Altında 1–2 cümlelik açıklama ve güven unsuru ("2015'ten beri · 300+ proje").
- Butonlar: pill çerçeveli "Teklif Al" ve "Projeleri İncele" (bkz. §9). Yeşil veya dolu buton yok.
- Altında, ince dikey çizgilerle ayrılmış **3 ikonlu bilgi şeridi**: ahşap çizgi ikon + büyük harfli kısa etiket. Etiketler yalnızca sitede/CLAUDE.md'de bulunan gerçek bilgilerden oluşur; uydurma iddia yazılmaz.
- Hero görseli LCP öğesidir: `loading="eager"`, `fetchpriority="high"`, WebP/AVIF, `srcset` ile boyutlandırılmış. Lazy-load yapılmaz.
- Alt sayfalarda (kategori, proje, hakkımızda) daha kısa bir başlık bandı (~40svh) kullanılır; zemini ara bölüm tonudur.

### Header (her sayfada)
- Koyu: ana sayfada hero fotoğrafının üzerinde şeffaf; diğer sayfalarda antrasit zemin. Kaydırınca sabitlenen header da koyu kalır.
- Logo solda ve büyük (bkz. §4), menü linkleri sağda.
- Aktif sayfanın altında ince yeşil çizgi (1–2px); link metni krem. Hover'da alt çizgi soldan sağa uzar (bkz. §6).
- Mobilde hamburger menü; açılan panel koyu zeminlidir.

### Footer (her sayfada)
- Antrasit zemin, krem başlıklar, `--color-metin` metin, ahşap ikon vurguları; plakasız koyu zemin SVG logosu.
- İçerik:
  - Logo (`2k-ahsap-logo-koyu-zemin.svg`) + kısa şirket tanımı
  - Hızlı linkler: Kategoriler, Hakkımızda, Referanslar, İletişim
  - İletişim: adres (`<address>`), telefon (`tel:+905322504077`), e-posta (`mailto:info@2kahsap.com`), WhatsApp (`https://wa.me/905322504077`)
  - Sosyal medya: Instagram, Facebook, LinkedIn (ikon + `aria-label`)
  - Telif: "© {yıl} 2K AHŞAP. Tüm hakları saklıdır." (yıl dinamik)
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
- Her sayfada benzersiz `<title>` ve meta description; Open Graph görseli gerçek proje fotoğrafı.
- Açıklayıcı link metinleri ("buraya tıklayın" değil, "Bungalov projelerini inceleyin").
- Hız da SEO'dur: WebP/AVIF, hero dışındaki görsellerde lazy-load, `width`/`height` belirterek layout kaymasını (CLS) önle. Ortaya çıkma animasyonu yer kaplamayı değiştirmez (yalnızca `transform`/`opacity`), CLS üretmez.

## 9. Bileşen Hızlı Referansı

| Bileşen | Stil |
|---|---|
| Buton | Tam yuvarlak (pill), içi boş, 1px krem çerçeve, krem metin, sağında → ok ikonu; en az 48px yükseklik. Hover/odak: çerçeve ahşaba döner, ok 4px sağa kayar. Dolu, yeşil veya gölgeli buton yok. |
| Metin linki | `--color-metin` veya krem, altı çizili; hover `--color-ahsap-acik` |
| Kart | `--color-yuzey` zemin, 1px `--color-cizgi` kenar, 4px köşe, gölge yok. Görsel üstte; altında büyük harfli etiket (`--color-ahsap-acik`) · krem başlık · doluysa bilgi satırı. Görsel oranı ızgaradaki yerine göre değişebilir. Hover: bkz. §6. |
| Menü linki | Krem metin; aktifte ince yeşil alt çizgi; hover'da alt çizgi soldan sağa uzar |
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
- [ ] Hareketler yalnızca `transform`/`opacity`; `prefers-reduced-motion` ve JS kapalıyken içerik görünür; otomatik slider yok
- [ ] Hero: gerçek gece/akşam fotoğrafı, tek H1, metin bölgesinde ≥ %70 karartma
- [ ] Footer: iletişim, sosyal medya, telif; bilgiler CLAUDE.md ile aynı
- [ ] 320px'te yatay kaydırma yok, dokunma hedefleri ≥44px
- [ ] Tek H1, semantik etiketler, tüm görsellerde alt metni
- [ ] Türkçe yazım kontrol edildi
