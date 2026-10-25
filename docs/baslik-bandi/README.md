> Bu klasörün görselleri 25 Ekim 2026'da depodan kaldırıldı (yer açmak için). Son hâlleri `98d28cd` commit'inde duruyor: `git checkout 98d28cd -- docs/baslik-bandi/`

# Alt sayfa başlık bandı, deneme (15 Ekim 2026, dal: deneme/baslik-bandi)

Projeler, Galeri ve İletişim'in başlık bandı (breadcrumb, H1, giriş metni) iki seçenekle denendi. Renk token'ları,
fontlar ve metinler değişmedi. **Karar: A** (müşteri, 15 Ekim 2026), ayarlarıyla; uygulanan son hal en altta
("Son hal") ve `son/` klasöründe. Aşağıdaki A/B karşılaştırması deneme aşamasının kaydıdır.

## Envanter (değişiklik öncesi)

Ortak bileşen yok; her sayfa bandı kendi içinde yazıyor. Hepsinin zemini antrasit (`--color-zemin-ara`), yüksekliği
sabit değil, iç boşluk + içerik kadar (masaüstünde ~250px). H1 `clamp(2rem, 5vw, 3rem)`, 700.

| Sayfa | Dosya / sınıf | Not |
|---|---|---|
| Projeler | `src/pages/projeler.astro` `.projeler-ust` | boşluk 16/40 → ≥ 768px 24/56 |
| Galeri | `src/pages/galeri.astro` `.galeri-ust` | aynı |
| İletişim | `src/pages/iletisim.astro` `.sayfa-ust` | alt kenarda 1px çizgi; 16/48 → 24/64 |
| Teklif Al | `src/pages/teklif-al.astro` `.sayfa-ust` | İletişim ile aynı |
| SSS | `src/pages/sss.astro` `.sss-sayfa-ust` | bandın içinde soru grubu kısayolları da var |
| Kategori sayfaları | `src/pages/[kategori].astro` `.kategori-ust` | |
| Proje detayı | `src/pages/[kategori]/[proje].astro` `.proje-ust` | giriş metni yok; altında büyük proje galerisi |
| KVKK, Gizlilik, Çerez | `src/layouts/YasalLayout.astro` `.yasal-ust` | alt çizgi, "Son güncelleme" satırı |
| Hakkımızda | kendi fotoğraflı açılışı (müşteri onaylı) | etkilenmez |

Amatör görünümün nedeni: alt sayfalarda header da antrasit olduğu için header ve bant tek, düz gri bir blok gibi
duruyor; başlık küçük, boşluklar dar, sonra sert biçimde gece zemine geçiliyor.

marka-stili §8: "Alt sayfalarda (kategori, proje) daha kısa bir başlık bandı (~40svh) kullanılır; zemini ara bölüm
tonudur." Kod bu kuralı uygulamıyordu (bant ~40svh değil). Seçilen seçenek uygulanınca bu madde ona göre güncellenir.

## Seçenekler

Ortak bileşen: `src/components/SayfaBasi.astro` (denemede `BASLIK_BANDI=a|b` ile derleme anında seçiliyor).

### A: fotoğraflı açılış

Hakkımızda açılışının kısa hali: mobil 42svh, ≥ 768px 45svh, ≥ 1024px 50svh. Breadcrumb ve H1 fotoğrafın sol
altında, giriş metni fotoğrafın altında düz gece zeminde (krem, giriş boyutu). Karartma Hakkımızda ile birebir aynı,
yeni karartma yok: ≥ 641px `--karartma-yatay` + alt %30 zemine erime; telefonda alt %45 erime + başlık bloğuna bağlı
%70 rampa. Tek ek: karartma katmanı kutunun 1px altına taşar (kutu boyu kesirli olunca, ör. 50svh = 328,5px, son
piksel satırı fotoğraftan sızıp alt kenarda ince açık çizgi yapıyordu; ölçüldü ve giderildi).

