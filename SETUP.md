# Kurulum ve Deployment Rehberi

Bu rehber, Halis Giyim QR Kod sistemini sıfırdan kurmanız için detaylı adımları içerir.

## 📋 Ön Hazırlık

### Gerekli Hesaplar

1. **Supabase Hesabı**
   - [supabase.com](https://supabase.com) adresine gidin
   - GitHub ile ücretsiz kayıt olun
   - Email doğrulaması yapın

2. **Vercel Hesabı** (Deployment için)
   - [vercel.com](https://vercel.com) adresine gidin
   - GitHub ile ücretsiz kayıt olun

3. **GitHub Hesabı**
   - Kod deposu için gerekli
   - [github.com](https://github.com) üzerinden oluşturun

## 🗄️ Supabase Kurulumu

### 1. Yeni Proje Oluşturma

1. Supabase Dashboard'a giriş yapın
2. "New Project" butonuna tıklayın
3. Proje bilgilerini girin:
   - **Name**: `halis-giyim` (veya istediğiniz isim)
   - **Database Password**: Güçlü bir şifre oluşturun (kaydedin!)
   - **Region**: `Europe (Frankfurt)` veya size en yakın bölge
4. "Create new project" butonuna tıklayın
5. Proje oluşturulmasını bekleyin (~2 dakika)

### 2. Database Schema Kurulumu

1. Sol menüden **SQL Editor** seçin
2. "New query" butonuna tıklayın
3. Proje klasöründeki `supabase_schema.sql` dosyasının içeriğini kopyalayın
4. SQL Editor'e yapıştırın
5. Sağ üstteki **"RUN"** butonuna tıklayın
6. "Success" mesajını görmelisiniz

### 3. API Keys Alma

1. Sol menüden **Settings** > **API** seçin
2. Şu bilgileri kopyalayın:
   - **Project URL**: `https://xxxxx.supabase.co` formatında
   - **anon public**: `eyJhbGc...` ile başlayan uzun key

### 4. İlk Admin Kullanıcısı Oluşturma

1. Sol menüden **Authentication** > **Users** seçin
2. Sağ üstteki **"Add user"** butonuna tıklayın
3. **"Create new user"** sekmesinde:
   - **Email**: Admin email adresiniz (örn: `admin@halisgiyim.com`)
   - **Password**: Güçlü bir şifre (kaydedin!)
   - **Auto Confirm User**: ✓ İşaretleyin
4. **"Create user"** butonuna tıklayın

## 💻 Local Development Kurulumu

### 1. Proje Klasörüne Gidin

```bash
cd c:\halis_giyim
```

### 2. Environment Variables Ayarlayın

1. `.env.local.example` dosyasını `.env.local` olarak kopyalayın:

```bash
copy .env.local.example .env.local
```

2. `.env.local` dosyasını bir metin editörü ile açın
3. Supabase'den aldığınız bilgileri girin:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3. Bağımlılıkları Yükleyin

```bash
npm install
```

Bu işlem 1-2 dakika sürebilir.

### 4. Development Server'ı Başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

### 5. İlk Testi Yapın

1. Ana sayfada "Admin Girişi" linkine tıklayın
2. Supabase'de oluşturduğunuz email/şifre ile giriş yapın
3. Dashboard'a yönlendirilmelisiniz
4. "Yeni Ürün Ekle" ile test ürünü ekleyin
5. QR kodu görüntüleyin ve indirin

## 🚀 Vercel Deployment

### 1. GitHub Repository Oluşturma

1. [github.com](https://github.com) adresine gidin
2. "New repository" butonuna tıklayın
3. Repository adı: `halis-giyim-qr`
4. Private veya Public seçin
5. "Create repository" butonuna tıklayın

### 2. Kodu GitHub'a Push Etme

Proje klasöründe terminal açın:

```bash
# Git başlat
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit - Halis Giyim QR System"

# GitHub remote ekle (kendi URL'inizi kullanın)
git remote add origin https://github.com/kullanici-adi/halis-giyim-qr.git

# Push et
git branch -M main
git push -u origin main
```

### 3. Vercel'de Import Etme

1. [vercel.com](https://vercel.com) Dashboard'a gidin
2. **"Add New..."** > **"Project"** seçin
3. GitHub repository'nizi bulun ve **"Import"** tıklayın
4. **Framework Preset**: Next.js (otomatik seçilmeli)
5. **Root Directory**: `./` (varsayılan)

### 4. Environment Variables Ekleme

1. **"Environment Variables"** bölümünü açın
2. Şu değişkenleri ekleyin:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGc...
```

3. Her ikisi için de **"All"** (Production, Preview, Development) seçin

### 5. Deploy Etme

1. **"Deploy"** butonuna tıklayın
2. Build işlemini bekleyin (~2-3 dakika)
3. "Congratulations!" mesajını görünce deployment tamamlanmıştır

### 6. Production URL'i Alma

1. Vercel size otomatik bir URL verecektir:
   - Örnek: `https://halis-giyim-qr.vercel.app`
2. Bu URL'i kopyalayın
3. Artık QR kodlar bu URL ile çalışacaktır

### 7. Custom Domain Ekleme (Opsiyonel)

Kendi domain'iniz varsa:

1. Vercel Dashboard > **Settings** > **Domains**
2. Domain adınızı girin (örn: `qr.halisgiyim.com`)
3. DNS ayarlarını yapın (Vercel size talimatları gösterecek)
4. SSL sertifikası otomatik oluşturulacaktır

## ✅ Deployment Sonrası Kontroller

### 1. Production Testi

1. Production URL'inizi açın
2. Admin girişi yapın
3. Yeni ürün ekleyin
4. QR kodu indirin
5. Mobil cihazdan QR kodu okutun
6. Ürün bilgilerinin göründüğünden emin olun

### 2. Mobil Test

1. Telefon kamerasıyla QR kodu okutun
2. Veya production URL'de `/scan` sayfasını açın
3. Kamera iznini verin
4. QR kodu okutun
5. Ürün sayfasının açıldığını kontrol edin

### 3. Fiyat Güncelleme Testi

1. Admin panelden bir ürünün fiyatını değiştirin
2. Aynı QR kodu tekrar okutun
3. Güncellenmiş fiyatın göründüğünden emin olun

## 🔄 Güncelleme Yapma

Kod değişikliği yaptığınızda:

```bash
git add .
git commit -m "Açıklama mesajı"
git push
```

Vercel otomatik olarak yeni versiyonu deploy edecektir.

## 🐛 Sorun Giderme

### Build Hatası

- Vercel Dashboard > Deployments > Build Logs kontrol edin
- Environment variables doğru girilmiş mi kontrol edin
- `npm run build` ile local'de test edin

### Database Bağlantı Hatası

- Supabase URL ve Key doğru mu kontrol edin
- Supabase projesinin aktif olduğundan emin olun
- RLS politikalarının doğru kurulduğunu kontrol edin

### QR Kod Okuma Sorunu

- HTTPS bağlantısı olmalı (Vercel otomatik sağlar)
- Kamera izni verilmiş olmalı
- QR kod net ve okunaklı olmalı

## 📊 Monitoring

### Vercel Analytics

1. Vercel Dashboard > Analytics
2. Sayfa görüntülemeleri ve performans metrikleri

### Supabase Logs

1. Supabase Dashboard > Logs
2. Database sorguları ve hatalar

## 🔐 Güvenlik Önerileri

1. **Admin Şifresi**: Güçlü şifre kullanın, düzenli değiştirin
2. **Environment Variables**: Asla GitHub'a commit etmeyin
3. **RLS Policies**: Supabase'de aktif olduğundan emin olun
4. **HTTPS**: Her zaman HTTPS kullanın (Vercel otomatik)

## 📱 QR Kod Yazdırma İpuçları

1. **Boyut**: En az 3x3 cm olmalı
2. **Kalite**: Yüksek çözünürlük (300 DPI)
3. **Kontrast**: Siyah-beyaz, net
4. **Koruma**: Lamine veya plastik kılıf kullanın
5. **Konum**: Müşterilerin kolayca erişebileceği yerde

## 🎉 Tamamlandı!

Sisteminiz artık production'da çalışıyor! Müşterileriniz QR kodları okutarak ürün bilgilerine ulaşabilir.

---

**Yardıma mı ihtiyacınız var?**
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
