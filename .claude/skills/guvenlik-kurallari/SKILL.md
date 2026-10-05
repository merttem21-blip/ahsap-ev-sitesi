---
name: guvenlik-kurallari
description: 2K AHŞAP web sitesi için güvenlik kuralları ve veri koruma standartları
---

# 2K AHŞAP — Güvenlik Kuralları

## 1. Şifre ve Gizli Bilgiler (.env dosyası)

Veritabanı şifresi, API anahtarları gibi gizli bilgiler asla koda yazılmaz.

```
✗ YAPMAYIN:
const apiKey = "sk_live_12345";

✓ YAPIN:
// .env dosyasına yazın (GitHub'a gitmez)
API_KEY=sk_live_12345
// Kodda:
const apiKey = import.meta.env.API_KEY;
```

- `.gitignore` dosyasında `.env` olmalı.
- Herkese açık olması gereken anahtarlar (ör. form servisi public key) `PUBLIC_` önekiyle tanımlanır.

## 2. Form Güvenliği (İletişim Formu)

### a) Bot koruması
- Formda gizli bir "honeypot" alanı olmalı (insanlar görmez, botlar doldurur; doluysa gönderim reddedilir).
- Form servisi destekliyorsa hCaptcha/reCAPTCHA veya servisin kendi spam filtresi açılmalı.

### b) Rate limiting
- Aynı kullanıcı kısa sürede çok sayıda gönderim yapamamalı (gönder butonu gönderim sırasında devre dışı, istemci tarafında en az 30 sn bekleme).

### c) Doğrulama
- Tüm alanlar hem tarayıcıda (required, type="email", maxlength) hem servis tarafında doğrulanır.
- Mesaj alanı en fazla 2000 karakter.

## 3. Dosya Yükleme Güvenliği

Kullanıcı dosya yükleyebiliyorsa:
- En fazla 5 MB
- Sadece jpg, png, webp, pdf
- Çift uzantılı dosyalar (file.jpg.exe) reddedilir

## 4. Veri Koruma (KVKK)

İletişim formunda toplanan veriler: ad soyad, e-posta, telefon, mesaj.

Kurallar:
1. **Açık onay:** Gönder butonundan önce işaretlenmesi zorunlu KVKK onay kutusu olmalı ve Aydınlatma Metni sayfasına link vermeli.
2. **Saklama:** Veriler en fazla 1 yıl tutulur.
3. **Paylaşmama:** Veriler üçüncü kişilerle paylaşılmaz (form servisi hariç, bu Aydınlatma Metni'nde belirtilir).
4. **Silme hakkı:** Kullanıcı verilerinin silinmesini talep edebilir.

Örnek onay metni:
"Kişisel verilerimin, KVKK Aydınlatma Metni kapsamında talebimin yanıtlanması amacıyla işlenmesini kabul ediyorum."

## 5. HTTPS

- Site yalnızca HTTPS üzerinden yayınlanır (Vercel bunu otomatik sağlar).
- Sitedeki tüm görsel, font ve script bağlantıları https:// olmalı.

## 6. XSS (Cross-Site Scripting) Koruması

- Kullanıcıdan gelen veri asla `innerHTML` ile sayfaya basılmaz, `textContent` kullanılır.
- Astro'da `set:html` yalnızca güvenilir, sabit içerik için kullanılır.

## 7. Güvenlik Başlıkları (Vercel)

`vercel.json` içinde şu başlıklar tanımlanmalı:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## 8. Dış Bağlantılar

- `target="_blank"` olan tüm linklerde `rel="noopener noreferrer"` olmalı.

## 9. Paket Güncellemeleri

```bash
npm audit          # açıkları listeler
npm audit fix      # güvenli güncellemeleri uygular
```

- `npm audit fix --force` kullanılmaz (sürümleri bozabilir), önce kontrol edilir.

## 10. Loglama

Kaydedilmez: şifreler, API anahtarları, kullanıcıların kişisel verileri (konsola da yazdırılmaz).

## 11. Gizlilik Sayfaları

Sitede olmalı ve footer'dan link verilmeli:
- `/kvkk` — KVKK Aydınlatma Metni (hangi veri, neden, ne kadar süre, kimler erişir, haklar)
- `/gizlilik` — Gizlilik ve Çerez Politikası

Hukuki metinler şablon olarak hazırlanır ve "yayın öncesi hukukçu kontrolü gerekir" notu düşülür.

## Güvenlik Kontrol Listesi

- [ ] .env var ve .gitignore'da
- [ ] Formda honeypot + spam koruması
- [ ] Formda zorunlu KVKK onay kutusu
- [ ] Alan doğrulamaları (required, email, maxlength)
- [ ] innerHTML yerine textContent
- [ ] vercel.json güvenlik başlıkları
- [ ] target="_blank" linklerde rel="noopener noreferrer"
- [ ] /kvkk ve /gizlilik sayfaları
- [ ] npm audit kontrol edildi
- [ ] Site HTTPS
