---
name: responsive-duzen
description: 2K AHŞAP sitesinde responsive düzen kuralları — mobile-first CSS, 320–1920px aralığı, kırılım noktaları, .kap konteyneri, CSS Grid ve Flexbox kalıpları, akışkan ölçüler, taşma önlemleri, dokunma hedefleri ve test genişlikleri. Yeni sayfa, bölüm, ızgara, kart listesi, header/footer veya herhangi bir CSS düzeni yazarken ya da mobil görünüm sorununu düzeltirken mutlaka kullan.
---

# 2K AHŞAP — Responsive Düzen

Renk, tipografi, animasyon ve bileşen görünümü `marka-stili`'ndedir; bu dosya yalnızca **düzeni** anlatır. Kalıplar sitede zaten kullanılanlardır; yeni sayfa yazarken aynılarını kullanın.

## 1. İlke: Mobile-first

- Temel CSS **320px** genişlik için yazılır; büyük ekranlar yalnızca `min-width` medya sorgusuyla eklenir. `max-width` sorgusuyla mobil yamalanmaz.
- 320px, WCAG 1.4.10 (yeniden akış) eşiğidir: 1280px ekranda %400 yakınlaştırma da 320px'e denk gelir.
- Medya sorgularında CSS değişkeni kullanılamaz; değer yazılır, üstüne yorum konur: `/* ≥ 768px */`.

## 2. Kırılım Noktaları (320 → 1920px)

| Genişlik | Ne değişir |
|---|---|
| < 640px | Tek sütun. `.kap` iç boşluğu 16px. Hamburger menü. Bölüm boşluğu 64px. |
| ≥ 640px | Kart ızgaraları ve footer 2 sütun. Galeri küçükleri 4 sütun. |
| ≥ 768px | `.kap` iç boşluğu 24px. Bölüm boşluğu 96px. Galeri kapağı 16:9. |
| ≥ 1024px | Masaüstü menü. Kart ızgaraları 3–4 sütun, footer 4 sütun, proje sayfası içerik + yan kutu. `.kap` 32px. |
| ≥ 1280px | İçerik 1280px'te durur ve ortalanır. |
| 1280–1920px | Yalnızca zeminler (hero, krem bantlar, footer) tam genişlikte uzar; kartlar, satır uzunluğu ve yazı boyutu büyümez. |

## 3. Konteyner: `.kap`

`src/styles/global.css` içinde tanımlı: `max-width: 1280px`, ortalı, iç boşluk 16 → 24 → 32px.

```astro
<section class="bolum">       <!-- zemin rengi ve dikey boşluk burada (tam genişlik) -->
  <div class="kap">…</div>    <!-- içerik burada (en fazla 1280px) -->
</section>
```

- Zemin rengi `section`'a, içerik `.kap`'a verilir; `.kap`'a zemin veya dış boşluk eklenmez.
- Tam genişlik görsel (hero) `.kap`'ın dışında kalır, metni `.kap` içindedir.

## 4. CSS Grid Kalıpları

**İki boyutlu yerleşim (satır + sütun) için Grid.** Aralık her zaman `gap` ile verilir, öğelere margin verilmez.

### Kart ızgarası (ana sayfa, `/projeler`, kategori sayfaları)
```css
.izgara { display: grid; gap: 24px; }
/* ≥ 640px */
@media (min-width: 640px) { .izgara { grid-template-columns: repeat(2, 1fr); } }
/* ≥ 1024px */
@media (min-width: 1024px) { .izgara { grid-template-columns: repeat(3, 1fr); } }
```
- Liste `<ul>` + `<li>` ile kurulur; kart `height: 100%` alır, böylece aynı satırdaki kartlar eşit boyda olur.
- Sütun sayısı tam kontrol gerektirmiyorsa: `grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));` — `min(100%, …)` 320px'te taşmayı önler.

### İçerik + yan kutu (proje sayfası)
```css
/* ≥ 1024px */
.icerik { grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr); }
```
`minmax(0, …)` uzun kelime veya tablonun sütunu genişletip sayfayı taşırmasını engeller. Düz `2fr` yazılmaz.

