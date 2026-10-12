# Hata: ana sayfa hero'su telefonda ve dikey tablette (13 Ekim 2026)

**Belirti (gerçek cihazda):**

- Telefonda (Android Chrome, yaklaşık 412×915) sayfa ilk açıldığında "Teklif Al" ve "Projeleri İncele" düğmeleri mobil alt menünün (O7) arkasında kalıyordu. Düğmelerin yarısı kesik görünüyordu.
- Dikey tablette ve telefonda "masaüstü sitesi" açıldığında hero ekran boyunca uzuyordu. Fotoğraf dev görünüyor; başlık, açıklama ve düğmeler en altta küçük kalıyordu.

**Neden:**

- **Telefon (< 641 px):** Metin, hero'da sabit bir yerden başlıyordu: dikey fotoğrafın boyunun %80'inden (412 px genişlikte 414 px aşağıdan). Metnin nerede bittiği ekran boyuna ve alt menüye bağlı değildi. Ekran kısaldıkça düğmeler alt menünün arkasına kayıyordu. Playwright'ta 412×915 ekranın tamamı görünür alan olduğu için sorun çıkmıyor. Gerçek telefonda durum çubuğu, adres çubuğu ve gezinme çubuğu görünür alanı yaklaşık 787 px'e indirir. Bu boyda düğmeler alt menünün ortasındaki Teklif Al dairesine 10 px kalıyordu. iPhone'larda Safari'nin görünür alanı daha kısadır; düğmeler orada tamamen alt menünün altında kalıyordu.
- **Tablet ve uzun ekran (≥ 641 px):** Hero ekran boyundaydı (`100svh`) ve yatay fotoğraf (1376×768) hero'yu `cover` ile kaplıyordu. Dikey ekranda fotoğraf ekran boyuna büyütülüyor ve yalnızca ortası görünüyordu: 768×1024'te genişliğin %42'si, 980×2000'de %27'si. İki ev de kadrajdan çıkıyor, ortadaki ağaçlar kalıyordu. Metin ekranın üçte birinden sonra başlayıp aşağı yaslandığı için en altta kalıyordu.

**Onaylı sürüm:** `Hero.astro`, `onayli-tasarim` etiketinden beri değişmedi. Hata onaylı sürümde de aynı.

## Düzeltme (`src/components/Hero.astro`)

Yalnızca hero'nun yüksekliği ve içerik yerleşimi değişti. Fotoğraf, metinler, renkler, fontlar, yazı boyutları ve düğme stilleri aynı.

- **Telefon (< 641 px):** İlk ekran, alt menünün ve iPhone'un alt güvenli alanının üstünde kalan görünür alandır: `100svh - --alt-menu-alan`. Metin bloğu (başlık, açıklama, iki düğme) bu alanın altına 24 px boşlukla yaslanır. İkon şeridi alt menünün altından, ilk ekranın dışından devam eder. Fotoğraf eskisi gibi kendi oranında, yanları kırpılmadan üstte durur; metin onun alt kısmına biner, altındaki karartma aynıdır.
  - `svh`, tarayıcının çubukları görünürkenki, yani sayfa ilk açıldığındaki boydur. `dvh` kullanılmadı: çubuklar kaydırınca gizlendiğinde hero'nun boyu değişir, sayfa zıplar.
  - Kısa ekranda açıklamanın üst ve alt boşluğu bir adım (8 px) daralır: 560 px boyda 16 / 24 px, 640 px ve üstünde eskisi gibi 24 / 32 px. iPhone SE'de bile metin bloğu header ile alt menünün arasına sığar.
- **Tablet ve uzun ekran (641–1279 px):** Hero ekran boyundadır, ama en fazla genişliğin %90'ı kadar uzar. Dikey ekranda fotoğrafın en az ~%62'si görünür; sağdaki kütük ev kadrajda kalır. Yatay ekranda (ör. 1024×768, 1180×820) sınır devreye girmez. Metin, header ile ikon şeridinin arasında dikeyde ortalanır; masaüstünde zaten böyleydi.
- **Masaüstü (≥ 1280 px):** Değişiklik yok. Hero her zaman ekran boyundadır. `gorsel-kontrol` 1280 px'te ana sayfa dahil tüm sayfalarda %0 fark verdi.

## Ölçümler

