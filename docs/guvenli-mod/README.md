# Güvenli Mod: güvenlik ağı

Müşteri sitenin mevcut görünümünü onayladı. Bundan sonraki işler yalnızca görünmeyen, kodla ilgili iyileştirmelerdir. Kurallar `CLAUDE.md` içindeki "Güvenli Mod" bölümündedir. Bu klasör, kuralların bozulmadığını denetleyen iki komutun dosyalarını tutar.

- **Onaylı sürüm:** `onayli-tasarim` git etiketi. Geliştirme `gelistirme-2026` dalında yapılır.
- **Her görevin sonunda:**

  ```bash
  npm run form-kontrol                      # derler ve formları denetler
  npm run gorsel-kontrol -- --derleme-yok   # aynı derlemeyle görünümü karşılaştırır
  ```

  İkisi de başarıyla bitmeden iş bitmiş sayılmaz. Komutlar varsayılan olarak önce `astro build` çalıştırır. `--derleme-yok` verilirse mevcut `dist/` kullanılır.

## form-kontrol

`scripts/guvenli-mod/form-kontrol.mjs` dosyası `dist/` içindeki tüm formları `form-envanteri.json` ile karşılaştırır. Aşağıdakilerden biri olursa hata verir (çıkış kodu 1):

- form silinmiş ya da envanterde olmayan bir form eklenmiş
- `action` veya `method` değişmiş
- `access_key` yok, boş ya da `onayli-tasarim` etiketindeki değerden farklı (değer hiçbir yere yazdırılmaz)
- gizli alanlardan biri (`subject`, `from_name`, `redirect`, `botcheck`, `proje`) eklenmiş, silinmiş ya da değeri değişmiş
- kullanıcı alanlarından biri eklenmiş, silinmiş ya da yeniden adlandırılmış; alanın türü, zorunluluğu, seçenekleri veya gönderilen değeri değişmiş
- sayfanın paketlenmiş betiğinde Web3Forms gönderim akışının parçaları (adres, `access_key`, `replyto`, `botcheck`, `/tesekkurler` …) yok

`npm run form-kontrol -- --goster` komutu `dist/` içindeki formların yapısını yazar. Envanter yalnızca müşterinin onayladığı bir form değişikliğinden sonra elle güncellenir.

## gorsel-kontrol

`scripts/guvenli-mod/gorsel-kontrol.mjs` dosyası her sayfa tipinden bir örneği 375, 768 ve 1280 px genişlikte Playwright (Chromium) ile çeker. Mobil menü paneli (M1, M2) ve ana sayfanın ilk ekranı (A1) kendi ekran boylarında çekilir:

| Kod | Sayfa | Örnek adres |
|---|---|---|
| A | Ana sayfa | `/` |
| A1 | Ana sayfa, yalnızca ilk ekran (hero; 412×915, 768×1024) | `/` |
| P | Projeler | `/projeler` |
| K | Kategori | `/bungalov` |
| D | Proje detayı | `/bungalov/asma-katli-verandali-bungalov` |
| G | Galeri (yalnızca ilk ekran) | `/galeri` |
| H | Hakkımızda | `/hakkimizda` |
| S | SSS | `/sss` |
| T | Teklif al (1. adım) | `/teklif-al` |
| T2 | Teklif al, 2. adım | `/teklif-al` |
| T3 | Teklif al, 3. adım | `/teklif-al` |
| İ | İletişim | `/iletisim` |
| TŞ | Teşekkürler | `/tesekkurler` |
| Y | Yasal sayfa | `/kvkk` |
| Ç | Çerez bandı, ilk ziyaret (ana sayfanın yalnızca ilk ekranı) | `/` |
| M1 | Mobil menü paneli açık, en üstte (375×667, 768×600) | `/iletisim` |
| M2 | Mobil menü paneli açık, en alta kaydırılmış (375×667, 768×600) | `/iletisim` |

Çekim koşulları:

