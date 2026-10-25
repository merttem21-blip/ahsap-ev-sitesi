# 2K AHŞAP web sitesi

2K AHŞAP'ın tanıtım sitesi: kategoriler, projeler, galeri, teklif ve iletişim formları. Astro ile üretilen statik bir sitedir, Vercel'de yayınlanır.

- Üretim: https://ahsap-ev-sitesi.vercel.app (alan adı: https://2kahsap.com)
- Proje kuralları: `CLAUDE.md` ve `.claude/skills/` (marka, SEO, görsel, responsive, güvenlik)

## Kurulum

Gerekenler: Node.js 20 (yerelde 20.18 ile çalışıyor) ve npm.

```bash
git clone https://github.com/merttem21-blip/ahsap-ev-sitesi.git
cd ahsap-ev-sitesi
npm install
```

Ortam değişkeni gerekmez; `.env.example` nedenini anlatır.

## Geliştirme

```bash
npm run dev       # http://localhost:4321, değişiklikler anında yansır
```

| Komut | Ne yapar |
|---|---|
| `npm run images` | `ham-gorseller/` altındaki fotoğrafları 600/1000/1600 px WebP olarak `public/images/`'a yazar |
| `npm run yeni-proje` | `images` + yeni proje klasörleri için fotoğraf listesi hazır `.md` taslağı (rehber: `docs/yeni-proje-ekleme.md`) |
| `npm run check:images` | Derlenmiş sitede kırık görsel arar (önce `npm run build`) |
| `npm run check:sss` | SSS akordeonunda soru açılınca sayfanın zıplamadığını denetler (Playwright) |
| `npm run jsonld-kontrol` | Derlenmiş sayfalardaki schema.org (JSON-LD) verisini denetler |
| `npm run form-kontrol` | Formların onaylı sürümle aynı olduğunu denetler (bkz. `docs/guvenli-mod/README.md`) |
| `npm run gorsel-kontrol` | Sayfaların ekran görüntüsünü onaylı referanslarla karşılaştırır (Playwright) |

## Build

```bash
npm run build     # dist/ klasörüne statik site; sitemap.xml ve robots.txt de burada üretilir
npm run preview   # dist/'i yerelde sunar
```

Görsel yolları derlemede doğrulanır: `src/lib/gorsel.ts` dosyası olmayan bir fotoğrafta derlemeyi durdurur.

## Deploy

Vercel GitHub deposuna bağlıdır; push yeterlidir.

- `main` → üretim (herkese açık).
- Diğer dallar (ör. `gelistirme-2026`) → önizleme adresi. Önizlemeler Vercel girişi ister.
- Yönlendirmeler (eski adresler için 301), güvenlik başlıkları ve CSP: `vercel.json`.
- Geri dönüş: Vercel → Deployments → önceki dağıtım → Instant Rollback.

## Klasör yapısı

```
src/
  pages/            sayfalar; dosya adı = adres
    [kategori].astro          kategori sayfası (/bungalov …)
    [kategori]/[proje].astro  proje detayı (/bungalov/<proje> …)
    paylasim/                 bağlantı önizlemesi (Open Graph) görselleri
  components/       Header, Footer, Hero, kartlar, galeri, formlar (form/)
  layouts/          sayfa iskeletleri (Layout, YasalLayout)
  content/projeler/ proje kayıtları (.md); şema: src/content/config.ts
  data/site.ts      firma bilgileri, kategoriler, form anahtarı: tek kaynak
  lib/              görsel, proje, schema.org ve paylaşım yardımcıları
  scripts/          tarayıcıda çalışan betikler (form, çerez bandı, hareket)
  styles/           genel CSS ve yazı tipleri
public/             olduğu gibi yayınlanır: images/, logo/, fonts/, favicon
scripts/            Node betikleri: görsel üretimi, yeni proje, kontroller
docs/               çalışma notları, teslim notu, güvenli mod referansları
arsiv/              yayınlanmayan kaynak dosyalar (bkz. arsiv/README.md)
  gorseller/        arşiv fotoğrafları; git'e girmez, ayrıca yedeklenir
  logo/             logo kaynakları (açık zemin ve ikon SVG'leri)
ham-gorseller/      orijinal fotoğraflar; git'e girmez, ayrıca yedeklenir
astro.config.mjs    site adresi, sitemap.xml ve robots.txt üretimi
vercel.json         yönlendirmeler ve güvenlik başlıkları
```

`arsiv/` ve `ham-gorseller/` derlemeye girmez. Sitede kullanılacak her görsel `public/images/` altında olmalıdır.

`arsiv/gorseller/` ve `ham-gorseller/` yeni bir klondan gelmez. Bunlara ihtiyaç duyan betikler (`npm run images`, `scripts/vitrin-gorseli.mjs`) yalnızca yedekten geri yüklenen klasörlerle çalışır. Sitenin derlenmesi bu klasörlere bağlı değildir.
