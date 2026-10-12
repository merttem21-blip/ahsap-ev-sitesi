# Yeni Proje Ekleme Rehberi

Bu rehber, kod bilmeyen birinin sitemize yeni bir proje ekleyebilmesi için yazıldı. Adımları sırayla izleyin.

**Kısaca:** Yeni proje eklemek iki iştir:

1. Fotoğrafları doğru klasöre koymak
2. Projenin kayıt dosyasını doldurmak

Başka hiçbir dosyaya dokunmanız gerekmez. Proje; kendi sayfasında, kategori sayfasında, Galeri'de ve Projeler sayfasındaki proje sayısında kendiliğinden görünür.

---

## Başlamadan önce

- Site dosyaları bu bilgisayarda `C:\Projeler\ahsap-ev-sitesi` klasöründedir.
- Komutları **VS Code** içinde yazarsınız: üst menüden **Terminal → New Terminal**. Açılan pencereye komutu yazıp **Enter**'a basın.
- Elinizde olması gerekenler:
  - Projenin fotoğrafları
  - Projenin adı (ör. "Kemerli Pod Bungalov")
  - Müşteri izni: konum yazılacaksa, fotoğrafta yüz, araç plakası veya kapı numarası görünüyorsa

---

## 1. Projeye kısa bir ad verin

Bu ad, sitedeki adresin parçası olur: `2kahsap.com/bungalov/kemerli-pod-bungalov`

Kurallar:

- Yalnızca küçük harf, rakam ve tire (`-`) kullanılır.
- Türkçe harfler Latin harfe çevrilir: ç → c, ğ → g, ı → i, ö → o, ş → s, ü → u
- Boşluk yerine tire yazılır.
- 3–6 kelimeyle yapıyı anlatır ve yapı türünü içerir (bungalov, villa, çardak …). Sıra numarası veya tarih kullanılmaz.
- Müşterinin adı kullanılmaz. Yer adı yalnızca müşteri izin verirse eklenir (ör. `sapanca-orman-bungalovu`).
- Sitedeki başka bir projeyle aynı olamaz.
- Yayınlandıktan sonra değiştirilmez; değişirse sayfanın adresi de değişir.

| Proje adı | Kısa ad |
|---|---|
| Kemerli Pod Bungalov | `kemerli-pod-bungalov` |
| Taş Duvarlı Bahçe Çardağı | `tas-duvarli-bahce-cardagi` |
| Römorklu Tiny House | `romorklu-tiny-house` |

Bu rehberde bundan sonra bu ada **proje-adı** diyeceğiz.

## 2. Kategoriyi seçin

| Sitedeki kategori | Klasör adı |
|---|---|
| Ahşap Ev | `ahsap-ev` |
| Bungalov | `bungalov` |
| Villa | `villa` |
| Tiny House | `tiny-house` |
| Üçgen Ev | `ucgen-ev` |
| Çardak | `cardak` |
| Otel-Bar | `otel-bar` |
| Çocuk Oyun Parkı | `cocuk-oyun-parki` |
| Ahşap Cami | `ahsap-cami` |
| Özel Tasarım (vitrin, kulübe, kabin, depo ve diğerleri) | `ozel-tasarim` |

Klasör adı tablodaki gibi yazılmalıdır. Yeni bir kategori gerekiyorsa geliştiriciye sorun.

## 3. Fotoğrafları hazırlayın

- **Yalnızca kendi projemizin fotoğrafları** kullanılır. İnternetten bulunan, stok veya yapay zekâyla üretilmiş görsel konmaz.
- **En az 4 fotoğraf** gerekir. Projeyi en iyi anlatan, net ve iyi ışıklı kareleri seçin. Bulanık, karanlık veya eğri olanları eleyin.
- **Biçim:** JPG en iyisidir. PNG, WEBP, TIFF ve AVIF de olur.
  - iPhone'un **HEIC** fotoğrafları kabul edilmez. Önce JPG'ye çevirin. Bundan sonraki çekimler için iPhone'da **Ayarlar → Kamera → Formatlar → En Uyumlu** seçeneğini açabilirsiniz.
- **Boyut:** Fotoğrafın genişliği **en az 1600 piksel** olmalı. Telefonla çekilen orijinal fotoğraflar bu boyutun üstündedir.
  - WhatsApp'tan gelen fotoğraflar küçültülmüş olur. Müşteriden veya ekipten orijinal dosyayı isteyin. Küçük fotoğraf büyütülmez; sitede bulanık görünür.
  - Dosyanın MB olarak büyüklüğü sorun değildir. Site için 600, 1000 ve 1600 piksel genişliğinde hafif kopyalar kendiliğinden üretilir.