- `prefers-reduced-motion: reduce` açık, CSS animasyonları kapalı.
- Lazy olanlar dahil tüm görünür görseller yüklenmiş.
- Fontlar tamamen yüklenmiş. `document.fonts.ready`, yüklenmekte olan font kalmayana dek yeniden beklenir.
- Stil, yüklenmiş fontlarla yeniden hesaplatılmış. Kök font boyutu bir anlığına değiştirilip geri alınır; yalnızca test tarayıcısındaki sayfada yapılır, sitenin stili değişmez (gerekçesi: Bilinen sınırlar).
- Ardından sayfa boyutu 100 ms arayla art arda 5 ölçümde aynı kalmış. Fontlar ya da boyut 15 sn içinde oturmazsa uyarı yazılır, çekim yine yapılır.
- Tam sayfa çekilir. Sabit öğeler (alt menü, WhatsApp düğmesi) ilk ekrandaki yerlerinde görünür.
- Galeri sonsuz kaydırmalı olduğu için yalnızca ilk ekranı çekilir.
- A1: ana sayfanın yalnızca ilk ekranı, Android telefon (412×915) ve dikey tablet (768×1024) boyunda. Hero'nun boyu ekran boyuna ve mobil alt menüye göre hesaplanır; tam sayfa çekim bunu ekran boyunda göstermez. Telefonda başlık, açıklama ve iki düğme alt menünün üstünde tamamen görünmelidir; tablette hero ekran boyunca uzamaz (`docs/hata-hero/`).
- T2 ve T3: önceki adımlar örnek verilerle doldurulur (yapı tipi, 60 m², Konut; İstanbul/Pendik, arsa, "Belirtmek istemiyorum", "Henüz belli değil") ve "Devam et" ile geçilir. Çekilen adım boş kalır. Çekimden önce sayfa en üste kaydırılır.
- M1 ve M2: sayfa 600 px kaydırılır, header küçülmüş duruma geçer. Panel, 375 px'te alt menüdeki, 768 px'te header'daki düğmeyle açılır. Düğmeye koordinatla basılır, çünkü Playwright'ın `locator.click`'i yapışkan header'ı görünüme kaydırırken sayfayı da oynatır. Ardından panel en üste (M1) ya da en alta (M2) kaydırılır ve yalnızca ekran çekilir. Ekranlar kasıtlı olarak kısadır (iPhone SE boyu ve yatay telefon ya da kısa pencere). Panel bu ekranlara sığmadığı için kendi içinde kayar. M2, son öğenin alt menünün ve ekranın alt kenarının üstünde kaldığını gösterir. Kaydırma, stil yeniden hesaplandıktan sonra yapılır; yeniden hesaplama kaydırma konumunu sıfırlayabilir.
- Hiçbir form gönderilmez: çekim sırasında Web3Forms'a giden her istek engellenir ve hata sayılır.
- Çerez bandı (`src/components/CerezBandi.astro`) Ç dışındaki çekimlerde kapatılmış sayılır: sayfa açılmadan localStorage'a `2k-ahsap-cerez-tercihi` kaydı yazılır (analitik ve pazarlama reddedilmiş). Sayfalar onaylı görünümle bantsız karşılaştırılır ve hiçbir izleme betiği yüklenmez. Ç, temiz bir tarayıcıda ilk ziyareti çeker: bant görünür.

| Klasör | İçerik | Depoda mı? |
|---|---|---|
| `referans/` | Onaylı görünüm (48 PNG) | Evet |
| `son/` | Son çalıştırmanın çekimleri | Hayır (`.gitignore`) |
| `fark/` | Fark görselleri (değişen pikseller kırmızı) ve `rapor.md` | Hayır (`.gitignore`) |

Seçenekler:

- `--esik=0.05`: yüzde olarak izin verilen fark (varsayılan 0). Aynı derleme iki kez çekildiğinde fark çoğunlukla %0'dır; ara sıra çıkan birkaç piksellik oynama için aşağıdaki "Gürültü toleransı"na bakın. Tek bir harf değişikliği bile yakalanır.
- `--gurultu-yok`: gürültü toleransını kapatır; tek bir piksel farkı bile hata sayılır.
- `--referans-yenile`: referansları baştan üretir. Yalnızca müşterinin onayladığı bir görünüm değişikliğinden sonra kullanılır.
- `--referans-yenile=yasal-kvkk,iletisim`: yalnızca adı (veya kodu) verilen sayfaların referansını yeniler; diğerleri her zamanki gibi karşılaştırılır. Onaylı değişiklik birkaç sayfayla sınırlıysa bu kullanılır. Referansı olmayan yeni bir çekim ilk çalıştırmada kendiliğinden referans olur.

