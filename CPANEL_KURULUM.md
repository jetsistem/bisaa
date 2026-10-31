# Bissa Akademi — cPanel Subdomain Kurulum Rehberi

Bu proje, **cPanel (Apache / LiteSpeed)** paylaşımlı hosting veya VPS sunucularında **Node.js kurulumuna gerek kalmadan** doğrudan herhangi bir **subdomain** (ör. `akademi.siteadiniz.com`) veya alt klasör üzerinde çalışacak şekilde yapılandırılmıştır.

---

## 1. Yüklenecek Dosyaları Oluşturma

Projeyi bilgisayarınıza indirdikten sonra terminalde şu iki komutu çalıştırın:

```bash
npm install
npm run build:cpanel
```

Bu işlem sonucunda proje dizininde **`dist/`** klasörü oluşur:
- `dist/index.html` (Göreli `./assets/...` yollarıyla derlenmiş ana giriş dosyası)
- `dist/.htaccess` (Subdomain yönlendirme, SSL/HTTPS yönlendirme, GZIP sıkıştırma ve önbellekleme kuralları)
- `dist/assets/` (Optimize edilmiş CSS, JS ve tüm sahne görselleri)
- `dist/api/apply.php` (Form başvurularını e-postaya ileten ve `api/private_leads/basvurular.log` dosyasına yedekleyen hazır PHP servisi)
- `dist/favicon.svg` & `dist/robots.txt`

---

## 2. cPanel Üzerinde Subdomain Oluşturma ve Yükleme

1. **cPanel → Domains (Alan Adları)** bölümüne girin ve **Create A New Domain** butonuna tıklayın.
2. Subdomain adresinizi yazın (ör. `bissa.siteadiniz.com` veya `akademi.siteadiniz.com`). Document Root olarak oluşturulan klasörü (ör. `public_html/akademi` veya `akademi.siteadiniz.com`) not edin.
3. **cPanel → File Manager (Dosya Yöneticisi)** ekranını açın:
   - Sağ üstteki **Settings (Ayarlar)** butonuna tıklayıp **"Show Hidden Files (dotfiles)"** seçeneğini işaretleyin (`.htaccess` dosyasının görünmesi için önemlidir).
4. Subdomain kök klasörünün içine girin ve bilgisayarınızdaki **`dist/` klasörünün İÇİNDEKİ tüm dosya ve klasörleri** (`index.html`, `.htaccess`, `assets/`, `api/`, `favicon.svg`, `robots.txt`) doğrudan bu dizine yükleyin.

---

## 3. Form Başvuruları & E-Posta Bildirim Ayarı

cPanel sunucularında PHP varsayılan olarak aktif olduğu için ekstra ayar yapmanıza gerek kalmadan form başvuruları çalışır:
- Sitedeki **Tanışma Dersi (Mobil Popup)**, **Ön Kayıt (Masaüstü Hero)** ve **Etkinlik Kayıt** formları doldurulduğunda veriler otomatik olarak `/api/apply.php` dosyasına gönderilir.
- Başvuruların gideceği e-posta adresini özelleştirmek isterseniz cPanel File Manager üzerinden `api/apply.php` dosyasını açıp `$toEmail` satırına kendi e-posta adresinizi (ör. `$toEmail = 'iletisim@bissaakademi.com';`) yazabilirsiniz.
- Ayrıca her başvuru veri kaybını önlemek için dış erişime kapalı olan `api/private_leads/basvurular.log` dosyasına tarih ve saat bilgisiyle kaydedilir.
