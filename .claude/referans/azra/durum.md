# Eski siteden içerik taşıma: durum

Son güncelleme: 2026-10-05

## Kararlar

- **Mevcut 28 proje ve galerileri değişmeyecek.** Eski siteden mevcut projelere fotoğraf eklenmeyecek ve bizim sitedeki fotoğraflarla karşılaştırma yapılmayacak.
- Eşleştirme soruları (A1–A5, Şile/Çeşme) ve sahipsiz fotoğraf bölümleri (B, C, D) kapsam dışı; bunlar için yanıt beklenmiyor.
- A-Frame Bungalov düzeltmesi (`075e9db`) yerinde kalıyor: `a-frame-bungalov-03/05/07` → `deniz-ustu-ahsap-otel-odalari-13/14/15`.
- Eski site kendi alan adında yayında kalacak. Bu nedenle:
  - yönlendirme, canonical ya da iki site arasında link olmayacak
  - metinler özgün yazılacak
  - "Azra" adı yeni sitede hiçbir yerde geçmeyecek
- **Yeni sayfa `/teknik-sartname`:** tasarımına şartname ve fotoğraf onayından sonra başlanacak.
  - Header menüsüne "Teknik Şartname" linki eklenecek; menü kalabalık görünürse "Projeler"in yanına sığacak şekilde düzenlenecek. Link mobil menüye ve footer'a da eklenecek.
  - İki sekme olacak: "Şartname" ve "Uygulama Görselleri". Üstte kategori seçimi yer alacak ve seçim URL'ye yansıyacak (`/teknik-sartname#bungalov`).
  - Şartname sekmesinde başlıklar açılır-kapanır olacak; koyu temaya uygun, ince ikonlu.
  - Uygulama Görselleri sekmesinde fotoğraflar kategoriye göre gruplanacak ve mevcut galeri/lightbox stiliyle gösterilecek. Her fotoğrafın altında kısa açıklama olacak; yalnızca eski sitede açıkça yazan bilgi kullanılacak.
  - Kategori sayfalarına ve proje detay sayfalarına "Teknik şartnameyi incele →" linki eklenecek; link ilgili kategorinin sekmesine gidecek.
  - SEO: title, description ve BreadCrumb olacak; sayfa sitemap'e eklenecek.
- **Fotoğraf kuralları:**
  - uzun kenar en az 1600px
  - net
  - filigran, eski logo ya da tabela yok
  - stok/internet görseli değil
  - çok karanlık, aşırı pozlanmış veya eğik değil
  - eski fotoğrafların kendi aralarındaki tekrarlar ayıklanır; seri çekimlerden yalnızca en neti kalır

  Sayfa başına kota uygulanmadı. Kullanıcı eleyeceklerini söyledikten sonra fotoğraflar WebP'ye çevrilip yeni Türkçe dosya adlarıyla eklenecek.
- **Şartname:** kullanıcı karşılaştırma tablosunu bugünkü üretime göre düzeltip onaylayacak. Onaydan önce şartname metni yazılmayacak; onaydan sonra özgün cümlelerle yazılacak.

## Şartname metinleri

| Dosya | İçerik |
|---|---|
| `sartname-ham.json` | Eski sitedeki Türkçe şartname, birebir. 38 sayfa × 21 bölüm. Ekler: Opsiyonlar, Projelendirme, Üretim ve Montaj Şekilleri, Ahşap ev yaptırmadan önce. |
| `SARTNAME-KARSILASTIRMA.md` | Karşılaştırma tablosu (başlık · birebir değer · kategori farkı · çelişki/onay) ve projeye özel bilgiler (alan, oda, girişteki yapım notu). 18 [ONAY] maddesi. |
| `sartname_tablo.py` | Yukarıdaki tabloyu ve aynı içeriğin HTML sürümünü üretir. |
| `sartname_ayristir.py` | `sayfalar/*.html` → `sartname-ham.json` |
| `kategoriler.py` | 38 şartnameli sayfanın 8 kategoriye eşlemesi; fotoğraf açıklamaları için tür ve konum. |

**Bulgu:** şartname metni 38 sayfanın hepsinde birebir aynı; kategoriye ya da projeye göre değişmiyor. Farklar yalnızca proje girişlerinde ve "Proje Detayları" tablosunda. Sayfanın altındaki İngilizce, Arapça, Almanca, Fransızca ve Rusça çeviriler alınmadı.

**Başlıca çelişkiler:**
- Emprenye garantisi: "50 yıl" (Ahşap Koruma ve Boya) ↔ "20 yıl" (Garanti).
- Emprenye kapsamı: "ana taşıyıcı ve dış cephe" ↔ "tüm ahşap aksamlar".
- Boya markası: "HEMEL veya REMMERS" ↔ "HEMEL – HICKSEN DEKOR".
- Duvar sistemi kategoriye göre ayrılmamış: her sayfada hem lambri hem kütük sistemi yazıyor.
- Aynı ev şartnamesi kulübe, çocuk oyun evi ve cami sayfalarında da kullanılmış; bu yapılarda mutfak, banyo ve merdiven geçerli olmayabilir.

**Açık sorular:**
- Heybeli Ada Kütük Ev'in başlığında "HEYBELİ ADA", girişinde "BÜYÜKADA" yazıyor.
- Marmaris 175 m² villa için "1 oda, 1 banyo" yazıyor.

## Fotoğraflar

- **Kapsam:** eski sitenin şartnameli 38 proje sayfası, toplam 340 fotoğraf.
  - Kategori sayfalarındaki 2020 tarihli galeriler internetten alınmış görseller; bunlar baştan dışarıda.
  - Şartnamesi olmayan proje sayfaları da kapsam dışı: kabinler, çocuk oyun evlerinin çoğu, sauna, loca, kamelya vb.
- **İndirme:** uzun kenarı 1600px altı olan 78 fotoğraf indirilmedi. Kalan 262 fotoğrafın orijinali `ham-gorseller/azra/<sayfa>/<medya-id>.<uzantı>` altında; bu klasör git dışında.
  - İndirme betiği `orijinal_indir.py`. WordPress'in "-scaled" sürümü yerine `original_image` alındı; istekler 1,5 sn arayla yapıldı.
- **Ölçüm:** `kalite.mjs` → `kalite.json`. Ölçülen değerler:
  - netlik: Laplacian varyansı, 1024px'te
  - parlaklık ve karanlık/patlak piksel oranı
  - eğim tahmini

  Netlik yüzdesi, bugünkü galerimizin dağılımıyla (`galeri-netlik.json`) karşılaştırma içindir.
- **Gözle kontrol:**
  - Bulanıklık 1:1 orta kırpımla, eğim dikey kılavuz çizgileriyle kontrol edildi (`kontrol.mjs`).
  - Tabela, filigran, fotoğraf türü ve seri çekimler kontaktlarla tek tek gözden geçirildi. Kararlar `secim.py` içinde kayıtlı.
- **Süzgeç:** `secim.py` → `secim.json`.
  - Eski fotoğrafların kendi aralarındaki tekrarlar `eski-kirpim.json` hash'leriyle bulundu.

### Özet

- Aday (≥1600px): **262** · geçen: **161** · elenen: **101**
- Elenme nedenleri: 52 seri çekim, 18 eğik çekim, 14 bulanık, 7 tabela, 3 çok karanlık, 2 ters ışık, 1 tekrar, 1 yapı görünmüyor, 1 çok karanlık ve bulanık, 1 yapı kadrajda çok küçük; ana konu komşu bina, 1 dosya bozuk
- Kategoriye göre geçen: Ahşap Ev 50, Kütük Ev 6, Bungalov 42, Üçgen Ev / A-Frame 16, Tiny House 1, Tarihi Eser 17, Kulübe 24, Çocuk Oyun Evi 5
- Türe göre geçen: dış cephe 88, veranda 7, iç mekân 61, montaj aşaması 4, restorasyon aşaması 1
- Kategori notları:
  - Kuşadası: başlıkta "bungalov" yazıyor, eski menüde Üçgen Ev altında; yapı A-frame olduğu için Üçgen Ev / A-Frame'e konuldu.
  - Tarabya: başlıkta yapı türü yok; eski menüye göre Ahşap Ev'e konuldu.
  - Tiny House kategorisinde yalnızca 1 fotoğraf geçti.

### Kalite süzgecinden geçen fotoğraflar

Açıklama sütunu, sitede fotoğrafın altına yazılacak metnin taslağıdır: eski başlıktaki tür ve konum, artı fotoğrafta görünen bölüm. Önerilen ad, WebP'ye çevrilirken kullanılacak dosya adıdır (`-{600,1000,1600}.webp` eki o aşamada eklenir).

#### Ahşap Ev (50)