Chromium, sayfa ilk açıldığında. WebKit'te tüm değerler aynı çıktı. "Sınır", düğmelerin kesildiği yerdir: alt menünün ortasındaki Teklif Al dairesinin üst kenarı (daire düğmelerle aynı hizaya düşer). Alt menünün olmadığı genişlikte (≥ 768 px) ekranın alt kenarıdır. Tüm değerler px.

| Ekran | Hero boyu önce → sonra | Başlığın üstü önce → sonra | Düğmelerin altı önce → sonra | Sınır | Düğmeler önce → sonra |
|---|---|---|---|---|---|
| 375×667 | 911 → 750 | 376 → 215 | 716 → 555 | 575 | ✗ 141 px altında → ✓ 20 px üstünde |
| 390×844 | 926 → 927 | 392 → 392 | 731 → 732 | 752 | ✓ 21 → ✓ 20 |
| 412×915 | 915 → 998 | 449 → 532 | 720 → 803 | 823 | ✓ 103 → ✓ 20 |
| 768×1024 | 1024 → 691 | 598 → 194 | 869 → 465 | 1024 | ✓ (ekranın en altında) → ✓ |
| 820×1180 | 1180 → 738 | 754 → 217 | 1025 → 488 | 1180 | ✓ (ekranın en altında) → ✓ |
| 980×2000 | 2000 → 882 | 1577 → 291 | 1851 → 564 | 2000 | ✓ (ekranın en altında) → ✓ |
| 375×553 · iPhone SE, Safari | 911 → 640 | 376 → 122 | 716 → 446 | 461 | ✗ 255 px altında → ✓ 15 px üstünde |
| 390×664 · iPhone 13, Safari | 926 → 747 | 392 → 212 | 731 → 552 | 572 | ✗ 159 px altında → ✓ 20 px üstünde |
| 412×787 · Android Chrome | 880 → 870 | 414 → 404 | 685 → 675 | 695 | ✓ 10 → ✓ 20 |
| 390×745 · iPhone 13, alt güvenli alan 34 px | 926 → 794 | 392 → 259 | 731 → 599 | 619 | ✗ 112 px altında → ✓ 20 px üstünde |

