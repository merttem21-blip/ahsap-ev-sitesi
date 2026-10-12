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

`scripts/guvenli-mod/gorsel-kontrol.mjs` dosyası her sayfa tipinden bir örneği 375, 768 ve 1280 px genişlikte Playwright (Chromium) ile çeker:

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

Çekim koşulları:

- `prefers-reduced-motion: reduce` açık, CSS animasyonları kapalı.
- Lazy olanlar dahil tüm görünür görseller ve fontlar yüklenmiş.
- Tam sayfa çekilir. Sabit öğeler (alt menü, WhatsApp düğmesi) ilk ekrandaki yerlerinde görünür.
- Galeri sonsuz kaydırmalı olduğu için yalnızca ilk ekranı çekilir.
- T2 ve T3: önceki adımlar örnek verilerle doldurulur (yapı tipi, 60 m², Konut; İstanbul/Pendik, arsa, "Belirtmek istemiyorum", "Henüz belli değil") ve "Devam et" ile geçilir. Çekilen adım boş kalır. Çekimden önce sayfa en üste kaydırılır.
- Hiçbir form gönderilmez: çekim sırasında Web3Forms'a giden her istek engellenir ve hata sayılır.

| Klasör | İçerik | Depoda mı? |
|---|---|---|
| `referans/` | Onaylı görünüm (39 PNG) | Evet |
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

### Bilinen sınırlar

- Çekimler tarayıcı sürümüne, işletim sistemine ve fontlara bağlıdır. Playwright sürümü `package.json` içinde sabittir (`1.63.0`). Referanslar bu Windows bilgisayarında üretildi. Başka bir ortamda karşılaştırma yapmadan önce referansları, Referans geçmişi'ndeki son sürümden yeniden üretin (aşağıda `dd31535`):

  ```bash
  git worktree add ../2k-onayli dd31535                 # referansların sürümünün ayrı bir kopyası
  (cd ../2k-onayli && npm ci && npm run build)
  rm -rf dist && cp -r ../2k-onayli/dist dist           # onaylı sürümün derlemesi
  npm run gorsel-kontrol -- --derleme-yok --referans-yenile
  git worktree remove --force ../2k-onayli
  ```

- Fontlar Google Fonts'tan yüklenir, bu yüzden çekim sırasında internet bağlantısı gerekir.
- Gürültüden ayrı olarak, aynı derlemede seyrek bir düzen oynaması görülebilir. Bir çekimin boyu birkaç on piksel uzayabilir (sayfa sonunda zemin renginde şerit) ya da bir paragraf farklı satıra kırılabilir. 12 Ekim 2026'da aynı derlemeyle yapılan 6 çalıştırmanın 3'ünde, her seferinde farklı bir sayfada görüldü (A 768, G 768, T2 768, İ 1280). Nedeni doğrulanmadı; font yükleme zamanlamasından şüpheleniliyor. Bu farklar gürültü sayılmaz ve hata verir. Derleme çıktısı değişmediyse kontrol yeniden çalıştırılır. Fark tekrarlanıyorsa gerçektir.
- Footer'daki yıl derleme anında yazılır (`© 2026`). Yıl değişince tüm sayfalarda küçük bir fark çıkar. Bu beklenen bir farktır ve referanslar o zaman yenilenir.
