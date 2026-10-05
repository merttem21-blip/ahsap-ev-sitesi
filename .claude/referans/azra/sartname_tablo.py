# Eski site şartnamelerinin karşılaştırma tablosu: başlık | eski değer (birebir) | kategori farkı | çelişki/onay.
#   python sartname_tablo.py <html-cikti>  →  SARTNAME-KARSILASTIRMA.md + <html-cikti>
import collections
import html
import json
import os
import re
import sys

from kategoriler import KATEGORI_SIRASI, SAYFA

KLASOR = os.path.dirname(os.path.abspath(__file__))
ham = json.load(open(os.path.join(KLASOR, 'sartname-ham.json'), encoding='utf-8'))
sayfalar = json.load(open(os.path.join(KLASOR, 'sayfalar.json'), encoding='utf-8'))

# Yeni sayfadaki başlık → eski sitedeki başlık(lar)
ESLEME = [
    ('Zemin', ['Zemin']),
    ('Duvar Sistemi', ['AHŞAP EV DUVAR SİSTEMİ', 'KÜTÜK EV DUVAR SİSTEMİ']),
    ('Çatı', ['Çatı']),
    ('Ara Kat', ['Ara kat']),
    ('Veranda', ['Veranda']),
    ('Ağaç Malzeme', ['Ağaçlar']),
    ('Pencere', ['Pencere']),
    ('Kapı', ['Kapılar']),
    ('İzolasyon', ['İzolasyon']),
    ('Mutfak', ['Mutfak']),
    ('Banyo', ['Banyo']),
    ('Merdiven', ['Merdiven']),
    ('Elektrik', ['Elektrik tesisatı']),
    ('Ahşap Koruma ve Boya', ['Ahşap Koruma ve Boya']),
    ('Garanti', ['Garanti']),
]
# Listenizde olmayan ama eski şartnamede bulunan bölümler
EK_BOLUMLER = [
    ('Temel', ['1 – Beton Temel', '2 – Ahşap Kazık Temel']),
    ('Proje', ['Proje']),
    ('İşçilik', ['İşçilik']),
    ('Malzeme', ['Malzeme']),
]
EK_LISTELER = ['Opsiyonlar', 'PROJELENDİRME', 'ÜRETİM ve MONTAJ ŞEKİLLERİ', 'AHŞAP EV YAPTIRMADAN ÖNCE NE YAPMAK LAZIM']

ORTAK = 'Yok: 38 sayfanın hepsinde birebir aynı.'
YAPI_DISI = ('Yok: 38 sayfada birebir aynı. Kulübe, Çocuk Oyun Evi ve Tarihi Eser (cami, güvenlik kulübesi) sayfalarında da '
             'aynı ev şartnamesi kullanılmış; bu yapılarda bu bölüm geçerli olmayabilir.')
KATEGORI_NOTU = {
    'Duvar Sistemi': 'Yok: 38 sayfada birebir aynı. Her sayfada iki sistem birlikte yazıyor; Kütük Ev sayfalarında lambri sistemi, '
                     'Ahşap Ev sayfalarında kütük sistemi de var. Kategoriye göre hangisinin geçerli olduğu belirtilmemiş.',
    'Ara Kat': YAPI_DISI, 'Mutfak': YAPI_DISI, 'Banyo': YAPI_DISI, 'Merdiven': YAPI_DISI,
    'Temel': 'Yok: 38 sayfada birebir aynı. Proje girişlerinde Çanakkale ve İznik için "ahşap kazık temel", '
             'Datça Ofis Bungalov için "toprak zemin üzerine ahşap taşıyıcı sistem" yazıyor (aşağıdaki proje tablosu).',
}