- **Kapak fotoğrafı** projeyi en iyi anlatan **yatay** bir dış cephe fotoğrafı olsun. Kartlarda 4:3 oranında kırpılır; dikey fotoğrafın üstü ve altı kesilir.
- **Gizlilik:** Yüz, araç plakası veya kapı numarası net görünen fotoğrafları müşteri izni yoksa kullanmayın ya da önce kırpın. Fotoğrafın içindeki konum (GPS) bilgisi site kopyalarından kendiliğinden silinir.

## 4. Fotoğrafları adlandırın

Her fotoğrafın adı **proje-adı + tire + iki haneli sıra numarası** olur:

```
kemerli-pod-bungalov-01.jpg
kemerli-pod-bungalov-02.jpg
kemerli-pod-bungalov-03.jpg
...
```

- `01` kapak olacak dış cephe fotoğrafı olsun.
- Önerilen sıra: dış cephe → detaylar → iç mekân → yapım aşaması. Sırayı sonra kayıt dosyasında da değiştirebilirsiniz.
- `IMG_2041.jpg` gibi telefonun verdiği adları bırakmayın. İki projede aynı adlı fotoğraf olursa site derlenmez.

## 5. Fotoğrafları klasöre koyun

Proje klasörünün yolu: `ham-gorseller\<kategori>\<proje-adı>\`

Örnek:

```
C:\Projeler\ahsap-ev-sitesi\ham-gorseller\bungalov\kemerli-pod-bungalov\
    kemerli-pod-bungalov-01.jpg
    kemerli-pod-bungalov-02.jpg
    ...
```

`ham-gorseller` klasörü yoksa proje klasörünün içinde oluşturun. Bu klasör GitHub'a gönderilmez. Orijinal fotoğrafları ayrıca harici diske veya buluta yedekleyin.

## 6. Komutu çalıştırın

Terminale şunu yazın:

```
npm run yeni-proje
```

Bu komut:

1. Fotoğrafların site için hafif kopyalarını üretir: `public\images\<kategori>\<proje-adı>\` içine her fotoğraftan üç boy WebP
2. Proje için kayıt dosyası taslağını açar: `src\content\projeler\<proje-adı>.md`. Fotoğraf listesi hazır gelir.

Başarılı olursa şuna benzer bir sonuç görürsünüz:

```
Taslak kayıt oluşturuldu:
  src\content\projeler\kemerli-pod-bungalov.md
```

Ünlem (`!`) ile başlayan satırlar uyarıdır:

| Uyarı | Ne yapmalı |
|---|---|
| `böyle bir kategori yok` | Kategori klasörünün adını 2. adımdaki tabloya göre düzeltin, komutu tekrar çalıştırın. |
| `en az 4 gerekir` | Fotoğraf ekleyin, komutu tekrar çalıştırın. Ardından yeni fotoğrafları kayıt dosyasındaki listeye elle ekleyin (bkz. "Var olan projeye fotoğraf eklemek"). |
| `dosya adları "...-01" biçiminde olmalı` | Adı uymayan fotoğrafları 4. adıma göre yeniden adlandırın. `public\images\...\<proje-adı>\` klasörünü ve kayıt dosyasını silip komutu tekrar çalıştırın. |
| `HEIC desteklenmiyor` | O fotoğrafları JPG'ye çevirip komutu tekrar çalıştırın. |

Komutu istediğiniz kadar tekrar çalıştırabilirsiniz. Var olan kayıt dosyalarına dokunmaz, daha önce çevrilmiş fotoğrafları atlar.

## 7. Kayıt dosyasını doldurun

`src\content\projeler\<proje-adı>.md` dosyasını VS Code'da açın. `#` ile başlayan satırlar açıklamadır, sitede görünmez.