| ID | Eski sayfa | Tür | Ölçü (px) | Netlik | Açıklama taslağı | Önerilen ad | Ham dosya |
|---|---|---|---|---|---|---|---|
| 1095 | BEYKOZ AHŞAP VİLLA 125m2 | dış cephe | 2912×1920 | 3075 | Ahşap villa dış cephe, Beykoz | `ahsap-ev-beykoz-dis-cephe-01` | `ham-gorseller/azra/beykoz-ahsap-villa-125m2/1095.jpg` |
| 1108 | BEYKOZ AHŞAP VİLLA 125m2 | dış cephe | 4608×3456 | 1398 | Ahşap villa dış cephe, Beykoz | `ahsap-ev-beykoz-dis-cephe-02` | `ham-gorseller/azra/beykoz-ahsap-villa-125m2/1108.jpg` |
| 1109 | BEYKOZ AHŞAP VİLLA 125m2 | dış cephe | 4608×3456 | 2533 | Ahşap villa dış cephe, Beykoz | `ahsap-ev-beykoz-dis-cephe-03` | `ham-gorseller/azra/beykoz-ahsap-villa-125m2/1109.jpg` |
| 1098 | BEYKOZ AHŞAP VİLLA 125m2 | veranda | 3264×2448 | 1727 | Ahşap villa veranda, Beykoz | `ahsap-ev-beykoz-veranda-01` | `ham-gorseller/azra/beykoz-ahsap-villa-125m2/1098.jpg` |
| 1097 | BEYKOZ AHŞAP VİLLA 125m2 | iç mekân | 3264×2448 | 166 | Ahşap villa iç mekân, Beykoz | `ahsap-ev-beykoz-ic-mekan-01` | `ham-gorseller/azra/beykoz-ahsap-villa-125m2/1097.jpg` |
| 1099 | BEYKOZ AHŞAP VİLLA 125m2 | iç mekân | 4032×3024 | 1136 | Ahşap villa iç mekân, Beykoz | `ahsap-ev-beykoz-ic-mekan-02` | `ham-gorseller/azra/beykoz-ahsap-villa-125m2/1099.jpg` |
| 1100 | BEYKOZ AHŞAP VİLLA 125m2 | iç mekân | 3024×4032 | 392 | Ahşap villa iç mekân, Beykoz | `ahsap-ev-beykoz-ic-mekan-03` | `ham-gorseller/azra/beykoz-ahsap-villa-125m2/1100.jpg` |
| 1101 | BEYKOZ AHŞAP VİLLA 125m2 | iç mekân | 3024×4032 | 641 | Ahşap villa iç mekân, Beykoz | `ahsap-ev-beykoz-ic-mekan-04` | `ham-gorseller/azra/beykoz-ahsap-villa-125m2/1101.jpg` |
| 1103 | BEYKOZ AHŞAP VİLLA 125m2 | iç mekân | 3168×1824 | 458 | Ahşap villa iç mekân, Beykoz | `ahsap-ev-beykoz-ic-mekan-05` | `ham-gorseller/azra/beykoz-ahsap-villa-125m2/1103.jpg` |
| 1104 | BEYKOZ AHŞAP VİLLA 125m2 | iç mekân | 4608×3456 | 474 | Ahşap villa iç mekân, Beykoz | `ahsap-ev-beykoz-ic-mekan-06` | `ham-gorseller/azra/beykoz-ahsap-villa-125m2/1104.jpg` |
| 955 | BODRUM AHŞAP EV 80m2 | dış cephe | 1600×900 | 1526 | Ahşap ev dış cephe, Bodrum | `ahsap-ev-bodrum-dis-cephe-01` | `ham-gorseller/azra/bodrum-ahsap-ev-kutuk-villa-80-m2/955.jpg` |
| 957 | BODRUM AHŞAP EV 80m2 | dış cephe | 1600×1200 | 2670 | Ahşap ev dış cephe, Bodrum | `ahsap-ev-bodrum-dis-cephe-02` | `ham-gorseller/azra/bodrum-ahsap-ev-kutuk-villa-80-m2/957.jpg` |
| 949 | BODRUM AHŞAP EV 80m2 | iç mekân | 1600×1200 | 551 | Ahşap ev iç mekân, Bodrum | `ahsap-ev-bodrum-ic-mekan-01` | `ham-gorseller/azra/bodrum-ahsap-ev-kutuk-villa-80-m2/949.jpg` |
| 950 | BODRUM AHŞAP EV 80m2 | iç mekân | 1600×1200 | 240 | Ahşap ev iç mekân, Bodrum | `ahsap-ev-bodrum-ic-mekan-02` | `ham-gorseller/azra/bodrum-ahsap-ev-kutuk-villa-80-m2/950.jpg` |
| 953 | BODRUM AHŞAP EV 80m2 | iç mekân | 1200×1600 | 432 | Ahşap ev iç mekân, Bodrum | `ahsap-ev-bodrum-ic-mekan-03` | `ham-gorseller/azra/bodrum-ahsap-ev-kutuk-villa-80-m2/953.jpg` |
| 1009 | ÇANAKKALE AHŞAP EV 45m2 | dış cephe | 1600×1200 | 1550 | Ahşap ev dış cephe, Çanakkale | `ahsap-ev-canakkale-dis-cephe-01` | `ham-gorseller/azra/canakkale-ahsap-ev-fiyatlari-2024/1009.jpeg` |
| 1010 | ÇANAKKALE AHŞAP EV 45m2 | dış cephe | 1200×1600 | 1026 | Ahşap ev dış cephe, Çanakkale | `ahsap-ev-canakkale-dis-cephe-02` | `ham-gorseller/azra/canakkale-ahsap-ev-fiyatlari-2024/1010.jpeg` |
| 1005 | ÇANAKKALE AHŞAP EV 45m2 | veranda | 1200×1600 | 1043 | Ahşap ev veranda, Çanakkale | `ahsap-ev-canakkale-veranda-01` | `ham-gorseller/azra/canakkale-ahsap-ev-fiyatlari-2024/1005.jpeg` |
| 1003 | ÇANAKKALE AHŞAP EV 45m2 | iç mekân | 1200×1600 | 252 | Ahşap ev iç mekân, Çanakkale | `ahsap-ev-canakkale-ic-mekan-01` | `ham-gorseller/azra/canakkale-ahsap-ev-fiyatlari-2024/1003.jpeg` |
| 1004 | ÇANAKKALE AHŞAP EV 45m2 | iç mekân | 1200×1600 | 223 | Ahşap ev iç mekân, Çanakkale | `ahsap-ev-canakkale-ic-mekan-02` | `ham-gorseller/azra/canakkale-ahsap-ev-fiyatlari-2024/1004.jpeg` |
| 1008 | ÇANAKKALE AHŞAP EV 45m2 | iç mekân | 1200×1600 | 276 | Ahşap ev iç mekân, Çanakkale | `ahsap-ev-canakkale-ic-mekan-03` | `ham-gorseller/azra/canakkale-ahsap-ev-fiyatlari-2024/1008.jpeg` |
| 926 | FETHİYE AHŞAP EV 70m2 | dış cephe | 2016×1512 | 1177 | Ahşap ev dış cephe, Fethiye | `ahsap-ev-fethiye-dis-cephe-01` | `ham-gorseller/azra/fethiye-ahsap-ev-kutuk-villa-bungalov-70m2/926.jpeg` |
| 928 | FETHİYE AHŞAP EV 70m2 | iç mekân | 2016×1512 | 596 | Ahşap ev iç mekân, Fethiye | `ahsap-ev-fethiye-ic-mekan-01` | `ham-gorseller/azra/fethiye-ahsap-ev-kutuk-villa-bungalov-70m2/928.jpeg` |
| 929 | FETHİYE AHŞAP EV 70m2 | iç mekân | 1200×1600 | 355 | Ahşap ev iç mekân, Fethiye | `ahsap-ev-fethiye-ic-mekan-02` | `ham-gorseller/azra/fethiye-ahsap-ev-kutuk-villa-bungalov-70m2/929.jpeg` |
| 936 | FETHİYE AHŞAP EV 70m2 | iç mekân | 2016×1512 | 591 | Ahşap ev iç mekân, Fethiye | `ahsap-ev-fethiye-ic-mekan-03` | `ham-gorseller/azra/fethiye-ahsap-ev-kutuk-villa-bungalov-70m2/936.jpeg` |
| 1058 | İSTANBUL AHŞAP EV VİLLA 150 m2 | veranda | 2560×1920 | 122 | Ahşap ev villa veranda, İstanbul | `ahsap-ev-istanbul-veranda-01` | `ham-gorseller/azra/istanbul-ahsap-ev-villa-150m2/1058.jpg` |
| 1071 | MARMARİS AHŞAP VİLLA 175m2 | dış cephe | 1920×2560 | 994 | Ahşap villa dış cephe, Marmaris | `ahsap-ev-marmaris-dis-cephe-01` | `ham-gorseller/azra/marmaris-ahsap-villa-175m2/1071.jpg` |
| 1080 | MARMARİS AHŞAP VİLLA 175m2 | dış cephe | 4608×3456 | 714 | Ahşap villa dış cephe, Marmaris | `ahsap-ev-marmaris-dis-cephe-02` | `ham-gorseller/azra/marmaris-ahsap-villa-175m2/1080.jpg` |
| 1081 | MARMARİS AHŞAP VİLLA 175m2 | dış cephe | 2560×1920 | 509 | Ahşap villa dış cephe, Marmaris | `ahsap-ev-marmaris-dis-cephe-03` | `ham-gorseller/azra/marmaris-ahsap-villa-175m2/1081.jpg` |
| 1082 | MARMARİS AHŞAP VİLLA 175m2 | iç mekân | 4608×3456 | 262 | Ahşap villa iç mekân, Marmaris | `ahsap-ev-marmaris-ic-mekan-01` | `ham-gorseller/azra/marmaris-ahsap-villa-175m2/1082.jpg` |
| 1257 | ŞİLE AHŞAP EV VİLLA 250m2 | dış cephe | 1632×1055 | 3242 | Ahşap ev villa dış cephe, Şile | `ahsap-ev-sile-dis-cephe-01` | `ham-gorseller/azra/sile-ahsap-ev-250-m2/1257.jpg` |
| 1258 | ŞİLE AHŞAP EV VİLLA 250m2 | dış cephe | 2048×1536 | 2529 | Ahşap ev villa dış cephe, Şile | `ahsap-ev-sile-dis-cephe-02` | `ham-gorseller/azra/sile-ahsap-ev-250-m2/1258.jpeg` |
| 1259 | ŞİLE AHŞAP EV VİLLA 250m2 | dış cephe | 2600×1600 | 1635 | Ahşap ev villa dış cephe, Şile | `ahsap-ev-sile-dis-cephe-03` | `ham-gorseller/azra/sile-ahsap-ev-250-m2/1259.jpg` |
| 1262 | ŞİLE AHŞAP EV VİLLA 250m2 | iç mekân | 4000×3000 | 543 | Ahşap ev villa iç mekân, Şile | `ahsap-ev-sile-ic-mekan-01` | `ham-gorseller/azra/sile-ahsap-ev-250-m2/1262.jpg` |
| 1263 | ŞİLE AHŞAP EV VİLLA 250m2 | iç mekân | 4000×3000 | 218 | Ahşap ev villa iç mekân, Şile | `ahsap-ev-sile-ic-mekan-02` | `ham-gorseller/azra/sile-ahsap-ev-250-m2/1263.jpg` |
| 1264 | ŞİLE AHŞAP EV VİLLA 250m2 | iç mekân | 4000×3000 | 182 | Ahşap ev villa iç mekân, Şile | `ahsap-ev-sile-ic-mekan-03` | `ham-gorseller/azra/sile-ahsap-ev-250-m2/1264.jpg` |
| 1266 | ŞİLE AHŞAP EV VİLLA 250m2 | iç mekân | 4000×3000 | 1065 | Ahşap ev villa iç mekân, Şile | `ahsap-ev-sile-ic-mekan-04` | `ham-gorseller/azra/sile-ahsap-ev-250-m2/1266.jpg` |
| 1267 | ŞİLE AHŞAP EV VİLLA 250m2 | iç mekân | 4000×3000 | 754 | Ahşap ev villa iç mekân, Şile | `ahsap-ev-sile-ic-mekan-05` | `ham-gorseller/azra/sile-ahsap-ev-250-m2/1267.jpg` |
| 1393 | ŞİLE AHŞAP EV VİLLA 250m2 | iç mekân | 1600×1200 | 296 | Ahşap ev villa iç mekân, Şile | `ahsap-ev-sile-ic-mekan-06` | `ham-gorseller/azra/sile-ahsap-ev-250-m2/1393.jpeg` |
| 1789 | TARABYA AHŞAP ÇALIŞMA OFİSİ | dış cephe | 2036×1012 | 1248 | Ahşap çalışma ofisi dış cephe, Tarabya | `ahsap-ev-tarabya-dis-cephe-01` | `ham-gorseller/azra/tarabya-ahsap-calisma-ofisi-proje-satis-evi/1789.jpg` |
| 1790 | TARABYA AHŞAP ÇALIŞMA OFİSİ | dış cephe | 2284×1672 | 626 | Ahşap çalışma ofisi dış cephe, Tarabya | `ahsap-ev-tarabya-dis-cephe-02` | `ham-gorseller/azra/tarabya-ahsap-calisma-ofisi-proje-satis-evi/1790.jpg` |
| 1189 | TEKİRDAĞ AHŞAP EV 110m2 | dış cephe | 4000×1800 | 1782 | Ahşap ev dış cephe, Tekirdağ | `ahsap-ev-tekirdag-dis-cephe-01` | `ham-gorseller/azra/tekirdag-iki-katli-ahsap-ev-kutuk-villa/1189.jpg` |
| 1191 | TEKİRDAĞ AHŞAP EV 110m2 | veranda | 4000×1800 | 1043 | Ahşap ev veranda, Tekirdağ | `ahsap-ev-tekirdag-veranda-01` | `ham-gorseller/azra/tekirdag-iki-katli-ahsap-ev-kutuk-villa/1191.jpg` |
| 1192 | TEKİRDAĞ AHŞAP EV 110m2 | veranda | 4000×1800 | 763 | Ahşap ev veranda, Tekirdağ | `ahsap-ev-tekirdag-veranda-02` | `ham-gorseller/azra/tekirdag-iki-katli-ahsap-ev-kutuk-villa/1192.jpg` |
| 1193 | TEKİRDAĞ AHŞAP EV 110m2 | veranda | 4000×1800 | 1293 | Ahşap ev veranda, Tekirdağ | `ahsap-ev-tekirdag-veranda-03` | `ham-gorseller/azra/tekirdag-iki-katli-ahsap-ev-kutuk-villa/1193.jpg` |
| 1194 | TEKİRDAĞ AHŞAP EV 110m2 | iç mekân | 1800×4000 | 1697 | Ahşap ev iç mekân, Tekirdağ | `ahsap-ev-tekirdag-ic-mekan-01` | `ham-gorseller/azra/tekirdag-iki-katli-ahsap-ev-kutuk-villa/1194.jpg` |
| 1195 | TEKİRDAĞ AHŞAP EV 110m2 | iç mekân | 4000×1800 | 680 | Ahşap ev iç mekân, Tekirdağ | `ahsap-ev-tekirdag-ic-mekan-02` | `ham-gorseller/azra/tekirdag-iki-katli-ahsap-ev-kutuk-villa/1195.jpg` |
| 1196 | TEKİRDAĞ AHŞAP EV 110m2 | iç mekân | 4000×1800 | 1299 | Ahşap ev iç mekân, Tekirdağ | `ahsap-ev-tekirdag-ic-mekan-03` | `ham-gorseller/azra/tekirdag-iki-katli-ahsap-ev-kutuk-villa/1196.jpg` |
| 1198 | TEKİRDAĞ AHŞAP EV 110m2 | iç mekân | 4000×1800 | 706 | Ahşap ev iç mekân, Tekirdağ | `ahsap-ev-tekirdag-ic-mekan-04` | `ham-gorseller/azra/tekirdag-iki-katli-ahsap-ev-kutuk-villa/1198.jpg` |
| 1243 | TEKİRDAĞ AHŞAP EV 110m2 | iç mekân | 2000×1500 | 380 | Ahşap ev iç mekân, Tekirdağ | `ahsap-ev-tekirdag-ic-mekan-05` | `ham-gorseller/azra/tekirdag-iki-katli-ahsap-ev-kutuk-villa/1243.jpeg` |

