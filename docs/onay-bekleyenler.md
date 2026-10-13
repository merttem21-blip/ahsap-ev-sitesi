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
| `[ONAY: ticari elektronik ileti gönderilecek mi?]` | §3'teki "Açık rızanız olması hâlinde bilgilendirme ve tanıtım iletileri göndermek" maddesi kaldırıldı. **Kaldırılması onaylandı (12 Ekim 2026).** | Kampanya veya SMS gönderilmeye başlanırsa madde metne geri eklenecek ve formlara ayrı, isteğe bağlı bir izin kutusu konacak (zorunlu KVKK kutusundan bağımsız). İYS kaydı da gerekir. |
| `[ONAY: iş ortağı türleri]` | Yalnızca yer tutucu silindi. "Nakliye, kurulum, muhasebe ve mali müşavirlik gibi hizmet aldığımız iş ortaklarına" cümlesi kaldı. | Gerçekte veri paylaşılan iş ortağı türlerinin listesi. |
| `[ONAY: e-posta hizmet sağlayıcısı]` | Yalnızca yer tutucu silindi. Metin genel: "e-posta hizmet sağlayıcımıza". | info@2kahsap.com kutusunun sağlayıcısı (ör. Google Workspace, Yandex, barındırma firması) ve sunucularının yurt dışında olup olmadığı. |
| `[ONAY: yurt dışı aktarım dayanağı, ör. standart sözleşme ve Kurul'a bildirim]` | Yalnızca yer tutucu silindi. "Yurt dışına aktarım KVKK'nın 9. maddesindeki şartlara uygun olarak yapılır" cümlesi kaldı. | Vercel, Web3Forms, e-posta sağlayıcısı ve WhatsApp/Meta için 9. madde dayanağı. Hukukçu teyidi gerekir. |
| `[ONAY: kişisel veri saklama ve imha politikası]` | Yalnızca yer tutucu silindi. Metin genel: "amaç için gereken süre ve mevzuattaki süreler". | Saklama süreleri. Not: `guvenlik-kurallari` skill'i form verisi için "en fazla 1 yıl" diyor. CLAUDE.md Metin Kuralı ise kesin süre yazılmasını yasaklıyor. Sitede süre yazılacaksa önce karar verilmeli. |

## 2. Uygulandı, teyit edilmeli

- **Vergi numarası.** Vergi no (11 hane, T.C. kimlik no olabilir) bilinçli olarak gizlendi; yayınlanması gerekip gerekmediği muhasebeciye sorulacak. Numara `src/data/site.ts` içinde `firma.vergiNo` alanında duruyor. Hiçbir sayfada, meta veride veya JSON-LD'de kullanılmıyor. KVKK sayfasında yalnızca vergi dairesi görünüyor.
- **Ticari unvan.** Şahıs işletmesinde ticaret unvanı işletme sahibinin adı ve soyadını içerir (TTK md. 40). "Azra Ahşap Ev" bir işletme adı olabilir. Vergi levhasındaki unvanla birebir aynı olmalı.
- **Marka yazımı.** Prompt'ta "2K Ahşap" yazıyordu. Sitenin her yerinde "2K AHŞAP" kullanıldığı için yasal metinlerde de bu yazım kullanıldı: "Azra Ahşap Ev (2K AHŞAP)". Değiştirmek için `firma.marka` yeterli. Bu durumda header, footer ve schema.org'daki ad da değişir.

## 3. KVKK onay kutusu metni (onaylandı ve uygulandı, 12 Ekim 2026)

Teklif formu (`/teklif-al`, 3. adım) ve iletişim formu (`/iletisim`) aynı bileşeni kullanır: `src/components/form/KvkkOnay.astro`.

**Eski metin:**

> KVKK Aydınlatma Metni kapsamında kişisel verilerimin, talebimin yanıtlanması amacıyla işlenmesini kabul ediyorum.

