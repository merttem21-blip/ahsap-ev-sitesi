# Envanter tablosunu üretir: eski proje ↔ bizdeki proje, fotoğraf sayıları.
#   python envanter.py  →  ENVANTER.md
# Eşleştirme: eslesme.json (algısal hash, birebir aynı fotoğraf) + kontrol sayfalarıyla gözle doğrulama.
import glob
import json
import os
import re

KLASOR = os.path.dirname(os.path.abspath(__file__))
KOK = os.path.abspath(os.path.join(KLASOR, '..', '..', '..'))
sayfalar = json.load(open(os.path.join(KLASOR, 'sayfalar.json'), encoding='utf-8'))
medya = json.load(open(os.path.join(KLASOR, 'medya.json'), encoding='utf-8'))
eslesme = json.load(open(os.path.join(KLASOR, 'eslesme.json'), encoding='utf-8'))
menu = json.load(open(os.path.join(KLASOR, 'menu.json'), encoding='utf-8'))

bizim = {}
for f in glob.glob(os.path.join(KOK, 'src/content/projeler/*.md')):
    t = open(f, encoding='utf-8').read()
    bizim[os.path.basename(f)[:-3]] = {
        'baslik': re.search(r'^baslik: (.+)$', t, re.M).group(1),
        'kategori': re.search(r'^kategori: (\S+)', t, re.M).group(1),
        'foto': len(re.findall(r'- dosya:', t)),
    }

# eski slug → (bizim slug, güven, not)
ESLESME = {
    'yalova-ahsap-camii-mescid': ('iki-katli-ahsap-cami', '✓', 'aynı fotoğraflar'),
    'ahsap-camii-mescid-istanbul': ('minareli-tek-katli-ahsap-cami', '✓', 'aynı fotoğraflar'),
    'antalya-cafe-restaurant-satis-bufesi-beach-clup': ('sekizgen-otel-cardagi', '✓', 'aynı fotoğraflar'),
    'cocuk-oyun-evi-park-istanbul': ('kaydirakli-sato-oyun-evi', '✓', 'aynı fotoğraflar'),
    'datca-ahsap-ofis-agac-ev-bungalov-18m2': ('siyah-cepheli-bahce-ofisi', '✓', 'aynı fotoğraflar'),
    'heybeliada-ahsap-bilet-gisesi-guvenlik-kulubesi': ('iskele-giris-kulubesi', '✓', 'aynı fotoğraflar'),
    'sakarya-ahsap-otel-bungalov-tinyhouse-30m2': ('asma-katli-verandali-bungalov', '✓', 'aynı fotoğraflar'),
    'canakkale-ahsap-ev-fiyatlari-2024': ('genis-verandali-asma-katli-bungalov', '✓', 'aynı fotoğraflar'),
    'kusadasi-ahsap-otel-bungalov-tinyhouse': ('verandali-kucuk-a-frame', '✓', 'aynı fotoğraflar'),
    'kandira-oval-ahsap-bungalov-40m2': ('kemerli-pod-bungalov', '✓', 'aynı çekimler, farklı kırpım'),
    'ahsap-ev-satis-ofisi-kiosk-bufe-workshop': ('marka-vitrini', '✓', 'aynı yapı (tabeladaki marka adı aynı), farklı çekimler'),
    'datca-ahsap-pavilion-beach-clup-kamelya-perdola': ('hasir-catili-plaj-bari', '✓', 'aynı yapı, farklı çekimler'),
    'beykoz-ahsap-kamelya-cardak-pergola-kis-bahcesi': ('tas-duvarli-bahce-cardagi', '✓', 'aynı yapı (taş duvar, yeşil çatı), farklı çekimler'),
    'kibris-maldiv-evi-bungalov': ('deniz-ustu-ahsap-otel-odalari', '✓', 'aynı yapı; 3 iç mekân fotoğrafı bizde A-Frame Bungalov içinde'),
    'beykoz-ahsap-villa-125m2': ('tas-kaideli-verandali-ahsap-ev', '✓', '1 aynı fotoğraf projede, 1 sahipsiz (ahsap-ev-12); Gri Çatılı Verandalı Ahşap Ev de aynı yapı olabilir'),
    'agva-ucgen-ev-ahsap-bungalov-50-m2': ('a-frame-bungalov', '?', '3 iç mekân bizde A-Frame Bungalov içinde; dış cephe farklı yapıya benziyor'),
    'fethiye-ahsap-ev-kutuk-villa-bungalov-70m2': ('kiremit-catili-ahsap-ev', '?', 'aynı palmiye ve basamak taşları; birebir aynı fotoğraf yok'),
    'sile-ahsap-ev-250-m2': ('genis-verandali-ahsap-villa', '?', 'dış cephe aynı yapı gibi; 1 fotoğraf bizde sahipsiz (ahsab-ev-13)'),
    'cesme-ahsap-ev-bungalov-60m2': ('genis-verandali-ahsap-villa', '?', '3 iç mekân birebir bizde villa içinde; dış cepheler farklı yapı'),
    'bodrum-ahsap-ev-kutuk-villa-80-m2': ('deniz-manzarali-terasli-ahsap-ev', '?', 'benzer siyah kaideli teras ama renk farklı; 2 fotoğraf bizde sahipsiz (ahsap-ev-8, -15)'),
}