#### Kütük Ev (6)

| ID | Eski sayfa | Tür | Ölçü (px) | Netlik | Açıklama taslağı | Önerilen ad | Ham dosya |
|---|---|---|---|---|---|---|---|
| 676 | ASSOS KÜTÜK EV 100m2 | dış cephe | 1600×758 | 1851 | Kütük ev dış cephe, Assos | `kutuk-ev-assos-dis-cephe-01` | `ham-gorseller/azra/assos-kutuk-ev-100-m2/676.jpeg` |
| 879 | ASSOS KÜTÜK EV 100m2 | iç mekân | 1600×757 | 876 | Kütük ev iç mekân, Assos | `kutuk-ev-assos-ic-mekan-01` | `ham-gorseller/azra/assos-kutuk-ev-100-m2/879.jpeg` |
| 881 | ASSOS KÜTÜK EV 100m2 | iç mekân | 757×1600 | 863 | Kütük ev iç mekân, Assos | `kutuk-ev-assos-ic-mekan-02` | `ham-gorseller/azra/assos-kutuk-ev-100-m2/881.jpeg` |
| 883 | ASSOS KÜTÜK EV 100m2 | iç mekân | 757×1600 | 406 | Kütük ev iç mekân, Assos | `kutuk-ev-assos-ic-mekan-03` | `ham-gorseller/azra/assos-kutuk-ev-100-m2/883.jpeg` |
| 1679 | HEYBELİ ADA KÜTÜK EV | dış cephe | 3072×2680 | 931 | Kütük ev dış cephe, Heybeliada | `kutuk-ev-heybeliada-dis-cephe-01` | `ham-gorseller/azra/buyukada-heybeli-ada-ahsap-kutuk-ev/1679.jpg` |
| 1680 | HEYBELİ ADA KÜTÜK EV | dış cephe | 3456×4608 | 3109 | Kütük ev dış cephe, Heybeliada | `kutuk-ev-heybeliada-dis-cephe-02` | `ham-gorseller/azra/buyukada-heybeli-ada-ahsap-kutuk-ev/1680.jpg` |

#### Bungalov (42)

