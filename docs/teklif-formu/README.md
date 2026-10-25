> Bu klasörün görselleri 25 Ekim 2026'da depodan kaldırıldı (yer açmak için). Son hâlleri `98d28cd` commit'inde duruyor: `git checkout 98d28cd -- docs/teklif-formu/`

# Teklif formu: adım göstergesi, "Diğer" yapı tipi ve proje açıklaması (13 Ekim 2026)

Müşteri isteği (harita: T2-1 ve adım göstergesi), müşteri onaylı (13 Ekim 2026). Yalnızca `/teklif-al` sayfası değişti. Renk, font, kart, çizgi ve köşe dili mevcut token'lardan geliyor; yeni renk veya font eklenmedi.

## 1. Adım göstergesi

**Önceki sorun:** "ADIM 1 / 3 Yapı" yazısı, üç ince çizgi ve altlarında kaymış "1. 2. 3." rakamları vardı. Bu rakamlar tasarımın parçası değildi. Global CSS `ul` listelerinin numarasını kapatıyor ama `ol`'ü kapatmıyor. Bu yüzden tarayıcının varsayılan liste numaraları çizgilerin altında, sola kaymış olarak görünüyordu. Düzeltme yalnızca bu listede yapıldı. Global CSS'e dokunulmadı; diğer sayfalardaki `ol` listeleri (breadcrumb, "Formu gönderdikten sonra", süreç adımları) etkilenmez.

**Yeni tasarım:** Tek satırda üç adım: numaralı daire + adın kendisi (Yapı · Arsa · İletişim), aralarında 1 px çizgi.

| Durum | Daire | Ad | Sonraki çizgi |
|---|---|---|---|
| Tamamlanan | Ahşap çerçeve, onay işareti (Lucide, 1,5 px) | Ahşap açık (`--color-ahsap-acik`) | Ahşapla dolar |
| Bulunulan | Krem çerçeve, seçili kart yüzeyi (`--color-yuzey-secili`), krem rakam | Krem, 500 | İnce krem çizgi |
| Sıradaki | Soluk çerçeve (`--color-cizgi-girdi`), soluk rakam | Soluk (`--color-metin-soluk`) | İnce krem çizgi |

- Daire 28 px, 640 px ve üstünde 32 px. Daire, ad ve çizgi aynı satırda dikeyde ortalı.
- Durumlar renkle birlikte şekille de ayrılır (onay işareti ve rakam). Çizgi dolumu eskisi gibi yalnızca `transform: scaleX` ile; hareket azaltılmışsa anında.
- Göstergeye tıklanmaz. Önceden de tamamlanan adıma dönme yalnızca "Geri" düğmesiyleydi; ekleme yapılmadı.
- Görünen "ADIM 1 / 3" yazısı kaldırıldı (onaylı); bu bilgi artık ekran okuyucu metninde (aşağıda).
- Adım başlıkları değişmedi: 2. adımın başlığı yine "Arsa ve plan". Göstergede istenen kısa ad "Arsa" kullanılır. WhatsApp mesajındaki bölüm başlığı da "Arsa ve plan" olarak kaldı.

**Ekran okuyucu:**

- Gizli durum metni: "Adım 2 / 3: Arsa" (adım değişince güncellenir).
- Liste adı "Form adımları"; bulunulan adımda `aria-current="step"`, tamamlanan adımda gizli ", tamamlandı" eki.
- Daire ve çizgiler `aria-hidden`. Adım başlıklarındaki gizli "Adım 2 / 3: " öneki eskisi gibi duruyor; adım değişince odak başlığa taşınır.

**Genişlik ölçümleri** (Chromium ve WebKit aynı; üç adın toplamı ~105 px):

| Genişlik | Göstergenin alanı | Görünen adlar | Çizgi boyu | Taşma |
|---|---|---|---|---|
| 320 | 254 px | yalnızca bulunulan adım | 31–69 px | yok |
| 360 | 294 px | üçü | ~24 px | yok |
| 375 | 309 px | üçü | 32 px | yok |
| 412 | 346 px | üçü | 51 px | yok |
| 768 | 654 px | üçü | 185 px | yok |
| 1280 / 1920 | 670 px | üçü | 193 px | yok |

