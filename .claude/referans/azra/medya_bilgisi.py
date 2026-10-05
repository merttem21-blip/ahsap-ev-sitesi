# Galerilerdeki ek (attachment) kimliklerinin dosya bilgilerini WP REST API'den toplar.
#   python medya_bilgisi.py  →  medya.json   (istekler arasında 1,5 sn beklenir)
import json
import os
import time
import urllib.request

KLASOR = os.path.dirname(os.path.abspath(__file__))
API = 'https://www.ahsap-evler.com/wp-json/wp/v2/media?per_page=100&_fields=id,source_url,media_details,title&include='

sayfalar = json.load(open(os.path.join(KLASOR, 'sayfalar.json'), encoding='utf-8'))
kimlikler = sorted({o['id'] for v in sayfalar.values() for g in v['galeriler'] for o in g['ogeler']})
print(len(kimlikler), 'ek')

medya = {}
for i in range(0, len(kimlikler), 100):
    parca = kimlikler[i:i + 100]
    istek = urllib.request.Request(API + ','.join(map(str, parca)), headers={'User-Agent': 'Mozilla/5.0 (2K AHSAP icerik tasima)'})
    with urllib.request.urlopen(istek, timeout=60) as y:
        for m in json.load(y):
            d = m.get('media_details') or {}
            boyutlar = {k: {'url': v['source_url'], 'w': v['width'], 'h': v['height']} for k, v in (d.get('sizes') or {}).items()}
            medya[m['id']] = {
                'url': m['source_url'],
                'w': d.get('width'),
                'h': d.get('height'),
                'orijinal': d.get('original_image'),
                'baslik': m['title']['rendered'],
                'boyutlar': boyutlar,
            }
    print(i + len(parca), '/', len(kimlikler))
    time.sleep(1.5)

eksik = [k for k in kimlikler if k not in medya]
print('API yanıt vermeyen ek:', eksik)
json.dump(medya, open(os.path.join(KLASOR, 'medya.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
