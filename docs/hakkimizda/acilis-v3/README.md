# Hakkımızda açılışı, 3. tur (15 Ekim 2026, müşteri onaylı: a)

Sorun: fotoğrafın ortasından geçen sert, düz kenarlı yarı saydam bant fotoğrafı yatayda ikiye bölüyordu.

## Uygulanan: ana sayfa hero'sunun yöntemi (Hero.astro)

Tam genişlik fotoğraf, breadcrumb ve H1 sol altta; karartma hero'nunkiyle birebir aynı:

- **≥ 641px:** Soldan sağa yatay gradyan (`--karartma-yatay`, rengi rgb 20 18 16): %85 (sol kenar) → %65 (%35)
  → %25 (%65) → %10 (sağ kenar). Alt %30'da fotoğraf sayfa zeminine erir (`--zemine-eris`).
  Ana sayfa hero'su da artık aynı token'ı kullanır (görünümü değişmedi, gorsel-kontrol %0).
- **≤ 640px:** Fotoğrafın alt %45'i zemine erir; başlık bloğunun 64px üstünden başlayan rampayla %70 gece
  karartması (`--color-karartma`) başlığın altına ve yanlarına yayılır.

Tanıtım metni fotoğrafın altında, düz gece zeminde. b (yan yana) ve c (fotoğraf üstte, metin altında) seçenekleri
önizlemede kaldı.

## Denetim

Fotoğraf kutusunun içinde komşu iki satır arasında aynı yönde ≥ 12 parlaklık düzeyi sıçrayan sütunların oranı
(yatay sert kenar ≈ satırın tamamı):

| Ekran | önce | a | H1 ilk ekranda |
|---|---|---|---|
| 1366×657 | %79 (bant kenarı) | %17 | evet (445–524) |
| 1920×950 | %72 (bant kenarı) | %16 | evet (650–729) |
| 375×667 | %83 (bant kenarı) | %32 (H1 harfleri) | evet (420–464) |

Görseller: `{1366x657,1920x950,375x667}-{once,a}.png`