| Alan | Zorunlu mu | Ne yazılır |
|---|---|---|
| `baslik` | Evet | Sitede görünen proje adı. Ör. `baslik: Kemerli Pod Bungalov` |
| `kategori` | Evet | Komut doldurur; değiştirmeyin. |
| `kapak` | Evet | Kapak fotoğrafının adı (uzantısız). Listedeki dosyalardan biri olmalı. Komut ilk fotoğrafı yazar. |
| `konum` | Hayır | Ör. `konum: Sapanca, Sakarya`. **Sitede görünür.** Yalnızca müşteri izin verdiyse yazın, yoksa boş bırakın. |
| `il` | Hayır | Ör. `il: Sakarya`. Şu an sitede görünmez, ileride kullanılabilir. Yalnızca müşteri izin verdiyse yazın. 81 ilden biri, Türkçe yazımıyla (İstanbul, İzmir, Muğla …), ya da `Yurt dışı`. |
| `one_cikan` | Hayır | `true` (evet) ya da `false` (hayır). Şu an sitede görünmez. |
| `etiketler` | Hayır | Virgülle ayrılmış kısa sözcükler. Ör. `etiketler: veranda, asma kat, şömine`. Şu an sitede görünmez. |
| `fotograflar` | Evet | Her fotoğrafın `dosya` adı ve `alt` metni. Galeri bu sırayla gösterilir. |
| Teknik şartname | Hayır | `kapali_alan_m2`, `kat_sayisi`, `oda_sayisi`, `ahsap_turu`, `cati_kaplama` … Doldurulanlar proje sayfasında tablo olarak görünür, boşlar gizlenir. |

### Alt metinleri

Alt metni, fotoğrafı göremeyen ziyaretçilere ve Google'a fotoğrafta ne olduğunu anlatır.

- Biçim: `"Proje adı – fotoğrafta ne görünüyor"`
- 5–15 kelimelik, en fazla 125 karakterlik Türkçe bir ifade; her fotoğrafta farklı
- "Fotoğraf", "resim", "görsel" diye başlamaz
- Anahtar kelime yığını yazılmaz ("ahşap ev bungalov villa fiyatları" gibi)

```yaml
fotograflar:
  - dosya: kemerli-pod-bungalov-01
    alt: "Kemerli pod bungalov – orman içinde ön cephe ve ahşap teras"
  - dosya: kemerli-pod-bungalov-02
    alt: "Kemerli pod bungalov – yandan kemerli çatı ve pencereler"
```

**Sırayı değiştirmek:** `- dosya:` satırını altındaki `alt:` satırıyla birlikte kesip istediğiniz yere yapıştırın.

**Bir fotoğrafı göstermemek:** `- dosya:` ve altındaki `alt:` satırını silin.

### Proje açıklaması (önerilir)

Dosyanın en altındaki `---` satırının **altına** projeyi anlatan birkaç cümle yazabilirsiniz. Proje sayfasında "Proje Hakkında" başlığıyla görünür.

Açıklama ya da teknik şartnameden en az biri doldurulmazsa proje sayfası Google'da listelenmez. Sitede yine görünür.

### Metin kuralları

- Süre, fiyat, m² maliyeti, garanti süresi, sertifika ya da proje sayısı gibi kesin rakam ve söz **yazılmaz**. Bunun yerine "projeye göre değişir, teklifte netleştirilir" gibi ifadeler kullanılır. `teslim_suresi` alanını boş bırakın.
- Metinler sade, güven veren bir dille yazılır. Ahşabın genel faydalarından söz edilebilir.
- Türkçe yazım hatasına dikkat edin.

### Yazım kuralları (dosya biçimi)

- İki noktadan (`:`) sonra bir boşluk bırakın: `baslik: Kemerli Pod Bungalov`
- Satır başlarındaki boşlukları silmeyin, Tab tuşu kullanmayın. Fotoğraf listesindeki girintiler önemlidir.
- Alt metinlerini her zaman çift tırnak içinde yazın. İçinde `:` veya `#` geçen başka metinleri de tırnağa alın.

## 8. Kontrol edin

Terminale şunu yazın:

```
npm run build
```

Sonda `Complete!` yazıyorsa her şey yolunda. Hata varsa site derlenmez ve hatanın nedeni yazılır:

| Mesaj | Anlamı |
|---|---|
| `baslik: proje adını yazın` | `baslik` boş. |
| `Alt metni fotoğrafı anlatmalı` | Bir alt metni boş ya da 10 karakterden kısa. |
| `Alt metni en fazla 125 karakter olmalı` | Bir alt metni çok uzun. |
| `Her proje en az 4 fotoğraftan oluşur` | Listede 4'ten az fotoğraf var. |
| `kapak, fotograflar listesindeki dosyalardan biri olmalı` | `kapak` adı listedeki adlarla birebir aynı değil. |
| `il: 81 ilden biri olmalı` | İl adı yanlış yazılmış (ör. `Istanbul` değil `İstanbul`). |
| `one_cikan: true ya da false yazın` | `evet` gibi başka bir şey yazılmış. |
| `[görsel] Dosya bulunamadı` | Listede adı geçen fotoğraf `public\images` içinde yok; ad yanlış yazılmış olabilir. |
| `[galeri] Aynı dosya adı iki kez kullanılmış` | Bu ad başka bir projede de var; 4. adıma göre yeniden adlandırın. |
| `bad indentation …`, `unexpected end of the stream …` gibi İngilizce bir mesaj ve altında `Location:` | Dosya biçimi bozuk: girinti, iki nokta ya da kapanmamış tırnak. `Location:` satırının sonundaki `:14:3`, sorunun 14. satırda olduğunu gösterir. Hata bazen bir üst satırdadır. |