| Sayfa | Fotoğraf | Neden |
|---|---|---|
| Projeler | `genis-verandali-ahsap-villa-22` | Bitmiş, bahçesi yerleşmiş villa; ev sağda durduğu için soldaki karartmanın altında kalmaz. Tüm projeleri temsil eden tam bir yapı. |
| Galeri | `kaydirakli-sato-oyun-evi-01` | Sitedeki en atmosferik akşam çekimi: içi ve bahçesi ışıklı, sıcak tonlu. "Fotoğraf" sayfasına uygun. |
| İletişim | `deniz-ustu-ahsap-otel-odalari-07` | Deniz manzaralı ahşap terasta oturma köşesi; "oturup konuşalım" hissi. Şantiye, naylon, dağınıklık yok. |

Üçü de proje galerilerinde zaten yayında olan fotoğraflar; alt metinleri projenin kendi kaydından geliyor.

### B: tipografik açılış

Fotoğrafsız, düz gece zemin (header antrasit kaldığı için header ile bant artık ton farkıyla ayrılıyor). Breadcrumb
üstte; altında 64px'lik 1px ahşap ayraç ve büyük H1 (`clamp(2.25rem, 6vw, 4.5rem)`, en fazla 16ch, dengeli satır
kırma). ≥ 1024px'te başlık solda (7/12), giriş metni sağda (5/12, giriş boyutu), ikisi alta hizalı. Mobilde alt alta.

### Yasal sayfalar

İki seçenekte de sade kalır (fotoğraf yok; yalnızca breadcrumb, H1, tarih). Denemede dokunulmadı.

## Görseller ve kontrol

`{projeler,galeri,iletisim}-{1366x657,375x667}-{mevcut,a,b}.png`, ilk ekran, yakınlaştırma %100.