### Gürültü toleransı

Chromium aynı derlemeyi bile ara sıra farklı çizer: yazı ve simge kenarlarında birkaç tekil piksel değişir. Örneğin 12 Ekim 2026'da bayt bayt aynı bir derlemede K ve D, 768 px'te 2 ve 8 piksel fark verdi. Yeniden çalıştırınca fark sıfırlandı.

Bir çekim, şu iki koşul birlikte sağlanırsa **"✓ geçti (gürültü)"** sayılır:

1. Fark %0,001'in altında. Örneğin 768×2800 bir çekimde en fazla 21 piksel.
2. Fark dağınık. Her fark pikselinin 8 px yakınında (yatay, dikey ya da çapraz) başka bir fark pikseli yok.

Gürültü sayılan çekim komutu başarısız yapmaz. Yine de konsolda, `rapor.md`'de ve `fark/` altındaki fark görselinde gösterilir.

Aşağıdakiler eskisi gibi hata sayılır:

- Eşiğin üstündeki her fark
- Bitişik piksellerden oluşan her fark, eşiğin altında kalsa bile (ör. bir harf veya noktalama değişikliği)
- Boyutu değişen her çekim

Tek pikselden küçük bir değişiklik (çok küçük puntoda bir nokta gibi) gürültüden ayırt edilemez. Böyle bir şüphede `--gurultu-yok` ile katı karşılaştırma yapın.

### Referans geçmişi

