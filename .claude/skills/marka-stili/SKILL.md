---
name: marka-stili
description: 2K AHŞAP marka tasarım kuralları — renk paleti, tipografi, marka tonu, yasaklar ve her sayfada olması gereken bileşenler (hero, footer, mobile-first, SEO). 2K AHŞAP web sitesinde sayfa, bileşen, layout, CSS/stil, buton, görsel yerleşimi veya arayüz metni oluştururken ya da düzenlerken mutlaka kullan.
---

# 2K AHŞAP — Marka Stili

Bu kurallar sitedeki her sayfa ve bileşen için geçerlidir. Bir tasarım kararı bu dosyayla çelişirse bu dosya geçerlidir.

## 1. Marka Kişiliği

| İlke | Tasarımdaki karşılığı |
|---|---|
| **Doğal** | Gerçek ahşap dokusu ve proje fotoğrafları öne çıkar. Krem ve ahşap tonları, sıcak ve toprak hissi. Neon, parlak renk, gradyan yığını yok. |
| **Premium** | Geniş boşluklar, büyük ve kaliteli görseller, sınırlı renk kullanımı, özenli tipografi. Kalabalık değil, seçilmiş. |
| **Modern** | Temiz grid, net hiyerarşi, çizgi stili sade ikonlar, minimum süsleme. |
| **Güvenilir** | Gerçek projeler, somut rakamlar (2015'ten beri, 300+ proje), her yerden ulaşılabilen iletişim bilgileri, tutarlı arayüz. |

**Metin tonu:** Samimi ama profesyonel, "siz" hitabı, abartısız. "Türkiye'nin en iyisi" gibi iddialar yerine somut bilgi kullan ("300+ tamamlanmış proje").

## 2. Renk Paleti

| Renk | Hex | CSS değişkeni | Kullanım |
|---|---|---|---|
| Antrasit | `#2E2E2E` | `--color-antrasit` | Ana metin, başlıklar, koyu bölümler, footer zemini |
| Ahşap | `#A67C52` | `--color-ahsap` | Vurgu: ayraçlar, ikonlar, kenarlıklar, büyük başlık detayları |
| Yeşil | `#2E7D32` | `--color-yesil` | Birincil eylem (CTA): "Teklif Al", form gönderme, WhatsApp; başarı mesajları |
| Krem | `#EBDCC6` | `--color-krem` | Bölüm zeminleri, kartlar, sıcak arka planlar |

**Türev tonlar** (yalnızca belirtilen amaçla):
- `#FAF6F0` (`--color-zemin`) — açık krem, ana sayfa zemini (beyaz yerine)
- `#1B5E20` (`--color-yesil-koyu`) — CTA hover/active durumu
- `#7A5A3A` (`--color-ahsap-koyu`) — ahşap tonlu küçük metin veya link gerektiğinde
- Saydam türevler (ince çizgi, fotoğraf karartması, koyu zemindeki ikincil metin) yalnızca bu paletten türetilir ve `src/styles/global.css` içinde token olarak tanımlanır. Sayfa ve bileşenlerde sabit hex/rgba yazılmaz; yeni bir ton gerekirse önce token eklenir.

**Dağılım:** ~%60 açık zemin (zemin/krem/beyaz), ~%30 antrasit (metin, koyu bölümler), ~%10 ahşap + yeşil vurgu. Yeşil az kullanılmalı ki CTA'lar öne çıksın.

```css
:root {
  --color-antrasit: #2E2E2E;
  --color-ahsap: #A67C52;
  --color-ahsap-koyu: #7A5A3A;
  --color-yesil: #2E7D32;
  --color-yesil-koyu: #1B5E20;
  --color-krem: #EBDCC6;
  --color-zemin: #FAF6F0;
  --color-beyaz: #FFFFFF;
}
```

### Kontrast kuralları (WCAG AA)

| Metin / zemin | Oran | Karar |
|---|---|---|
| Antrasit / beyaz veya zemin | ~13.6:1 | ✅ Her yerde |
| Antrasit / krem | ~10:1 | ✅ Her yerde |
| Beyaz veya krem / antrasit | ~10–13.6:1 | ✅ Her yerde (footer, koyu bölümler) |
| Beyaz / yeşil | ~5.1:1 | ✅ Butonlar ve CTA |
| Ahşap koyu / krem | ~4.6:1 | ✅ Küçük metin ve link |
| Ahşap / beyaz | ~3.7:1 | ⚠️ Sadece büyük metin (≥24px veya ≥19px kalın) |
| Ahşap / antrasit | ~3.6:1 | ⚠️ Sadece büyük metin ve ikon |
| Yeşil / krem | ~3.8:1 | ⚠️ Sadece büyük metin |
| Ahşap / krem | ~2.8:1 | ❌ Metin için asla; sadece dekoratif |

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
- Gövde metni 16px'in altına inmez; satır uzunluğu en fazla ~70 karakter (`max-width: 65ch`).
- `<html lang="tr">` zorunlu — `text-transform: uppercase` kullanıldığında "i → İ" dönüşümü doğru çalışsın.
- Türkçe karakterler (ç ğ ı İ ö ş ü) her başlık ve ağırlıkta kontrol edilir.
- Başlıklar asla italik değildir.
- Tamamen büyük harf yalnızca kısa etiketlerde (kart üstündeki kategori/konum, bölüm etiketi, bilgi şeridi), harf aralığı 0.14em. Etiket rengi antrasit, ahşap koyu veya koyu zeminde krem olur; ahşap rengi etikette kullanılmaz (küçük metin).
- Bölüm etiketi (başlığın üstündeki küçük büyük harfli satır) sayfa başına en fazla 2 kez kullanılır ve başlığın hemen üstünde, aynı sütunda durur.

## 4. Logo

Dosyalar `public/logo/` klasöründe. Sadece bu dosyalar kullanılır; logo yeniden çizilmez, renkleri değiştirilmez, oranı bozulmaz.

| Dosya | Nerede kullanılır | Neden |
|---|---|---|
| `2k-ahsap-logo-koyu-zemin.svg` | **Header, footer** ve diğer koyu zeminli alanlar | "AHŞAP" yazısı krem; sadece koyu zeminde okunur |
| `2k-ahsap-logo-acik-zemin.svg` | **Açık zeminli alanlar** (krem/beyaz bölümler) | "2" ve "AHŞAP" antrasit; sadece açık zeminde okunur |
| `2k-ahsap-ikon.svg` | Favicon kaynağı (bkz. **Favicon**) | Yazısız "2K" ev simgesi |

> **Format: SVG.** Sitede logo olarak SVG kullanılır.
> ✅ `2k-ahsap-logo-koyu-zemin.svg` mevcut (içindeki "2" krem; koyu zeminde okunur) ve header ile footer'da plakasız kullanılır.
> ⚠️ `2k-ahsap-logo-acik-zemin.svg` ve `2k-ahsap-ikon.svg` henüz yok; eklenene kadar PNG'lerin küçültülmüş sürümü geçici olarak kullanılır (bkz. **Performans**). schema.org `logo` alanında açık zemin logosunun PNG sürümü kalır.

**Zemin kuralı**
- Koyu zemin logosu yalnızca antrasit zeminde veya karartılmış fotoğrafın üzerinde kullanılır. Açık zemin logosu yalnızca krem, beyaz veya `--color-zemin` üzerinde kullanılır. Ters kullanım yasak: krem yazı açık zeminde kaybolur.
- **Bu yüzden header zemini koyudur:** antrasit, ana sayfada ise hero'nun karartmalı fotoğrafı üzerinde şeffaf. Kaydırınca sabitlenen header da antrasit kalır; açık renge dönen header yapılmaz.

**Kullanım**
- Logo ana sayfaya link verir: `<a href="/" aria-label="2K AHŞAP ana sayfa">`, görselde `alt="2K AHŞAP"`. Logo H1 değildir.
- Boyut: header'da mobilde 48–56px, masaüstünde 64–72px yükseklik; footer'da 140–180px genişlik. Logo dikey yapıda olduğu için alt slogan ("DOĞALLIK • MİMARLIK • TASARIM") header boyutunda okunmaz. Yatay (simge ve yazı yan yana) bir sürüm gelirse header'da o kullanılır.
- Etrafında, logo yüksekliğinin en az %25'i kadar boş alan bırakılır.
- Gölge, filtre, kontur, animasyon eklenmez; CSS ile renk değiştirilmez; esnetilmez (`width`/`height` orantılı, `object-fit: contain`).

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
- **Köşe:** butonlar, kartlar ve görseller 4px (`--radius`); yalnızca yuvarlak öğeler (WhatsApp butonu) tam yuvarlak.
- **Gölge:** kullanılmaz. Yüzeyler arası ayrım ince çizgiyle (`1px solid var(--color-cizgi)`) ve zemin tonu farkıyla verilir. İstisna: yüzen WhatsApp butonu ve açılır menü paneli.
- **İkonlar:** tek set, çizgi (outline) stili, 1.5–2px kalınlık (ör. Lucide). Emoji ikon olarak kullanılmaz.
- **Boşluk:** 8px tabanlı ölçek (8, 16, 24, 32, 48, 64, 96, 128, 160). Bölüm boşlukları her yerde aynı değildir; ritim için değişir: mobilde 64–96px, masaüstünde 96–160px.

## 6. Yapma ❌

- **Stok fotoğraf kullanma.** Unsplash, Pexels, Shutterstock ve yapay zekâyla üretilmiş "temsili" görseller dahil. Sadece müşteri projeleri. Uygun görsel yoksa açıkça işaretli bir placeholder koy ve not düş; stok görselle doldurma.
- **Aşırı animasyon kullanma.**
  - Yok: otomatik dönen slider/karusel, parallax, sürekli dönen veya zıplayan öğeler, her bölümün kayarak gelmesi, scroll-jacking.
  - Serbest: hover geçişleri, menü açılışı, hafif fade-in — 150–300ms, `ease-out`, yalnızca `opacity` ve `transform`.
  - `prefers-reduced-motion` desteklenmeli:
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
- Palet dışı renk ekleme (özellikle parlak mavi, mor, neon, yoğun gradyan).
- Ahşap rengini küçük metin rengi olarak kullanma (kontrast yetersiz — gerekiyorsa ahşap koyu kullan).
- Poppins ve Inter dışında font ekleme.

## 7. Olmalı ✅

### Hero section
- Ana sayfada tam ekran (`100svh`), en güçlü gerçek proje fotoğrafı; metin sola yaslı, ortalanmaz.
- Fotoğraf üzerindeki metin her genişlikte WCAG AA sağlar: metnin altındaki bölgede antrasit katmanın etkin opaklığı en az %66 olur (fotoğrafın en açık pikselinde bile beyaz metin ≥ 4.5:1). Gradyan arka plan kullanılmaz; katman düz renktir.
- Tek `<h1>`: net değer önerisi. Altında 1–2 cümlelik açıklama ve güven unsuru ("2015'ten beri · 300+ proje").
- Birincil CTA: yeşil "Teklif Al". İkincil CTA: çerçeveli "Projeleri İncele".
- Hero görseli LCP öğesidir: `loading="eager"`, `fetchpriority="high"`, WebP/AVIF, `srcset` ile boyutlandırılmış. Lazy-load yapılmaz.
- Alt sayfalarda (kategori, proje, hakkımızda) daha kısa bir başlık bandı (~40svh) kullanılır.

### Footer (her sayfada)
- Antrasit zemin, krem/beyaz metin, ahşap başlık ve ikon vurguları.
- İçerik:
  - Logo (`2k-ahsap-logo-koyu-zemin.svg`) + kısa şirket tanımı
  - Hızlı linkler: Kategoriler, Hakkımızda, Referanslar, İletişim
  - İletişim: adres (`<address>`), telefon (`tel:+905322504077`), e-posta (`mailto:info@2kahsap.com`), WhatsApp (`https://wa.me/905322504077`)
  - Sosyal medya: Instagram, Facebook, LinkedIn (ikon + `aria-label`)
  - Telif: "© {yıl} 2K AHŞAP. Tüm hakları saklıdır." (yıl dinamik)
- İletişim bilgileri CLAUDE.md'deki şirket bilgileriyle birebir aynı olmalı (ad-adres-telefon tutarlılığı SEO için önemlidir).

### Mobile-first
- CSS önce mobil için yazılır; büyük ekranlar `min-width` medya sorgularıyla eklenir. `max-width` ile mobil yamalanmaz.
- Kırılım noktaları: 640px, 768px, 1024px, 1280px. İçerik genişliği en fazla 1280px.
- Dokunma hedefleri en az 44×44px, aralarında yeterli boşluk.
- Mobilde hamburger menü; telefon ve WhatsApp'a tek dokunuşla erişim (tek bir yüzen WhatsApp butonu veya sabit alt eylem çubuğu — ikisi birden değil).
- 320px genişlikte yatay kaydırma olmamalı. 320 / 768 / 1280 / 1920px'te test et. Düzen kalıpları (konteyner, Grid, Flexbox) için `responsive-duzen` skill'ine bak.
- Görseller `srcset` + `sizes` ile; mobile gereğinden büyük görsel gönderilmez.

### SEO (tasarıma dokunan kısmı — ayrıntılar `seo-kurallar` skill'inde)
- Semantik HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Sayfa başına tek `<h1>`; başlık sırası atlanmaz (h1 → h2 → h3). Seviye yapıya göre seçilir, görünüm CSS ile ayarlanır.
- Her görselde anlamlı Türkçe `alt` metni (ör. "Ön verandalı iki katlı ahşap bungalov"). Dekoratif görsellerde `alt=""`.
- Her sayfada benzersiz `<title>` ve meta description; Open Graph görseli gerçek proje fotoğrafı.
- Açıklayıcı link metinleri ("buraya tıklayın" değil, "Bungalov projelerini inceleyin").
- Hız da SEO'dur: WebP/AVIF, hero dışındaki görsellerde lazy-load, `width`/`height` belirterek layout kaymasını (CLS) önle.

## 8. Bileşen Hızlı Referansı

| Bileşen | Stil |
|---|---|
| Birincil buton | Yeşil zemin, beyaz metin, 4px köşe; hover `--color-yesil-koyu` |
| İkincil buton | Şeffaf zemin, 1px antrasit çerçeve ve metin; koyu zeminde krem çerçeve ve metin |
| Metin linki | Antrasit, altı çizili; hover `--color-ahsap-koyu` |
| Proje kartı | Görsel öncelikli; çerçeve, zemin ve gölge yok. Görsel oranı ızgaradaki yerine göre değişir (eşit kutu ızgara yapılmaz). Altında: büyük harfli kategori etiketi · ince ayraç çizgisi · proje adı · doluysa konum. Hover'da görsel `scale(1.02)`, 300ms |
| Odak halkası | Açık zeminde `outline: 2px solid var(--color-yesil)`, koyu zeminde `var(--color-krem)`; `outline-offset: 2px`. Asla kaldırılmaz. |

## 9. Teslim Öncesi Kontrol Listesi

- [ ] Yalnızca palet renkleri ve türev tonlar kullanıldı
- [ ] Başlıklar Poppins, metinler Inter
- [ ] Header ve footer'da koyu zemin logosu, açık zeminde açık zemin logosu; logo optimize edilmiş boyutta
- [ ] Favicon ve apple-touch-icon tanımlı
- [ ] Metin kontrastları AA'yı geçiyor (küçük metinde ahşap rengi yok)
- [ ] Stok veya temsili görsel yok
- [ ] Animasyonlar ≤300ms, `prefers-reduced-motion` destekli, otomatik slider yok
- [ ] Hero: gerçek fotoğraf, tek H1, yeşil "Teklif Al" CTA
- [ ] Footer: iletişim, sosyal medya, telif; bilgiler CLAUDE.md ile aynı
- [ ] 320px'te yatay kaydırma yok, dokunma hedefleri ≥44px
- [ ] Tek H1, semantik etiketler, tüm görsellerde alt metni
- [ ] Türkçe yazım kontrol edildi
