# Şartnameli eski proje sayfalarındaki fotoğrafların en yüksek çözünürlüklü orijinallerini indirir.
#   python orijinal_indir.py  →  ham-gorseller/azra/<sayfa-slug>/<medya-id>.<uzantı>
# Yalnızca uzun kenarı 1600px ve üstü olanlar indirilir. WordPress "-scaled" sürüm yerine original_image alınır.
# İstekler arasında 1,5 sn beklenir; daha önce indirilmiş dosyalar atlanır.
import json
import os
import time
import urllib.request
from urllib.parse import quote

KLASOR = os.path.dirname(os.path.abspath(__file__))
KOK = os.path.abspath(os.path.join(KLASOR, '..', '..', '..'))
HEDEF = os.path.join(KOK, 'ham-gorseller', 'azra')
MIN_KENAR = 1600

medya = json.load(open(os.path.join(KLASOR, 'medya.json'), encoding='utf-8'))
sartname = json.load(open(os.path.join(KLASOR, 'sartname-ham.json'), encoding='utf-8'))
sayfalar = json.load(open(os.path.join(KLASOR, 'sayfalar.json'), encoding='utf-8'))

liste = []
for slug in sartname:
    for o in (o for g in sayfalar[slug]['galeriler'] for o in g['ogeler']):
        i = str(o['id'])
        m = medya[i]
        if max(m['w'], m['h']) < MIN_KENAR:
            continue
        url = m['url'].rsplit('/', 1)[0] + '/' + m['orijinal'] if m['orijinal'] else m['url']
        liste.append((slug, i, url))

json.dump(liste, open(os.path.join(KLASOR, 'orijinal-liste.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(liste), 'fotoğraf', flush=True)
for n, (slug, i, url) in enumerate(liste, 1):
    klasor = os.path.join(HEDEF, slug)
    os.makedirs(klasor, exist_ok=True)
    yol = os.path.join(klasor, i + os.path.splitext(url)[1].lower())
    if os.path.exists(yol) and os.path.getsize(yol) > 0:
        continue
    try:
        istek = urllib.request.Request(quote(url, safe=':/%'), headers={'User-Agent': 'Mozilla/5.0 (2K AHSAP icerik tasima)'})
        with urllib.request.urlopen(istek, timeout=120) as y, open(yol, 'wb') as f:
            f.write(y.read())
    except Exception as hata:  # tek dosyanın hatası tüm indirmeyi durdurmasın
        print('HATA', i, url, hata, flush=True)
    if n % 20 == 0:
        print(n, '/', len(liste), flush=True)
    time.sleep(1.5)
print('BITTI', flush=True)