| Tarih | Sürüm | Değişiklik |
|---|---|---|
| 12 Ekim 2026 | `onayli-tasarim` (57268a2) | İlk 33 referans: müşteri onaylı görünüm |
| 12 Ekim 2026 | dd31535 | Y ve İ yenilendi: yasal metinler tamamlandı, KVKK kutusu metni "KVKK Aydınlatma Metni'ni okudum." oldu (onaylı). T2 ve T3 eklendi. |
| 12 Ekim 2026 | a216212 | 39 referansın tümü yenilendi: kategori ve proje düzenlemesi (onaylı). Ahşap Cami kategorisi eklendi, A-Frame "Üçgen Ev" oldu, projeler taşındı, birleştirildi, biri kaldırıldı. Değişen yerler: her sayfada footer kategori sütunu; A2 kategori butonları; P2 kartları; G2 filtresi ve ilk ekran; T2-1 yapı tipi kartları. Eski ve yeni derlemenin CSS/JS'i bayt bayt aynı, gövde HTML'i bu bölgeler dışında aynıydı. |
| 12 Ekim 2026 | Bu satırı ekleyen commit (kod ve referanslar birlikte) | M1 ve M2 eklendi (4 referans): mobil menü paneli hatası düzeltildikten sonra çekildi. Kaydırılmış sayfada panel header'a hapsolup kesiliyordu (`docs/hata-mobil-menu/`). Mevcut 39 referans değişmedi, düzeltmeden sonra da 39/39 aynı çıktı. Bu dört çekim düzeltme öncesi derlemede 4/4 fark verdi. |
| 13 Ekim 2026 | Bu satırı ekleyen commit (kod ve referanslar birlikte) | Yalnızca A (ana sayfa, 3 referans) yenilendi: bölüm geçişleri düzenlendi (onaylı; `docs/gecis-secenekleri/`). Tek boşluk ritmi, bölüm sınırlarında çizgi yok, ara bölümlerde `#262625`, Ürünlerimiz bandı kartların altından başlıyor. Yenilemeden önce fark yalnızca A'nın 3 çekimindeydi; diğer 40 çekim aynıydı (ikisi gürültü düzeyinde). Ayar kapalıyken hazırlanan önizleme derlemeleri de 43/43 geçmişti. |
| 13 Ekim 2026 | Bu satırı ekleyen commit (kod ve referanslar birlikte) | A 375 ve A 768 yenilendi, A1 eklendi (2 referans): ana sayfa hero'su telefonda ve dikey tablette düzeltildi (onaylı; `docs/hata-hero/`). Telefonda metin mobil alt menünün üstüne yaslanıyor; 641–1279 px'te hero en fazla genişliğin %90'ı kadar uzuyor. A 1280'in referansı bayt bayt aynı kaldı. Aynı commit'te kaydırılmış header'ın zemini tam opak oldu (onaylı). Bu katman kaydırılmamış çekimlerde görünmez; M1 ve M2'de de açık panelin altında kalır. Yenilemeden önce fark yalnızca A 375 ve A 768'deydi; diğer 41 çekim %0 aynıydı. |
| 13 Ekim 2026 | Bu satırı ekleyen commit (kod ve referanslar birlikte) | Yalnızca T, T2 ve T3 yenilendi (9 referans): teklif formu (onaylı; `docs/teklif-formu/`). Adım göstergesi tek satır oldu: numaralı daire, adım adı (Yapı · Arsa · İletişim) ve ince çizgi. Görünen "ADIM 1 / 3" yazısı ve tarayıcının varsayılan "1. 2. 3." liste numaraları kalktı. Yapı tipine "Diğer" kartı, altına "Projenizi kısaca anlatın" alanı eklendi. T uzadı; T2 ve T3 42 px kısaldı. Yenilemeden önce fark yalnızca bu 9 çekimdeydi; diğer 36 çekim %0 aynıydı. Yenilemeyle aynı turda P 1280'de bilinen header düğmesi oynaması çıktı (sayfanın HTML, CSS ve JS'i değişiklik öncesiyle bayt bayt aynı); yeniden çalıştırınca 45/45 aynı. |
| 14 Ekim 2026 | Bu satırı ekleyen commit (kod ve referanslar birlikte) | Yalnızca Y (`/kvkk`, 3 referans) yenilendi: yasal sayfaların "Son güncelleme" tarihi 12 Ekim → 14 Ekim 2026 oldu (onaylı). Eski referansla fark yalnızca tarihteki rakamda (7×10 px). 1280 px'te ayrıca header "Teklif Al" düğmesinin bilinen oynaması var (60 piksel, en çok 2 renk düzeyi; Bilinen sınırlar), yeni çekim öbür durumu taşıyor. Diğer 42 çekim aynıydı. |
| 14 Ekim 2026 | Bu satırı ekleyen commit (kod ve referanslar birlikte) | A, P, K, D, H, S, T, T2, T3, İ, TŞ ve Y yenilendi (36 referans): adres, Google İşletme Profili'ndeki resmi adresle aynı yapıldı (onaylı): "Kaynarca Akdeniz Cd, İpek Yolu Sokağı No:4/A, 34890 Pendik/İstanbul". Her sayfada fark footer'daki adres satırında, satır sayısı aynı. İletişim 375 px'te adres bir satır uzadı, altındaki her şey 27 px kaydı. İletişim 1280 px'te adres 2 satır oldu; sol sütunda harita kutusu 25 px kaydı, sayfa boyu aynı. KVKK 768/1280 px'te adres hücresi 2 satır oldu, altı 27 px kaydı. Eski ve yeni derlemenin CSS/JS'i bayt bayt aynı, HTML'i adres metni dışında aynı. Öğe kutusu karşılaştırmasında yatay konumu değişen öğe yok. P, D ve T3 1280'de ayrıca bilinen header düğmesi oynaması vardı. A1, G, M1 ve M2 yenilenmedi, yenileme turunda aynı çıktı. |
| 15 Ekim 2026 | Bu satırı ekleyen commit (kod ve referanslar birlikte) | Yalnızca A ve H yenilendi (6 referans; onaylı, önce/sonra çekimleri `docs/hakkimizda/`). Ana sayfadaki "Neden Ahşap?" bölümü "Neden 2K Ahşap?" oldu: yeni açıklama, 6 yeni madde ve ikon; kart düzeni aynı. Aynı bileşen Hakkımızda'ya da eklendi. Hakkımızda'ya Hikâyemiz ile Vizyonumuz/Misyonumuz kartları eklendi, title ve meta açıklama yenilendi. A kısaldı (375 px'te 7762 → 7512), fark Neden bölümünden başlıyor, altındaki bölümler yalnızca kaydı. H uzadı (1280 px'te 1825 → 4060). Neden kartlarına ikon hover'ı eklendi (ahşap çerçeve katmanı ve 3 px kalkma; dokunmatikte yok, hareket azaltılmışsa yalnızca çerçeve). Durağan görünümü değiştirmiyor: hover eklenmeden önceki ve sonraki çekimler piksel piksel aynı; A 1280'deki tek fark bilinen header düğmesi oynaması (63 piksel). Yenilemeden önce fark yalnızca bu 6 çekimdeydi; diğer 39 çekim %0 aynıydı. |
| 15 Ekim 2026 | Bu satırı ekleyen commit (kod ve referanslar birlikte) | Yalnızca H (`/hakkimizda`, 3 referans) yenilendi: sayfa yeniden tasarlandı, Öneri B (onaylı; `docs/hakkimizda/yeniden-tasarim/`). Düzende değişenler: fotoğraflı açılış (metin düz gece karartmalı alt bantta), iki sütunlu Hikâyemiz, büyük alıntı, iki açık Vizyon/Misyon paneli, Neden ile Sürecimiz arasında fotoğraf bandı. Bölüm boşlukları ana sayfa ritminde. Metinler, title ve meta açıklama aynı. H uzadı: 375 px'te 7627 → 8996, 768 px'te 4897 → 6987, 1280 px'te 4060 → 5197. Yenilemeden önce fark yalnızca H'nin 3 çekimindeydi; diğer 42 çekim %0 aynıydı, gürültü yok. Referanslar aynı koşunun `son/` çekimlerinden alındı; `--referans-yenile=hakkimizda` ile aynı derleme ve aynı çekim kodu. |
| 15 Ekim 2026 | Bu satırı ekleyen commit (kod ve referanslar birlikte) | 40 referans yenilendi (A, A1, P, K, D, H, S, T, T2, T3, İ, TŞ, Y'nin tümü; G 768 ve 1280): ad değişikliği (müşteri talebi) "Çardak" → "Kamelya" (`/kamelya`), proje adlarında ve metinlerde "A-Frame" → "Üçgen Ev". Hiçbir çekimin boyutu değişmedi. Fark yalnızca adların geçtiği yerlerde: her sayfada footer kategori sütunundaki tek kelime (216 px); A'da hero paragrafı ve kategori linkleri; A1 412'de hero paragrafı 3 → 4 satır ("kamelyaya" daha uzun), başlık bir satır yukarı kaydı, düğmeler ve alt menü yerinde; P'de kategori listesi; G'de filtre düğmesi ve sağındakilerin kayması; H'de giriş ve hikâye paragrafındaki birer satır; T'de yapı tipi kartı. K ve D 1280'de ayrıca header düğmesinin bilinen oynaması (y 34–77). G 375 (filtre ilk ekranda görünmüyor), M1 ve M2 %0 aynıydı, yenilenmedi. Referanslar tek koşunun `son/` çekimlerinden kopyalandı (aynı derleme); kopyadan sonra 45 çekimin 44'ü `son/` ile bayt bayt aynı, G 375 piksel olarak aynı. |
| 20 Ekim 2026 | Bu satırı ekleyen commit (kod ve referanslar birlikte) | Ç eklendi (3 referans): çerez bilgilendirme bandı (kullanıcı onaylı). Mevcut 45 referans yenilenmedi. Aynı gün bu bilgisayarda 45 çekimin hepsi referanstan farklı çıktı, değişiklik öncesi HEAD'de (faabf27) de yüzdesine kadar aynı farklar (Bilinen sınırlar, yazı tipi çizimi). Kanıt aynı ortamda alındı: HEAD'in ve bant eklenmiş sürümün 45 çekimi piksel olarak aynı (40'ı bayt bayt). Ç ikinci koşuda %0 aynı. |
| 20 Ekim 2026 | Bu satırı ekleyen commit (yalnızca referanslar) | 48 referansın tümü bu bilgisayarın yeni yazı tipi çizimiyle yenilendi (kullanıcı kararı; Bilinen sınırlar). Yenilenen derleme 4c8447c: çerez bandının metni "Sitemiz çerez kullanmaz…" oldu (Ç), yasal sayfaların "Son güncelleme" tarihi 14 Ekim → 20 Ekim 2026 oldu (Y). Diğer sayfaların farkı yalnızca yazı tipi çizimi. Yenilemeden sonraki ilk koşu 48/48 aynı, uyarı yok. |

### Bilinen sınırlar

- Çekimler tarayıcı sürümüne, işletim sistemine ve fontlara bağlıdır. Playwright sürümü `package.json` içinde sabittir (`1.63.0`). Referanslar bu Windows bilgisayarında üretildi. Başka bir ortamda karşılaştırma yapmadan önce referansları, Referans geçmişi'ndeki son sürümden yeniden üretin. Bu sürüm, `referans/` klasörünü en son değiştiren commit'tir; aşağıdaki ilk komut onu kendisi bulur:

  ```bash
  git worktree add ../2k-onayli $(git log -1 --format=%h -- docs/guvenli-mod/referans)   # referansların sürümünün ayrı bir kopyası
  (cd ../2k-onayli && npm ci && npm run build)
  rm -rf dist && cp -r ../2k-onayli/dist dist           # onaylı sürümün derlemesi
  npm run gorsel-kontrol -- --derleme-yok --referans-yenile
  git worktree remove --force ../2k-onayli
  ```

- Fontlar 14 Ekim 2026'dan beri sitenin kendi dosyalarıdır (`public/fonts/`, `src/styles/fontlar.css`); çekim için internet bağlantısı gerekmez. Dosyalar Google Fonts'un verdiği dosyaların bayt bayt aynısıdır; geçişten sonra 45 çekimin 45'i %0 farkla aynı çıktı.
- Gürültüden ayrı olarak, aynı derlemede seyrek bir düzen oynaması görülebilir. Bir çekimin boyu birkaç on piksel uzayabilir (sayfa sonunda zemin renginde şerit) ya da bir paragraf farklı satıra kırılabilir. 12 Ekim 2026'da aynı derlemeyle yapılan 6 çalıştırmanın 3'ünde, her seferinde farklı bir sayfada görüldü (A 768, G 768, T2 768, İ 1280).
  - **Neden:** Metin sütunları `--olcu-metin: 65ch` ile sınırlıdır. Stil, Inter yüklenmeden hesaplanırsa `ch` yedek fontun ölçüsüyle belirlenir. Chromium bu değeri font yüklendikten sonra her zaman güncellemez. Sütun daralır, satırlar farklı kırılır, sayfa boyu değişir ve sayfa bu düzende sabit kalır.
  - **Ölçüm:** Galeri 768 px'te 24 açılışın 23'ünde sütun 650 px, birinde 520 px çıktı; o açılışta da fontlar yüklenmişti. Fontlar yapay olarak 1,5 sn geciktirilince hakkımızda 1280 px'te 3 açılışın 2'sinde sütun 585 px, sayfa boyu 1856 px oldu. Stil yeniden hesaplatılınca 715 px ve 1825 px'e, yani referans değerlerine döndü.
  - **Önlem:** Yalnızca beklemek yetmiyor; sayfa yanlış düzende de sabitleniyor. Bu yüzden çekimden önce stil yüklenmiş fontlarla yeniden hesaplatılır (Çekim koşulları). Fontlar 1,5 sn geciktirildiğinde önlemsiz kod 1 çekimde fark verdi, önlemli kod iki turda da 39/39 temiz geçti.
  - **Sitedeki çözüm (14 Ekim 2026):** Aynı bayatlık gerçek ziyaretçilerde de olabiliyordu. Fontlar sitenin kendi dosyalarına alındı ve Inter latin önceden yükleniyor (preload). Asıl önlem yedek fonttadır: Inter'in yedeği (Arial; Android'de Roboto), "0" genişliği Inter'inkine eşit olacak şekilde `size-adjust` ile ölçeklendi (`src/styles/fontlar.css`). Böylece `ch` Inter gelmeden önce de sonra da aynıdır; değer bayat kalsa bile sütun genişliği değişmez.
    - **Kanıt, fontlar hiç gelmezken:** ch ile sınırlı her sütunun `max-width`'i fontlu ölçümle karşılaştırıldı (12 sayfa × 375/768/1280 px, 228 sütun). Önceki derlemede 228'i de dardı (ör. 650 → 585 px); yeni derlemede fark 0.
    - **Kanıt, fontlar 0,5 / 1,5 / 3 sn geciktirilince:** Önceki derlemede 165 açılışın 8'inde sütun bayat kaldı (hakkımızda 1280 px'te 585 px, sayfa boyu 1856 px). Yeni derlemede 165 açılışın hiçbirinde.
    - Ayrıntı: `docs/denetim-raporu.md`, "Fontlar ve 65ch sütunları". gorsel-kontrol'deki stil yeniden hesaplatma önlemi zararsız olduğu için yerinde bırakıldı.
  - Böyle bir fark yine çıkarsa gürültü sayılmaz ve hata verir. Derleme çıktısı değişmediyse kontrol yeniden çalıştırılır. Fark tekrarlanıyorsa gerçektir.