Sert yatay kenar ölçümü: fotoğraf kutusunda (ve altındaki 24px'te) komşu iki satır arasında aynı yönde ≥ 12
parlaklık düzeyi sıçrayan sütunların oranı, en kötü satır. Fotoğrafı boydan boya kesen bir bant kenarı %70–80'in
üstünde çıkar (Hakkımızda'daki eski bant: %72–83).

| Sayfa | Ekran | Seçenek | H1 ilk ekranda (y) | En kötü satır | Ne |
|---|---|---|---|---|---|
| Projeler | 1366×657 | mevcut | evet (188–241) | fotoğraf yok | |
| Galeri | 1366×657 | mevcut | evet (188–241) | fotoğraf yok | |
| İletişim | 1366×657 | mevcut | evet (188–241) | fotoğraf yok | |
| Projeler | 375×667 | mevcut | evet (156–226) | fotoğraf yok | |
| Galeri | 375×667 | mevcut | evet (156–226) | fotoğraf yok | |
| İletişim | 375×667 | mevcut | evet (156–191) | fotoğraf yok | |
| Projeler | 1366×657 | a | evet (252–393) | %39,5 (y 329) | H1 harfleri |
| Galeri | 1366×657 | a | evet (252–393) | %24,7 (y 155) | fotoğraftaki saçak/balkon çizgisi |
| İletişim | 1366×657 | a | evet (322–393) | %13,8 (y 302) | breadcrumb metni |
| Projeler | 375×667 | a | evet (274–344) | %21,3 (y 338) | H1 harfleri |
| Galeri | 375×667 | a | evet (274–344) | %36,8 (y 186) | fotoğraftaki çatı saçağı |
| İletişim | 375×667 | a | evet (309–344) | %34,9 (y 153) | fotoğraftaki korkuluk/deniz çizgisi |
| Projeler | 1366×657 | b | evet (269–425) | fotoğraf yok | |
| Galeri | 1366×657 | b | evet (269–425) | fotoğraf yok | |
| İletişim | 1366×657 | b | evet (269–347) | fotoğraf yok | |
| Projeler | 375×667 | b | evet (205–283) | fotoğraf yok | |
| Galeri | 375×667 | b | evet (205–283) | fotoğraf yok | |
| İletişim | 375×667 | b | evet (205–244) | fotoğraf yok | |

A'nın fotoğraf alt kenarı (1366×657, y 439–442) satır ortalaması 30,0–30,3: zeminle aynı, çizgi yok. Görseller
ayrıca gözle kontrol edildi; hiçbirinde fotoğrafı yatayda kesen sert kenar yok.

## Seçimden sonra dikkat edilecekler

- A seçilirse: kategori sayfalarında kategorinin vitrin fotoğrafı kullanılabilir. Proje detayında bandın hemen
  altında büyük proje galerisi olduğu için fotoğraflı bant aynı fotoğrafı tekrarlar; orada sade (yasal sayfalardaki
  gibi) bant önerilir. Projeler'de ilk kartın yükleme önceliği kaldırılır (LCP artık bant fotoğrafı).
- B seçilirse: İletişim'de sağ sütun dar olduğu için "e-postayla" tirede bölünüyor; uygulamada sütun genişliği
  ayarlanır.

## Son hal (uygulanan)

Sekiz ayrı bant tek bileşende: `src/components/SayfaBasi.astro`. `foto` verilirse fotoğraflı, verilmezse sade.

| Varyant | Sayfalar | Fotoğraf |
|---|---|---|
| Fotoğraflı | Projeler | `genis-verandali-ahsap-villa-22` |
| Fotoğraflı | Galeri | `a-frame-bungalov-01`: sitedeki tek akşam/gece çekimli ev-bungalov fotoğrafı; ışıklı bahçe, içi ışıklı üçgen pencere, arkada köy ışıkları. Bitmiş yapı. Çocuk oyun evinin yerine (müşteri isteği). |
| Fotoğraflı | İletişim | `deniz-ustu-ahsap-otel-odalari-07` |
| Fotoğraflı | SSS | `kiremit-catili-ahsap-ev-19`: bitmiş kütük ev, temiz çimenlik, dağınıklık yok |
| Fotoğraflı | Kategori sayfaları | kategorinin vitrin projesinin kapak fotoğrafı (yatay galeri fotoğrafı; ana sayfadaki dikey vitrin kesimi değil) |
| Sade | Teklif Al, proje detayı, KVKK, Gizlilik, Çerez | yok |

- Giriş metnindeki tireli sözcükler bölünmez span'e alınır ("e-postayla" tireden bölünmez); metin aynen kalır.
- Projeler ve kategori sayfalarında ilk kartın yükleme önceliği kaldırıldı (LCP artık bant fotoğrafı).
- marka-stili §8'deki "~40svh, ara bölüm tonu" kuralı yeni düzene göre güncellendi.

### Son hal ölçümleri (`son/`, ilk ekran, yakınlaştırma %100)

Alt kenar: fotoğraf kutusunun son iki satırı ve altındaki satırın ortalama parlaklığı (zemin = 30,0).

| Sayfa | Ekran | H1 ilk ekranda (y) | En kötü satır | Ne | Alt kenar |
|---|---|---|---|---|---|
| Projeler | 1366×657 | evet (252–393) | %39,5 (y 329) | H1 harfleri | 30,1 / 30,1 → 30,0 |
| Galeri | 1366×657 | evet (252–393) | %14,3 (y 379) | H1 harfleri | 30,1 / 30,1 → 30,0 |
| İletişim | 1366×657 | evet (322–393) | %13,8 (y 302) | breadcrumb | 30,3 / 30,2 → 30,0 |
| SSS | 1366×657 | evet (252–393) | %14,3 (y 309) | H1 harfleri | 30,0 / 30,1 → 30,0 |
| Bungalov (kategori) | 1366×657 | evet (252–393) | %20,4 (y 227) | breadcrumb | 30,2 / 30,2 → 30,0 |
| Teklif Al | 1366×657 | evet (269–425) | fotoğraf yok | | |
| Proje detayı | 1366×657 | evet (269–502) | fotoğraf yok | | |
| Projeler | 375×667 | evet (274–344) | %21,3 (y 338) | H1 harfleri | 30,1 / 30,0 → 30,0 |
| Galeri | 375×667 | evet (274–344) | %29,6 (y 338) | H1 harfleri | 30,0 / 30,0 → 30,0 |
| İletişim | 375×667 | evet (309–344) | %34,9 (y 153) | fotoğraftaki korkuluk | 30,1 / 30,0 → 30,0 |
| SSS | 375×667 | evet (309–344) | %41,1 (y 338) | H1 harfleri | 30,1 / 30,0 → 30,0 |
| Bungalov (kategori) | 375×667 | evet (274–344) | %30,9 (y 303) | breadcrumb | 30,1 / 30,0 → 30,0 |
| Teklif Al | 375×667 | evet (205–283) | fotoğraf yok | | |
| Proje detayı | 375×667 | evet (229–345) | fotoğraf yok | | |

Hiçbir görüntüde fotoğrafı yatayda kesen sert kenar yok (gözle de kontrol edildi).

### Galeri telefon kadrajı (müşteri isteği, 15 Ekim 2026)

İlk halde Galeri'nin gece fotoğrafı telefonda kutuyla aynı oranda olduğu için A-frame başlık bloğunun ve erimenin
altında kalıyordu. Aynı projenin diğer fotoğrafları iç mekân ya da yapım aşaması (tek dış çekim 01), daha büyük
kaynak da yok; bu yüzden ≤ 640px'te aynı fotoğraf odak noktası etrafında sabit yakınlaştırılır
(`foto.mobil`: ölçek 1,8, odak `54.5% 100%`; Hakkımızda hikâye fotoğrafındaki gibi hareket değil). Odak alt kenarda
olduğu için görsel kutuyu her yerde kaplar; masaüstü ve tablet (≥ 641px) değişmez. `sizes` büyük kaynağı seçtirir.

| Ekran | A-frame tepesi (kutu içi y) | Işıklı pencere | Başlık bloğu başı | H1 ilk ekranda | En kötü satır | Alt kenar |
|---|---|---|---|---|---|---|
| 375×667 (`son/galeri-375x667.png`) | 7 | 38–104 | 118 | evet (274–344) | %29,6 (y 338, H1 harfleri) | 30,0 / 30,0 → 30,0 |
| 390×844 | 10 | 48–131 | 192 | evet (348–418) | %28,5 (y 412, H1 harfleri) | 30,0 / 30,0 → 30,0 |
| 390×664 (iPhone Safari görünür alanı) | 2 | 33–102 | 117 | evet (273–343) | %28,5 (y 337, H1 harfleri) | 30,0 / 30,2 → 30,0 |

gorsel-kontrol: yalnızca Galeri 375px farklı (%11,5; farklı satırlar 88–388, yani yalnızca fotoğraf kutusu), diğer 44
çekim geçti; referansı yenilendi. form-kontrol temiz.

### Güvenli mod

- form-kontrol: 2 form, 30 alan envanterle aynı ✓
- gorsel-kontrol: ana sayfa, Hakkımızda, Teşekkürler ve mobil menü çekimleri %0. Farklı olanlar yalnızca bandı
  kullanan sayfalar: Projeler, kategori, proje detayı, Galeri, SSS, Teklif Al (3 adım), İletişim, KVKK. Sayfa boyu
  bant kadar uzadı (+64 … +310px); Galeri'de yalnızca ilk ekran çekildiği için boy aynı.
- Bandın altının yalnızca kaydığının kanıtı: değişiklik öncesi ve sonrası HTML'de bandın bitişinden footer'a kadar
  gövde 10 sayfada (Projeler, Galeri, İletişim, SSS, Bungalov, Teklif Al, proje detayı, KVKK, Gizlilik, Çerez) aynı;
  tek fark Projeler ve kategoride ilk kartın yükleme önceliği. Alttan hizalı piksel karşılaştırmasında kalan farklar
  sabit öğeler (WhatsApp düğmesi, mobil alt menü; tam sayfa çekimde ekran konumunda kalır) ve kesirli kayma nedeniyle
  alt piksel düzeyinde yeniden çizilen metin satırları.
- Referanslar bu dalda yenilendi (30 çekim).