- 360 px'in altında üç ad tek satıra sığmıyor. Orada yalnızca bulunulan adımın adı görünür; diğer adlar ekran okuyucuda kalır. 360 px yaygın Android genişliği olduğu için eşik 375 değil 360 px. Bu yedek düzen onaylandı.
- 320–1920 px arasında hiçbir genişlikte yatay kaydırma yok; gösterge her genişlikte tek satır (28 / 32 px yükseklik).

## 2. "Diğer" yapı tipi

- Yapı tipi kartlarının sonunda, diğerleriyle aynı kart: "Diğer", alt metin "Listede olmayan bir yapı". Gönderilen değer `Diğer`, alan adı `yapi_tipi` aynı.
- Mevcut 10 kartın sırası ve görünümü aynı. Seçenek `src/data/site.ts` kategorilerine eklenmedi (eklenseydi bir kategori sayfası doğardı); yalnızca teklif sayfasında listenin sonuna eklenir.
- `?yapi=<kategori>` ve `?proje=<slug>` ile gelen ön seçim eskisi gibi çalışır.
- Mobilde kartlar 2 sütun olduğu için "Diğer" son satırda tek başına durur; 640 px ve üstünde (3 sütun) son satırda "Özel Tasarım"ın yanındadır.

## 3. Proje açıklaması (yeni alan)