# [ONAY] listesi: başlık → maddeler (çelişen, belirsiz veya güncelliği kontrol edilmesi gereken değerler)
ONAY = {
    'Zemin': ['"Khnouf" marka mineral yünü: marka adının yazımı doğrulanmalı (Knauf olabilir).',
              '"laminant parke" yazımı (laminat).'],
    'Duvar Sistemi': ['Lamine kütük: "140 mm LİK LAMİNE KÜTÜK; 3 ADET X 50 MM" (3 × 50 = 150 mm). Rendeleme sonrası 140 mm mi?',
                      'Kare kütük: "90 mm – 140 mm veya 190 mm" (aralık + ayrı değer). 190 mm ayrı bir seçenek mi?',
                      'Tutkal markaları "MADWOLF, APEL, WÜRTH": "MADWOLF" adı doğrulanmalı.',
                      '"WAINIG MAKİNASI" yazımı doğrulanmalı (Weinig olabilir); yeni metinde makine markası geçecek mi?'],
    'Çatı': ['"BTM marka 3D DRAGON Shingle" ve "11 mm OSB": bugünkü üretimde aynı mı?'],
    'Veranda': ['Veranda çatısında yalnızca "Shingle kaplama" yazıyor; ana çatıda metal kenet, toprak kiremit gibi seçenekler var. Verandada da seçenek sunuluyor mu?'],
    'Ağaç Malzeme': ['Menşe: "Estonya, Belarus, Sibirya, Finlandiya veya İsveç çamı". Güncel tedarik kaynakları aynı mı?',
                     'Emprenye kapsamı: burada "Ana taşıyıcı ve dış cephede kalan Ağaçlar emprenye", Ahşap Koruma ve Boya\'da "Tüm ahşap aksamlar emprenye". ÇELİŞKİ.',
                     'Boya markası: burada "HEMEL veya REMMERS"; Ahşap Koruma ve Boya\'da ayrıca "HEMEL – HICKSEN DEKOR". ÇELİŞKİ.'],
    'Pencere': ['"4+12+4 ısıcam": bugünkü standart cam paketi aynı mı?'],
    'İzolasyon': ['"KHNOUF" yazımı (bkz. Zemin).', '"CELLUBOR" ürün adı doğrulanmalı.'],
    'Banyo': ['"fiyata dâhildir" ifadeleri (seramik, klozet, duşakabin, lavabo, tesisat, musluklar) ticari taahhüt; yeni sayfada fiyat kapsamı yazılacak mı?',
              'Metinde eski marka adı geçiyor ("montajını Azra Ahşap Evler yapabilir"); yeni metinde çıkarılacak.'],
    'Elektrik': ['"TTR yanmaz kablo": TTR kablo için "yanmaz" nitelemesi doğrulanmalı.',
                 '"boğat sistemi, yani atlamalı ekli kablo sistemi" ifadesinin kastı netleşmeli (buat?).',
                 '"Her bir priz için sigorta kutusundan ayrı hat": bugünkü uygulama bu mu?',
                 '"ELEKTRİK TESİSATLARI FİYATLARA DÂHİLDİR": fiyat kapsamı yazılacak mı?'],
    'Ahşap Koruma ve Boya': ['Emprenye garantisi: burada "50 yıl garantili hale getirme", Garanti\'de "20 yıl garantilidir". ÇELİŞKİ.',
                             'Boya markası: "HEMEL veya REMMERS" ile "HEMEL – HICKSEN DEKOR" aynı bölümde art arda. ÇELİŞKİ; "HICKSEN DEKOR" adı doğrulanmalı.',
                             'Emprenye kapsamı: "Tüm ahşap aksamlar" (bkz. Ağaç Malzeme). ÇELİŞKİ.'],
    'Garanti': ['"kurtlanma, böceklenme ve kurtlanmaya karşı 20 yıl": "kurtlanma" iki kez yazılmış; küflenme kapsamda mı?',
                '20 yıl ↔ Ahşap Koruma ve Boya\'daki 50 yıl. ÇELİŞKİ.',
                'Boya bakım garantisi dış cephe 5 yıl, iç cephe 10 yıl: güncel mi?'],
    'Malzeme': ['"DÜNYA STANDARTI A-1 SINIFI ALEV GECİKTİRİCİLİ İZOLASYON VE BOYA" ve nem bariyerindeki "A-1 sınıfı": A1 yanmazlık sınıfı ahşap ve boya için iddia edilemeyebilir; ifade doğrulanmalı.'],
    'Proje': ['Metinde eski marka adı geçiyor ("AZRA AHŞAP EVLER Mimari ekibi"); yeni metinde çıkarılacak.'],
    'ÜRETİM ve MONTAJ ŞEKİLLERİ': ['Metinde eski marka adı geçiyor ("Azra Ahşap bünyesinde"); yeni metinde çıkarılacak.'],
    'PROJELENDİRME': ['Metinde eski marka adı geçiyor ("AZRA AHŞAP mimarları"); yeni metinde çıkarılacak.'],
}

