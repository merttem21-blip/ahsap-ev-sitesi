# Şartnameli 38 eski sayfanın yeni "Teknik Şartname" sayfasındaki kategorisi ve fotoğraf açıklaması için tür/konum.
# Kural: eski sayfa başlığındaki yapı türü (ÜÇGEN > KÜTÜK > BUNGALOV > TINYHOUSE/KARAVAN > VİLLA/AHŞAP EV);
# başlıkta tür yoksa eski menüdeki kategori. Tür ve konum yalnızca eski başlıkta yazanı aktarır
# (yazım düzeltildi: "KUŞ ADASI" → Kuşadası, "MESCİD" → mescit).

KATEGORI_SIRASI = ['Ahşap Ev', 'Kütük Ev', 'Bungalov', 'Üçgen Ev / A-Frame', 'Tiny House', 'Tarihi Eser', 'Kulübe', 'Çocuk Oyun Evi']

# slug: (kategori, tür, konum, not)
SAYFA = {
    'sile-ahsap-ev-250-m2': ('Ahşap Ev', 'Ahşap ev villa', 'Şile', ''),
    'marmaris-ahsap-villa-175m2': ('Ahşap Ev', 'Ahşap villa', 'Marmaris', ''),
    'istanbul-ahsap-ev-villa-150m2': ('Ahşap Ev', 'Ahşap ev villa', 'İstanbul', ''),
    'beykoz-ahsap-villa-125m2': ('Ahşap Ev', 'Ahşap villa', 'Beykoz', ''),
    'tekirdag-iki-katli-ahsap-ev-kutuk-villa': ('Ahşap Ev', 'Ahşap ev', 'Tekirdağ', ''),
    'bodrum-ahsap-ev-kutuk-villa-80-m2': ('Ahşap Ev', 'Ahşap ev', 'Bodrum', ''),
    'fethiye-ahsap-ev-kutuk-villa-bungalov-70m2': ('Ahşap Ev', 'Ahşap ev', 'Fethiye', ''),
    'canakkale-ahsap-ev-fiyatlari-2024': ('Ahşap Ev', 'Ahşap ev', 'Çanakkale', ''),
    'tarabya-ahsap-calisma-ofisi-proje-satis-evi': ('Ahşap Ev', 'Ahşap çalışma ofisi', 'Tarabya', 'başlıkta tür yok; eski menü: Ahşap Evler'),
    'assos-kutuk-ev-100-m2': ('Kütük Ev', 'Kütük ev', 'Assos', ''),
    'buyukada-heybeli-ada-ahsap-kutuk-ev': ('Kütük Ev', 'Kütük ev', 'Heybeliada', ''),
    'kandira-oval-ahsap-bungalov-40m2': ('Bungalov', 'Oval ahşap bungalov', 'Kandıra', ''),
    'didim-oval-ahsap-bungalov-otel-20m2': ('Bungalov', 'Oval ahşap bungalov', 'Didim', ''),
    'sakarya-ahsap-otel-bungalov-tinyhouse-30m2': ('Bungalov', 'Ahşap bungalov', 'Sakarya', ''),
    'gebze-ahsap-otel-bungalov-tasinabilir-ev': ('Bungalov', 'Ahşap bungalov', 'Gebze', ''),
    'datca-ahsap-ofis-agac-ev-bungalov-18m2': ('Bungalov', 'Ahşap ofis bungalov', 'Datça', ''),
    'kibris-maldiv-evi-bungalov': ('Bungalov', 'Maldiv evi bungalov', 'Kıbrıs', ''),
    'iznik-ahsap-ev-bungalov-60m2': ('Bungalov', 'Ahşap ev bungalov', 'İznik', ''),
    'cesme-ahsap-ev-bungalov-60m2': ('Bungalov', 'Ahşap ev bungalov', 'Çeşme', ''),
    'agva-ucgen-ev-ahsap-bungalov-50-m2': ('Üçgen Ev / A-Frame', 'Üçgen ev', 'Ağva', ''),
    'kusadasi-ahsap-otel-bungalov-tinyhouse': ('Üçgen Ev / A-Frame', 'Ahşap bungalov', 'Kuşadası', 'başlıkta "bungalov"; eski menüde Üçgen Ev altında, yapı A-frame'),
    'ahsap-otel-karavan-tinyhouse': ('Tiny House', 'Ahşap karavan tiny house', '', ''),
    'yalova-ahsap-camii-mescid': ('Tarihi Eser', 'Ahşap cami', 'Yalova', ''),
    'ahsap-camii-mescid-istanbul': ('Tarihi Eser', 'Ahşap mescit', 'İstanbul', ''),
    'buyukada-ahsap-ev-tarihi-eser-restorasyon-yali-konak': ('Tarihi Eser', 'Tarihi eser restorasyonu', 'Büyükada', ''),
    'ahsap-tarihi-eser-restorasyon-guvenlik-bekci-kulubesi': ('Tarihi Eser', 'Tarihi ahşap güvenlik kulübesi', '', ''),
    'ahsap-bekci-guvenlik-kulube-satis-bufesi-bungalov-bilet-gisesi': ('Kulübe', 'Ahşap gişe kulübesi', '', ''),
    'ahsap-ev-satis-ofisi-kiosk-bufe-workshop': ('Kulübe', 'Ahşap satış ofisi', 'Bodrum', ''),
    'ahsap-satis-bufesi-kiosk-mutfak-hobi-evi': ('Kulübe', 'Satış büfesi', '', ''),
    'antalya-cafe-restaurant-satis-bufesi-beach-clup': ('Kulübe', 'Ahşap kafe-restoran', 'Antalya', ''),
    'besiktas-ahsap-satis-ofisi-calisma-evi': ('Kulübe', 'Ahşap satış ofisi', 'Beşiktaş', ''),
    'datca-ahsap-pavilion-beach-clup-kamelya-perdola': ('Kulübe', 'Ahşap beach club', 'Datça', ''),
    'etiler-ahsap-cafe-restaurant-satis-bufesi-kiosk': ('Kulübe', 'Ahşap kafe-restoran', 'Etiler', ''),
    'heybeliada-ahsap-bilet-gisesi-guvenlik-kulubesi': ('Kulübe', 'Ahşap bilet gişesi', 'Heybeliada', ''),
    'istanbul-ahsap-kamelya-cardak-pergola-kis-bahcesi': ('Kulübe', 'Ahşap kamelya kış bahçesi', 'İstanbul', ''),
    'istanbul-ahsap-ofis-guvenlik-bekci-kulubesi': ('Kulübe', 'Ahşap güvenlik kulübesi', 'İstanbul', ''),
    'cocuk-oyun-evi-park-istanbul': ('Çocuk Oyun Evi', 'Çocuk oyun evi', 'İstanbul', ''),
    'agac-cocuk-oyun-evi-park-beykoz': ('Çocuk Oyun Evi', 'Çocuk oyun evi', 'Beykoz', ''),
}