Ardından fotoğrafları denetleyin:

```
npm run check:images
```

Son olarak siteyi bilgisayarınızda açıp bakın:

```
npm run dev
```

Tarayıcıda `http://localhost:4321/<kategori>/<proje-adı>` adresini açın. Ayrıca kategori sayfasına ve Galeri'ye bakın. Bitince terminalde **Ctrl + C** ile kapatın.

## 9. Yayınlayın

Değişiklikleri GitHub'a gönderin. VS Code'da sol menüdeki **Source Control** (dal simgesi) panelinden:

1. Mesaj kutusuna kısa bir açıklama yazın: `Yeni proje: Kemerli Pod Bungalov`
2. **Commit**'e, ardından **Sync Changes**'e (ya da **Push**) basın.

Aynı işin komutla yapılışı:

```
git add src/content/projeler public/images
git commit -m "Yeni proje: Kemerli Pod Bungalov"
git push
```

Vercel değişikliği birkaç dakika içinde siteye yansıtır. Hangi dalda (branch) çalıştığınızdan emin değilseniz göndermeden önce geliştiriciye sorun.

---

## Sık yapılan diğer işler

### Var olan projeye fotoğraf eklemek

1. Yeni fotoğrafları aynı `ham-gorseller\<kategori>\<proje-adı>\` klasörüne koyun. Numaraları sürdürün (`-13`, `-14` …).
2. `npm run images` komutunu çalıştırın.
3. Kayıt dosyasındaki `fotograflar` listesine her yeni fotoğraf için bir `- dosya:` ve bir `alt:` satırı ekleyin.

`npm run yeni-proje` var olan kayıtlara dokunmaz. Bu yüzden eklemeyi listede elle yaparsınız.

### Projeyi kaldırmak

`src\content\projeler\<proje-adı>.md` dosyasını ve `public\images\<kategori>\<proje-adı>\` klasörünü silin.

### Sıralama nasıl belirlenir?

- Kategori sayfasında projeler başlığa göre alfabetik sıralanır.
- Galeri'de önce tüm projelerin kapak fotoğrafları, ardından diğer fotoğraflar gelir. İkisinde de projeler kategori sırasıyla, kategori içinde başlığa göre dizilir.
- Bir projenin kendi galerisi, kayıt dosyasındaki `fotograflar` sırasıyla gösterilir.

---

## Geliştirici notu

**Verinin yeri (tek kaynak):**

| Veri | Yer |
|---|---|
| Projeler | `src/content/projeler/<proje-adı>.md`. Şema ve doğrulama: `src/content/config.ts` |
| Kategoriler: ad, slug, sıra, sayfa metinleri, `vitrin`, teklif formu ipucu, ana sayfa kartı | `src/data/site.ts` → `kategoriler` |
| Fotoğraflar | `public/images/<kategori>/<proje-adı>/<ad>-{600,1000,1600}.webp` |
| Ortak yardımcılar | `src/lib/projeler.ts`, `src/lib/gorsel.ts` |

- `il`, `one_cikan` ve `etiketler` henüz hiçbir sayfada kullanılmaz. Şema boş değerleri `null`, `false` ve `[]` olarak verir. `etiketler` hem YAML listesini hem virgüllü metni kabul eder; boşlukları kırpar, tekrarları atar.
- `npm run yeni-proje` = `npm run images` + taslak kayıt (`scripts/yeni-proje.mjs`). Kategori listesini `src/data/site.ts`'ten okur. Ayrıntılı görsel kuralları: `.claude/skills/gorsel-yonetimi`.
- **Güvenli Mod:** Yeni proje görünür içerik ekler. Projeler sayfasındaki proje sayısı, kategori sayfası, Galeri ve aynı kategorideki proje sayfalarının "diğer projeler" kartları değişir. Bu yüzden `npm run gorsel-kontrol` bu sayfalarda fark bildirir. Bu bir tasarım değişikliği değil, beklenen bir içerik farkıdır. Referanslar onaydan sonra `--referans-yenile=<sayfa>` ile yenilenir (`docs/guvenli-mod/README.md`). `npm run form-kontrol` temiz geçmelidir.