- Telefonda hero boyu, ilk ekran ile altındaki ikon şeridinin toplamıdır. Örneğin 412×915'te hero uzadı; metin alt menünün hemen üstüne indi, ikon şeridi ilk ekranın altına geçti.
- Yazı boyutları hiçbir boyutta değişmedi: başlık 36 px (980 px'te 37,24 px), açıklama 18 px.

## Görüntüler

Sayfa ilk açıldığında ekranın kendisi; `prefers-reduced-motion` açık, yani giriş animasyonları bitmiş hali.

- `once/`: düzeltmeden önce
- `sonra/`: düzeltmeden sonra
- `karsilastirma/`: her boyut için önce | sonra yan yana. İki özet de var: `00-ozet-istenen-boyutlar.jpg` (istenen 6 boyut) ve `00-ozet-tarayici-gorunur-alan.jpg` (gerçek tarayıcının görünür alanı).

Dosya adları `<motor>-<en>x<boy>[-<cihaz>].jpg` biçimindedir. Her boyut Chromium ve WebKit'te çekildi. Çekimler PNG olarak alındı, depoda yer kaplamasın diye JPEG'e (kalite 85) çevrildi.

- **İstenen boyutlar:** 375×667, 390×844, 412×915, 768×1024, 820×1180, 980×2000. Playwright'ta tarayıcı çubuğu yoktur; bu boyutlarda ekranın tamamı görünür alandır. 980×2000, telefonda "masaüstü sitesi" açıkken tarayıcının sayfaya verdiği 980 px genişliği taklit eder.
- **Gerçek tarayıcının görünür alanı (yaklaşık):** iPhone SE'de Safari 375×553, iPhone 13'te Safari 390×664, 412×915 ekranlı Android telefonda Chrome 412×787 (durum çubuğu, adres çubuğu ve 3 tuşlu gezinme çubuğu düşülmüş). Gerçek telefondaki hata ancak bu boylarda görünür.
- **Alt güvenli alan:** Tarayıcı emülasyonunda iPhone'un alt güvenli alanı yoktur (`env(safe-area-inset-bottom)` hep 0). `390x745-iphone-13-guvenli-alan-34` çekiminde CSS'teki bu değer 34 px'e çevrildi. Bu, Safari'de adres çubuğu üstteyken altta araç çubuğu olmadığı durumdur. Alt menü 34 px yukarı kalkar, metin de onunla birlikte yükselir.

## Header kontrolü (Teklif Al sayfası, telefonda kaydırınca)

**Sonuç: Tasarlanan davranıştı, hata değildi; onaylı sürümle birebir aynıydı.** Müşteri kararıyla yalnızca kaydırılmış header'ın zemini %95'ten %100 opaklığa çıkarıldı (aşağıda "Sonradan yapılan değişiklik"). Header'ın boyu, logosu ve davranışı değişmedi.

- Alt sayfalarda (Teklif Al dahil) header mobilde 88 px'tir: 64 px logo + 2 × 12 px boşluk. Logo zaten küçülmüş durumdaki boyda (64 px) olduğu için kaydırınca küçülmez. Header aynı boyda üstte sabit kalır. Kaydırınca küçülme yalnızca ana sayfada (logo 90 → 64 px) ve masaüstünde (alt sayfalarda 72 → 64 px, ana sayfada 140 → 64 px) görülür. Logo boyları marka-stili §4'te tanımlıdır.
- Kaydırınca header'ın zemini %95 opak antrasite dönüyordu (`--color-ust-kucuk: rgba(46, 46, 46, 0.95)`, marka-stili §6). Kalan %5 saydamlık yüzünden arkadan geçen sayfa yazısı soluk seçiliyordu: ekranda "1 / 3 Yapı" ve adım numaraları. Bu, zeminin tanımı gereğiydi.
- Ekran payı: 390×664'te header 88 px (ekranın %13'ü). Alttaki alt menüyle (88 px) birlikte ekranın yaklaşık %27'si sabit öğelerdir.
- **Kanıt:** `Header.astro` içindeki kaydırma kuralları ve `--color-ust-kucuk`, `onayli-tasarim`'den beri değişmemişti. O zamandan beri header'daki tek değişiklik açık menü paneliyle ilgili (`docs/hata-mobil-menu/`). Üretimdeki onaylı sürüm (https://ahsap-ev-sitesi.vercel.app) ile değişiklik öncesi yerel derleme 390×664 ve 412×787'de, sayfa 420 px kaydırılmışken çekildi. Ölçümler aynıydı: header 88 px, logo 64 px, zemin `rgba(46, 46, 46, 0.95)`.

### Sonradan yapılan değişiklik: tam opak zemin (müşteri onaylı, 13 Ekim 2026)

- `--color-ust-kucuk` artık düz antrasit (`var(--color-antrasit)`, `#2E2E2E`). Kaydırınca header'ın arkasından sayfa yazısı görünmez. Değişiklik tüm sayfalarda geçerlidir. marka-stili §6 buna göre güncellendi.
- Header'ın başka hiçbir özelliği değişmedi: boy 88 px, logo 64 px, konum, alt çizgi ve geçişler aynı. Kaydırılmamış header'da bu katman görünmez (`opacity: 0`). Bu yüzden `gorsel-kontrol`'ün kaydırılmamış hiçbir çekiminde fark çıkmadı. Kaydırılmış sayfada çekilen M1 ve M2'de de fark yok: açık menü paneli header'ın zeminini örter.
- Görüntüler `header-kontrol/` altında: `onayli-*` önceki %95 opak zemin (üretim), `tam-opak-*` yeni zemin. `*-header-yakin` header'ın yakın çekimidir (2× çözünürlük).
- Değerlendirilip yapılmayan: mobil alt sayfalarda header'ın kaydırınca daha alçak bir şeride inmesi.

## Bilinen sınırlar

- Metin bloğunun header ile alt menünün arasına sığmadığı çok kısa ekranlarda metin header'ın hemen altından başlar, düğmeler kaydırınca görünür. Örnek: 1. nesil iPhone SE'de Safari (320×460) ya da yatay tutulan telefon (667×375). Yazı boyutu küçültülmeden çözülemez.
- 641–1023 px'te metin artık dikeyde ortalı; önceden ekranın üçte birinden sonra başlayıp aşağı yaslanıyordu. Bu, yatay tutulan küçük tabletlerde ve telefonlarda da metni biraz yukarı taşır. Masaüstü (≥ 1280 px) etkilenmez.
- Gerçek tarayıcıların görünür alan değerleri yaklaşıktır; cihaz, tarayıcı sürümü ve gezinme ayarına göre birkaç on piksel değişebilir. Düzeltme sabit değere değil `svh`'ye dayandığı için her boyda aynı biçimde çalışır.