| ID | Eski sayfa | Tür | Ölçü (px) | Netlik | Açıklama taslağı | Önerilen ad | Ham dosya |
|---|---|---|---|---|---|---|---|
| 1345 | ÇEŞME AHŞAP EV BUNGALOV 60m2 | dış cephe | 2048×1536 | 425 | Ahşap ev bungalov dış cephe, Çeşme | `bungalov-cesme-dis-cephe-01` | `ham-gorseller/azra/cesme-ahsap-ev-bungalov-60m2/1345.jpeg` |
| 1349 | ÇEŞME AHŞAP EV BUNGALOV 60m2 | dış cephe | 1600×1200 | 597 | Ahşap ev bungalov dış cephe, Çeşme | `bungalov-cesme-dis-cephe-02` | `ham-gorseller/azra/cesme-ahsap-ev-bungalov-60m2/1349.jpg` |
| 1348 | ÇEŞME AHŞAP EV BUNGALOV 60m2 | veranda | 2000×1500 | 837 | Ahşap ev bungalov veranda, Çeşme | `bungalov-cesme-veranda-01` | `ham-gorseller/azra/cesme-ahsap-ev-bungalov-60m2/1348.jpg` |
| 1351 | ÇEŞME AHŞAP EV BUNGALOV 60m2 | iç mekân | 2016×1512 | 421 | Ahşap ev bungalov iç mekân, Çeşme | `bungalov-cesme-ic-mekan-01` | `ham-gorseller/azra/cesme-ahsap-ev-bungalov-60m2/1351.jpg` |
| 1352 | ÇEŞME AHŞAP EV BUNGALOV 60m2 | iç mekân | 2016×1512 | 580 | Ahşap ev bungalov iç mekân, Çeşme | `bungalov-cesme-ic-mekan-02` | `ham-gorseller/azra/cesme-ahsap-ev-bungalov-60m2/1352.jpeg` |
| 2171 | DATÇA AHŞAP OFİS BUNGALOV 18m2 | dış cephe | 1600×1200 | 3815 | Ahşap ofis bungalov dış cephe, Datça | `bungalov-datca-dis-cephe-01` | `ham-gorseller/azra/datca-ahsap-ofis-agac-ev-bungalov-18m2/2171.jpeg` |
| 2172 | DATÇA AHŞAP OFİS BUNGALOV 18m2 | dış cephe | 1200×1600 | 4296 | Ahşap ofis bungalov dış cephe, Datça | `bungalov-datca-dis-cephe-02` | `ham-gorseller/azra/datca-ahsap-ofis-agac-ev-bungalov-18m2/2172.png` |
| 2175 | DATÇA AHŞAP OFİS BUNGALOV 18m2 | dış cephe | 1200×1600 | 2653 | Ahşap ofis bungalov dış cephe, Datça | `bungalov-datca-dis-cephe-03` | `ham-gorseller/azra/datca-ahsap-ofis-agac-ev-bungalov-18m2/2175.jpeg` |
| 2178 | DATÇA AHŞAP OFİS BUNGALOV 18m2 | dış cephe | 1200×1600 | 3679 | Ahşap ofis bungalov dış cephe, Datça | `bungalov-datca-dis-cephe-04` | `ham-gorseller/azra/datca-ahsap-ofis-agac-ev-bungalov-18m2/2178.jpeg` |
| 2180 | DATÇA AHŞAP OFİS BUNGALOV 18m2 | dış cephe | 1200×1600 | 2426 | Ahşap ofis bungalov dış cephe, Datça | `bungalov-datca-dis-cephe-05` | `ham-gorseller/azra/datca-ahsap-ofis-agac-ev-bungalov-18m2/2180.jpeg` |
| 2176 | DATÇA AHŞAP OFİS BUNGALOV 18m2 | iç mekân | 1200×1600 | 1392 | Ahşap ofis bungalov iç mekân, Datça | `bungalov-datca-ic-mekan-01` | `ham-gorseller/azra/datca-ahsap-ofis-agac-ev-bungalov-18m2/2176.jpeg` |
| 2177 | DATÇA AHŞAP OFİS BUNGALOV 18m2 | iç mekân | 1200×1600 | 1082 | Ahşap ofis bungalov iç mekân, Datça | `bungalov-datca-ic-mekan-02` | `ham-gorseller/azra/datca-ahsap-ofis-agac-ev-bungalov-18m2/2177.jpeg` |
| 1418 | DİDİM OVAL AHŞAP BUNGALOV 20m2 | dış cephe | 4160×3120 | 923 | Oval ahşap bungalov dış cephe, Didim | `bungalov-didim-dis-cephe-01` | `ham-gorseller/azra/didim-oval-ahsap-bungalov-otel-20m2/1418.jpg` |
| 1420 | DİDİM OVAL AHŞAP BUNGALOV 20m2 | dış cephe | 4160×3120 | 1326 | Oval ahşap bungalov dış cephe, Didim | `bungalov-didim-dis-cephe-02` | `ham-gorseller/azra/didim-oval-ahsap-bungalov-otel-20m2/1420.jpg` |
| 1425 | DİDİM OVAL AHŞAP BUNGALOV 20m2 | dış cephe | 4160×3120 | 2827 | Oval ahşap bungalov dış cephe, Didim | `bungalov-didim-dis-cephe-03` | `ham-gorseller/azra/didim-oval-ahsap-bungalov-otel-20m2/1425.jpg` |
| 1426 | DİDİM OVAL AHŞAP BUNGALOV 20m2 | dış cephe | 4160×3120 | 960 | Oval ahşap bungalov dış cephe, Didim | `bungalov-didim-dis-cephe-04` | `ham-gorseller/azra/didim-oval-ahsap-bungalov-otel-20m2/1426.jpg` |
| 1428 | DİDİM OVAL AHŞAP BUNGALOV 20m2 | dış cephe | 4160×3120 | 2032 | Oval ahşap bungalov dış cephe, Didim | `bungalov-didim-dis-cephe-05` | `ham-gorseller/azra/didim-oval-ahsap-bungalov-otel-20m2/1428.jpg` |
| 1429 | DİDİM OVAL AHŞAP BUNGALOV 20m2 | iç mekân | 4160×3120 | 119 | Oval ahşap bungalov iç mekân, Didim | `bungalov-didim-ic-mekan-01` | `ham-gorseller/azra/didim-oval-ahsap-bungalov-otel-20m2/1429.jpg` |
| 1249 | GEBZE AHŞAP BUNGALOV 21m2 | dış cephe | 2040×1530 | 4766 | Ahşap bungalov dış cephe, Gebze | `bungalov-gebze-dis-cephe-01` | `ham-gorseller/azra/gebze-ahsap-otel-bungalov-tasinabilir-ev/1249.jpeg` |
| 1252 | GEBZE AHŞAP BUNGALOV 21m2 | dış cephe | 2000×1500 | 5093 | Ahşap bungalov dış cephe, Gebze | `bungalov-gebze-dis-cephe-02` | `ham-gorseller/azra/gebze-ahsap-otel-bungalov-tasinabilir-ev/1252.jpeg` |
| 1253 | GEBZE AHŞAP BUNGALOV 21m2 | dış cephe | 1530×2040 | 3599 | Ahşap bungalov dış cephe, Gebze | `bungalov-gebze-dis-cephe-03` | `ham-gorseller/azra/gebze-ahsap-otel-bungalov-tasinabilir-ev/1253.jpeg` |
| 1210 | İZNİK AHŞAP EV BUNGALOV 60m2 | dış cephe | 1200×1600 | 3558 | Ahşap ev bungalov dış cephe, İznik | `bungalov-iznik-dis-cephe-01` | `ham-gorseller/azra/iznik-ahsap-ev-bungalov-60m2/1210.jpeg` |
| 1211 | İZNİK AHŞAP EV BUNGALOV 60m2 | dış cephe | 1600×1200 | 502 | Ahşap ev bungalov dış cephe, İznik | `bungalov-iznik-dis-cephe-02` | `ham-gorseller/azra/iznik-ahsap-ev-bungalov-60m2/1211.jpeg` |
| 1214 | İZNİK AHŞAP EV BUNGALOV 60m2 | dış cephe | 1200×1600 | 1169 | Ahşap ev bungalov dış cephe, İznik | `bungalov-iznik-dis-cephe-03` | `ham-gorseller/azra/iznik-ahsap-ev-bungalov-60m2/1214.jpeg` |
| 1117 | KANDIRA OVAL AHŞAP BUNGALOV 40m2 | dış cephe | 2312×1428 | 1680 | Oval ahşap bungalov dış cephe, Kandıra | `bungalov-kandira-dis-cephe-01` | `ham-gorseller/azra/kandira-oval-ahsap-bungalov-40m2/1117.jpg` |
| 1118 | KANDIRA OVAL AHŞAP BUNGALOV 40m2 | iç mekân | 1200×1600 | 341 | Oval ahşap bungalov iç mekân, Kandıra | `bungalov-kandira-ic-mekan-01` | `ham-gorseller/azra/kandira-oval-ahsap-bungalov-40m2/1118.jpg` |
| 1119 | KANDIRA OVAL AHŞAP BUNGALOV 40m2 | iç mekân | 1600×1200 | 404 | Oval ahşap bungalov iç mekân, Kandıra | `bungalov-kandira-ic-mekan-02` | `ham-gorseller/azra/kandira-oval-ahsap-bungalov-40m2/1119.jpg` |
| 1120 | KANDIRA OVAL AHŞAP BUNGALOV 40m2 | iç mekân | 1600×1200 | 263 | Oval ahşap bungalov iç mekân, Kandıra | `bungalov-kandira-ic-mekan-03` | `ham-gorseller/azra/kandira-oval-ahsap-bungalov-40m2/1120.jpg` |
| 1121 | KANDIRA OVAL AHŞAP BUNGALOV 40m2 | iç mekân | 1200×1600 | 652 | Oval ahşap bungalov iç mekân, Kandıra | `bungalov-kandira-ic-mekan-04` | `ham-gorseller/azra/kandira-oval-ahsap-bungalov-40m2/1121.jpg` |
| 1035 | KIBRIS MALDİV EVİ BUNGALOV | dış cephe | 1600×1200 | 1737 | Maldiv evi bungalov dış cephe, Kıbrıs | `bungalov-kibris-dis-cephe-01` | `ham-gorseller/azra/kibris-maldiv-evi-bungalov/1035.jpeg` |
| 1044 | KIBRIS MALDİV EVİ BUNGALOV | dış cephe | 3264×2448 | 1300 | Maldiv evi bungalov dış cephe, Kıbrıs | `bungalov-kibris-dis-cephe-02` | `ham-gorseller/azra/kibris-maldiv-evi-bungalov/1044.jpg` |
| 1045 | KIBRIS MALDİV EVİ BUNGALOV | dış cephe | 4608×2592 | 953 | Maldiv evi bungalov dış cephe, Kıbrıs | `bungalov-kibris-dis-cephe-03` | `ham-gorseller/azra/kibris-maldiv-evi-bungalov/1045.jpg` |
| 1037 | KIBRIS MALDİV EVİ BUNGALOV | iç mekân | 1600×1068 | 501 | Maldiv evi bungalov iç mekân, Kıbrıs | `bungalov-kibris-ic-mekan-01` | `ham-gorseller/azra/kibris-maldiv-evi-bungalov/1037.jpg` |
| 1038 | KIBRIS MALDİV EVİ BUNGALOV | iç mekân | 1600×1068 | 962 | Maldiv evi bungalov iç mekân, Kıbrıs | `bungalov-kibris-ic-mekan-02` | `ham-gorseller/azra/kibris-maldiv-evi-bungalov/1038.jpg` |
| 1039 | KIBRIS MALDİV EVİ BUNGALOV | iç mekân | 1600×1068 | 696 | Maldiv evi bungalov iç mekân, Kıbrıs | `bungalov-kibris-ic-mekan-03` | `ham-gorseller/azra/kibris-maldiv-evi-bungalov/1039.jpg` |
| 1181 | SAKARYA AHŞAP BUNGALOV 30m2 | dış cephe | 1200×1600 | 1744 | Ahşap bungalov dış cephe, Sakarya | `bungalov-sakarya-dis-cephe-01` | `ham-gorseller/azra/sakarya-ahsap-otel-bungalov-tinyhouse-30m2/1181.jpeg` |
| 1182 | SAKARYA AHŞAP BUNGALOV 30m2 | dış cephe | 1200×1600 | 3493 | Ahşap bungalov dış cephe, Sakarya | `bungalov-sakarya-dis-cephe-02` | `ham-gorseller/azra/sakarya-ahsap-otel-bungalov-tinyhouse-30m2/1182.jpeg` |
| 1175 | SAKARYA AHŞAP BUNGALOV 30m2 | iç mekân | 1600×1200 | 588 | Ahşap bungalov iç mekân, Sakarya | `bungalov-sakarya-ic-mekan-01` | `ham-gorseller/azra/sakarya-ahsap-otel-bungalov-tinyhouse-30m2/1175.jpeg` |
| 1176 | SAKARYA AHŞAP BUNGALOV 30m2 | iç mekân | 1600×1200 | 433 | Ahşap bungalov iç mekân, Sakarya | `bungalov-sakarya-ic-mekan-02` | `ham-gorseller/azra/sakarya-ahsap-otel-bungalov-tinyhouse-30m2/1176.jpeg` |
| 1178 | SAKARYA AHŞAP BUNGALOV 30m2 | iç mekân | 1200×1600 | 520 | Ahşap bungalov iç mekân, Sakarya | `bungalov-sakarya-ic-mekan-03` | `ham-gorseller/azra/sakarya-ahsap-otel-bungalov-tinyhouse-30m2/1178.jpeg` |
| 1179 | SAKARYA AHŞAP BUNGALOV 30m2 | iç mekân | 1200×1600 | 319 | Ahşap bungalov iç mekân, Sakarya | `bungalov-sakarya-ic-mekan-04` | `ham-gorseller/azra/sakarya-ahsap-otel-bungalov-tinyhouse-30m2/1179.jpeg` |
| 1180 | SAKARYA AHŞAP BUNGALOV 30m2 | iç mekân | 1200×1600 | 512 | Ahşap bungalov iç mekân, Sakarya | `bungalov-sakarya-ic-mekan-05` | `ham-gorseller/azra/sakarya-ahsap-otel-bungalov-tinyhouse-30m2/1180.jpeg` |

