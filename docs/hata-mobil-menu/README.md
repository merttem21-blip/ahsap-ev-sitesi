# Hata: mobil menü paneli kesiliyor ve kaymıyor (12 Ekim 2026)

**Belirti (gerçek telefonda):** Sayfa biraz aşağı kaydırılmışken alt menüden "Menü" açılınca panelde yalnızca "Ana Sayfa" ve yarısı kesik "Projeler" görünüyordu. Diğer bağlantılar görünmüyor, panel kaymıyordu. Altta görünen telefon, WhatsApp, e-posta, adres ve harita bölümü panele ait değildi. Bunlar İletişim sayfasının kendi içeriğiydi ve kesilen panelin altından görünüyordu.

**Neden:** Sayfa 40 px'ten fazla kaydırılınca header küçülür (`.ust-kucuk`) ve iç kutusuna `transform: translateY(...)` verilir. Mobilde bu değer `translateY(0)` olur, ama dönüşüm yine de sabit (`position: fixed`) paneli 88 px'lik header kutusuna hapseder. Panel ekran boyu yerine 208 px yüksekliğinde kalıyordu. Açık menü için bu dönüşümü sıfırlayan kural vardı, ancak `.ust-kucuk .ust-ic` kuralından daha az özgül olduğu için uygulanmıyordu. Sayfa en üstteyken hata görülmüyordu.

**Onaylı sürüm:** Hata `onayli-tasarim` etiketinde (57268a2, üretimdeki dağıtım) da birebir aynı.

**Düzeltme** (`src/components/Header.astro`, `src/scripts/hareket.ts`):

- Panel açıkken header'ın kaydırılmış durum dönüşümleri de sıfırlanır. Panel ekran boyunda olur, header açılıştaki üst durumunda görünür.
- Panel kendi içinde kayar. Kaydırma arkadaki sayfaya taşmaz (`overscroll-behavior: contain`). Fareli tarayıcıda (768–1023 px) Lenis panel açıkken devreye girmez; önceden tekerlek arkadaki kilitli sayfayı kaydırıyordu.
- Üstteki logo şeridi ile alttaki alt menü ve güvenli alan şeridi dolgu yerine zeminle aynı renkte kenarlık oldu. Kayan bağlantılar logonun ve alt menünün altından geçmez. Duran panelin görünümü piksel piksel aynıdır.
- Panel her açılışta en üstten başlar. Kapanınca sayfa kaldığı yerden devam eder.

**Görüntüler:** Sayfa 600 px kaydırılmış, `/iletisim`, menü açık.

- `once/`: düzeltmeden önce
- `sonra/`: düzeltmeden sonra. 375×667 ve 768×600'de panel sığmaz ve kendi içinde kayar. Bu boyutlar için panelin en üstte (`-en-ust`) ve en altta (`-en-alt`) olduğu iki hal var.

**Sağ kenardaki yarım ☰ düğmesi:** Sitenin parçası değil. Vercel'in önizleme dağıtımlarında giriş yapmış ekip üyelerine gösterdiği Vercel Toolbar düğmesidir. Kapalıyken menü ikonlu yuvarlak bir düğme olarak görünür ve ekran kenarına yaslanabilir. Önizleme adresleri giriş istediği için ziyaretçiler bu düğmeyi görmez. Sitenin 768 px altındaki tek ☰ düğmesi alt menüdeki "Menü"dür. Header'daki ☰ düğmesi bu genişlikte `display: none` durumundadır.
