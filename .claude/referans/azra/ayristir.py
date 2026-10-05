# Eski site sayfalarından galeri, proje detayı ve şartname bilgilerini çıkarır.
#   python ayristir.py  →  sayfalar.json
import hashlib
import html
import json
import os
import re
import sys

KLASOR = os.path.dirname(os.path.abspath(__file__))
SAYFALAR = os.path.join(KLASOR, 'sayfalar')


def metin(parca):
    parca = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', parca, flags=re.S)
    parca = re.sub(r'<br\s*/?>|</p>|</h\d>|</li>|</div>|</tr>', '\n', parca)
    parca = re.sub(r'</td>', ' | ', parca)
    parca = re.sub(r'<[^>]+>', '', parca)
    parca = html.unescape(parca).replace('\xa0', ' ')
    parca = re.sub(r'[ \t]+', ' ', parca)
    return re.sub(r'\n\s*\n+', '\n', parca).strip()


def icerik(s):
    i = s.find('class="panel-layout"')
    if i < 0:
        i = s.find('<article')
    j = s.find('</article>', i)
    return s[i:j if j > 0 else len(s)]


def galeriler(b):
    sonuc = []
    for m in re.finditer(r'id="foogallery-gallery-(\d+)"', b):
        gid = m.group(1)
        son = b.find('id="foogallery-gallery-', m.end())
        parca = b[m.end(): son if son > 0 else len(b)]
        ogeler = []
        for a in re.finditer(r'<div class="fg-item[^"]*"><figure[^>]*><a href="([^"]*)"[^>]*data-attachment-id="(\d+)"[^>]*>.*?<img[^>]*src="([^"]*)"', parca, flags=re.S):
            ogeler.append({'id': int(a.group(2)), 'href': html.unescape(a.group(1)), 'kucuk': a.group(3)})
        sonuc.append({'galeri': int(gid), 'ogeler': ogeler})
    return sonuc


def detay_tablosu(b):
    k = b.find('Proje Detayları')
    if k < 0:
        k = b.find('PROJE DETAYLARI')
    if k < 0:
        return {}
    son = b.find('foogallery', k)
    parca = b[k: son if son > 0 else k + 6000]
    satirlar = {}
    for tr in re.findall(r'<tr>(.*?)</tr>', parca, flags=re.S):
        hucreler = [metin(td) for td in re.findall(r'<td[^>]*>(.*?)</td>', tr, flags=re.S)]
        if len(hucreler) >= 2 and hucreler[0]:
            satirlar[hucreler[0]] = hucreler[1]
    return satirlar


def sartname(b):
    k = b.find('TEKNİK ŞARTNAME')
    if k < 0:
        return None
    return metin(b[k:])


def basliklar(b):
    return [metin(h) for h in re.findall(r'<h[1-3][^>]*>(.*?)</h[1-3]>', b, flags=re.S) if metin(h)]


def main():
    veriler = {}
    for ad in sorted(os.listdir(SAYFALAR)):
        if not ad.endswith('.html'):
            continue
        s = open(os.path.join(SAYFALAR, ad), encoding='utf-8').read()
        b = icerik(s)
        sart = sartname(b)
        veriler[ad[:-5]] = {
            'title': metin(re.search(r'<title>(.*?)</title>', s, flags=re.S).group(1)),
            'basliklar': basliklar(b)[:12],
            'galeriler': galeriler(b),
            'detay': detay_tablosu(b),
            'sartname_hash': hashlib.md5(sart.encode()).hexdigest()[:8] if sart else None,
            'sartname': sart,
            'ozet': metin(b)[:1500],
        }
    json.dump(veriler, open(os.path.join(KLASOR, 'sayfalar.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(len(veriler), 'sayfa ayrıştırıldı', file=sys.stderr)


main()
