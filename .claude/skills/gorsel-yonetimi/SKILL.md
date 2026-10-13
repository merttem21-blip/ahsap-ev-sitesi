---
name: gorsel-yonetimi
description: 2K AHŞAP web sitesinde fotoğraf ekleme, WebP'ye çevirme, projeye bağlama, srcset/sizes, lazy loading, yükleme önceliği, alt metni ve kırık görsel denetimi kuralları. Yeni proje veya fotoğraf eklerken, ham-gorseller ya da public/images ile çalışırken, <img> etiketi yazarken, Galeri/Kart bileşenlerine dokunurken veya sayfa hızı/LCP sorunu incelerken mutlaka kullan.
---

# 2K AHŞAP — Görsel Yönetimi

Sitedeki fotoğrafların tamamı 2K AHŞAP'ın gerçek projeleridir (stok/yapay zekâ görseli yasak, bkz. `marka-stili` §6). Alt metni kuralları `seo-kurallar` §5'tedir; burada yalnızca uygulaması var.

## 1. Akış: ham fotoğraftan sayfaya

```
ham-gorseller/<kategori>/<proje-slug>/*.jpg      ← orijinaller (.gitignore'da, git'e girmez)
        │  npm run images
        ▼
public/images/<kategori>/<proje-slug>/<ad>-{600,1000,1600}.webp
        │  src/content/projeler/<proje-slug>.md  → fotograflar listesine ekle
        ▼
npm run build && npm run check:images            ← kırık görsel varsa çıkış kodu 1
```

- `npm run images` (`scripts/optimize-images.mjs`): EXIF yönünü uygular, büyütmeden 600/1000/1600px genişliğe küçültür, WebP kalite 80 yazar. Güncel olanları atlar; `-- --zorla` hepsini yeniden üretir.
- **Yeni proje:** `npm run yeni-proje` (`scripts/yeni-proje.mjs`) = `npm run images` + kaydı olmayan her proje klasörü için fotoğraf listesi hazır `.md` taslağı. Kod bilmeyenler için adım adım rehber: `docs/yeni-proje-ekleme.md`.
- **HEIC/HEIF desteklenmez**; önce JPG'ye çevrilir.
- Klasör ve dosya adları otomatik slug'lanır (Türkçe karakter → Latin, boşluk → tire). Yine de anlamlı ad verin: `IMG_2041.jpg` değil, `<proje-slug>-01.jpg`.
- sharp çıktıda EXIF/GPS bilgisini siler; müşterinin konumu fotoğraftan sızmaz. Script'e `withMetadata()` **eklenmez**.
- `ham-gorseller/` git'e girmediği için orijinaller ayrıca yedeklenir (harici disk / bulut).

## 2. Klasör ve adlandırma

| Öğe | Kural | Örnek |
|---|---|---|
| Kategori klasörü | `src/data/site.ts` → `kategoriler[].slug` ile aynı | `bungalov` |
| Proje klasörü | Proje `.md` dosyasının adı = URL slug'ı | `kemerli-pod-bungalov` |
| Dosya | `<proje-slug>-NN` (iki haneli sıra), uzantısız ve boyut eksiz yazılır | `kemerli-pod-bungalov-03` |

- Kategori kökünde (`public/images/ahsap-ev/*.webp`) veya `site.ts`'de karşılığı olmayan bir klasörde (`public/images/diger/`) duran fotoğraflar **sitede görünmez**; bir projeye bağlanmayı bekliyordur. "Diğer" niteliğindeki yapılar `ozel-tasarim` kategorisine girer.
- İki istisna, projelerden üretilen işlenmiş kopyalardır ve kaynak dosyaya dokunmaz: `public/images/hero/` (`scripts/hero-gorseli.mjs`) ve ana sayfa kategori kartlarının 4:5 vitrin fotoğrafları `public/images/vitrin/<kategori>-vitrin-*.webp` (`scripts/vitrin-gorseli.mjs`: ortak kadraj oranı, sıcak renk düzeltmesi, eşitlenmiş parlaklık; ev kadrajın üst yarısında kalır). Vitrin fotoğrafı değişecekse script'teki `kaynak` ve `kadraj` güncellenip yeniden çalıştırılır; önce `--onizleme` ile dört kart yan yana kontrol edilir.
- Fotoğraf başka bir yola taşınırsa eski → yeni eşleşmesi `scripts/gorsel-tasima-kaydi.json`'a eklenir.

## 3. Projeye bağlama (frontmatter)

```yaml
kapak: kemerli-pod-bungalov-01          # fotograflar listesindeki dosyalardan biri olmalı
fotograflar:                             # galeri bu sırayla gösterilir
  - dosya: kemerli-pod-bungalov-01
    alt: "Kemerli pod bungalov – orman içinde ön cephe ve ahşap teras"
```

