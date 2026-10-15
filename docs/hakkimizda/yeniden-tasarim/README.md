# Hakkımızda yeniden tasarım (Öneri B, uygulandı)

- **Tarih:** 15 Ekim 2026
- **Dal:** `gelistirme-2026`. `main`'e birleştirilmedi.
- **Durum:** Müşteri iki öneriden (A ve B) **B**'yi seçti. Son hal `src/pages/hakkimizda.astro` dosyasında. A ve kullanılmayan kodu kaldırıldı.
- **Kapsam:** Yalnızca Hakkımızda sayfasının düzeni ve görsel sunumu. Metinler (tanıtım, hikâye, vizyon, misyon, Neden 2K Ahşap maddeleri) birebir aynı; title ve meta açıklama da değişmedi. Renk token'ları, fontlar ve "gradyan yok" kuralı korundu. Yeni renk, font, rakam veya bilgi eklenmedi. Diğer sayfalara dokunulmadı.

## Dosyalar

| Dosya | İçerik |
|---|---|
| `mevcut-375.png`, `mevcut-1280.png` | Değişiklikten önceki hal (`80274ba`), tam sayfa |
| `B-son-375.png`, `B-son-1280.png` | Son hal, tam sayfa |

Çekim koşulları gorsel-kontrol ile aynı: hareket azaltılmış, tüm görseller ve fontlar yüklenmiş. 375 px çekimlerde mobil alt menü ve WhatsApp düğmesi ilk ekrandaki yerlerinde görünür. Tam sayfa çekimde metnin üstüne binmiş gibi durabilirler; gerçek sayfada ekranın altında sabit kalırlar.

## Son düzen

Zemin sırası:

1. Açılış fotoğrafı (metin alttaki bantta, düz gece karartması)
2. Hikâyemiz (gece)
3. Büyük alıntı (gece)
4. Vizyonumuz / Misyonumuz (gece)
5. Neden 2K Ahşap (ara yumuşak ton)
6. Fotoğraf bandı
7. Sürecimiz (gece)
8. Footer teklif bandı

Bölümlerin ayrıntısı:

- **Açılış:** Tam genişlik proje fotoğrafının üst kısmı açık kalır.
  - Konum çubuğu, H1 ve tanıtım metni alttaki bantta durur. Bandın zemini galerideki bilgi bandıyla aynı yöntem: düz gece karartması (`--color-karartma`, %70). Fotoğrafın en açık yerinde bile krem metin 4.5:1 kontrastı korur.
  - Masaüstünde (≥ 1024 px) bantta başlık solda, tanıtım sağda.
  - Açılışın boyu ekranın ~%80'i. Header diğer alt sayfalardaki gibi antrasit.
- **Hikâyemiz:** Masaüstünde dikey fotoğraf solda, metin sağda; mobilde metin üstte, fotoğraf altta.
- **Alıntı:** "Her yapıya, kendi evimizi inşa ediyormuş gibi yaklaşmak." Hikâyeden sonra ayrı ve büyük duran bir ara bölüm; üstünde yalnızca ince bir çizgi var.
  - Cümle hikâye metninde de aynen duruyor.
  - Alıntı `aria-hidden` taşır, ekran okuyucu cümleyi iki kez okumaz.
