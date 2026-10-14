# Arşiv

Sitede yayınlanmayan, silinmemesi istenen dosyalar. Bu klasör `public/` dışında olduğu için derlemeye girmez ve Galeri'de görünmez. `npm run yeni-proje` de buraya bakmaz, yani buradaki fotoğraflardan taslak proje kaydı üretilmez.

| Klasör | Neden arşivde | Tarih |
|---|---|---|
| `gorseller/ahsap-ev/gri-catili-verandali-ahsap-ev/` | "Gri Çatılı Verandalı Ahşap Ev" projesi kaldırıldı. Aynı yapı "Taş Kaideli Verandalı Ahşap Ev" olarak sitede duruyor (bu fotoğraflar onun tamamlanmış hâlinin başka açılardan çekimi). Eski adres 301 ile o projeye yönlenir (`vercel.json`). Ana sayfadaki Ahşap Ev kartının fotoğrafı bu klasördeki 01'den üretildi (`scripts/vitrin-gorseli.mjs`). | 12 Ekim 2026 |
| `gorseller/ahsap-ev/`, `gorseller/bungalov/`, `gorseller/tiny-house/`, `gorseller/diger/` (dosyalar doğrudan kategori klasöründe) | Henüz bir projeye bağlanmamış müşteri fotoğrafları (WebP, `-600/-1000/-1600`); sitenin hiçbir sayfasında kullanılmıyordu. Projeye bağlanacaksa `public/images/<kategori>/<proje-slug>/` altına geri taşınır. | 14 Ekim 2026 |
| `gorseller/ahsap-ev/hero-anasayfa.jpeg` | Ana sayfa hero görsellerinin kaynak fotoğrafı (sitede işlenmiş WebP kopyaları kullanılır). | 14 Ekim 2026 |
| `gorseller/hero/` | `scripts/hero-gorseli.mjs`'in eski çıktısı (kiremit çatılı ev hero'su); sitede kullanılmıyor. Script yeniden çalıştırılırsa `public/images/hero/` altına yeniden üretir. | 14 Ekim 2026 |
| `logo/` | Logo kaynakları: açık zemin ve ikon SVG'leri (baskı/belge ve favicon kaynağı), koyu zemin ve ikon PNG'leri. Sitede kullanılan koyu zemin SVG'si ve schema.org'daki açık zemin PNG'si `public/logo/`'da kaldı. | 14 Ekim 2026 |

Dosya yollarının eski → yeni eşleşmesi: `scripts/gorsel-tasima-kaydi.json`.