Şema (`src/content/config.ts`) derlemede şunları zorlar: en az 4 fotoğraf, alt metni 10–125 karakter, `kapak` listede olmalı.

- **Kapak** projeyi en iyi anlatan dış cephe fotoğrafıdır; kategori kartlarında ve Open Graph önizlemesinde de kullanılır.
- **Sıra:** dış cephe → detaylar → iç mekân → yapım aşaması.
- **Alt metni:** `{proje adı} – {ne görünüyor}`; projedeki her fotoğrafta farklı. "Fotoğraf", "resim" diye başlamaz.
- Yüz, araç plakası veya kapı numarası net görünen fotoğraf, müşteri izni yoksa kırpılır ya da kullanılmaz.

## 4. Sayfada kullanım

**Elle `srcset` yazılmaz.** `src/lib/gorsel.ts` içindeki `gorsel(yol)` derleme sırasında üç varyantı ve gerçek boyutları okur, dosya yoksa derlemeyi durdurur:

```astro
---
import { gorsel } from '../lib/gorsel';
import { fotoYolu } from '../lib/projeler';
const g = await gorsel(fotoYolu(proje, 'kemerli-pod-bungalov-01'));
// g.src (1000), g.buyuk (1600), g.srcset, g.width, g.height
---
<img src={g.src} srcset={g.srcset} sizes="…" width={g.width} height={g.height} alt="…" loading="lazy" decoding="async" />
```

- Kartlar için `Kart.astro` / `ProjeKarti.astro` kullanılır; `sizes`'ı `kartSizes()` hesaplar (4:3 karta kırpılan panoramik fotoğraflara daha geniş kaynak seçer).
- `sizes` görselin **gerçek görüntülenme genişliğini** anlatır. `100vw` yalnızca tam genişlikte hero ve ışık kutusunda kullanılır; yanlış `sizes` mobile 1600px dosya indirtir.
- `width` ve `height` her zaman verilir (CLS önlenir). Kırpma CSS'te yapılır: kapsayıcıda `aspect-ratio: 4 / 3`, görselde `object-fit: cover`.

### Yükleme önceliği

| Görsel | Nitelikler |
|---|---|
| Sayfanın LCP görseli: ana sayfa hero'su, proje galerisinin kapağı, liste sayfasındaki ilk kart (`oncelikli`) | `loading="eager"` `fetchpriority="high"` |
| Header logosu | `loading="eager"` (fetchpriority yok) |
| Diğer tüm görseller (kartlar, galeri küçükleri, footer logosu) | `loading="lazy"` `decoding="async"` |

Bir sayfada **yalnızca bir** görsel `fetchpriority="high"` taşır.

## 5. `public/` klasörü

- `public/` içindeki dosyalar Astro tarafından **optimize edilmez**, olduğu gibi yayınlanır. Büyük PNG/JPG oraya konup doğrudan kullanılmaz.
- Logolar SVG olarak doğrudan kullanılır (`public/logo/*.svg`). SVG'si olmayan tekil raster görseller için görüntülenme boyutunun ~2 katı genişlikte WebP üretilir.
- Bağlantı önizlemesi (Open Graph) görselleri `public/`'e konmaz; derlemede kapak fotoğraflarından 1200×630 JPEG olarak üretilir (`src/lib/paylasim.ts`, ayrıntı `seo-kurallar` §14). Proje ve kategori sayfaları kapak fotoğrafını, diğer sayfalar logolu varsayılan görseli kullanır. `src/data/site.ts` → `varsayilanGorsel` yalnızca schema.org işletme şemasının görselidir.

## 6. Denetim

```bash
npm run build && npm run check:images
```

`scripts/check-images.mjs` derlenmiş tüm sayfalarda şunları denetler: `<img src/srcset>`, ikon `<link>`'leri, `og:image`, JSON-LD `image`/`logo` ve galeri bağlantıları. Dosya var mı, boş mu, açılabiliyor mu, `srcset`'teki `NNNw` gerçek genişlikle aynı mı. Fotoğraf eklenen veya taşınan her değişiklikten sonra çalıştırılır.

## 7. Kontrol Listesi

- [ ] Fotoğraflar gerçek proje fotoğrafı; stok veya yapay zekâ görseli yok
- [ ] `npm run images` ile üretildi; üç varyant (600/1000/1600) var
- [ ] Klasör `<kategori>/<proje-slug>/`, dosya adı `<proje-slug>-NN`
- [ ] Frontmatter'da her fotoğrafın ayrı ve anlamlı alt metni var; kapak dış cephe
- [ ] `srcset` `gorsel()` ile üretildi; `sizes` gerçek genişliği anlatıyor
- [ ] Yalnızca LCP görseli eager + `fetchpriority="high"`, gerisi lazy
- [ ] `width`/`height` verildi
- [ ] `npm run check:images` temiz