ilk = next(iter(ham.values()))
bolum = {b['baslik']: b['satirlar'] for b in ilk['bolumler']}
ekler = ilk['ekler']

# Doğrulama: tüm sayfalarda metin birebir aynı mı?
farkli = {b['baslik'] for v in ham.values() for b in v['bolumler'] if b['satirlar'] != bolum[b['baslik']]}
farkli |= {k for v in ham.values() for k in EK_LISTELER if v['ekler'].get(k) != ekler.get(k)}
assert not farkli, f'Sayfalar arasında farklı bölümler var: {farkli}'

kat_sayim = collections.Counter(SAYFA[s][0] for s in ham)
kat_ozet = ', '.join(f'{k} {kat_sayim[k]}' for k in KATEGORI_SIRASI)


# Proje Detayları tablosundaki büyük harfli etiketlerin okunur hâli
ETIKET = {
    'KAPALI ALAN': 'Kapalı alan', 'ALT KAT KAPALI ALAN': 'Alt kat kapalı alan', 'ÜST KAT KAPALI ALAN': 'Üst kat kapalı alan',
    'AÇIK ALAN ( VERANDA )': 'Açık alan (veranda)', 'TOPLAM ALAN': 'Toplam alan', 'ODA SAYISI': 'Oda', 'SALON SAYISI': 'Salon',
    'MUTFAK ( AÇIK /KAPALI )': 'Mutfak', 'BANYO SAYISI': 'Banyo', 'GİYİNME ODASI': 'Giyinme odası', 'BALKON': 'Balkon',
    'ÇAMAŞIR ODASI': 'Çamaşır odası', 'SAUNA': 'Sauna', 'VERANDA': 'Veranda',
}
MARMARIS = ('Marmaris Ahşap Villa 175 m²: Proje Detayları\'nda "ODA SAYISI 1, BANYO SAYISI 1" yazıyor; '
            'bu büyüklükte bir villa için eski veri hatası olabilir.')
HEYBELIADA = ('Heybeli Ada Kütük Ev: başlıkta "HEYBELİ ADA", sayfa girişinde "BÜYÜKADA KÜTÜK EV" yazıyor. '
              'Fotoğraf açıklamalarında hangi konum kullanılsın?')
PROJE_ONAY = [MARMARIS, HEYBELIADA]


def proje_bilgileri():
    satirlar = []
    for slug in sorted(ham, key=lambda s: (KATEGORI_SIRASI.index(SAYFA[s][0]), SAYFA[s][2])):
        v = sayfalar[slug]
        d = {k.replace('ODA SAYISI5', 'ODA SAYISI'): x for k, x in v['detay'].items() if x.strip() and x.strip() != '-'}
        alan = ' · '.join(f'{ETIKET.get(k, k)}: {x}' for k, x in d.items() if 'ALAN' in k)
        diger = ' · '.join(f'{ETIKET.get(k, k)}: {x}' for k, x in d.items() if 'ALAN' not in k)
        o = v['ozet']
        bas = o.find('>') + 1
        son = min([x for x in (o.find('PROJE DETAYLARI'), o.find('Proje Detayları'), o.find('TEKNİK ŞARTNAME')) if x > 0] or [bas + 300])
        giris = [x.strip() for x in o[bas:son].split('\n') if x.strip()]
        baslik = v['title'].split(' - ')[0].strip()
        yapim = [x for x in giris if re.search(r'TEMEL|ZEMİN|LAMİNE|KAPLAMA|ARAZİ|DENİZ ÜSTÜ|KAR ', x.upper())]
        satirlar.append((SAYFA[slug][0], baslik, alan, diger, yapim))
    return satirlar


