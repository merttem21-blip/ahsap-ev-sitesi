---
name: seo-kurallar
description: 2K AHŞAP web sitesi SEO kuralları — meta başlık ve açıklama, alt metinler, H1, URL yapısı, sitemap, canonical, schema.org yapılandırılmış veri, mobil SEO, Türkçe anahtar kelimeler, iç linkler ve 404 sayfası. 2K AHŞAP sitesinde yeni sayfa veya rota eklerken, sayfa içeriği/metni yazarken, görsel eklerken, layout veya <head> düzenlerken, URL/slug belirlerken ya da SEO kontrolü yaparken mutlaka kullan.
---

# 2K AHŞAP — SEO Kuralları

Site Astro (statik) ile yapılır ve Vercel'de yayınlanır. Görsel tasarım için `marka-stili`, görsel işleme için `gorsel-yonetimi` skill'ine bak.

> **Alan adı:** Örneklerde `https://2kahsap.com` (www'suz) kullanılır. Alan adı kesinleşince `astro.config` içindeki `site` değerini ve `robots.txt`'yi güncelle.

## 1. Anahtar Kelimeler

**Ana kelimeler:** ahşap ev · bungalov · villa · tiny house · özel tasarım

Her sayfanın **tek bir birincil** anahtar kelimesi olur. İki sayfa aynı birincil kelimeyi hedeflemez; yoksa sayfalar Google'da birbiriyle yarışır.

| Sayfa | URL | Birincil kelime | Destekleyici kelimeler |
|---|---|---|---|
| Ana sayfa | `/` | ahşap ev | özel tasarım ahşap ev, ahşap yapılar |
| Kategoriler | `/kategoriler` | ahşap yapı modelleri | ahşap ev çeşitleri |
| Bungalov | `/bungalov` | ahşap bungalov | bungalov ev, bungalov modelleri |
| Villa | `/villa` | ahşap villa | ahşap villa projeleri |
| Tiny House | `/tiny-house` | tiny house | tiny house modelleri, küçük ahşap ev |
| Üçgen Ev | `/ucgen-ev` | üçgen ev | a-frame ev, a-frame bungalov (eski adı; 12 Ekim 2026'da `/a-frame`'den 301) |
| Çardak | `/cardak` | ahşap çardak | bahçe çardağı |
| Otel-Bar | `/otel-bar` | ahşap bar | otel ahşap yapıları |
| Çocuk Oyun Parkı | `/cocuk-oyun-parki` | ahşap çocuk oyun parkı | ahşap oyun evi |
| Ahşap Cami | `/ahsap-cami` | ahşap cami | ahşap cami projeleri |
| Diğer | `/ozel-tasarim` | özel tasarım ahşap yapı | — ("diğer" aranan bir kelime olmadığı için bu slug önerilir) |

Bu liste başlangıç içindir. Yayından sonra Google Search Console verisine göre güncelle; arama hacmi uydurma.

**Kelimenin geçmesi gereken yerler** (doğal biçimde, her birinde bir kez yeterli):
1. Meta başlık (mümkünse başa yakın)
2. H1
3. İlk paragraf (ilk ~100 kelime)
4. URL slug'ı
5. Meta açıklama
6. En az bir görselin alt metni

## 2. Meta Başlık — en fazla 60 karakter

- Biçim: `{Sayfa konusu} | 2K AHŞAP` ("| 2K AHŞAP" karakter sayısına dahildir).
- Her sayfada **benzersiz**. Aynı başlık iki sayfada asla kullanılmaz.
- Birincil kelime başa yakın; büyük harfle bağırma, emoji, "!!!" yok.
- Kategori ve proje sayfalarında veriden üretilir (`src/lib/projeler.ts`): projede proje adı, kategoride sayfadaki H1 (`{H1} | 2K AHŞAP`). H1'de olmayan aranan bir kelime ("Tiny House Modelleri") gerekiyorsa kategorinin isteğe bağlı `googleBasligi` alanına yazılır (`src/data/site.ts`); H1 değişmez.

| Sayfa | Örnek | Karakter |
|---|---|---|
| Ana sayfa | Özel Tasarım Ahşap Ev, Bungalov ve Villa \| 2K AHŞAP | 51 |
| Kategori (H1'den) | Ahşap Bar ve Otel Yapıları \| 2K AHŞAP | 37 |
| Kategori (`googleBasligi`) | Ahşap Bungalov Modelleri ve Projeleri \| 2K AHŞAP | 48 |
| Proje | İki Katlı Verandalı Ahşap Bungalov Projesi \| 2K AHŞAP | 53 |
| İletişim | İletişim ve Teklif Al: Ahşap Ev Projeleri \| 2K AHŞAP | 52 |

## 3. Meta Açıklama — 120–155 karakter

- Her sayfada **benzersiz**; sayfanın gerçekte ne sunduğunu anlatır. Sayfada görünmeyen bilgi yazılmaz.
- Kategori açıklaması sayfadaki giriş paragrafından, proje açıklaması proje adı ve fotoğraf sayısından üretilir (`src/lib/projeler.ts`).
- Birincil kelime bir kez ve doğal biçimde geçer; sonunda eylem çağrısı olur ("inceleyin", "teklif alın").
- Doğrulanamayan iddia yok ("en ucuz", "1 numara"). Proje sayısı, süre, fiyat, garanti gibi rakam ve taahhüt yazılmaz (CLAUDE.md Metin Kuralı).

| Sayfa | Örnek | Karakter |
|---|---|---|
| Ana sayfa | Bungalovdan villaya, tiny house'tan çardağa; doğayla uyumlu, size özel ahşap ev ve yapılar tasarlayıp üretiyoruz. Projelerimizi inceleyin, teklif alın. | 151 |
| Kategori | Bahçeniz, tatil eviniz veya turizm tesisiniz için ürettiğimiz ahşap bungalov projeleri. Proje fotoğraflarını inceleyin, 2K AHŞAP'tan teklif alın. | 145 |
| Proje | Ön verandalı, iki katlı ahşap bungalov projemizin fotoğrafları ve teknik şartnamesi. Benzer bir proje için 2K AHŞAP'tan teklif alın. | 132 |

## 4. Başlıklar — Her sayfada tek H1

- Her sayfada **tam olarak bir** `<h1>` olur ve birincil kelimeyi içerir. Logo H1 değildir.
- H1 meta başlıkla aynı olmak zorunda değil, ama aynı konuyu anlatır.
- Hiyerarşi atlanmaz: h1 → h2 → h3. Başlık seviyesi görünüme göre değil yapıya göre seçilir.

## 5. Alt Metinler — Tüm fotoğraflar için

Sitede 350+ fotoğraf var; **alt metni olmayan görsel yayına çıkmaz.**

- Görseli anlatan, Türkçe, 5–15 kelimelik, en fazla ~125 karakterlik bir cümle yaz.
- "Resim", "fotoğraf", "görsel" diye başlama.
- Galerideki her fotoğrafın alt metni farklı olur; 97 fotoğrafa "ahşap ev" yazılmaz. Kalıp: `{proje adı} – {ne görünüyor}`.
  - ✅ "İki katlı ahşap bungalov – ön veranda ve giriş kapısı"
  - ✅ "İki katlı ahşap bungalov – açık mutfaklı salon"
  - ❌ "ahşap ev bungalov villa tiny house ahşap ev fiyatları"
  - ❌ "IMG_2041"
- Sadece süs amaçlı görsellerde `alt=""` kullanılır.
- Alt metinler JSON verisinde her görsel için ayrı bir `alt` alanında tutulur.
- Astro'nun `<Image>` / `<Picture>` bileşenlerini kullan; `alt` verilmezse derleme hata verir.
- **Dosya adları da SEO'dur:** `ahsab-ev (12).jpg` yerine `iki-katli-ahsap-bungalov-veranda.webp`. Küçük harf, Türkçe karakter ve boşluk yok, kelimeler tireyle ayrılır.

## 6. URL Yapısı — `/kategori/proje-adi`

```
/                                       Ana sayfa
/kategoriler                            Tüm kategoriler
/bungalov                               Kategori sayfası
/bungalov/iki-katli-verandali-bungalov  Proje sayfası
/hakkimizda  /referanslar  /iletisim    Sabit sayfalar
```

**Slug kuralları:**
- Küçük harf, kelimeler arasında tire (`-`). Boşluk, alt çizgi ve büyük harf yok.
- Türkçe karakterler çevrilir: ç→c, ğ→g, ı→i, İ→i, ö→o, ş→s, ü→u.
- Proje slug'ı 3–6 kelime olur, yapı türünü içerir ve anlamlıdır: `/villa/havuzlu-iki-katli-ahsap-villa`. ID, tarih veya sıra numarası kullanılmaz (`/proje/123` ❌).
- Konum, ancak müşteri izin verirse eklenir (`/bungalov/sapanca-orman-bungalovu`); yerel aramada değer katar.
- Kategori slug'ları sabit sayfalarla çakışmaz (`hakkimizda`, `iletisim`, `referanslar`, `kategoriler`, `admin`).
- **Yayındaki bir URL değiştirilmez.** Değişmesi gerekirse eski URL'den yenisine 301 yönlendirmesi yapılır (bkz. §10).
- Bir proje birden fazla kategoriye uysa bile **tek bir URL'si** olur; birincil kategori seçilir.
- Sondaki eğik çizgi için tek biçim kullanılır: yok (`/bungalov`). `astro.config`'te `trailingSlash: 'never'`.

## 7. Canonical Etiketleri

- **Her sayfada** kendini gösteren, mutlak (tam) bir canonical olur: `<link rel="canonical" href="https://2kahsap.com/bungalov">`.
- Parametreli URL'ler parametresiz sürümü gösterir: `/iletisim?kategori=bungalov` → `/iletisim`.
- Sayfalanmış galerilerde (`?sayfa=2`) her sayfa kendini gösterir; hepsi 1. sayfaya yönlendirilmez.
- Tek sürüm kuralı: `https` (http → https), www'suz (Vercel Domains'te www → kök alan adı yönlendirmesi), sonda eğik çizgi yok. Canonical, sitemap ve iç linkler aynı biçimi kullanır.

## 8. Sitemap.xml ve robots.txt

`@astrojs/sitemap` entegrasyonunu kullan. `site` ayarı zorunludur:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://2kahsap.com',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (sayfa) => !sayfa.includes('/admin') && !sayfa.includes('/404'),
    }),
  ],
});
```

- Derleme sonunda `sitemap-index.xml` ve `sitemap-0.xml` dosyaları oluşur.
- Sitemap'te yalnızca indekslenmesi istenen, 200 dönen, canonical URL'ler bulunur. Admin, 404 ve `noindex` sayfalar girmez.
- `public/robots.txt`:
  ```
  User-agent: *
  Allow: /

  Sitemap: https://2kahsap.com/sitemap-index.xml
  ```
- Yayından sonra sitemap'i Google Search Console'a gönder.
- `/admin` sayfaları `<meta name="robots" content="noindex, nofollow">` taşır. Erişim güvenliği için `guvenlik-kurallari` skill'ine bak.

## 9. Yapılandırılmış Veri (schema.org, JSON-LD)

Astro'da şöyle eklenir: `<script type="application/ld+json" set:html={JSON.stringify(sema)} />`

### Her sayfada — İşletme

```js
const isletme = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://2kahsap.com/#isletme",
  "name": "2K AHŞAP",
  "url": "https://2kahsap.com",
  "logo": "https://2kahsap.com/logo/2k-ahsap-logo-acik-zemin.png", // Google logoyu beyaz zeminde gösterir
  "image": "https://2kahsap.com/og-varsayilan.jpg", // gerçek proje fotoğrafı
  "description": "2015'ten beri özel tasarım ahşap ev, bungalov, villa ve tiny house üreten firma.",
  "telephone": "+90 532 250 40 77",
  "email": "info@2kahsap.com",
  "foundingDate": "2015",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kaynarca, Akdeniz Cd. No:4/A",
    "addressLocality": "Pendik",
    "addressRegion": "İstanbul",
    "postalCode": "34893",
    "addressCountry": "TR"
  },
  "areaServed": { "@type": "Country", "name": "Türkiye" },
  "founder": {
    "@type": "Person",
    "name": "Kadir Avcı",
    "sameAs": "https://www.linkedin.com/in/kadir-avc%C4%B1-a069b1440/"
  },
  "sameAs": [
    "https://www.instagram.com/2kahsap/",
    "https://www.facebook.com/profile.php?id=61594732547189"
  ]
};
```

- LinkedIn hesabı şirketin değil, sahibinin kişisel profili olduğu için `founder` altında durur.
- Çalışma saatleri ve koordinatlar (`openingHoursSpecification`, `geo`) **bilinmeden eklenmez**. Öğrenilince eklenir.
- Ad, adres ve telefon footer'daki ve Google İşletme Profili'ndeki bilgiyle birebir aynı olmalı.

### Kategori ve proje sayfalarında — BreadcrumbList

```js
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://2kahsap.com" },
    { "@type": "ListItem", "position": 2, "name": "Bungalov", "item": "https://2kahsap.com/bungalov" },
    { "@type": "ListItem", "position": 3, "name": "İki Katlı Verandalı Bungalov" }
  ]
}
```

Sayfada görünen breadcrumb ile şema aynı olmalı.

### Yasaklar
- **Sahte veya kendi kendine verilmiş puan yok.** Referanslar sayfasındaki yorumlar için işletmeye `AggregateRating` / `Review` eklenmez. Google bunları yıldız olarak göstermez, sahtesi ise spam sayılır.
- `Product` şeması yalnızca gerçek fiyat (`offers`) ya da gerçek müşteri puanı varsa kullanılır. Bu alanlar olmadan eklenen `Product` Search Console'da hata verir.
- Şemada sayfada görünmeyen bilgi bulunmaz.
- Her şema [Rich Results Test](https://search.google.com/test/rich-results) ve [Schema Validator](https://validator.schema.org) ile doğrulanır.

## 10. Mobil SEO ve Hızlı Yükleme

Google siteyi mobil sürümüne göre değerlendirir. Responsive tasarım kuralları `marka-stili` skill'indedir.

**Core Web Vitals hedefleri** (mobil, PageSpeed Insights):

| Metrik | Hedef |
|---|---|
| LCP (en büyük içerik) | < 2.5 sn |
| INP (etkileşim gecikmesi) | < 200 ms |
| CLS (düzen kayması) | < 0.1 |
| Lighthouse mobil performans | ≥ 90 |

- `<meta name="viewport" content="width=device-width, initial-scale=1">` ve `<html lang="tr">` her sayfada bulunur.
- Görseller `astro:assets` ile WebP/AVIF'e çevrilir; `srcset` ile boyutlandırılır, `width`/`height` belirtilir.
- Hero görseli `loading="eager"` + `fetchpriority="high"`; diğer tüm görseller `loading="lazy"`.
- JavaScript en az düzeyde: Astro adaları yalnızca gerektiğinde kullanılır (`client:visible` / `client:idle`); `client:load` istisnadır.
- Fontlar `display=swap` ile yüklenir, yalnızca kullanılan ağırlıklar alınır.
- Ağır üçüncü taraf script'leri (sohbet widget'ı, birden fazla analiz aracı) eklenmez. Harita ancak tıklanınca yüklenir.

## 11. İç Linkler

- **Yetim sayfa olmaz:** her proje ana sayfadan en fazla 3 tıklamada ulaşılabilir (Ana sayfa → Kategori → Proje).
- Kategori sayfası, o kategorideki tüm projelere link verir.
- Proje sayfasında: breadcrumb, aynı kategoriden 3–4 "Benzer Projeler" ve kategori önceden seçili "Teklif Al" linki bulunur.
- Ana sayfa tüm kategorilere link verir; footer'da kategori linkleri yer alır.
- Hakkımızda ve Referanslar, ilgili projelere link verir.
- **Link metni açıklayıcıdır:** "Ahşap villa projelerimizi inceleyin" ✅ — "buraya tıklayın", "devamı" ❌.
- İç linkler `<a href>` ile verilir (JavaScript ile yönlendirme yapılmaz) ve canonical biçimi kullanır (`/bungalov`, `/bungalov/` değil).

## 12. 404 Sayfası

- `src/pages/404.astro` oluşturulur. Astro bunu `404.html` olarak derler, Vercel de gerçek **404 durum koduyla** sunar.
- İçerik: kısa ve samimi bir Türkçe mesaj ("Aradığınız sayfa bulunamadı"), ana sayfa, kategoriler, öne çıkan projeler ve iletişim linkleri. Tasarımı `marka-stili`'ne uyar.
- `<meta name="robots" content="noindex">` taşır; sitemap'e girmez.
- **Soft 404 yapılmaz:** bulunamayan her URL ana sayfaya yönlendirilmez.
- Kaldırılan veya adı değişen bir proje için en yakın sayfaya **301** yönlendirmesi yapılır (yeni proje URL'si veya kategori sayfası). Gerçek 301 için `vercel.json` içindeki `redirects` kullanılır; adaptörsüz statik Astro'nun `redirects` ayarı yalnızca meta-refresh sayfası üretir.

## 13. Yapma ❌

### Anahtar kelime doldurma (keyword stuffing)
- ❌ "Ahşap ev, ahşap ev fiyatları, ahşap ev modelleri için ahşap ev uzmanı 2K AHŞAP'ın ahşap evlerini inceleyin."
- ✅ "2015'ten beri özel tasarım ahşap evler üretiyoruz. Projelerimizi inceleyin."
- Kelime yoğunluğu hedeflenmez. Ölçüt: metin sesli okunduğunda doğal mı?
- Gizli metin, footer'da kelime listesi, alt metne kelime yığma yok.
- Şehir adlarıyla çoğaltılmış kapı sayfaları yok ("İstanbul ahşap ev", "Ankara ahşap ev" diye içeriği aynı sayfalar). Google bunları spam sayar.

### Kopya içerik (duplicate content)
- Projelerin açıklaması birbirinden kopyalanmaz. Her proje sayfasında o projeye özgü **en az 100–150 kelimelik** bir açıklama ve teknik şartname tablosu bulunur. Yalnızca fotoğraftan oluşan sayfa "zayıf içerik" sayılır.
- Meta başlık ve açıklama sayfalar arasında tekrarlanmaz.
- Aynı içerik birden fazla URL'de yayınlanmaz (http/https, www, sonda eğik çizgi, parametre, iki kategori). Çözüm: tek URL + canonical + 301.
- Rakip veya üretici sitelerinden metin kopyalanmaz.

## 14. Olmalı ✅ — Astro SEO Bileşeni

Her sayfa ortak layout üzerinden bu bileşeni kullanır. `title` ve `description` zorunlu prop'tur; böylece eksik meta ile sayfa üretilemez.

```astro
---
// src/components/SEO.astro
interface Props {
  title: string;        // en fazla 60 karakter, "| 2K AHŞAP" dahil
  description: string;  // 120–155 karakter
  image?: string;       // 1200×630 gerçek proje fotoğrafı
  noindex?: boolean;
}
const { title, description, image = '/og-varsayilan.jpg', noindex = false } = Astro.props;
const yol = Astro.url.pathname.replace(/\/$/, '') || '/';
const canonical = new URL(yol, Astro.site).href;
const ogGorsel = new URL(image, Astro.site).href;

