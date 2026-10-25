> Bu klasörün görselleri 25 Ekim 2026'da depodan kaldırıldı (yer açmak için). Son hâlleri `98d28cd` commit'inde duruyor: `git checkout 98d28cd -- docs/hakkimizda/acilis/`

# Hakkımızda açılışı (15 Ekim 2026, müşteri onaylı: a)

> Aynı gün yerini 3. tura bıraktı: `docs/hakkimizda/acilis-v3/` (ince bant da fotoğrafı yatayda kestiği için kaldırıldı).

## Sorun

Uzun tanıtım paragrafı fotoğrafın üstündeki düz karartmalı bandın içindeydi. Bant fotoğrafın yarısını kaplıyor,
sert üst kenarı fotoğrafı rastgele bir yerden kesiyordu ("kaymış karartma"). H1 bandın en altına yaslıydı;
1366×657 dizüstü ekranda H1'in alt kısmı ilk ekranın dışında kalıyordu.

## Seçenekler

- **a (uygulandı):** Fotoğrafın altındaki ince bantta yalnızca breadcrumb ve H1. Bant fotoğrafın en az üçte ikisini
  açık bırakır. Tanıtım metni fotoğrafın altında, düz gece zeminde. Fotoğraf kutusu: mobil 60svh, ≥ 768px 55svh,
  ≥ 1024px 70svh.
- **b:** Bölünmüş açılış, karartmasız (masaüstünde metin solda, fotoğraf sağ yarıda; telefonda fotoğraf üstte).

## Görseller

Gerçek ilk ekran boyları (tarayıcı çubukları düşülmüş): `{375x553,412x787,768x1024,1366x657,1920x950}-{once,a,b}.png`