e = html.escape


def md():
    c = ['# Teknik şartname karşılaştırması (eski site)', '',
         f'- Şartname bulunan sayfa: **{len(ham)}** ({kat_ozet})',
         '- **Şartname metni 38 sayfanın hepsinde birebir aynı**; kategoriye veya projeye göre değişen bir bölüm yok.',
         '- Değerler eski siteden birebir alındı. Yazım hataları olduğu gibi bırakıldı; [ONAY] sütununda işaretli.', '',
         '| Başlık | Eski sitedeki değer (birebir) | Hangi kategorilerde farklı | Çelişki / onay |', '|---|---|---|---|']
    for yeni, eskiler in ESLEME + EK_BOLUMLER:
        deger = '<br><br>'.join((f'**{x}:** ' if len(eskiler) > 1 else '') + '<br>'.join(f'• {s}' for s in bolum[x]) for x in eskiler)
        onay = '<br>'.join(f'[ONAY] {s}' for s in ONAY.get(yeni, [])) or '–'
        etiket = yeni if (yeni, eskiler) in ESLEME else f'{yeni} *(listenizde yok)*'
        c.append(f'| {etiket} | {deger} | {KATEGORI_NOTU.get(yeni, ORTAK)} | {onay} |')
    for k in EK_LISTELER:
        onay = '<br>'.join(f'[ONAY] {s}' for s in ONAY.get(k, [])) or '–'
        c.append(f"| {k.capitalize()} *(listenizde yok)* | {'<br>'.join('• ' + s for s in ekler[k])} | {ORTAK} | {onay} |")
    c += ['', '## Projeye özel bilgiler (şartname dışında: sayfa girişi ve Proje Detayları tablosu)', '',
          '| Kategori | Sayfa | Alan | Oda / bölümler | Girişte yazan yapım bilgisi (birebir) |', '|---|---|---|---|---|']
    for kat, baslik, alan, diger, yapim in proje_bilgileri():
        c.append(f"| {kat} | {baslik} | {alan or '–'} | {diger or '–'} | {'<br>'.join(yapim) or '–'} |")
    c += [''] + [f'[ONAY] {o}' for o in PROJE_ONAY]
    return '\n'.join(c) + '\n'


