# 2K AHŞAP - Web Sitesi Proje Kuralları

## Şirket Bilgileri
- **Adı:** 2K AHŞAP
- **Açıklaması:** 2015 yılından beri Türkiye'de ahşap ev ve yapıları özel olarak tasarlayıp üreten, modern mimariye doğal malzemeleri harmanlayan bir şirket.
- **Adres:** Kaynarca, Akdeniz Cd. No:4/A, 34893 Pendik/İstanbul
- **Telefon:** 0532 250 40 77
- **Email:** info@2kahsap.com
- **WhatsApp:** 0532 250 40 77

## Sahibi
- **Adı:** Kadir Avcı
- **Pozisyonu:** Şirket Sahibi

## Sosyal Medya
- **Instagram:** https://www.instagram.com/2kahsap/
- **Facebook:** https://www.facebook.com/profile.php?id=61594732547189
- **LinkedIn:** https://www.linkedin.com/in/kadir-avc%C4%B1-a069b1440/

## Şirket Verileri
- **Kuruluş Yılı:** 2015
- **Çalışan Sayısı:** 15
- **Tamamlanmış Projeler:** 300+
- **Hizmet Alanları:** Bungalov, Villa, Tiny House, A-Frame, Çardak, Otel-Bar, Çocuk Oyun Parkı

## Sitenin Amacı
- Potansiyel müşterilere şirketin hizmetlerini profesyonel şekilde göstermek
- 350+ fotoğraf ile projelerini sergilemek
- Teknik şartnameleri ve ürün bilgilerini sağlamak
- İletişim formları ile potansiyel müşterileri toplayıp satış yapmak
- Referans müşteri testimonialları göstermek

## Site Tasarım Kuralları
- **Marka Stili:** marka-stili skill'ine bak
- **SEO:** seo-kurallar skill'ine bak
- **Güvenlik:** guvenlik-kurallari skill'ine bak
- **Görsel Yönetimi:** gorsel-yonetimi skill'ine bak
- **Responsive Düzen:** responsive-duzen skill'ine bak
- **Hallmark skill'i:** Bu projede marka-stili önceliklidir. Hallmark yalnızca açıkça çağrıldığında kullanılır (ör. `hallmark audit`). Renk, font, tema veya düzen kararında marka-stili ile çelişirse marka-stili geçerlidir. Bu projede Hallmark `tokens.css`, `.hallmark/` klasörü veya OKLCH renk tokenları oluşturmaz.
- **UI/UX Pro Max skill'i (ui-ux-pro-max):** Sayfa, bileşen, form, gezinme, responsive, erişilebilirlik ve performans işlerinde açıkça çağrılmasını beklemeden, gerektiği yerde kullanılır. Yalnızca `ux`, `landing` ve `icons` alanlarından ve `--stack astro` rehberinden yararlanılır. Renk, font, stil, tema ve animasyon kararları marka-stili'nden gelir: skill'in `color`, `typography`, `google-fonts`, `style`, `product` ve `gsap` önerileri ile `--design-system` çıktısı uygulanmaz. Bu projede `--persist` kullanılmaz ve `design-system/` klasörü oluşturulmaz. Proje skill'lerinden biriyle (marka-stili, responsive-duzen, seo-kurallar, gorsel-yonetimi, guvenlik-kurallari) çelişirse proje skill'i geçerlidir.
- **Skill kullanımı:** Her istekte konuya uyan skill'ler (yukarıdaki proje skill'leri ve ui-ux-pro-max) ayrıca söylenmesini beklemeden kullanılır. Hallmark bunun dışındadır; yalnızca açıkça çağrıldığında kullanılır.

## Logo Dosyaları
Konum: `public/logo/`. Format: **SVG**. Ayrıntılı kullanım kuralları marka-stili skill'inde.
- **Site geneli (header, footer, tüm koyu alanlar):** `2k-ahsap-logo-koyu-zemin.svg` — site baştan sona koyu temadır
- **Açık zeminli alanlar (site dışı: baskı, belge):** `2k-ahsap-logo-acik-zemin.svg`
- **Favicon:** `public/` kökünde `favicon.ico`, `apple-touch-icon.png`, `favicon.svg` (kaynak: `2k-ahsap-ikon.svg`)
- ✅ Üç SVG de `public/logo/` içinde. `favicon.svg`, ikon SVG'sinden kare tuvale ortalanarak üretildi.

## Teknik Bilgiler
- **Framework:** Astro (hızlı, SEO-friendly, statik site)
- **Hosting:** Vercel (github ile otomatik deploy)
- **Veritabanı:** JSON dosyalar (başlangıç için yeterli)
- **Admin Paneli:** Sonradan eklenecek (Crud işlemleri için)

## Sayfalar ve Fonksiyonları
1. **Ana Sayfa (/)** → Hero, Kategoriler, Öne çıkan projeler, Hakkımızda
2. **Kategoriler (/kategoriler)** → 8 kategori: Bungalov, Villa, Tiny House, A-Frame, Çardak, Otel-Bar, Çocuk Oyun Parkı, Diğer
3. **Kategori Detayı (/kategori/:id)** → Filtren/seçilmiş kategori fotoğrafları galeri
4. **Proje Detayı (/proje/:id)** → Büyük fotoğraf, teknik şartname tablosu, "Teklif Al" butonu
5. **Hakkımızda (/hakkimizda)** → Şirket hikâyesi, vizyon, misyon, ekip
6. **Referanslar (/referanslar)** → Müşteri yorumları ve projeler
7. **İletişim (/iletisim)** → İletişim formu (ad, email, telefon, mesaj, kategori seçimi)
8. **Admin Paneli (/admin)** → Proje, referans, şartname ekle/düzenle/sil


## Yapma
- ❌ Stok fotoğraf kullan; sadece müşteri projeleri
- ❌ Aşırı animasyon; basit ve profesyonel
- ❌ Türkçe yazım hatası; dikkat et
- ❌ Yavaş site; fotoğraflar optimize edilmiş WebP olmalı

## Olmalı
- ✅ Mobilye mükemmel uyum
- ✅ SEO yapılı (başlık, açıklama, alt metin)
- ✅ Hızlı yükleme
- ✅ Müşteri fotoğrafları ve hikâyeleri
- ✅ İletişim formu ve kolay bağlantı
- ✅ Admin paneli ile kolay yönetim

## Versiyon Kontrol
- Tüm değişiklikler git commit'lerine koyulmalı
- Commit mesajları Türkçe ve açıklayıcı olmalı
- Her büyük adımda push'la (Vercel otomatik deploy eder)
