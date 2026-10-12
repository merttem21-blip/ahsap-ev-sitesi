# Ana sayfa bölüm geçişleri: tespit ve karar (12–13 Ekim 2026)

Müşterinin fark ettiği iki sorun vardı. Hero'nun bitişinde sert düz çizgiler görünüyordu. Bölümler arasındaki boşluklar da düzensizdi.

**Bölüm haritası:** A1 Hero · A2 Ürünlerimiz · A3 Sürecimiz · A4 Neden Ahşap · A5 SSS · A6 Footer (CTA bandı).

Ölçümler, bir bölümün son içeriği (metin, kart, buton) ile sonraki bölümün ilk içeriği arasındaki boşluğu gösterir. Değerler 375 / 768 / 1280 px içindir. Sabit öğeler (WhatsApp düğmesi, mobil alt menü) çekimlerde gizlendi.

## 1. Tespit (değişiklikten önce)

| Geçiş | Zeminler | Sorun | Boşluk (px) |
|---|---|---|---|
| A1 → A2 | gece → gece (hero altı zemine erir) | **Tutarsız boşluk:** Ürünlerimiz, hero'nun hemen altında başlıyordu (şeridin alt boşluğu 48 + bölümün üst boşluğu 48). Bu boşluk diğer geçişlerin yarısından azdı, hero kesilmiş gibi görünüyordu. **Sert çizgi:** Ürünlerimiz'in antrasit bandı kartların 48 / 64 / 80 px altından başlıyordu. Sınırdaki 1px çizgi kartların arkasından tam genişlikte geçiyordu. Bu, hero bittikten hemen sonra görülen ani ton değişimi ve düz çizgiydi. **Hero içi:** İkon şeridinin üst çizgisi fotoğrafın üstünden tam genişlikte geçiyor. Bu çizgi hero'nun içeriğine ait. Fotoğraf erimesinin kendisinde kesik kenar yok, erime yumuşak. 768 px'te ikon şeridi erimenin ortasında kalıyor ve fotoğraf şeridin hemen altına kadar görünüyor. | 96 / 96 / 96 |
| A2 → A3 | antrasit → gece | 1px çizgi ve ani ton değişimi. Boşluk 1280 px'te A1 → A2'nin 2,7 katıydı. | 161 / 161 / 257 |
| A3 → A4 | gece → antrasit | 1px çizgi ve ani ton değişimi | 161 / 161 / 257 |
| A4 → A5 | antrasit → gece | 1px çizgi ve ani ton değişimi | 161 / 161 / 257 |
| A5 → A6 | gece → antrasit | Ani ton değişimi, çizgi yok. Footer'ın üst boşluğu 32 px olduğu için boşluk diğerlerinden kısaydı. | 112 / 112 / 160 |

**Ritim:** Bölüm boşluğu `--bolum: clamp(80px, 10vw, 128px)` olarak tanımlı: 375 ve 768 px'te 80 px, 1280 px'te 128 px. Tablet ayrı bir ölçek almıyordu. Ürünlerimiz'in üst boşluğu ise sabit 48 px'ti.

## 2. Karar ve uygulama (13 Ekim 2026)

Üç seçenek hazırlandı:

- **A) Sade:** tek boşluk ritmi; çizgiler kaldırıldı.
- **B) Karartmalı:** A'ya ek olarak hero altında daha uzun karartma ve bölümler arasında gradyanlar.
- **C) Ahşap dokunuşu:** A'ya ek olarak başlık üstünde ahşap ayraç ve antrasit yerine `#262625`.

Müşteri **A'nın boşluk ritmiyle C'nin ton yumuşatmasını** seçti. B kullanılmadı; `CLAUDE.md`'deki "Gradyan yok" kuralı aynen geçerli. Başlık üstü ayraç da eklenmedi.

Öncelikli sorun A2'deki antrasit banttı: kartların arkasında sert bir yatay kenarla bitiyordu. İki hal karşılaştırıldı: bant kartların arkasında ya da kartların alt kenarından başlayarak. Müşteri ikincisini seçti.

Uygulanan:

- **Tek ritim:** Her bölümün üst ve alt iç boşluğu `--bolum-ritim`: mobilde 64 px, 768 px ve üstünde 96 px. Değişken `src/pages/index.astro` içindeki `.ana-akis` kabında tanımlı. Sürecimiz, Neden Ahşap ve SSS bu değişkeni bulursa kullanır. Hakkımızda ve kategori sayfalarında eskisi gibi `--bolum` geçerli.
- **Hero → Ürünlerimiz:** İki bölüm aynı gece zeminde sürdüğü için ikon şeridinden bölüm etiketine 2 ritim boşluk var.
- **Ton:** Ürünlerimiz bandı ve Neden Ahşap, antrasit yerine `--color-zemin-ara-yumusak` kullanıyor. Bu ton `#262625`: gece + krem %4, yani gece üstündeki kart yüzeyiyle aynı.
- **Ürünlerimiz bandı:** Kartlar tamamen gece zeminde duruyor. Bant kartların alt kenarından başlıyor ve bölümün sonuna kadar uzanıyor. 375, 768 ve 1280 px'te bandın üst kenarı kartların alt kenarıyla piksel düzeyinde aynı hizada.
- **Çizgi ve gradyan yok:** Bölüm sınırlarındaki 1px çizgiler kaldırıldı. Bölümleri yalnızca ton farkı ayırıyor.
- **Dokunulmayanlar:** Hero'daki ikon şeridinin üst çizgisi değişmedi; sonra ayrıca bakılacak. Footer site genelinde ortak olduğu için değişmedi.

| Boşluk (px) | A1 → A2 | A2 → A3 | A3 → A4 | A4 → A5 | A5 → A6 |
|---|---|---|---|---|---|
| Önce, 375 / 768 / 1280 | 96 / 96 / 96 | 161 / 161 / 257 | 161 / 161 / 257 | 161 / 161 / 257 | 112 / 112 / 160 |
| Sonra, 375 / 768 / 1280 | 128 / 192 / 192 | 128 / 192 / 192 | 128 / 192 / 192 | 128 / 192 / 192 | 96 / 128 / 128 |

A5 → A6 diğer geçişlerden kısa kalıyor, çünkü footer CTA bandının üst boşluğu (32 px) site genelinde ortak.

## 3. Görüntüler

Sabit öğeler (WhatsApp düğmesi, mobil alt menü) çekimlerde gizli.

| Klasör / dosya | İçerik |
|---|---|
| `0-mevcut/` | Değişiklikten önceki ana sayfa: tam sayfa (`ana-sayfa-375`, `-1280`) ve hero bitişinin yakın çekimi (`hero-bitisi-375`, `-1280`). 375 px'te fotoğrafın erimesi metnin üstünde başladığı için yakın çekim fotoğrafın ortasından alındı. |
| `secim/ana-sayfa-*`, `secim/hero-bitisi-*` | Uygulanan hâlin aynı çekimleri |
| `secim/a2-uc-hal-1280.png`, `-375.png` | A2'nin üç hali yan yana: 1. bugünkü, 2. bant kartların arkasında, 3. bant kartların altında (uygulanan) |
| `secim/a2-a3-bant-altta-1280.png`, `-375.png` | Uygulanan hâlde kartların altından Sürecimiz'e geçişin 1:1 yakın çekimi |

## 4. Diğer sayfalarda benzer durumlar (yalnızca liste; ayrı iş olarak bakılacak)

- **Footer CTA bandı (tüm sayfalar):** Gece zeminden antrasite çizgisiz ve ani bir geçiş var. Üstündeki boşluk sayfaya göre değişiyor: 1280 px'te 128 ile 193 px arası.
- **Sayfa başlık bantları:** Hakkımızda, SSS, Teklif Al, İletişim ve yasal sayfaların antrasit bandının altında 1px çizgi var. Projeler, kategori, proje detayı ve galeride yok.
- **Kategori sayfası (`/bungalov`):** Projeler → SSS geçişi aynı zeminde ve arada 1px çizgi var. Boşluk 1280 px'te 225 px, 375 px'te 145 px; sayfanın diğer geçişlerinden belirgin biçimde büyük.
- **Hakkımızda:** Başlık bandı → Sürecimiz geçişinde çizgi ve ton değişimi var. Boşluk 1280 px'te 225 px, 375 px'te 145 px.
- **Proje detayı:** Bölümler arası boşluklar tutarsız: 1280 px'te 72, 89 ve 209 px; 375 px'te 56, 65 ve 145 px.
- **SSS sayfası:** Son bölümün üst ve alt boşluğu 1280 px'te 161 px. Sayfanın diğer boşluklarından büyük.