#### Üçgen Ev / A-Frame (16)

| ID | Eski sayfa | Tür | Ölçü (px) | Netlik | Açıklama taslağı | Önerilen ad | Ham dosya |
|---|---|---|---|---|---|---|---|
| 1275 | AĞVA ÜÇGEN EV 50 m2 | dış cephe | 2048×1536 | 3673 | Üçgen ev dış cephe, Ağva | `ucgen-ev-agva-dis-cephe-01` | `ham-gorseller/azra/agva-ucgen-ev-ahsap-bungalov-50-m2/1275.jpeg` |
| 1276 | AĞVA ÜÇGEN EV 50 m2 | dış cephe | 2048×1536 | 2869 | Üçgen ev dış cephe, Ağva | `ucgen-ev-agva-dis-cephe-02` | `ham-gorseller/azra/agva-ucgen-ev-ahsap-bungalov-50-m2/1276.jpeg` |
| 1280 | AĞVA ÜÇGEN EV 50 m2 | dış cephe | 3604×1692 | 1767 | Üçgen ev dış cephe, Ağva | `ucgen-ev-agva-dis-cephe-03` | `ham-gorseller/azra/agva-ucgen-ev-ahsap-bungalov-50-m2/1280.jpeg` |
| 1282 | AĞVA ÜÇGEN EV 50 m2 | dış cephe | 1784×1352 | 3999 | Üçgen ev dış cephe, Ağva | `ucgen-ev-agva-dis-cephe-04` | `ham-gorseller/azra/agva-ucgen-ev-ahsap-bungalov-50-m2/1282.jpeg` |
| 1283 | AĞVA ÜÇGEN EV 50 m2 | dış cephe | 1776×1272 | 2426 | Üçgen ev dış cephe, Ağva | `ucgen-ev-agva-dis-cephe-05` | `ham-gorseller/azra/agva-ucgen-ev-ahsap-bungalov-50-m2/1283.jpeg` |
| 1284 | AĞVA ÜÇGEN EV 50 m2 | dış cephe | 1792×1344 | 3190 | Üçgen ev dış cephe, Ağva | `ucgen-ev-agva-dis-cephe-06` | `ham-gorseller/azra/agva-ucgen-ev-ahsap-bungalov-50-m2/1284.jpeg` |
| 1270 | AĞVA ÜÇGEN EV 50 m2 | iç mekân | 1530×2040 | 2174 | Üçgen ev iç mekân, Ağva | `ucgen-ev-agva-ic-mekan-01` | `ham-gorseller/azra/agva-ucgen-ev-ahsap-bungalov-50-m2/1270.jpeg` |
| 1271 | AĞVA ÜÇGEN EV 50 m2 | iç mekân | 1500×2000 | 1081 | Üçgen ev iç mekân, Ağva | `ucgen-ev-agva-ic-mekan-02` | `ham-gorseller/azra/agva-ucgen-ev-ahsap-bungalov-50-m2/1271.jpeg` |
| 1272 | AĞVA ÜÇGEN EV 50 m2 | iç mekân | 1530×2040 | 2386 | Üçgen ev iç mekân, Ağva | `ucgen-ev-agva-ic-mekan-03` | `ham-gorseller/azra/agva-ucgen-ev-ahsap-bungalov-50-m2/1272.jpeg` |
| 1286 | AĞVA ÜÇGEN EV 50 m2 | iç mekân | 1530×2040 | 2607 | Üçgen ev iç mekân, Ağva | `ucgen-ev-agva-ic-mekan-04` | `ham-gorseller/azra/agva-ucgen-ev-ahsap-bungalov-50-m2/1286.jpeg` |
| 1288 | AĞVA ÜÇGEN EV 50 m2 | iç mekân | 1500×2000 | 1504 | Üçgen ev iç mekân, Ağva | `ucgen-ev-agva-ic-mekan-05` | `ham-gorseller/azra/agva-ucgen-ev-ahsap-bungalov-50-m2/1288.jpeg` |
| 1293 | AĞVA ÜÇGEN EV 50 m2 | iç mekân | 1530×2040 | 2365 | Üçgen ev iç mekân, Ağva | `ucgen-ev-agva-ic-mekan-06` | `ham-gorseller/azra/agva-ucgen-ev-ahsap-bungalov-50-m2/1293.jpeg` |
| 1294 | AĞVA ÜÇGEN EV 50 m2 | iç mekân | 1530×2040 | 486 | Üçgen ev iç mekân, Ağva | `ucgen-ev-agva-ic-mekan-07` | `ham-gorseller/azra/agva-ucgen-ev-ahsap-bungalov-50-m2/1294.jpeg` |
| 1143 | KUŞ ADASI AHŞAP BUNGALOV | dış cephe | 1200×1600 | 1004 | Ahşap bungalov dış cephe, Kuşadası | `ucgen-ev-kusadasi-dis-cephe-01` | `ham-gorseller/azra/kusadasi-ahsap-otel-bungalov-tinyhouse/1143.jpeg` |
| 1144 | KUŞ ADASI AHŞAP BUNGALOV | dış cephe | 1600×1200 | 1095 | Ahşap bungalov dış cephe, Kuşadası | `ucgen-ev-kusadasi-dis-cephe-02` | `ham-gorseller/azra/kusadasi-ahsap-otel-bungalov-tinyhouse/1144.jpeg` |
| 1147 | KUŞ ADASI AHŞAP BUNGALOV | dış cephe | 1200×1600 | 473 | Ahşap bungalov dış cephe, Kuşadası | `ucgen-ev-kusadasi-dis-cephe-03` | `ham-gorseller/azra/kusadasi-ahsap-otel-bungalov-tinyhouse/1147.jpeg` |

#### Tiny House (1)

| ID | Eski sayfa | Tür | Ölçü (px) | Netlik | Açıklama taslağı | Önerilen ad | Ham dosya |
|---|---|---|---|---|---|---|---|
| 1160 | AHŞAP KARAVAN – TINYHOUSE | montaj aşaması | 2048×1536 | 934 | Ahşap karavan tiny house montaj aşaması | `tiny-house-montaj-01` | `ham-gorseller/azra/ahsap-otel-karavan-tinyhouse/1160.jpeg` |

#### Tarihi Eser (17)

