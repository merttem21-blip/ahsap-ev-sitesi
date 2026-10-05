# "Uygulama Görselleri" için eski site fotoğraflarının kalite süzgeci.
#   python secim.py  →  secim.json
#
# Kapsam: eski sitenin şartnameli 38 proje sayfası (kategori sayfalarındaki internet/stok görselleri baştan dışarıda).
# Kurallar: uzun kenar ≥ 1600px (orijinal_indir.py yalnızca bunları indirir) · net · çok karanlık / aşırı pozlanmış /
# eğik değil · filigran, eski logo, tabela yok · eski fotoğrafların kendi aralarındaki tekrarlar ve seri çekimlerden
# yalnızca en neti. Bizim sitedeki fotoğraflarla karşılaştırma yapılmaz.
# Otomatik ölçümler (kalite.mjs → kalite.json) işarettir; bulanıklık, eğim ve tabela kararları 1:1 kırpım ve dikey
# kılavuzlu kontrol sayfalarıyla (kontrol.mjs) tek tek gözle verildi ve aşağıdaki sözlüklerde kayıtlıdır.
import json
import os
import re

from kategoriler import KATEGORI_SIRASI, SAYFA
from kirpim_eslestir import mesafe, yukle

KLASOR = os.path.dirname(os.path.abspath(__file__))
KOK = os.path.abspath(os.path.join(KLASOR, '..', '..', '..'))
TEKRAR_ESIK = 18  # eski küçük görseller arasında kırpıma dayanıklı hash mesafesi; bu ve altı aynı fotoğraf

# Fotoğraf türü (varsayılan: dış cephe)
IC = {1104, 1102, 1103, 1106, 1096, 1097, 1105, 1107, 1100, 1101, 1099, 949, 950, 951, 952, 953, 929, 928, 936, 1082, 1069,
      1088, 1087, 1086, 1084, 1085, 1195, 1196, 1197, 1198, 1194, 1243, 1003, 1004, 1007, 1008, 1261, 1267, 1265, 1266, 1262,
      1263, 1264, 1393, 1260, 883, 881, 879, 2177, 2176, 1429, 1431, 1423, 1119, 1120, 1121, 1118, 1036, 1037, 1038, 1039,
      1172, 1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180, 1351, 1352, 1353, 1355, 1270, 1271, 1272, 1273, 1274, 1285, 1286,
      1287, 1288, 1289, 1290, 1292, 1293, 1294, 1713, 1714, 1596, 1597, 1598, 1599, 1613, 1694, 1665, 1668, 1382, 1383, 1384}
VERANDA = {1098, 1191, 1192, 1193, 1005, 1058, 1348}
MONTAJ = {1160, 1514, 1568, 1669}
RESTORASYON = {1709}

# Gözle verilen eleme kararları
RED = {
    1231: 'tabela: eski marka adı binada görünüyor',
    1695: 'tabela: müşteri markası cephede okunuyor', 1696: 'tabela: müşteri markası cephede okunuyor',
    1697: 'tabela: müşteri markası cephede okunuyor',
    1524: 'tabela: kurum adı levhası okunuyor', 1525: 'tabela: kurum adı levhası okunuyor', 1531: 'tabela: kurum adı levhası okunuyor',
    1199: 'dosya bozuk: eski sitedeki JPEG hatalı',
    947: 'yapı görünmüyor: yalnızca manzara',
    1529: 'yapı kadrajda çok küçük; ana konu komşu bina',
    **{i: 'bulanık (1:1 kontrol)' for i in (1085, 1084, 1069, 1423, 1088, 1107, 1086, 1711, 1102, 1105, 1346, 1714, 1356, 1431)},
    **{i: 'eğik çekim (dikey kılavuzla kontrol)' for i in (1713, 1096, 1173, 1172, 1601, 1596, 951, 952, 1087, 1265, 1146, 1274,
                                                          1694, 1260, 1177, 1668, 1502, 2173)},
    1070: 'ters ışık: yapı karanlık, gökyüzü patlak', 1530: 'ters ışık: yapı karanlık, gökyüzü patlak',
    1526: 'çok karanlık ve bulanık', 1665: 'çok karanlık', 1287: 'çok karanlık (siluet)', 1291: 'çok karanlık (gece çekimi)',
}
# Birbirine çok benzeyen seri çekimler: elenmemişler arasında en net olan kalır
SERI = [[1104, 1106], [1102, 1103], [957, 948], [1068, 1081], [1189, 1190], [1195, 1197], [1007, 1008], [1261, 1262],
        [1265, 1266], [1393, 1260], [2171, 2174], [2173, 2179, 2180], [1418, 1422], [1426, 1424], [1427, 1425], [1421, 1428],
        [1429, 1431], [1249, 1250], [1251, 1252], [1035, 1041], [1040, 1044], [1038, 1036], [1174, 1175, 1177], [1176, 1173],
        [1181, 1183], [1351, 1353, 1355], [1283, 1279, 1278], [1284, 1277, 1281], [1285, 1272, 1289], [1273, 1286, 1287],
        [1288, 1290], [1294, 1274], [1271, 1292], [1145, 1143], [1512, 1513], [1712, 1710], [1706, 1707], [994, 995],
        [990, 993], [1593, 1595], [1567, 1573, 1572], [1569, 1570], [1499, 1498], [1501, 1505], [1612, 1616],
        [1843, 1845, 1848], [1846, 1849], [1579, 1581], [1670, 1667, 1666], [1381, 1385], [1386, 1387]]

