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

## Logo Dosyaları
Konum: `public/logo/`. Format: **SVG**. Ayrıntılı kullanım kuralları marka-stili skill'inde.
- **Header ve footer:** `2k-ahsap-logo-koyu-zemin.svg` (header ve footer zemini koyu/antrasit)
- **Açık zeminli alanlar:** `2k-ahsap-logo-acik-zemin.svg`
- **Favicon:** `public/` kökünde `favicon.ico`, `apple-touch-icon.png`, `favicon.svg` (kaynak: `2k-ahsap-ikon.svg`)
- ✅ `2k-ahsap-logo-koyu-zemin.svg` eklendi; header ve footer'da kullanılıyor.
- ⚠️ `2k-ahsap-logo-acik-zemin.svg` ve `2k-ahsap-ikon.svg` henüz yok; gelene kadar aynı adlı `.png` dosyaları geçici olarak kullanılır. `favicon.svg`, SVG ikon gelince üretilecek.

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