### Diğer kullanılanlar
- Galeri küçükleri: `repeat(3, 1fr)` → 4 → 6.
- Footer: tek sütun → `repeat(2, 1fr)` → `1.4fr 1fr 1fr 1.4fr`.
- Işık kutusu: `grid-template-rows: auto minmax(0, 1fr) auto` (üst çubuk / görsel / açıklama).

## 5. Flexbox Kalıpları

**Tek eksende hizalama için Flexbox.**

| Kalıp | CSS | Nerede |
|---|---|---|
| Buton grubu | `display: flex; flex-wrap: wrap; gap: 12px;` | Hero CTA'ları — `flex-wrap` zorunlu, 320px'te taşmasın |
| İki uca yaslama | `justify-content: space-between; align-items: center;` | Header (logo ↔ menü) |
| Alta yaslanan eylem | Kart gövdesi `flex-direction: column`, metin `flex: 1` | Kartlarda "Detayları inceleyin" satırı hep altta |
| İkon + metin | `display: inline-flex; align-items: center; gap: 8px;` ikon `flex-shrink: 0` | Linkler, footer iletişim |
| Dikey ortalama | `display: flex; align-items: center; min-height: …` | Hero, "Yakında" bölümü |

## 6. Akışkan Ölçüler

- **Yazı:** başlıklarda `clamp()` (değerler `marka-stili` §3). Gövde 1rem sabit.
- **Yükseklik:** `height` değil `min-height`; içerik uzarsa bölüm büyüsün. Mobil tarayıcı çubuğu için önce `vh`, sonra `svh`:
  ```css
  min-height: 85vh;
  min-height: 85svh;
  ```
- **Görsel oranı:** kapsayıcıda `aspect-ratio`, görselde `object-fit: cover` (bkz. `gorsel-yonetimi`).
- **Satır uzunluğu:** metin bloklarında `max-width: 65ch`.

## 7. Taşma Önlemleri

- Genişlik için `100vw` kullanılmaz (kaydırma çubuğu kadar yatay taşma yapar); `width: 100%` kullanılır.
- Uzun metin taşıyan flex/grid çocuklarına `min-width: 0` (grid'de `minmax(0, 1fr)`).
- Uzun e-posta, URL veya adres dar sütunda taşarsa: `overflow-wrap: anywhere`.
- İkiden fazla sütunlu tablo kaydırılabilir bir sarmalayıcıya konur: `overflow-x: auto`.
- Sabit konumlu öğeler (yüzen WhatsApp butonu) içeriği örtmez; footer'daki mobil alt boşluk (96px) bu yüzden vardır.

## 8. Dokunma ve Etkileşim

- Dokunma hedefleri en az 44×44px (butonlar 48px). Liste içindeki linklere `min-height: 44px` verilir.
- Bilgi veya işlev yalnızca hover'a bağlı olmaz; hover yalnızca görsel geri bildirimdir.
- Mobil menü `aria-expanded` ile açılır/kapanır; Esc, dışarı tıklama ve Tab ile dışarı çıkma menüyü kapatır (`Header.astro`).

## 9. Test

Tarayıcı geliştirici araçlarında şu genişliklerde bakılır: **320 · 360 · 390 · 768 · 1024 · 1280 · 1920**. Yatay telefon (ör. 844×390) görünümünde hero kontrol edilir.

Yatay taşma testi (konsolda):
```js
document.documentElement.scrollWidth > innerWidth
// true ise taşan öğeyi bul:
[...document.querySelectorAll('*')].filter((e) => e.getBoundingClientRect().right > innerWidth)
```

## 10. Kontrol Listesi

- [ ] CSS mobile-first; yalnızca `min-width` sorguları
- [ ] 320px'te yatay kaydırma yok; 1920px'te içerik 1280px'te ortalı
- [ ] Bölüm yapısı `section` (zemin) + `.kap` (içerik)
- [ ] Izgaralarda `gap`; yan yana sütunlarda `minmax(0, …)`
- [ ] Buton gruplarında `flex-wrap`
- [ ] Yükseklikler `min-height`, `svh` yedekli
- [ ] Dokunma hedefleri ≥ 44px
- [ ] 320 / 768 / 1024 / 1280 / 1920px'te kontrol edildi