- **Vizyonumuz / Misyonumuz:** Kart yok; iki geniş, açık panel. Her panelin üstünde ince ahşap çizgi var. Başlıklar H2 boyutunda, metin 18 px ve satır aralığı 1.75. Masaüstünde yan yana, mobilde ve tablette alt alta.
- **Neden 2K Ahşap ve Sürecimiz:** Bileşenlerin koduna dokunulmadı. Aralarına tam genişlik, köşesiz bir fotoğraf bandı eklendi.
- **Bölüm ritmi:** Ana sayfayla aynı (`--bolum-ritim`: mobilde 64 px, ≥ 768 px'te 96 px). Neden 2K Ahşap ile Sürecimiz bu değişkeni ana sayfadaki gibi kendiliğinden alır. Bu yüzden ikisinin üst ve alt boşluğu bu sayfada 128'den 96 px'e (1280 px'te), 80'den 64 px'e (375 px'te) iner.
- **Hareket:** Yalnızca sitedeki mevcut "ortaya çıkma" efekti (`data-ortaya`). Açılış hiç gizlenmez.

## Fotoğraflar

Fotoğrafların hepsi proje galerilerinde zaten yayında. Alt metinleri projenin kendi kaydından okunur (`src/content/projeler`); proje veya fotoğraf kaldırılırsa derleme durur.

| Yer | Fotoğraf | Alt metni | Neden |
|---|---|---|---|
| Açılış, < 1024 px | `tas-kaideli-verandali-ahsap-ev-04` (dikey) | Taş kaideli verandalı ahşap ev – ahşap kirişli tavan ve salon penceresi | Masaüstündeki salonun dikey çekimi. Telefonda bandın üstünde ışıklı kirişler ve avize kalır. Yatay fotoğraf dikey alana ~3,5 kat büyütülüp bulanıklaşıyordu. |
| Açılış, ≥ 1024 px | `tas-kaideli-verandali-ahsap-ev-07` (yatay) | (aynı `<img>`, alt metni yukarıdaki) | Akşam çekilmiş, içi ışıklı, sıcak tonlu salon; marka-stili büyük görsellerde bunu önceliklendiriyor. Kirişler bandın üstünde, zemin ve ambalajlı eşya bandın altında kalır. |
| Hikâyemiz | `genis-verandali-asma-katli-bungalov-17` | Geniş verandalı asma katlı bungalov – asma kat korkuluğu ve gün ışığı alan salon | Yere düşen gün ışığı metindeki "ilk gün doğumu" hissini verir. Akşam ışıklı açılışla gündüz–akşam karşıtlığı kurar. 5:7 kadraj soldaki siyah kapı kasasını büyük ölçüde dışarıda bırakır. |
| Fotoğraf bandı | `genis-verandali-ahsap-villa-05` | Geniş verandalı ahşap villa – saçak altı ve sürme cam kapılar | Ahşap cephe kaplaması ve saçak kirişleri işçiliği yakından gösterir. Sürecimiz'den (üretim, kurulum) önce bitmiş bir yapının detayı olarak durur. |

Açılış fotoğrafı sayfanın LCP öğesidir:

- `<picture>` ile iki kadraj verilir; `loading="eager"` ve `fetchpriority="high"` taşır.
- Sayfada yüksek öncelikli tek görsel budur. Diğer görseller `loading="lazy"` ve `decoding="async"`.
- `sizes` görselin gerçek görüntülenme genişliğini anlatır: telefonda fotoğraf açılışın boyuna göre ölçeklendiği için `160vw`, diğer genişliklerde `100vw`.

## Skill gözden geçirmesi

Son hal `frontend-design` ve kullanıcı düzeyindeki `ui-ux-pro-max` (UX kuralları ve `--stack astro`) ile gözden geçirildi. Proje skill'leri (marka-stili, responsive-duzen, gorsel-yonetimi, seo-kurallar) her zaman önceliklidir.

### Uygulananlar

| Skill | Öneri | Uygulama |
|---|---|---|
| frontend-design | "Cesaretini tek yerde harca" | Alıntı sayfanın tek iddialı tipografik öğesi yapıldı: 48'den 60 px'e (1280 px'te) büyüdü. Tip ölçeği H1 72 → alıntı 60 → H2 48 → H3 24 oldu. Önceden alıntı ve H2 aynı boydaydı, hiyerarşi bulanıktı. |
| frontend-design | "Aynadan bak, bir aksesuarı çıkar"; yapı öğeleri süs değil bilgi taşımalı | Alıntının üstündeki kısa ahşap çizgi kaldırıldı. Bölümü ayıran ince çizgi kaldı. |
| frontend-design | Ekran görüntüsüyle öz eleştiri | 320, 375, 390, 768 ve 1280 px'te çekim alınıp incelendi. |
| ui-ux-pro-max (astro) | "Use picture for responsive images / art direction" | Açılış `<picture>` ile verildi: telefon ve tablette dikey, masaüstünde yatay kadraj. |
| ui-ux-pro-max (ux) | Gövde metninde satır aralığı 1.5–1.75 | Vizyon/Misyon metni 1.8'den 1.75'e indi. |
| ui-ux-pro-max (ux) | Metin yeniden akışı: sabit yükseklik yok, içerik büyüdükçe alan büyür | Açılış `min-height` ve `padding` ile kurulu; metin uzarsa bant büyür, kırpılmaz. |
| İstek | Telefonda bandın üstünde fotoğrafın en az üçte biri görünsün | Mobilde bandın iç boşlukları daraltıldı (üst 16 → 8 px, H1 üstü 8 → 0 px, başlık–metin arası 24 → 16 px, alt 48 → 32 px); metin kısaltılmadı. Bant 375 px'te 520'den 481 px'e indi. Bandın üstünde en az 280 px (ya da ekranın %36'sı) fotoğraf kalır. |

Mobil ölçüm: bandın üstündeki fotoğrafın, açılışın boyuna oranı.

| Ekran | Açılış | Bant | Bandın üstü | Oran |
|---|---|---|---|---|
| 375 × 812 | 773 px | 481 px | 292 px | 0,378 |
| 390 × 844 | 784 px | 481 px | 304 px | 0,387 |
| 375 × 553 (iPhone SE, Safari'de görünen alan) | 761 px | 481 px | 280 px | 0,368 |
| 390 × 664 (iPhone 13, Safari'de görünen alan) | 761 px | 481 px | 280 px | 0,368 |
| 320 × 568 | 822 px | 542 px | 280 px | 0,341 |

Mevcut kurallarla zaten karşılanan kontrol maddeleri:

- Tek H1 ve sıralı başlıklar.
- Fotoğraf üstünde yalnızca krem metin, %70 karartma, kontrast ≥ 4.5:1.
- Görünür odak halkası.
- Tüm görsellerde alt metni, `width`/`height` ve doğru yükleme önceliği.
- Hareket azaltılmışsa içerik doğrudan görünür.
- 320 px'te yatay taşma yok.
- Satır uzunlukları 65ch / 60ch / 56ch ile sınırlı.

### Kurallar nedeniyle uygulanmayanlar

| Skill | Öneri | Neden uygulanmadı |
|---|---|---|
| frontend-design | Projeye özgü, alışılmışın dışında yazı tipleri seçmek | Fontlar marka-stili'nde sabit (Poppins + Inter); yeni font eklenmez. |
| frontend-design | 4–6 renkli özgün palet | Palet ve rol token'ları marka-stili'nde sabit; yeni renk eklenmez. |
| frontend-design | Her bölüme giriş animasyonu koymak yerine tek bir orkestre hareket | Sitenin hareket sistemi (marka-stili §6) bölümleri tek seferlik "ortaya çıkma" ile gösterir. Bu sayfada farklı davranmak siteyle tutarsız olurdu. |
| frontend-design | Buton ve linke eklenen "→" oku kalıp bir işarettir | Ok, marka-stili §9'daki buton tanımının parçası. Sürecimiz'deki "Teklif Al" düğmesine dokunulmadı. |
| frontend-design | Büyük harfli üst etiket kullanmamak | Bu sayfaya yeni etiket eklenmedi. Sürecimiz'deki "SÜRECİMİZ" etiketi değişmeyecek bileşenin parçası. |
| ui-ux-pro-max (astro) | Yerel görseller için `astro:assets` `<Image />` / `<Picture />` bileşenleri | gorsel-yonetimi kuralı: görseller `npm run images` ile önceden üretilmiş WebP'lerdir. `srcset` `gorsel()` yardımcısıyla kurulur. Bu yüzden yerel `<picture>` öğesi kullanıldı. |
| ui-ux-pro-max | `--design-system`, renk, tipografi ve stil önerileri | CLAUDE.md: bu projede yalnızca `ux`, `landing`, `icons` alanları ve `--stack astro` kullanılır. |

## Onaylı taslaktan farklar

- Mobilde (< 1024 px) açılış fotoğrafı aynı salonun dikey çekimi oldu.
- Mobilde bandın iç boşlukları daraldı; bandın üstündeki fotoğraf en az 280 px.
- Alıntı büyüdü (60 px), üstündeki kısa ahşap çizgi kalktı.
- Vizyon/Misyon satır aralığı 1.8'den 1.75'e indi.

Ayrıca marka-stili §8'e Hakkımızda istisnası eklendi: fotoğraflı açılış, düz karartmalı alt bant, telefonda fotoğrafın en az üçte biri görünür. Eski "alt sayfalarda kısa başlık bandı" satırı bu sayfa için geçerli değil.

## Kontroller (her biri bir kez çalıştırıldı)

- `astro build`: hatasız.
- `npm run form-kontrol -- --derleme-yok`: 2 form, 30 alan envanterle aynı ✓
- `npm run gorsel-kontrol -- --derleme-yok`: fark yalnızca H'nin 3 çekiminde. Sayfa boyu 375 px'te 7627 → 8996, 768 px'te 4897 → 6987, 1280 px'te 4060 → 5197 oldu. Diğer 42 çekim %0 aynı, gürültü yok.
- H referansları aynı koşunun çekimleriyle yenilendi. `docs/guvenli-mod/README.md` → Referans geçmişi'ne satır eklendi.
- Lighthouse çalıştırılmadı.
