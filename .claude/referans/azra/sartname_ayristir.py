# Eski site sayfalarındaki "TEKNİK ŞARTNAME" tablolarını başlık → satırlar yapısına çevirir.
#   python sartname_ayristir.py  →  sartname-ham.json
# Yalnızca Türkçe bölüm okunur: şartname tablolarından sonra gelen "Opsiyonlar" listesi ve
# İngilizce/Arapça/Almanca/Fransızca/Rusça çeviriler atlanır.
import html
import json
import os
import re

KLASOR = os.path.dirname(os.path.abspath(__file__))
SAYFALAR = os.path.join(KLASOR, 'sayfalar')


def metin(parca):
    parca = re.sub(r'<br\s*/?>', ' ', parca)
    parca = html.unescape(re.sub(r'<[^>]+>', ' ', parca)).replace('\xa0', ' ')
    return re.sub(r'\s+', ' ', parca).strip()


def baslik_mi(hucre_attr, yazi, satirdaki_hucre):
    if not yazi or len(yazi) > 45 or yazi.endswith('.'):
        return False
    if 'rowspan' in hucre_attr:
        return True
    # "Garanti | metin" gibi iki hücreli satırın ilk hücresi ya da tamamı büyük harfli kısa başlık
    return satirdaki_hucre >= 2 or (yazi.isupper() and 'SİSTEM' in yazi)


def ayristir(s):
    i = s.find('TEKNİK ŞARTNAME')
    if i < 0:
        return None
    b = s[i:s.find('</article>', i)]
    opsiyon = b.find('Opsiyonlar')
    bolumler = []  # [{'baslik', 'satirlar': []}]
    for tablo in re.finditer(r'<table.*?</table>', b, flags=re.S):
        if opsiyon > 0 and tablo.start() > opsiyon:
            break
        for satir in re.findall(r'<tr[^>]*>(.*?)</tr>', tablo.group(0), flags=re.S):
            hucreler = [(a, metin(c)) for a, c in re.findall(r'<td([^>]*)>(.*?)</td>', satir, flags=re.S)]
            dolu = [(a, y) for a, y in hucreler if y]
            if not dolu:
                continue
            ilk_attr, ilk = dolu[0]
            if baslik_mi(ilk_attr, ilk, len(dolu)) and (len(dolu) >= 2 or 'rowspan' in ilk_attr or ilk.isupper()):
                bolumler.append({'baslik': ilk, 'satirlar': [y for _, y in dolu[1:]]})
            elif bolumler:
                bolumler[-1]['satirlar'].extend(y for _, y in dolu)
            else:
                bolumler.append({'baslik': '', 'satirlar': [y for _, y in dolu]})
    ekler = {}
    if opsiyon > 0:
        # Opsiyon listesi ve "GENEL BİLGİLER" alt başlıkları tablolar dışında, satır satır yazılmış
        son = re.search(r'<table', b[opsiyon:])
        parca = b[opsiyon: opsiyon + (son.start() if son else 6000)]
        parca = re.sub(r'<br\s*/?>|</p>|</li>|</h\d>|</div>', '\n', parca)
        satirlar = [metin(x) for x in parca.split('\n')]
        anahtar = None
        for y in filter(None, satirlar):
            if y.startswith('<') or y.startswith('class='):  # sayfaya özel başlık bloğu başladı
                break
            if y in ('Opsiyonlar', 'PROJELENDİRME', 'ÜRETİM ve MONTAJ ŞEKİLLERİ', 'AHŞAP EV YAPTIRMADAN ÖNCE NE YAPMAK LAZIM'):
                anahtar = y
                ekler[anahtar] = []
            elif y == 'GENEL BİLGİLER:':
                anahtar = None
            elif anahtar:
                ekler[anahtar].append(y)
    return {'bolumler': bolumler, 'ekler': ekler}


def main():
    sonuc = {}
    for ad in sorted(os.listdir(SAYFALAR)):
        s = open(os.path.join(SAYFALAR, ad), encoding='utf-8').read()
        a = ayristir(s)
        if a:
            sonuc[ad[:-5]] = a
    json.dump(sonuc, open(os.path.join(KLASOR, 'sartname-ham.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(len(sonuc), 'sayfada şartname var')


if __name__ == '__main__':
    main()
