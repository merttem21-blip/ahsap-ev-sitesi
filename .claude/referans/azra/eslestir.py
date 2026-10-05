# Eski site galeri fotoğraflarını bizdeki fotoğraflarla algısal hash üzerinden eşleştirir.
#   python eslestir.py <bizim-hash.json> <eski-hash.json>  →  eslesme.json
# Bir eski fotoğraf, bizdeki bir fotoğrafla dHash VE pHash mesafesi eşiğin altındaysa "bizde var" sayılır.
import collections
import json
import os
import re
import sys

KLASOR = os.path.dirname(os.path.abspath(__file__))
D_ESIK, P_ESIK = 12, 14

bizim = json.load(open(sys.argv[1], encoding='utf-8'))
eski = json.load(open(sys.argv[2], encoding='utf-8'))
sayfalar = json.load(open(os.path.join(KLASOR, 'sayfalar.json'), encoding='utf-8'))


def mesafe(a, b):
    return sum(x != y for x, y in zip(a, b))


def proje_klasoru(yol):
    # public/images/<kategori>/<proje>/<dosya> → "<kategori>/<proje>"; kökteki sahipsizler → "<kategori>/(sahipsiz)"
    p = yol.split('/')
    return f'{p[2]}/{p[3]}' if len(p) == 5 else f'{p[2]}/(sahipsiz)'


eski_kimlik = {re.match(r'.*/(\d+)\.\w+$', k).group(1): v for k, v in eski.items()}

sonuc = {}
for slug, s in sayfalar.items():
    ogeler = [o for g in s['galeriler'] for o in g['ogeler']]
    if not ogeler:
        continue
    satirlar = []
    for o in ogeler:
        h = eski_kimlik.get(str(o['id']))
        if not h:
            satirlar.append({'id': o['id'], 'durum': 'hash yok'})
            continue
        en_iyi = min(
            ((mesafe(h['d'], b['d']), mesafe(h['p'], b['p']), yol) for yol, b in bizim.items()),
            key=lambda t: t[0] + t[1],
        )
        d, p, yol = en_iyi
        satirlar.append({'id': o['id'], 'd': d, 'p': p, 'en_yakin': yol, 'var': d <= D_ESIK and p <= P_ESIK})
    oylar = collections.Counter(proje_klasoru(r['en_yakin']) for r in satirlar if r.get('var'))
    sonuc[slug] = {'toplam': len(ogeler), 'bizde_var': sum(1 for r in satirlar if r.get('var')), 'oylar': dict(oylar.most_common()), 'fotolar': satirlar}

json.dump(sonuc, open(os.path.join(KLASOR, 'eslesme.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for slug, r in sonuc.items():
    print(f"{slug:65} {r['bizde_var']:>2}/{r['toplam']:<3} {r['oylar']}")
