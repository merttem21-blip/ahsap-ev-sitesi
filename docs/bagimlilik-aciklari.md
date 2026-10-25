# Bağımlılık açıkları ve Astro yükseltmesi

- **Tarih:** 26 Ekim 2026
- **Karar:** Astro yükseltmesi yayından sonraya ertelendi. `npm audit fix --force` çalıştırılmaz.

## Mevcut açıklar (`npm audit`: 6)

| Paket | Önem | Nasıl geliyor | Nerede çalışıyor |
|---|---|---|---|
| astro 4.16.19 | kritik | doğrudan | derleme, geliştirme sunucusu |
| vite 5.4.21 | yüksek | astro → vite | yalnızca geliştirme sunucusu |
| zod 3.25.76 | yüksek | astro → zod | derlemede içerik şeması |
| zod-to-ts 1.2.0 | yüksek | astro → zod-to-ts | tip üretimi (`npm run check`) |
| sharp 0.33.5 | yüksek | doğrudan + astro → sharp | derleme ve görsel betikleri |
| esbuild 0.21.5 | orta | astro → esbuild, vite → esbuild | geliştirme ve derleme |

## Neden ertelendi

- Hiçbiri sürüm atlamadan kapanmıyor. Zorlamasız `npm audit fix` hiçbir şeyi değiştirmiyor; düzeltmeler Astro 7.4.2 ve sharp 0.35.5'te.
- Yayındaki siteyi etkilemiyor. Site tamamen statik (SSR ve adapter yok), yayına giden JS'te bu paketlerden kod yok. Açıklı Astro özellikleri (`define:vars`, View Transitions, server islands, `astro:assets`, `client:` adaları) kullanılmıyor; şablondaki veriler yalnızca bizim.
- Üç ana sürümlük yükseltme görünümü ve davranışı değiştirebilir. Onaylı tasarım birebir korunmalı (Güvenli Mod); yayın öncesinde bu risk alınmıyor.
- O zamana kadar: geliştirme sunucusu yalnızca bu bilgisayarda çalıştırılır (`--host` yok); sunucu açıkken tanımadık sitelerde gezinilmez.

## Yükseltme sırası

1. Astro 4 → 5
2. Astro 5 → 6
3. Astro 6 → 7 (7.4.2 veya üstü; Node 22.23.4 ve üstünü ister)

Her adımdan önce resmi yükseltme rehberi okunur. Her adım ayrı dalda, ayrı commit olarak yapılır ve tüm kontrollerden geçer: `check`, `build`, `check:images`, `jsonld-kontrol`, `form-kontrol`, `check:sss`, `gorsel-kontrol`. sharp 0.33 → 0.35 aynı çalışmada ele alınır.

## En riskli noktalar

- **URL'lerin korunması:** Astro 5'te içerik koleksiyonları yeni sisteme geçer ve proje kayıtlarında `slug` yerine `id` gelir. Proje adresleri (`src/lib/projeler.ts`), fotoğraf yolları (`fotoYolu`) ve paylaşım görselleri (`src/lib/paylasim.ts`) bundan üretilir. Yükseltmeden önce ve sonra `sitemap.xml` ile `dist/` sayfa listesi birebir karşılaştırılır; tek bir adres değişse bile SEO kaybı olur.
- **Betik sırası:** Astro 5'te `<script>` blokları sayfanın başına taşınmaz, yazıldıkları yerde çalışır. İşlenen betiği olan 9 dosya etkilenebilir: `CerezBandi`, `Galeri`, `Header`, `SssAkordeon`, `Layout`, `galeri`, `iletisim`, `index`, `teklif-al`. `check:sss`, `form-kontrol` ve elle deneme gerekir.
- **CSP hash'leri:** `vercel.json`'daki Content-Security-Policy (şimdilik Report-Only) satır içi betikler için iki sha256 özeti içerir (çerez bandı, `CerezBandi.astro`). Astro'nun ürettiği satır içi betik değişirse özetler yeniden hesaplanır.
- **Diğer:** Astro 6'da şemaların zod 4'e geçmesi (`src/content/config.ts`'deki hata mesajlarının yazımı), Vite sürümü, `@astrojs/check` uyumu.