**Neden değişti:** Eski metin, kutunun işaretlenmesini bir rıza beyanı gibi kuruyordu ("işlenmesini kabul ediyorum"). Kutu zorunlu olduğu için talep göndermek bu rızaya bağlanmış oluyordu. Talebi yanıtlamak için veri işlemenin dayanağı açık rıza değil, KVKK md. 5/2-c'dir (sözleşmenin kurulması). Aydınlatma ile açık rıza ayrı tutulur ve açık rıza bir hizmetin ön şartı yapılmaz.

**Yeni metin:**

> KVKK [Aydınlatma Metni](/kvkk)'ni okudum.

"Aydınlatma Metni" `/kvkk` sayfasına yeni sekmede açılan linktir. Kutunun `name="kvkk"`, `value="Evet"`, zorunluluğu ve stili aynı. Kutu her zaman boş gelir.

**Birlikte güncellenen metinler** (aynı ifadeyi tekrarlıyorlardı):

| Yer | Eski | Yeni |
|---|---|---|
| `src/scripts/form.ts`, hata mesajı | Formu gönderebilmek için KVKK Aydınlatma Metni'ni onaylamanız gerekiyor. | Formu gönderebilmek için KVKK Aydınlatma Metni'ni okuduğunuzu işaretleyin. |
| `src/scripts/form.ts`, e-postadaki "KVKK onayı" alanı | Evet. KVKK Aydınlatma Metni kapsamında kişisel verilerinin talebinin yanıtlanması amacıyla işlenmesini kabul etti. | Evet. KVKK Aydınlatma Metni'ni okuduğunu işaretledi. |
| `src/scripts/form.ts`, WhatsApp mesajının son satırı | KVKK Aydınlatma Metni'ni okudum ve onaylıyorum (tarih). | KVKK Aydınlatma Metni'ni okudum (tarih). |
| `src/pages/kvkk.astro`, §4 "Web sitesi formları" | Formdaki onayınız ve onay zamanı da talebinizle birlikte iletilir. | Aydınlatma metnini okuduğunuzu işaretlediğiniz bilgisi ve zamanı da talebinizle birlikte iletilir. |
| `.claude/skills/guvenlik-kurallari/SKILL.md` §4, örnek onay metni | Kişisel verilerimin, KVKK Aydınlatma Metni kapsamında … işlenmesini kabul ediyorum. | Yeni metin ve kısa gerekçesi. |

E-postadaki alan adı ("KVKK onayı") ve gönderim akışı değişmedi; yalnızca değerler değişti. Form envanteri etkilenmedi.

## 4. Çerez politikası (bilgi)

Sitede onay gerektiren çerez veya betik yok. `/cerez-politikasi` ve `/gizlilik` iki şeyden söz etmiyor:

- `/iletisim`'de tıklanınca yüklenen Google Haritalar penceresi
- form gönderildikten sonra tarayıcıya yazılan `2k-ahsap-son-gonderim` kaydı (30 sn bekleme için, zorunlu işlev)

Bu, `docs/denetim-raporu.md` madde 8'de de not edilmişti. Eklenmesi bir metin değişikliği olduğu için onay bekliyor.

## 5. Teklif formu: taslak kaydetme (Prompt 9, 13 Ekim 2026)

Teklif formunda taslak kaydetme henüz yok. Prompt 9'da yapılacak.

- Taslak, 13 Ekim 2026'da 1. adıma eklenen `proje_aciklamasi` alanını ("Projenizi kısaca anlatın", en fazla 1000 karakter) da kapsamalı (müşteri isteği).
- Bu alan yapı tipi "Diğer" seçiliyken zorunludur. Taslaktan "Diğer" geri yüklenirse alanın zorunlu durumu ve kalan karakter sayacı da güncellenmeli (`src/pages/teklif-al.astro` ve `src/scripts/form.ts`). Ayrıntı: `docs/teklif-formu/README.md`.