| ID | Eski sayfa | Tür | Ölçü (px) | Netlik | Açıklama taslağı | Önerilen ad | Ham dosya |
|---|---|---|---|---|---|---|---|
| 1591 | AHŞAP MESCİD İSTANBUL | dış cephe | 1600×1200 | 471 | Ahşap mescit dış cephe, İstanbul | `tarihi-eser-istanbul-dis-cephe-01` | `ham-gorseller/azra/ahsap-camii-mescid-istanbul/1591.jpeg` |
| 1595 | AHŞAP MESCİD İSTANBUL | dış cephe | 1600×1200 | 573 | Ahşap mescit dış cephe, İstanbul | `tarihi-eser-istanbul-dis-cephe-02` | `ham-gorseller/azra/ahsap-camii-mescid-istanbul/1595.jpeg` |
| 1600 | AHŞAP MESCİD İSTANBUL | dış cephe | 1600×1200 | 382 | Ahşap mescit dış cephe, İstanbul | `tarihi-eser-istanbul-dis-cephe-03` | `ham-gorseller/azra/ahsap-camii-mescid-istanbul/1600.jpeg` |
| 1597 | AHŞAP MESCİD İSTANBUL | iç mekân | 1200×1600 | 664 | Ahşap mescit iç mekân, İstanbul | `tarihi-eser-istanbul-ic-mekan-01` | `ham-gorseller/azra/ahsap-camii-mescid-istanbul/1597.jpeg` |
| 1598 | AHŞAP MESCİD İSTANBUL | iç mekân | 1600×1200 | 569 | Ahşap mescit iç mekân, İstanbul | `tarihi-eser-istanbul-ic-mekan-02` | `ham-gorseller/azra/ahsap-camii-mescid-istanbul/1598.jpeg` |
| 1599 | AHŞAP MESCİD İSTANBUL | iç mekân | 1200×1600 | 240 | Ahşap mescit iç mekân, İstanbul | `tarihi-eser-istanbul-ic-mekan-03` | `ham-gorseller/azra/ahsap-camii-mescid-istanbul/1599.jpeg` |
| 1513 | TARİHİ AHŞAP GÜVENLİK KULUBESİ | dış cephe | 3000×4000 | 1745 | Tarihi ahşap güvenlik kulübesi dış cephe | `tarihi-eser-dis-cephe-01` | `ham-gorseller/azra/ahsap-tarihi-eser-restorasyon-guvenlik-bekci-kulubesi/1513.jpg` |
| 1515 | TARİHİ AHŞAP GÜVENLİK KULUBESİ | dış cephe | 1776×2832 | 1787 | Tarihi ahşap güvenlik kulübesi dış cephe | `tarihi-eser-dis-cephe-02` | `ham-gorseller/azra/ahsap-tarihi-eser-restorasyon-guvenlik-bekci-kulubesi/1515.jpg` |
| 1516 | TARİHİ AHŞAP GÜVENLİK KULUBESİ | dış cephe | 4000×1800 | 1602 | Tarihi ahşap güvenlik kulübesi dış cephe | `tarihi-eser-dis-cephe-03` | `ham-gorseller/azra/ahsap-tarihi-eser-restorasyon-guvenlik-bekci-kulubesi/1516.jpg` |
| 1517 | TARİHİ AHŞAP GÜVENLİK KULUBESİ | dış cephe | 3000×4000 | 1741 | Tarihi ahşap güvenlik kulübesi dış cephe | `tarihi-eser-dis-cephe-04` | `ham-gorseller/azra/ahsap-tarihi-eser-restorasyon-guvenlik-bekci-kulubesi/1517.jpg` |
| 1514 | TARİHİ AHŞAP GÜVENLİK KULUBESİ | montaj aşaması | 4000×1800 | 1428 | Tarihi ahşap güvenlik kulübesi montaj aşaması | `tarihi-eser-montaj-01` | `ham-gorseller/azra/ahsap-tarihi-eser-restorasyon-guvenlik-bekci-kulubesi/1514.jpg` |
| 1706 | BÜYÜKADA AHŞAP TARİHİ ESER RESTORASYON | dış cephe | 3024×4032 | 886 | Tarihi eser restorasyonu dış cephe, Büyükada | `tarihi-eser-buyukada-dis-cephe-01` | `ham-gorseller/azra/buyukada-ahsap-ev-tarihi-eser-restorasyon-yali-konak/1706.jpeg` |
| 1708 | BÜYÜKADA AHŞAP TARİHİ ESER RESTORASYON | dış cephe | 3848×3008 | 888 | Tarihi eser restorasyonu dış cephe, Büyükada | `tarihi-eser-buyukada-dis-cephe-02` | `ham-gorseller/azra/buyukada-ahsap-ev-tarihi-eser-restorasyon-yali-konak/1708.jpeg` |
| 1712 | BÜYÜKADA AHŞAP TARİHİ ESER RESTORASYON | dış cephe | 1600×1200 | 352 | Tarihi eser restorasyonu dış cephe, Büyükada | `tarihi-eser-buyukada-dis-cephe-03` | `ham-gorseller/azra/buyukada-ahsap-ev-tarihi-eser-restorasyon-yali-konak/1712.jpeg` |
| 1709 | BÜYÜKADA AHŞAP TARİHİ ESER RESTORASYON | restorasyon aşaması | 3024×4032 | 890 | Tarihi eser restorasyonu restorasyon aşaması, Büyükada | `tarihi-eser-buyukada-restorasyon-01` | `ham-gorseller/azra/buyukada-ahsap-ev-tarihi-eser-restorasyon-yali-konak/1709.jpeg` |
| 993 | YALOVA AHŞAP CAMİİ 180m2 | dış cephe | 1200×1600 | 876 | Ahşap cami dış cephe, Yalova | `tarihi-eser-yalova-dis-cephe-01` | `ham-gorseller/azra/yalova-ahsap-camii-mescid/993.jpeg` |
| 995 | YALOVA AHŞAP CAMİİ 180m2 | dış cephe | 1600×1200 | 666 | Ahşap cami dış cephe, Yalova | `tarihi-eser-yalova-dis-cephe-02` | `ham-gorseller/azra/yalova-ahsap-camii-mescid/995.jpeg` |

#### Kulübe (24)

| ID | Eski sayfa | Tür | Ölçü (px) | Netlik | Açıklama taslağı | Önerilen ad | Ham dosya |
|---|---|---|---|---|---|---|---|
| 1567 | AHŞAP GİŞE TELEFON KULÜBESİ | dış cephe | 2016×1512 | 1961 | Ahşap gişe kulübesi dış cephe | `kulube-dis-cephe-01` | `ham-gorseller/azra/ahsap-bekci-guvenlik-kulube-satis-bufesi-bungalov-bilet-gisesi/1567.jpeg` |
| 1570 | AHŞAP GİŞE TELEFON KULÜBESİ | dış cephe | 3000×4000 | 3177 | Ahşap gişe kulübesi dış cephe | `kulube-dis-cephe-02` | `ham-gorseller/azra/ahsap-bekci-guvenlik-kulube-satis-bufesi-bungalov-bilet-gisesi/1570.jpg` |
| 1568 | AHŞAP GİŞE TELEFON KULÜBESİ | montaj aşaması | 3000×4000 | 2781 | Ahşap gişe kulübesi montaj aşaması | `kulube-montaj-01` | `ham-gorseller/azra/ahsap-bekci-guvenlik-kulube-satis-bufesi-bungalov-bilet-gisesi/1568.jpg` |
| 1498 | SATIŞ BÜFESİ KIOSK | dış cephe | 1536×2048 | 3031 | Satış büfesi dış cephe | `kulube-dis-cephe-03` | `ham-gorseller/azra/ahsap-satis-bufesi-kiosk-mutfak-hobi-evi/1498.jpeg` |
| 1500 | SATIŞ BÜFESİ KIOSK | dış cephe | 1536×2048 | 2000 | Satış büfesi dış cephe | `kulube-dis-cephe-04` | `ham-gorseller/azra/ahsap-satis-bufesi-kiosk-mutfak-hobi-evi/1500.jpeg` |
| 1504 | SATIŞ BÜFESİ KIOSK | dış cephe | 1200×1600 | 839 | Satış büfesi dış cephe | `kulube-dis-cephe-05` | `ham-gorseller/azra/ahsap-satis-bufesi-kiosk-mutfak-hobi-evi/1504.jpeg` |
| 1505 | SATIŞ BÜFESİ KIOSK | dış cephe | 1536×2048 | 3172 | Satış büfesi dış cephe | `kulube-dis-cephe-06` | `ham-gorseller/azra/ahsap-satis-bufesi-kiosk-mutfak-hobi-evi/1505.jpeg` |
| 1616 | ANTALYA AHŞAP CAFE RESTAURANT | dış cephe | 1600×1200 | 386 | Ahşap kafe-restoran dış cephe, Antalya | `kulube-antalya-dis-cephe-01` | `ham-gorseller/azra/antalya-cafe-restaurant-satis-bufesi-beach-clup/1616.jpeg` |
| 1617 | ANTALYA AHŞAP CAFE RESTAURANT | dış cephe | 1600×1200 | 781 | Ahşap kafe-restoran dış cephe, Antalya | `kulube-antalya-dis-cephe-02` | `ham-gorseller/azra/antalya-cafe-restaurant-satis-bufesi-beach-clup/1617.jpeg` |
| 1619 | ANTALYA AHŞAP CAFE RESTAURANT | dış cephe | 1600×671 | 676 | Ahşap kafe-restoran dış cephe, Antalya | `kulube-antalya-dis-cephe-03` | `ham-gorseller/azra/antalya-cafe-restaurant-satis-bufesi-beach-clup/1619.jpeg` |
| 1613 | ANTALYA AHŞAP CAFE RESTAURANT | iç mekân | 1600×1200 | 239 | Ahşap kafe-restoran iç mekân, Antalya | `kulube-antalya-ic-mekan-01` | `ham-gorseller/azra/antalya-cafe-restaurant-satis-bufesi-beach-clup/1613.jpeg` |
| 1843 | BEŞİKTAŞ AHŞAP SATIŞ OFİSİ | dış cephe | 2048×1536 | 1103 | Ahşap satış ofisi dış cephe, Beşiktaş | `kulube-besiktas-dis-cephe-01` | `ham-gorseller/azra/besiktas-ahsap-satis-ofisi-calisma-evi/1843.jpeg` |
| 1844 | BEŞİKTAŞ AHŞAP SATIŞ OFİSİ | dış cephe | 2048×1536 | 1015 | Ahşap satış ofisi dış cephe, Beşiktaş | `kulube-besiktas-dis-cephe-02` | `ham-gorseller/azra/besiktas-ahsap-satis-ofisi-calisma-evi/1844.jpeg` |
| 1849 | BEŞİKTAŞ AHŞAP SATIŞ OFİSİ | dış cephe | 1536×2048 | 937 | Ahşap satış ofisi dış cephe, Beşiktaş | `kulube-besiktas-dis-cephe-03` | `ham-gorseller/azra/besiktas-ahsap-satis-ofisi-calisma-evi/1849.jpeg` |
| 1663 | DATÇA AHŞAP BEACH CLUP | dış cephe | 3264×2448 | 1128 | Ahşap beach club dış cephe, Datça | `kulube-datca-dis-cephe-01` | `ham-gorseller/azra/datca-ahsap-pavilion-beach-clup-kamelya-perdola/1663.jpg` |
| 1667 | DATÇA AHŞAP BEACH CLUP | dış cephe | 4032×3024 | 1278 | Ahşap beach club dış cephe, Datça | `kulube-datca-dis-cephe-02` | `ham-gorseller/azra/datca-ahsap-pavilion-beach-clup-kamelya-perdola/1667.jpg` |
| 1669 | DATÇA AHŞAP BEACH CLUP | montaj aşaması | 3264×2448 | 1160 | Ahşap beach club montaj aşaması, Datça | `kulube-datca-montaj-01` | `ham-gorseller/azra/datca-ahsap-pavilion-beach-clup-kamelya-perdola/1669.jpg` |
| 1557 | ETİLER AHŞAP CAFE RESTAURANT | dış cephe | 2560×1920 | 768 | Ahşap kafe-restoran dış cephe, Etiler | `kulube-etiler-dis-cephe-01` | `ham-gorseller/azra/etiler-ahsap-cafe-restaurant-satis-bufesi-kiosk/1557.jpg` |
| 1558 | ETİLER AHŞAP CAFE RESTAURANT | dış cephe | 2560×1920 | 972 | Ahşap kafe-restoran dış cephe, Etiler | `kulube-etiler-dis-cephe-02` | `ham-gorseller/azra/etiler-ahsap-cafe-restaurant-satis-bufesi-kiosk/1558.jpg` |
| 1580 | HEYBELİADA AHŞAP BİLET GİŞESİ | dış cephe | 1600×720 | 676 | Ahşap bilet gişesi dış cephe, Heybeliada | `kulube-heybeliada-dis-cephe-01` | `ham-gorseller/azra/heybeliada-ahsap-bilet-gisesi-guvenlik-kulubesi/1580.jpeg` |
| 1581 | HEYBELİADA AHŞAP BİLET GİŞESİ | dış cephe | 1600×720 | 949 | Ahşap bilet gişesi dış cephe, Heybeliada | `kulube-heybeliada-dis-cephe-02` | `ham-gorseller/azra/heybeliada-ahsap-bilet-gisesi-guvenlik-kulubesi/1581.jpeg` |
| 1582 | HEYBELİADA AHŞAP BİLET GİŞESİ | dış cephe | 1600×720 | 908 | Ahşap bilet gişesi dış cephe, Heybeliada | `kulube-heybeliada-dis-cephe-03` | `ham-gorseller/azra/heybeliada-ahsap-bilet-gisesi-guvenlik-kulubesi/1582.jpeg` |
| 1778 | İSTANBUL AHŞAP KAMELYA KIŞ BAHÇESİ | dış cephe | 757×1600 | 3888 | Ahşap kamelya kış bahçesi dış cephe, İstanbul | `kulube-istanbul-dis-cephe-01` | `ham-gorseller/azra/istanbul-ahsap-kamelya-cardak-pergola-kis-bahcesi/1778.jpeg` |
| 1779 | İSTANBUL AHŞAP KAMELYA KIŞ BAHÇESİ | dış cephe | 1600×757 | 3889 | Ahşap kamelya kış bahçesi dış cephe, İstanbul | `kulube-istanbul-dis-cephe-02` | `ham-gorseller/azra/istanbul-ahsap-kamelya-cardak-pergola-kis-bahcesi/1779.jpeg` |