# Bizde proje sayfası yok ama fotoğrafları sahipsiz klasörde duruyor
SAHIPSIZ = {
    'assos-kutuk-ev-100-m2': 'diger/img-20210519-wa00xx (sauna, oturma odası)',
    'besiktas-ahsap-satis-ofisi-calisma-evi': 'tiny-house/guvenlik-kulubesi-2…4',
    'istanbul-ahsap-kamelya-cardak-pergola-kis-bahcesi': 'diger/img-20210519-wa0021, -0023',
    'ahsap-bekci-guvenlik-kulube-satis-bufesi-bungalov-bilet-gisesi': 'diger/bilet-gisesi-1…3 (aynı kırmızı gişe, farklı çekim)',
    'ahsap-sauna-spa-buhar-odasi': 'diger/img-20210519-wa0041 (Assos saunasıyla aynı fotoğraf)',
}

ONERI = {
    'marmaris-ahsap-villa-175m2': 'villa', 'istanbul-ahsap-ev-villa-150m2': 'villa', 'tekirdag-iki-katli-ahsap-ev-kutuk-villa': 'villa',
    'assos-kutuk-ev-100-m2': 'ahsap-ev', 'iznik-ahsap-ev-bungalov-60m2': 'bungalov', 'didim-oval-ahsap-bungalov-otel-20m2': 'bungalov',
    'buyukada-heybeli-ada-ahsap-kutuk-ev': 'bungalov', 'gebze-ahsap-otel-bungalov-tasinabilir-ev': 'tiny-house',
    'ahsap-otel-karavan-tinyhouse': 'tiny-house', 'tarabya-ahsap-calisma-ofisi-proje-satis-evi': 'tiny-house',
    'buyukada-ahsap-ev-tarihi-eser-restorasyon-yali-konak': 'ozel-tasarim', 'etiler-ahsap-cafe-restaurant-satis-bufesi-kiosk': 'otel-bar',
    'ahsap-loca-cabana-pavilion-kamelya-pergola': 'otel-bar', 'ahsap-plaj-havuz-bahce-dus-basliklari': 'otel-bar',
    'cesme-ahsap-cardak-kamelya': 'cardak', 'istanbul-ahsap-kamelya-cardak-pergola-kis-bahcesi': 'cardak',
}

# Kategori (hub) sayfaları: 2020 tarihli galeriler internetten alınmış görseller; 2024 "Tiny House" galerisi proje sayfalarının tekrarı
HUB = {'ahsap-evler', 'kutuk-ev-ahsap-bungalov', 'bungalov-ahsap-otel', 'ucgen-evler-bungalov', 'ahsap-tarihi-eser-restorasyon',
       'ahsap-villalar', 'tiny-house-ahsap-karavan', 'ahsap-depo-kulube', 'cocuk-oyun-evi-park', 'ahsap-ev-uretilen-projeler',
       'ahsap-ev-tasarim-cizim-projeler', 'referanslar-ahsap-kutuk-ev', 'ahsap-yapilar-teknik-bilgi'}


def ad(slug):
    return sayfalar[slug]['title'].split(' - ')[0].strip()


def alan(slug):
    d = sayfalar[slug]['detay']
    return d.get('TOPLAM ALAN', '').replace(' m2', ' m²').strip() or '–'


def kimlikler(slug):
    return [o['id'] for g in sayfalar[slug]['galeriler'] for o in g['ogeler']]