TUR_SLUG = {'iç mekân': 'ic-mekan', 'dış cephe': 'dis-cephe', 'veranda': 'veranda', 'montaj aşaması': 'montaj',
            'restorasyon aşaması': 'restorasyon'}
KAT_SLUG = {'Ahşap Ev': 'ahsap-ev', 'Kütük Ev': 'kutuk-ev', 'Bungalov': 'bungalov', 'Üçgen Ev / A-Frame': 'ucgen-ev',
            'Tiny House': 'tiny-house', 'Tarihi Eser': 'tarihi-eser', 'Kulübe': 'kulube', 'Çocuk Oyun Evi': 'cocuk-oyun-evi'}
SIRA = {'dış cephe': 0, 'veranda': 1, 'iç mekân': 2, 'montaj aşaması': 3, 'restorasyon aşaması': 3}
TR = str.maketrans('çğıöşüÇĞİÖŞÜ', 'cgiosuCGIOSU')
slug = lambda m: re.sub(r'[^a-z0-9]+', '-', m.translate(TR).lower()).strip('-')


def tur(i):
    return ('iç mekân' if i in IC else 'veranda' if i in VERANDA else 'montaj aşaması' if i in MONTAJ
            else 'restorasyon aşaması' if i in RESTORASYON else 'dış cephe')


def main():
    liste = json.load(open(os.path.join(KLASOR, 'orijinal-liste.json'), encoding='utf-8'))
    kalite = {re.search(r'/(\d+)\.\w+$', p).group(1): v for p, v in json.load(open(os.path.join(KLASOR, 'kalite.json'))).items()}
    galeri_netlik = sorted(json.load(open(os.path.join(KLASOR, 'galeri-netlik.json'))))
    hashler = {re.search(r'/(\d+)\.\w+$', k).group(1): v for k, v in yukle(os.path.join(KLASOR, 'eski-kirpim.json')).items()}

    kayit = {}
    for slug_, i, _ in liste:
        ii = int(i)
        k = kalite.get(i, {})
        kat, tur_proje, konum, _ = SAYFA[slug_]
        t = tur(ii)
        dosya = next(os.path.join(dp, f) for dp, _, fs in os.walk(os.path.join(KOK, 'ham-gorseller', 'azra', slug_)) for f in fs if f.split('.')[0] == i)
        kayit[i] = {
            'id': ii, 'sayfa': slug_, 'kategori': kat, 'tur': t, 'netlik': k.get('netlik'), 'w': k.get('w'), 'h': k.get('h'),
            'parlaklik': round(k.get('parlaklik', 0)), 'egim': k.get('egim'),
            'aciklama': f'{tur_proje} {t}' + (f', {konum}' if konum else ''),
            'dosya': os.path.relpath(dosya, KOK).replace('\\', '/'), 'durum': None, 'neden': [],
        }
        if ii in RED:
            kayit[i]['durum'], kayit[i]['neden'] = 'elendi', [RED[ii]]

    # Eski sitede aynı fotoğrafın tekrarları (sayfa içinde veya sayfalar arasında): en net olan kalır
    ids = sorted(kayit, key=lambda i: -(kayit[i]['netlik'] or 0))
    for n, a in enumerate(ids):
        for b in ids[n + 1:]:
            if kayit[b]['durum'] is None and kayit[a]['durum'] is None and mesafe(hashler[a], hashler[b]) <= TEKRAR_ESIK:
                kayit[b]['durum'], kayit[b]['neden'] = 'elendi', [f'tekrar: eski sitede #{a} ile aynı fotoğraf']

    for grup in SERI:
        adaylar = [str(i) for i in grup if str(i) in kayit and kayit[str(i)]['durum'] is None]
        if len(adaylar) < 2:
            continue
        kazanan = max(adaylar, key=lambda i: kayit[i]['netlik'] or 0)
        kayit[kazanan]['seri'] = len(adaylar)
        for i in adaylar:
            if i != kazanan:
                kayit[i]['durum'], kayit[i]['neden'] = 'elendi', [f'seri çekim: #{kazanan} daha net']

    # Geçenler: gerekçe ve önerilen yeni dosya adı (<kategori>-<konum>-<tür>-NN)
    sayac = {}
    for r in sorted(kayit.values(), key=lambda r: (KATEGORI_SIRASI.index(r['kategori']), r['sayfa'], SIRA[r['tur']], r['id'])):
        if r['durum'] is not None:
            continue
        r['durum'] = 'gecti'
        yuzde = round(100 * sum(n <= r['netlik'] for n in galeri_netlik) / len(galeri_netlik))
        r['gerekce'] = [r['tur'], f"{r['w']}×{r['h']} px", f"netlik {r['netlik']}: galerimizdeki fotoğrafların %{yuzde}'inden net"]
        if r.get('seri'):
            r['gerekce'].append(f"{r['seri']} benzer çekimin en neti")
        konum = SAYFA[r['sayfa']][2]
        kok = '-'.join(filter(None, [KAT_SLUG[r['kategori']], slug(konum), TUR_SLUG[r['tur']]]))
        sayac[kok] = sayac.get(kok, 0) + 1
        r['onerilen_ad'] = f'{kok}-{sayac[kok]:02d}'

    json.dump(kayit, open(os.path.join(KLASOR, 'secim.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    gecen = [r for r in kayit.values() if r['durum'] == 'gecti']
    print(len(kayit), 'aday ·', len(gecen), 'geçti ·', len(kayit) - len(gecen), 'elendi')


if __name__ == '__main__':
    main()