- Yapı tipi kartlarının hemen altında, mevcut metin alanlarıyla aynı stilde çok satırlı alan. `name="proje_aciklamasi"`, en fazla 1000 karakter.
- Başlık "Projenizi kısaca anlatın", ipucu "Örn. ne için kullanacağınız, kaç kişinin kalacağı, mutlaka olmasını istediğiniz özellikler." (müşterinin onayda verdiği metin; ilk taslaktaki "Örn. kullanım amacı, oda sayısı, istediğiniz özellikler." yerine).
- Normalde isteğe bağlı: etikette "(isteğe bağlı)" yazar. "Diğer" seçilince zorunlu olur: "(isteğe bağlı)" kalkar, alan ekran okuyucuya zorunlu duyurulur. Boşken "Devam et"e basılırsa "Lütfen nasıl bir yapı düşündüğünüzü kısaca yazın." hatası çıkar, odak alana gider. Yazınca ya da başka bir yapı tipi seçilince hata kalkar.
- Kalan karakter sayısı alanın sağ altında görünür ("1000 karakter kaldı"). Ekran okuyucu bunu alana gelince duyar; yazarken yalnızca son 100 karaktere inince ve yazmaya ara verilince "… karakter kaldı" diye duyurulur. JS kapalıyken sayaç görünmez, sınırı tarayıcı uygular.
- **E-posta:** "Proje açıklaması" başlığıyla, Yapı bölümünün sonunda (Kullanım amacı'ndan sonra). Boşsa e-postada hiç yer almaz.
- **WhatsApp yedeği:** Aynı satır "*Yapı*" bölümünde. Boşsa hiç yer almaz.
- **Taslak kaydetme:** Sitede taslak kaydetme özelliği yok (formda `localStorage`/`sessionStorage` yalnızca 30 sn'lik gönderim aralığı için kullanılıyor). Bu yüzden kapsanacak bir taslak yok; özellik de eklenmedi. Prompt 9'daki taslak kaydetme işinin bu alanı da kapsaması gerektiği `docs/onay-bekleyenler.md` §5'e not edildi.

### "Ek not" alanıyla karışma denetimi

3. adımda zaten bir not alanı var; ona dokunulmadı.

| | 1. adım (yeni) | 3. adım (mevcut) |
|---|---|---|
| `name` / id | `proje_aciklamasi` / `alan-proje_aciklamasi` | `not` / `alan-not` |
| Görünen başlık | Projenizi kısaca anlatın | Eklemek istedikleriniz |
| İpucu | Örn. ne için kullanacağınız, kaç kişinin kalacağı, mutlaka olmasını istediğiniz özellikler. | Oda sayısı, beğendiğiniz bir proje veya özel istekleriniz. En fazla 2000 karakter. |
| E-posta etiketi | Proje açıklaması | Not |
| WhatsApp | *Yapı* bölümünde "Proje açıklaması: …" | *Ek not* bölümünde "Not: …" |
| Sınır | 1000, sayaçlı | 2000, sayaçsız |

- Başlıklar, id'ler, alan adları ve e-posta etiketleri birbirinden farklı; e-postada ikisi ayrı satırda gelir (sahte gönderimle denetlendi).
- **İpuçlarının yakınlığı:** İlk taslakta iki ipucu da "oda sayısı"nı soruyordu. Onaylanan yeni ipucuyla "oda sayısı" yalnızca 3. adımda geçiyor. "Mutlaka olmasını istediğiniz özellikler" (1. adım) ile "özel istekleriniz" (3. adım) hâlâ birbirine yakın; müşteri aynı isteği iki yere yazabilir. İstenmediği için 3. adımın ipucu değiştirilmedi. İleride örneğin "Beğendiğiniz bir proje, arsaya ulaşım ya da eklemek istediğiniz başka bir şey." gibi bir metin önerilebilir (onay gerekir).

## Form envanteri ve kontroller

- Envanter (`docs/guvenli-mod/form-envanteri.json`) onaydan sonra güncellendi: `yapi_tipi` seçeneklerinin sonuna "Diğer" eklendi, `proje_aciklamasi` (textarea, HTML'de isteğe bağlı) eklendi. Ardından `form-kontrol` temiz geçti: 2 form, 30 alan envanterle aynı.
- `form-kontrol` (envanter güncellenmeden önce) yalnızca beklenen iki farkı buldu: `yapi_tipi` seçeneklerine "Diğer" eklendi; `proje_aciklamasi` alanı eklendi. `access_key`, gizli alanlar, diğer alan adları, action/method ve gönderim akışı aynı.
- `gorsel-kontrol` (referanslar yenilenmeden önce): 45 çekimin 36'sı %0 aynı. Fark yalnızca teklif sayfasının 9 çekiminde (T, T2, T3 × 375/768/1280). T uzadı ("Diğer" kartı ve açıklama alanı); T2 ve T3 42 px kısaldı (gösterge artık tek satır).
- Onaydan sonra yalnızca bu 9 referans yenilendi (`--referans-yenile=T,T2,T3`). Ardından `gorsel-kontrol`: 45 çekimin 45'i aynı.
- Gerçek test gönderimi (13 Ekim 2026, tek gönderim, "Diğer" + dolu açıklama + 3. adım notu): mail geldi. "Yapı tipi: Diğer" ve "Proje açıklaması" satırları var, açıklamanın ikinci satırı ayrı satırda, "Not" ayrı satırda (müşteri teyidi).

## Görüntüler

`prefers-reduced-motion` açık, 2× çözünürlük. Kartın üst kısmı (gösterge + adım başlığı) ve yapı tipi kartlarının sonu kırpıldı. Sabit alt menü ve yüzen WhatsApp düğmesi bu çekimlerde gizlendi (kırpılan bölgeyi örtmesinler diye; sitede yerindeler). PNG olarak çekildi, JPEG'e (kalite 85) çevrildi.

- `once/`: değişiklik öncesi (dc70a92)
- `sonra/`: değişiklikten sonra
- `karsilastirma/`: önce | sonra yan yana
  - `adim-1|2|3-375.jpg`, `adim-1|2|3-1280.jpg`: göstergenin üç hali. `adim-*-320.jpg`: 360 px altındaki yedek düzen.
  - `diger-375.jpg`, `diger-1280.jpg`: önce (yapı tipi kartlarının sonu) | "Diğer" seçili, açıklama boşken "Devam et" (hata) | açıklama dolu (sayaç).