#### Çocuk Oyun Evi (5)

| ID | Eski sayfa | Tür | Ölçü (px) | Netlik | Açıklama taslağı | Önerilen ad | Ham dosya |
|---|---|---|---|---|---|---|---|
| 1385 | ÇOCUK OYUN EVİ İSTANBUL | dış cephe | 1600×720 | 1885 | Çocuk oyun evi dış cephe, İstanbul | `cocuk-oyun-evi-istanbul-dis-cephe-01` | `ham-gorseller/azra/cocuk-oyun-evi-park-istanbul/1385.jpeg` |
| 1386 | ÇOCUK OYUN EVİ İSTANBUL | dış cephe | 1600×720 | 754 | Çocuk oyun evi dış cephe, İstanbul | `cocuk-oyun-evi-istanbul-dis-cephe-02` | `ham-gorseller/azra/cocuk-oyun-evi-park-istanbul/1386.jpeg` |
| 1382 | ÇOCUK OYUN EVİ İSTANBUL | iç mekân | 1600×720 | 1138 | Çocuk oyun evi iç mekân, İstanbul | `cocuk-oyun-evi-istanbul-ic-mekan-01` | `ham-gorseller/azra/cocuk-oyun-evi-park-istanbul/1382.jpeg` |
| 1383 | ÇOCUK OYUN EVİ İSTANBUL | iç mekân | 1600×720 | 1056 | Çocuk oyun evi iç mekân, İstanbul | `cocuk-oyun-evi-istanbul-ic-mekan-02` | `ham-gorseller/azra/cocuk-oyun-evi-park-istanbul/1383.jpeg` |
| 1384 | ÇOCUK OYUN EVİ İSTANBUL | iç mekân | 1600×720 | 1200 | Çocuk oyun evi iç mekân, İstanbul | `cocuk-oyun-evi-istanbul-ic-mekan-03` | `ham-gorseller/azra/cocuk-oyun-evi-park-istanbul/1384.jpeg` |

### Elenen fotoğraflar

