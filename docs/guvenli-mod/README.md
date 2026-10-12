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

`scripts/guvenli-mod/gorsel-kontrol.mjs` dosyası her sayfa tipinden bir örneği 375, 768 ve 1280 px genişlikte Playwright (Chromium) ile çeker. Mobil menü paneli (M1, M2) yalnızca 375 ve 768 px'te çekilir:

| Kod | Sayfa | Örnek adres |
|---|---|---|
| A | Ana sayfa | `/` |
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
- T2 ve T3: önceki adımlar örnek verilerle doldurulur (yapı tipi, 60 m², Konut; İstanbul/Pendik, arsa, "Belirtmek istemiyorum", "Henüz belli değil") ve "Devam et" ile geçilir. Çekilen adım boş kalır. Çekimden önce sayfa en üste kaydırılır.
- M1 ve M2: sayfa 600 px kaydırılır, header küçülmüş duruma geçer. Panel, 375 px'te alt menüdeki, 768 px'te header'daki düğmeyle açılır. Düğmeye koordinatla basılır, çünkü Playwright'ın `locator.click`'i yapışkan header'ı görünüme kaydırırken sayfayı da oynatır. Ardından panel en üste (M1) ya da en alta (M2) kaydırılır ve yalnızca ekran çekilir. Ekranlar kasıtlı olarak kısadır (iPhone SE boyu ve yatay telefon ya da kısa pencere). Panel bu ekranlara sığmadığı için kendi içinde kayar. M2, son öğenin alt menünün ve ekranın alt kenarının üstünde kaldığını gösterir. Kaydırma, stil yeniden hesaplandıktan sonra yapılır; yeniden hesaplama kaydırma konumunu sıfırlayabilir.
- Hiçbir form gönderilmez: çekim sırasında Web3Forms'a giden her istek engellenir ve hata sayılır.

| Klasör | İçerik | Depoda mı? |
|---|---|---|
| `referans/` | Onaylı görünüm (43 PNG) | Evet |
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

### Bilinen sınırlar

- Çekimler tarayıcı sürümüne, işletim sistemine ve fontlara bağlıdır. Playwright sürümü `package.json` içinde sabittir (`1.63.0`). Referanslar bu Windows bilgisayarında üretildi. Başka bir ortamda karşılaştırma yapmadan önce referansları, Referans geçmişi'ndeki son sürümden yeniden üretin. Bu sürüm, `referans/` klasörünü en son değiştiren commit'tir; aşağıdaki ilk komut onu kendisi bulur:

  ```bash
  git worktree add ../2k-onayli $(git log -1 --format=%h -- docs/guvenli-mod/referans)   # referansların sürümünün ayrı bir kopyası
  (cd ../2k-onayli && npm ci && npm run build)
  rm -rf dist && cp -r ../2k-onayli/dist dist           # onaylı sürümün derlemesi
  npm run gorsel-kontrol -- --derleme-yok --referans-yenile
  git worktree remove --force ../2k-onayli
  ```

- Fontlar Google Fonts'tan yüklenir, bu yüzden çekim sırasında internet bağlantısı gerekir.
- Gürültüden ayrı olarak, aynı derlemede seyrek bir düzen oynaması görülebilir. Bir çekimin boyu birkaç on piksel uzayabilir (sayfa sonunda zemin renginde şerit) ya da bir paragraf farklı satıra kırılabilir. 12 Ekim 2026'da aynı derlemeyle yapılan 6 çalıştırmanın 3'ünde, her seferinde farklı bir sayfada görüldü (A 768, G 768, T2 768, İ 1280).
  - **Neden:** Metin sütunları `--olcu-metin: 65ch` ile sınırlıdır. Stil, Inter yüklenmeden hesaplanırsa `ch` yedek fontun ölçüsüyle belirlenir. Chromium bu değeri font yüklendikten sonra her zaman güncellemez. Sütun daralır, satırlar farklı kırılır, sayfa boyu değişir ve sayfa bu düzende sabit kalır.
  - **Ölçüm:** Galeri 768 px'te 24 açılışın 23'ünde sütun 650 px, birinde 520 px çıktı; o açılışta da fontlar yüklenmişti. Fontlar yapay olarak 1,5 sn geciktirilince hakkımızda 1280 px'te 3 açılışın 2'sinde sütun 585 px, sayfa boyu 1856 px oldu. Stil yeniden hesaplatılınca 715 px ve 1825 px'e, yani referans değerlerine döndü.
  - **Önlem:** Yalnızca beklemek yetmiyor; sayfa yanlış düzende de sabitleniyor. Bu yüzden çekimden önce stil yüklenmiş fontlarla yeniden hesaplatılır (Çekim koşulları). Fontlar 1,5 sn geciktirildiğinde önlemsiz kod 1 çekimde fark verdi, önlemli kod iki turda da 39/39 temiz geçti.
  - Aynı bayatlık gerçek ziyaretçilerde de olabilir: font geç yüklenirse metin sütunu dar kalabilir. Bu sitenin kendisiyle ilgili ayrı bir konudur; fontların sitenin kendi dosyalarına alınmasıyla birlikte ele alınacak.
  - Böyle bir fark yine çıkarsa gürültü sayılmaz ve hata verir. Derleme çıktısı değişmediyse kontrol yeniden çalıştırılır. Fark tekrarlanıyorsa gerçektir.
- 1280 px'te header'daki "Teklif Al" düğmesinin yuvarlak kenarı iki çizim durumu arasında gidip gelir. Yaklaşık 60 bitişik pikselde renk 1–2 düzey değişir; gözle fark edilmez. Bölge x 1106–1247, y 34–77; ana sayfada saydam header yüzünden y 72–115.
  - Fark bitişik piksellerden oluştuğu için gürültü toleransına takılmaz ve hata verir. Referansların kendisi de iki durumdan birini taşıyabilir.
  - **Ölçüm:** 12 Ekim 2026'da kategori düzenlemesi öncesindeki derlemeyle aynı sayfa (İletişim ve Hakkımızda, 1280 px) 10'ar kez çekildi; ikisinde de 2 çekimde öbür durum çıktı. Yani içerik ya da stil farkı değildir.
  - Fark yalnızca bu bölgedeyse kontrol yeniden çalıştırılır; referans yenilenmez, kod geri alınmaz. Düğme bölgesinin dışına taşan fark gerçektir.
- Footer'daki yıl derleme anında yazılır (`© 2026`). Yıl değişince tüm sayfalarda küçük bir fark çıkar. Bu beklenen bir farktır ve referanslar o zaman yenilenir.