- 1280 px'te header'daki "Teklif Al" düğmesinin yuvarlak kenarı iki çizim durumu arasında gidip gelir. Yaklaşık 60 bitişik pikselde renk 1–2 düzey değişir; gözle fark edilmez. Bölge x 1106–1247, y 34–77; ana sayfada saydam header yüzünden y 72–115.
  - Fark bitişik piksellerden oluştuğu için gürültü toleransına takılmaz ve hata verir. Referansların kendisi de iki durumdan birini taşıyabilir.
  - **Ölçüm:** 12 Ekim 2026'da kategori düzenlemesi öncesindeki derlemeyle aynı sayfa (İletişim ve Hakkımızda, 1280 px) 10'ar kez çekildi; ikisinde de 2 çekimde öbür durum çıktı. Yani içerik ya da stil farkı değildir.
  - Fark yalnızca bu bölgedeyse kontrol yeniden çalıştırılır; referans yenilenmez, kod geri alınmaz. Düğme bölgesinin dışına taşan fark gerçektir.
- **Yazı tipi çizimi değişti (20 Ekim 2026):** Bu bilgisayarda değişiklik öncesi HEAD (faabf27) bile 45 çekimin 45'inde referanstan farklı çıktı. Metin her sayfada biraz daha koyu ve dar çiziliyor, bazı satırlar farklı kırılıyor, A, H, S, T ve Y'nin boyu kısalıyor (ör. Y 1280: 4385 → 4330). Playwright sürümü aynı (`1.63.0`); fark kodda değil, ortamda (büyük olasılıkla işletim sistemi ya da yazı tipi çizimi güncellemesi). Referanslar aynı gün, kullanıcı kararıyla bu ortamda yenilendi (Referans geçmişi). Ortam yeniden değişirse aynı belirti görülür: değişiklik yapılmamış HEAD de her çekimde fark verir. O zaman bir değişikliğin görünümü bozmadığının kanıtı, aynı ortamda değişiklik öncesi ve sonrası çekimlerin karşılaştırılmasıdır (`git stash -u`, `npm run gorsel-kontrol`, `son/`'u sakla, `git stash pop`, yeniden çalıştır, iki `son/`'u karşılaştır).
- Footer'daki yıl derleme anında yazılır (`© 2026`). Yıl değişince tüm sayfalarda küçük bir fark çıkar. Bu beklenen bir farktır ve referanslar o zaman yenilenir.