| ID | Eski sayfa | Neden |
|---|---|---|
| 1096 | BEYKOZ AHŞAP VİLLA 125m2 | eğik çekim (dikey kılavuzla kontrol) |
| 1102 | BEYKOZ AHŞAP VİLLA 125m2 | bulanık (1:1 kontrol) |
| 1105 | BEYKOZ AHŞAP VİLLA 125m2 | bulanık (1:1 kontrol) |
| 1106 | BEYKOZ AHŞAP VİLLA 125m2 | seri çekim: #1104 daha net |
| 1107 | BEYKOZ AHŞAP VİLLA 125m2 | bulanık (1:1 kontrol) |
| 947 | BODRUM AHŞAP EV 80m2 | yapı görünmüyor: yalnızca manzara |
| 948 | BODRUM AHŞAP EV 80m2 | seri çekim: #957 daha net |
| 951 | BODRUM AHŞAP EV 80m2 | eğik çekim (dikey kılavuzla kontrol) |
| 952 | BODRUM AHŞAP EV 80m2 | eğik çekim (dikey kılavuzla kontrol) |
| 1007 | ÇANAKKALE AHŞAP EV 45m2 | seri çekim: #1008 daha net |
| 1068 | MARMARİS AHŞAP VİLLA 175m2 | seri çekim: #1081 daha net |
| 1069 | MARMARİS AHŞAP VİLLA 175m2 | bulanık (1:1 kontrol) |
| 1070 | MARMARİS AHŞAP VİLLA 175m2 | ters ışık: yapı karanlık, gökyüzü patlak |
| 1084 | MARMARİS AHŞAP VİLLA 175m2 | bulanık (1:1 kontrol) |
| 1085 | MARMARİS AHŞAP VİLLA 175m2 | bulanık (1:1 kontrol) |
| 1086 | MARMARİS AHŞAP VİLLA 175m2 | bulanık (1:1 kontrol) |
| 1087 | MARMARİS AHŞAP VİLLA 175m2 | eğik çekim (dikey kılavuzla kontrol) |
| 1088 | MARMARİS AHŞAP VİLLA 175m2 | bulanık (1:1 kontrol) |
| 1260 | ŞİLE AHŞAP EV VİLLA 250m2 | eğik çekim (dikey kılavuzla kontrol) |
| 1261 | ŞİLE AHŞAP EV VİLLA 250m2 | seri çekim: #1262 daha net |
| 1265 | ŞİLE AHŞAP EV VİLLA 250m2 | eğik çekim (dikey kılavuzla kontrol) |
| 1190 | TEKİRDAĞ AHŞAP EV 110m2 | seri çekim: #1189 daha net |
| 1197 | TEKİRDAĞ AHŞAP EV 110m2 | seri çekim: #1195 daha net |
| 1199 | TEKİRDAĞ AHŞAP EV 110m2 | dosya bozuk: eski sitedeki JPEG hatalı |
| 1346 | ÇEŞME AHŞAP EV BUNGALOV 60m2 | bulanık (1:1 kontrol) |
| 1353 | ÇEŞME AHŞAP EV BUNGALOV 60m2 | seri çekim: #1351 daha net |
| 1355 | ÇEŞME AHŞAP EV BUNGALOV 60m2 | seri çekim: #1351 daha net |
| 1356 | ÇEŞME AHŞAP EV BUNGALOV 60m2 | bulanık (1:1 kontrol) |
| 2173 | DATÇA AHŞAP OFİS BUNGALOV 18m2 | eğik çekim (dikey kılavuzla kontrol) |
| 2174 | DATÇA AHŞAP OFİS BUNGALOV 18m2 | seri çekim: #2171 daha net |
| 2179 | DATÇA AHŞAP OFİS BUNGALOV 18m2 | seri çekim: #2180 daha net |
| 1421 | DİDİM OVAL AHŞAP BUNGALOV 20m2 | seri çekim: #1428 daha net |
| 1422 | DİDİM OVAL AHŞAP BUNGALOV 20m2 | seri çekim: #1418 daha net |
| 1423 | DİDİM OVAL AHŞAP BUNGALOV 20m2 | bulanık (1:1 kontrol) |
| 1424 | DİDİM OVAL AHŞAP BUNGALOV 20m2 | seri çekim: #1426 daha net |
| 1427 | DİDİM OVAL AHŞAP BUNGALOV 20m2 | seri çekim: #1425 daha net |
| 1431 | DİDİM OVAL AHŞAP BUNGALOV 20m2 | bulanık (1:1 kontrol) |
| 1231 | GEBZE AHŞAP BUNGALOV 21m2 | tabela: eski marka adı binada görünüyor |
| 1250 | GEBZE AHŞAP BUNGALOV 21m2 | seri çekim: #1249 daha net |
| 1251 | GEBZE AHŞAP BUNGALOV 21m2 | seri çekim: #1252 daha net |
| 1036 | KIBRIS MALDİV EVİ BUNGALOV | seri çekim: #1038 daha net |
| 1040 | KIBRIS MALDİV EVİ BUNGALOV | seri çekim: #1044 daha net |
| 1041 | KIBRIS MALDİV EVİ BUNGALOV | seri çekim: #1035 daha net |
| 1172 | SAKARYA AHŞAP BUNGALOV 30m2 | eğik çekim (dikey kılavuzla kontrol) |
| 1173 | SAKARYA AHŞAP BUNGALOV 30m2 | eğik çekim (dikey kılavuzla kontrol) |
| 1174 | SAKARYA AHŞAP BUNGALOV 30m2 | seri çekim: #1175 daha net |
| 1177 | SAKARYA AHŞAP BUNGALOV 30m2 | eğik çekim (dikey kılavuzla kontrol) |
| 1183 | SAKARYA AHŞAP BUNGALOV 30m2 | seri çekim: #1181 daha net |
| 1273 | AĞVA ÜÇGEN EV 50 m2 | seri çekim: #1286 daha net |
| 1274 | AĞVA ÜÇGEN EV 50 m2 | eğik çekim (dikey kılavuzla kontrol) |
| 1277 | AĞVA ÜÇGEN EV 50 m2 | seri çekim: #1284 daha net |
| 1278 | AĞVA ÜÇGEN EV 50 m2 | seri çekim: #1283 daha net |
| 1279 | AĞVA ÜÇGEN EV 50 m2 | seri çekim: #1283 daha net |
| 1281 | AĞVA ÜÇGEN EV 50 m2 | seri çekim: #1284 daha net |
| 1285 | AĞVA ÜÇGEN EV 50 m2 | seri çekim: #1272 daha net |
| 1287 | AĞVA ÜÇGEN EV 50 m2 | çok karanlık (siluet) |
| 1289 | AĞVA ÜÇGEN EV 50 m2 | seri çekim: #1272 daha net |
| 1290 | AĞVA ÜÇGEN EV 50 m2 | seri çekim: #1288 daha net |
| 1291 | AĞVA ÜÇGEN EV 50 m2 | çok karanlık (gece çekimi) |
| 1292 | AĞVA ÜÇGEN EV 50 m2 | seri çekim: #1271 daha net |
| 1145 | KUŞ ADASI AHŞAP BUNGALOV | seri çekim: #1143 daha net |
| 1146 | KUŞ ADASI AHŞAP BUNGALOV | eğik çekim (dikey kılavuzla kontrol) |
| 1593 | AHŞAP MESCİD İSTANBUL | seri çekim: #1595 daha net |
| 1596 | AHŞAP MESCİD İSTANBUL | eğik çekim (dikey kılavuzla kontrol) |
| 1601 | AHŞAP MESCİD İSTANBUL | eğik çekim (dikey kılavuzla kontrol) |
| 1512 | TARİHİ AHŞAP GÜVENLİK KULUBESİ | seri çekim: #1513 daha net |
| 1707 | BÜYÜKADA AHŞAP TARİHİ ESER RESTORASYON | seri çekim: #1706 daha net |
| 1710 | BÜYÜKADA AHŞAP TARİHİ ESER RESTORASYON | seri çekim: #1712 daha net |
| 1711 | BÜYÜKADA AHŞAP TARİHİ ESER RESTORASYON | bulanık (1:1 kontrol) |
| 1713 | BÜYÜKADA AHŞAP TARİHİ ESER RESTORASYON | eğik çekim (dikey kılavuzla kontrol) |
| 1714 | BÜYÜKADA AHŞAP TARİHİ ESER RESTORASYON | bulanık (1:1 kontrol) |
| 990 | YALOVA AHŞAP CAMİİ 180m2 | seri çekim: #993 daha net |
| 994 | YALOVA AHŞAP CAMİİ 180m2 | seri çekim: #995 daha net |
| 1569 | AHŞAP GİŞE TELEFON KULÜBESİ | seri çekim: #1570 daha net |
| 1572 | AHŞAP GİŞE TELEFON KULÜBESİ | seri çekim: #1567 daha net |
| 1573 | AHŞAP GİŞE TELEFON KULÜBESİ | seri çekim: #1567 daha net |
| 1694 | BODRUM AHŞAP SATIŞ OFİSİ | eğik çekim (dikey kılavuzla kontrol) |
| 1695 | BODRUM AHŞAP SATIŞ OFİSİ | tabela: müşteri markası cephede okunuyor |
| 1696 | BODRUM AHŞAP SATIŞ OFİSİ | tabela: müşteri markası cephede okunuyor |
| 1697 | BODRUM AHŞAP SATIŞ OFİSİ | tabela: müşteri markası cephede okunuyor |
| 1499 | SATIŞ BÜFESİ KIOSK | seri çekim: #1498 daha net |
| 1501 | SATIŞ BÜFESİ KIOSK | seri çekim: #1505 daha net |
| 1502 | SATIŞ BÜFESİ KIOSK | eğik çekim (dikey kılavuzla kontrol) |
| 1612 | ANTALYA AHŞAP CAFE RESTAURANT | seri çekim: #1616 daha net |
| 1845 | BEŞİKTAŞ AHŞAP SATIŞ OFİSİ | seri çekim: #1843 daha net |
| 1846 | BEŞİKTAŞ AHŞAP SATIŞ OFİSİ | seri çekim: #1849 daha net |
| 1847 | BEŞİKTAŞ AHŞAP SATIŞ OFİSİ | tekrar: eski sitede #1844 ile aynı fotoğraf |
| 1848 | BEŞİKTAŞ AHŞAP SATIŞ OFİSİ | seri çekim: #1843 daha net |
| 1665 | DATÇA AHŞAP BEACH CLUP | çok karanlık |
| 1666 | DATÇA AHŞAP BEACH CLUP | seri çekim: #1667 daha net |
| 1668 | DATÇA AHŞAP BEACH CLUP | eğik çekim (dikey kılavuzla kontrol) |
| 1670 | DATÇA AHŞAP BEACH CLUP | seri çekim: #1667 daha net |
| 1579 | HEYBELİADA AHŞAP BİLET GİŞESİ | seri çekim: #1581 daha net |
| 1524 | İSTANBUL AHŞAP GÜVENLİK KULÜBESİ | tabela: kurum adı levhası okunuyor |
| 1525 | İSTANBUL AHŞAP GÜVENLİK KULÜBESİ | tabela: kurum adı levhası okunuyor |
| 1526 | İSTANBUL AHŞAP GÜVENLİK KULÜBESİ | çok karanlık ve bulanık |
| 1529 | İSTANBUL AHŞAP GÜVENLİK KULÜBESİ | yapı kadrajda çok küçük; ana konu komşu bina |
| 1530 | İSTANBUL AHŞAP GÜVENLİK KULÜBESİ | ters ışık: yapı karanlık, gökyüzü patlak |
| 1531 | İSTANBUL AHŞAP GÜVENLİK KULÜBESİ | tabela: kurum adı levhası okunuyor |
| 1381 | ÇOCUK OYUN EVİ İSTANBUL | seri çekim: #1385 daha net |
| 1387 | ÇOCUK OYUN EVİ İSTANBUL | seri çekim: #1386 daha net |

## Sıradaki adımlar

1. Kullanıcı `SARTNAME-KARSILASTIRMA.md` tablosunu düzeltip onaylar. Ardından şartname metni özgün cümlelerle `src/data/sartname.ts` içine yazılır; "Azra" adı geçmez.
2. Kullanıcı yukarıdaki listeden eleyeceklerini söyler. İsterse kategori bazında görsel bir onay sayfası `secim.json`'dan üretilir. Ardından fotoğraflar WebP'ye çevrilip önerilen adlarla eklenir.
3. `/teknik-sartname` sayfasının tasarımı.

## Bu klasördeki diğer dosyalar

- `ENVANTER.md`: ilk aşamadaki proje eşleştirme raporu. Yeni planda yalnızca bilgi amaçlı.
- `sayfalar/` ve `kucuk/`: ham HTML ve 300px önizlemeler (git dışında). İndirme betikleri: `indir.sh`, `kucuk_indir.sh`.
- `sayfalar.json`, `medya.json`, `menu.json`, `sayfa-listesi.json`: sayfalardan ve WP REST API'den ayrıştırılan veriler.
- `hash.mjs`, `eslestir.py`, `eslesme.json`, `kirpim_eslestir.py`, `kirpim-eslesme.json`, `yanyana.mjs`: algısal hash ve kontakt araçları. Bizim sitedeki fotoğraflarla karşılaştırma yeni planda kullanılmıyor.
