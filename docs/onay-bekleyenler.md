# Onay bekleyenler

- **Tarih:** 12 Ekim 2026
- **Kapsam:** Yasal sayfalarda (`/kvkk`, `/gizlilik`, `/cerez-politikasi`) karşılığı henüz olmayan bilgiler ve onay gerektiren metin önerileri.
- **Firma bilgilerinin kaynağı:** `src/data/site.ts` (`firma`). Bir bilgi netleşince orada doldurulur; yasal sayfalar kendiliğinden güncellenir.

## 1. Metinden çıkarılan yer tutucular

Bu yer tutucuların karşılığı yoktu. Sitede artık görünmüyorlar; ne yapıldığı aşağıda.

| Eski yer tutucu | Ne yapıldı | Gereken bilgi |
|---|---|---|
| `[ONAY: MERSİS numarası]` | `firma.mersis` boş. Boşken satır etiketiyle birlikte hiç görünmüyor. | MERSİS numarası. Doldurulunca KVKK sayfasındaki "Veri Sorumlusu" tablosunda kendiliğinden çıkar. |
| `[ONAY: KEP adresi, varsa]` | `firma.kep` boş. Boşken hem tablo satırı hem §8'deki "KEP adresimize" ifadesi görünmüyor. | KEP adresi. Doldurulunca iki yerde de kendiliğinden çıkar. |
| `[ONAY: VERBİS kayıt durumu veya muafiyet bilgisi]` | Satır tamamen kaldırıldı. VERBİS kaydı veya muafiyeti hakkında hiçbir ifade yok. | Bir şey yazılacaksa önce hukukçu onayı. |
| `[ONAY: ticari elektronik ileti gönderilecek mi?]` | §3'teki "Açık rızanız olması hâlinde bilgilendirme ve tanıtım iletileri göndermek" maddesi kaldırıldı. Yanıt belli olmadan bu amacı yazmak, yapılmayan bir işlemi bildirmek olurdu. | Tanıtım iletisi gönderilecek mi? Gönderilecekse: madde geri eklenir, formlara ayrı ve isteğe bağlı bir izin kutusu gerekir, İYS kaydı yapılır. |
| `[ONAY: iş ortağı türleri]` | Yalnızca yer tutucu silindi. "Nakliye, kurulum, muhasebe ve mali müşavirlik gibi hizmet aldığımız iş ortaklarına" cümlesi kaldı. | Gerçekte veri paylaşılan iş ortağı türlerinin listesi. |
| `[ONAY: e-posta hizmet sağlayıcısı]` | Yalnızca yer tutucu silindi. Metin genel: "e-posta hizmet sağlayıcımıza". | info@2kahsap.com kutusunun sağlayıcısı (ör. Google Workspace, Yandex, barındırma firması) ve sunucularının yurt dışında olup olmadığı. |
| `[ONAY: yurt dışı aktarım dayanağı, ör. standart sözleşme ve Kurul'a bildirim]` | Yalnızca yer tutucu silindi. "Yurt dışına aktarım KVKK'nın 9. maddesindeki şartlara uygun olarak yapılır" cümlesi kaldı. | Vercel, Web3Forms, e-posta sağlayıcısı ve WhatsApp/Meta için 9. madde dayanağı. Hukukçu teyidi gerekir. |
| `[ONAY: kişisel veri saklama ve imha politikası]` | Yalnızca yer tutucu silindi. Metin genel: "amaç için gereken süre ve mevzuattaki süreler". | Saklama süreleri. Not: `guvenlik-kurallari` skill'i form verisi için "en fazla 1 yıl" diyor. CLAUDE.md Metin Kuralı ise kesin süre yazılmasını yasaklıyor. Sitede süre yazılacaksa önce karar verilmeli. |

## 2. Uygulandı, teyit edilmeli

