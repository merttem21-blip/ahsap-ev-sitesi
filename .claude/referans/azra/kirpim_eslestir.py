# Kırpıma dayanıklı eşleştirme: iki görselin mesafesi, tam görüntü ve kırpım varyantları (hash.mjs --kirpim)
# arasındaki en küçük (dHash + pHash) Hamming mesafesidir. Biri diğerinin kırpılmış hâliyse mesafe düşer.
#   python kirpim_eslestir.py <bizim-kirpim.json> <eski-kirpim.json>  →  kirpim-eslesme.json
import json
import os
import re
import sys

KLASOR = os.path.dirname(os.path.abspath(__file__))
ESIK = 18          # bu mesafe ve altı: aynı fotoğraf
SUPHELI = 26       # ESIK < mesafe ≤ SUPHELI: gözle kontrol


def yukle(yol):
    veri = json.load(open(yol, encoding='utf-8'))
    donus = lambda h: (int(h['d'], 2), int(h['p'], 2))
    return {k: {'tam': donus(v), 'k': [donus(x) for x in v.get('k', [])]} for k, v in veri.items()}


def hm(a, b):
    return bin(a[0] ^ b[0]).count('1') + bin(a[1] ^ b[1]).count('1')


def mesafe(a, b):
    en = hm(a['tam'], b['tam'])
    for v in a['k']:
        en = min(en, hm(v, b['tam']))
    for v in b['k']:
        en = min(en, hm(a['tam'], v))
    return en


def main():
    bizim = yukle(sys.argv[1])
    eski = yukle(sys.argv[2])
    eski_kimlik = {re.match(r'.*/(\d+)\.\w+$', k).group(1): v for k, v in eski.items()}
    sonuc = {}
    for yol, b in bizim.items():
        adaylar = sorted((mesafe(b, e), kimlik) for kimlik, e in eski_kimlik.items())[:3]
        sonuc[yol] = [{'id': int(k), 'mesafe': m} for m, k in adaylar]
    json.dump({'esik': ESIK, 'supheli': SUPHELI, 'eslesme': sonuc}, open(os.path.join(KLASOR, 'kirpim-eslesme.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