if (import.meta.env.DEV) {
  if (title.length > 60) console.warn(`[SEO] Başlık ${title.length} karakter: ${yol}`);
  if (description.length < 120 || description.length > 155) console.warn(`[SEO] Açıklama ${description.length} karakter: ${yol}`);
}
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
{noindex && <meta name="robots" content="noindex" />}

<meta property="og:type" content="website" />
<meta property="og:locale" content="tr_TR" />
<meta property="og:site_name" content="2K AHŞAP" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={ogGorsel} />
<meta name="twitter:card" content="summary_large_image" />
```

Open Graph etiketleri, link WhatsApp'ta veya sosyal medyada paylaşıldığında görünen önizlemeyi belirler.

## 15. Teslim Öncesi Kontrol Listesi

- [ ] Meta başlık en fazla 60 karakter ve benzersiz
- [ ] Meta açıklama 120–155 karakter, benzersiz ve sayfada görünenle örtüşüyor
- [ ] Sayfada tek H1 var, birincil kelimeyi içeriyor; başlık sırası atlanmıyor
- [ ] Tüm görsellerde anlamlı ve birbirinden farklı alt metni var; dosya adları anlamlı
- [ ] URL temiz: küçük harf, tireli, Türkçe karakter yok, `/kategori/proje-adi` biçiminde
- [ ] Canonical mutlak ve kendini gösteriyor
- [ ] Sayfa sitemap'te (admin, 404 ve noindex sayfalar hariç)
- [ ] Gerekli JSON-LD var ve doğrulandı; sahte puan yok
- [ ] Mobil Lighthouse ≥ 90, LCP < 2.5 sn, CLS < 0.1
- [ ] İç linkler var (breadcrumb, benzer projeler, teklif al); link metinleri açıklayıcı
- [ ] Keyword stuffing ve kopya içerik yok; proje açıklaması özgün
- [ ] Türkçe yazım kontrol edildi