- **Vergi numarası 11 haneli (`41998593334`).** Şirketlerin vergi kimlik numarası 10 hanelidir. 11 hane, şahıs işletmesi olduğunu ve bu numaranın işletme sahibinin T.C. kimlik numarası olabileceğini gösterir. Numara artık KVKK sayfasında herkese açık. Yayına almadan (push) önce bunun bilerek yapıldığını teyit edin. Gerekirse `firma.vergiNo` boşaltılıp satır gizlenebilir.
- **Ticari unvan.** Şahıs işletmesinde ticaret unvanı işletme sahibinin adı ve soyadını içerir (TTK md. 40). "Azra Ahşap Ev" bir işletme adı olabilir. Vergi levhasındaki unvanla birebir aynı olmalı.
- **Marka yazımı.** Prompt'ta "2K Ahşap" yazıyordu. Sitenin her yerinde "2K AHŞAP" kullanıldığı için yasal metinlerde de bu yazım kullanıldı: "Azra Ahşap Ev (2K AHŞAP)". Değiştirmek için `firma.marka` yeterli. Bu durumda header, footer ve schema.org'daki ad da değişir.

## 3. KVKK onay kutusu metni: öneri (uygulanmadı)

Teklif formu (`/teklif-al`, 3. adım) ve iletişim formu (`/iletisim`) aynı bileşeni kullanır: `src/components/form/KvkkOnay.astro`.

**Mevcut metin:**

> KVKK Aydınlatma Metni kapsamında kişisel verilerimin, talebimin yanıtlanması amacıyla işlenmesini kabul ediyorum.

**Sorun:** Metin, kutunun işaretlenmesini bir rıza beyanı gibi kuruyor ("işlenmesini kabul ediyorum"). Kutu zorunlu olduğu için talep göndermek bu rızaya bağlanmış oluyor. Talebi yanıtlamak için veri işlemenin dayanağı açık rıza değil, KVKK md. 5/2-c'dir (sözleşmenin kurulması). KVKK sayfası da bunu böyle anlatıyor. Aydınlatma ile açık rıza ayrı tutulmalı ve açık rıza bir hizmetin ön şartı yapılmamalı. Bu yüzden kutu, rıza yerine aydınlatma metninin okunduğunu belirtmeli.

**Önerilen metin:**

> [KVKK Aydınlatma Metni](/kvkk)'ni okudum.

Kutunun `name="kvkk"`, `value="Evet"`, zorunluluğu ve stili aynı kalır; yalnızca metin değişir.

**Metin onaylanırsa birlikte değişmesi gerekenler** (aynı ifadeyi tekrarlıyorlar):

| Yer | Şu an | Öneri |
|---|---|---|
| `src/scripts/form.ts`, hata mesajı | Formu gönderebilmek için KVKK Aydınlatma Metni'ni onaylamanız gerekiyor. | Formu gönderebilmek için KVKK Aydınlatma Metni'ni okuduğunuzu işaretleyin. |
| `src/scripts/form.ts`, e-postadaki "KVKK onayı" alanı | Evet. KVKK Aydınlatma Metni kapsamında kişisel verilerinin talebinin yanıtlanması amacıyla işlenmesini kabul etti. | Evet. KVKK Aydınlatma Metni'ni okuduğunu işaretledi. |
| `src/scripts/form.ts`, WhatsApp mesajının son satırı | KVKK Aydınlatma Metni'ni okudum ve onaylıyorum (tarih). | KVKK Aydınlatma Metni'ni okudum (tarih). |
| `src/pages/kvkk.astro`, §4 "Web sitesi formları" | Formdaki onayınız ve onay zamanı da talebinizle birlikte iletilir. | Aydınlatma metnini okuduğunuzu işaretlediğiniz bilgisi ve zamanı da talebinizle birlikte iletilir. |
| `.claude/skills/guvenlik-kurallari/SKILL.md` §4, örnek onay metni | Kişisel verilerimin, KVKK Aydınlatma Metni kapsamında … işlenmesini kabul ediyorum. | Önerilen metinle aynı. |

E-postadaki alan adı ("KVKK onayı") ve gönderim akışı değişmez; yalnızca değerler değişir. Form envanteri etkilenmez.

## 4. Çerez politikası (bilgi)

Sitede onay gerektiren çerez veya betik yok. `/cerez-politikasi` ve `/gizlilik` iki şeyden söz etmiyor:

- `/iletisim`'de tıklanınca yüklenen Google Haritalar penceresi
- form gönderildikten sonra tarayıcıya yazılan `2k-ahsap-son-gonderim` kaydı (30 sn bekleme için, zorunlu işlev)

Bu, `docs/denetim-raporu.md` madde 8'de de not edilmişti. Eklenmesi bir metin değişikliği olduğu için onay bekliyor.