def yeterli(slug):
    # Uzun kenarı 1200px ve üstü olanlar (orijinal varsa onun ölçüsü daha büyüktür)
    return sum(1 for i in kimlikler(slug) if max(medya[str(i)]['w'] or 0, medya[str(i)]['h'] or 0) >= 1200)


def ozet(slug):
    return f"{len(kimlikler(slug))} | {yeterli(slug)} | {eslesme.get(slug, {}).get('bizde_var', 0)}"


satir = []
satir.append('| # | Eski sayfa | Alan | Eski menü | Bizdeki proje | Eşleşme | Eski foto | ≥1200px | Bizde birebir var | Bizdeki foto | Not |')
satir.append('|---|---|---|---|---|---|---|---|---|---|---|')
for n, (slug, (biz, guven, not_)) in enumerate(sorted(ESLESME.items(), key=lambda x: (x[1][1] == '?', ad(x[0]))), 1):
    b = bizim[biz]
    e, y, v = ozet(slug).split(' | ')
    satir.append(f"| {n} | {ad(slug)} | {alan(slug)} | {', '.join(menu.get(slug, []))} | {b['baslik']} (`{b['kategori']}`) | {guven} | {e} | {y} | {v} | {b['foto']} | {not_} |")

esles = set(ESLESME)
karsiliksiz = [s for s in sayfalar if s not in esles and s not in HUB and kimlikler(s)]
satir2 = ['| # | Eski sayfa | Alan | Eski menü | Önerilen kategori | Eski foto | ≥1200px | Not |', '|---|---|---|---|---|---|---|---|']
for n, slug in enumerate(sorted(karsiliksiz, key=ad), 1):
    menuler = menu.get(slug, [])
    oneri = ONERI.get(slug) or ('cocuk-oyun-parki' if 'Çocuk Oyun Evi' in menuler else 'ozel-tasarim')
    not_ = ('Fotoğrafları bizde sahipsiz: ' + SAHIPSIZ[slug]) if slug in SAHIPSIZ else ''
    satir2.append(f"| {n} | {ad(slug)} | {alan(slug)} | {', '.join(menuler)} | `{oneri}` | {len(kimlikler(slug))} | {yeterli(slug)} | {not_} |")

hub_satir = ['| Sayfa | Foto | Durum |', '|---|---|---|']
for slug in sorted(HUB, key=ad):
    k = kimlikler(slug)
    if not k:
        continue
    yil = sorted({re.search(r'uploads/(\d{4})', medya[str(i)]['url']).group(1) for i in k})
    durum = 'Proje sayfalarındaki fotoğrafların tekrarı' if yil == ['2024'] else 'İnternetten alınmış görseller (yabancı dosya adları, düşük çözünürlük) — taşınmaz'
    hub_satir.append(f'| {ad(slug)} | {len(k)} | {durum} |')

bizde_yok = sorted(set(bizim) - {v[0] for v in ESLESME.values()})

with open(os.path.join(KLASOR, 'ENVANTER.md'), 'w', encoding='utf-8', newline='\n') as f:
    f.write('# Eski site envanteri\n\n')
    f.write('Kaynak: 70 sayfa ham HTML (`sayfalar/`), galeri bilgisi WP REST API (`medya.json`), eşleştirme algısal hash (`eslesme.json`) + gözle kontrol.\n\n')
    f.write('Sütunlar: **Eski foto** galerideki fotoğraf sayısı · **≥1200px** uzun kenarı 1200px ve üstü olanlar · **Bizde birebir var** hash ile bulunan aynı fotoğraf (kırpılmış kopyaları yakalamaz) · **Bizdeki foto** projenin şu anki galerisi.\n\n')
    f.write('## Eşleşen projeler\n\n' + '\n'.join(satir) + '\n\n')
    f.write('## Bizde karşılığı olmayan projeler (otomatik eklenmeyecek)\n\n' + '\n'.join(satir2) + '\n\n')
    f.write('## Kategori sayfası galerileri\n\n' + '\n'.join(hub_satir) + '\n\n')
    f.write('## Eski sitede karşılığı bulunmayan projelerimiz\n\n' + ', '.join(bizim[s]['baslik'] for s in bizde_yok) + '\n')
print(open(os.path.join(KLASOR, 'ENVANTER.md'), encoding='utf-8').read())