def sayfa_html():
    satir = []
    for yeni, eskiler in ESLEME + EK_BOLUMLER:
        deger = ''.join((f'<h4>{e(x)}</h4>' if len(eskiler) > 1 else '') + '<ul>' + ''.join(f'<li>{e(s)}</li>' for s in bolum[x]) + '</ul>' for x in eskiler)
        onay = ONAY.get(yeni, [])
        ek = (yeni, eskiler) not in ESLEME
        satir.append(f'<tr{" class=ek" if ek else ""}><th>{e(yeni)}{"<small>listenizde yok</small>" if ek else ""}</th><td>{deger}</td>'
                     f'<td class="kat">{e(KATEGORI_NOTU.get(yeni, ORTAK))}</td>'
                     f'<td>{"".join(f"<p class=onay>{e(o)}</p>" for o in onay) or "–"}</td></tr>')
    for k in EK_LISTELER:
        onay = ONAY.get(k, [])
        satir.append(f'<tr class=ek><th>{e(k.capitalize())}<small>listenizde yok</small></th><td><ul>{"".join(f"<li>{e(s)}</li>" for s in ekler[k])}</ul></td>'
                     f'<td class="kat">{e(ORTAK)}</td><td>{"".join(f"<p class=onay>{e(o)}</p>" for o in onay) or "–"}</td></tr>')
    proje = ''.join(f'<tr><td>{e(k)}</td><td>{e(b)}</td><td>{e(a) or "–"}</td><td>{e(d) or "–"}</td><td>{"<br>".join(map(e, y)) or "–"}</td></tr>'
                    for k, b, a, d, y in proje_bilgileri())
    onay_sayisi = sum(len(v) for v in ONAY.values()) + len(PROJE_ONAY)
    return f'''<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Şartname Karşılaştırması</title>
<style>
:root {{ --zemin:#15120f; --kart:#1f1a16; --cizgi:#3a3029; --metin:#efe7dd; --soluk:#b5a898; --vurgu:#d9a35b; --kirmizi:#e07a5f; }}
* {{ box-sizing:border-box; }}
body {{ margin:0; background:var(--zemin); color:var(--metin); font:15px/1.55 system-ui, -apple-system, "Segoe UI", sans-serif; }}
main {{ max-width:1500px; margin:0 auto; padding:24px 16px 80px; }}
h1 {{ font-size:1.6rem; margin:0 0 8px; }} h2 {{ font-size:1.25rem; margin:40px 0 8px; color:var(--vurgu); }}
.ozet {{ background:var(--kart); border:1px solid var(--cizgi); border-radius:12px; padding:12px 16px; color:var(--soluk); }}
.ozet strong {{ color:var(--metin); }}
.tablo {{ overflow-x:auto; }}
table {{ width:100%; border-collapse:collapse; min-width:900px; }}
th, td {{ border-bottom:1px solid var(--cizgi); padding:10px 12px; text-align:left; vertical-align:top; }}
thead th {{ position:sticky; top:0; background:#2a231d; font-size:.8rem; text-transform:uppercase; letter-spacing:.05em; color:var(--soluk); }}
tbody th {{ width:150px; font-weight:600; }} tbody th small {{ display:block; color:var(--soluk); font-weight:400; font-size:.75rem; }}
tr.ek {{ background:#1a1612; }}
td ul {{ margin:0; padding-left:18px; }} td li + li {{ margin-top:4px; }} td h4 {{ margin:8px 0 4px; font-size:.85rem; color:var(--vurgu); }} td h4:first-child {{ margin-top:0; }}
td.kat {{ width:220px; color:var(--soluk); font-size:.88rem; }}
td:last-child {{ width:300px; }}
.onay {{ margin:0 0 6px; font-size:.88rem; }} .onay::before {{ content:"ONAY"; font-size:.65rem; font-weight:700; background:var(--vurgu); color:#1a140f; border-radius:3px; padding:0 4px; margin-right:6px; }}
.proje td {{ font-size:.88rem; }}
</style></head><body><main>
<h1>Teknik şartname karşılaştırması</h1>
<div class="ozet"><p>Şartname bulunan sayfa: <strong>{len(ham)}</strong> ({e(kat_ozet)}).</p>
<p><strong>Şartname metni 38 sayfanın hepsinde birebir aynı.</strong> Kategoriye veya projeye göre değişen bir bölüm yok; farklar yalnızca proje girişlerinde ve Proje Detayları tablosunda (en altta).</p>
<p>Değerler eski siteden birebir alındı, yazım hataları olduğu gibi bırakıldı. {onay_sayisi} onay maddesi var; çelişkiler "ÇELİŞKİ" diye işaretli.</p></div>
<h2>Şartname</h2>
<div class="tablo"><table><thead><tr><th>Başlık</th><th>Eski sitedeki değer (birebir)</th><th>Hangi kategorilerde farklı</th><th>Çelişki / onay</th></tr></thead>
<tbody>{"".join(satir)}</tbody></table></div>
<h2>Projeye özel bilgiler</h2>
<div class="tablo proje"><table><thead><tr><th>Kategori</th><th>Sayfa</th><th>Alan</th><th>Oda / bölümler</th><th>Girişte yazan yapım bilgisi (birebir)</th></tr></thead>
<tbody>{proje}</tbody></table></div>
{"".join(f'<p class="onay">{e(o)}</p>' for o in PROJE_ONAY)}
</main></body></html>'''


open(os.path.join(KLASOR, 'SARTNAME-KARSILASTIRMA.md'), 'w', encoding='utf-8', newline='\n').write(md())
open(sys.argv[1], 'w', encoding='utf-8').write(sayfa_html())
print('Yazıldı:', os.path.join(KLASOR, 'SARTNAME-KARSILASTIRMA.md'), sys.argv[1])
