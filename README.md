# Halis Giyim - QR Kod Tabanlı Ürün Bilgi Sistemi

Fiziksel mağazalar için QR kod ile ürün bilgisi ve fiyat gösterim sistemi. Müşteriler QR kod okutarak güncel fiyat ve ürün bilgisini görüntüleyebilir, admin panelden ürünler yönetilebilir.

## 🚀 Özellikler

### Public (Müşteri) Özellikleri
- 📱 **Mobil QR Okuyucu**: Kamera ile QR kod okutma
- 💰 **Güncel Fiyat Gösterimi**: Veritabanından gerçek zamanlı fiyat bilgisi
- 📝 **Ürün Detayları**: Ürün adı, fiyat ve açıklama
- 🎨 **Modern Tasarım**: Mobil-first, responsive arayüz

### Admin Panel Özellikleri
- 🔐 **Güvenli Giriş**: Supabase Auth ile kimlik doğrulama
- ➕ **Ürün Yönetimi**: Ürün ekleme, düzenleme, silme
- 🏷️ **QR Kod Üretimi**: Her ürün için otomatik QR kod oluşturma
- 🖨️ **QR Yazdırma**: QR kodları indirme ve yazdırma
- 📊 **Dashboard**: Ürün istatistikleri ve hızlı erişim

## 🛠️ Teknoloji Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **QR Kütüphaneleri**: html5-qrcode (okuma), qrcode (üretim)
- **Hosting**: Vercel

## 📋 Gereksinimler

- Node.js 18+ ve npm
- Supabase hesabı (ücretsiz plan yeterli)
- Vercel hesabı (deployment için, opsiyonel)

## 🔧 Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Supabase Projesi Oluşturun

1. [supabase.com](https://supabase.com) adresine gidin
2. Yeni proje oluşturun
3. SQL Editor'de `supabase_schema.sql` dosyasını çalıştırın
4. Settings > API bölümünden URL ve Anon Key'i kopyalayın

### 3. Environment Variables Ayarlayın

`.env.local.example` dosyasını `.env.local` olarak kopyalayın:

```bash
copy .env.local.example .env.local
```

`.env.local` dosyasını düzenleyip Supabase bilgilerinizi girin:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. İlk Admin Kullanıcısı Oluşturun

Supabase Dashboard > Authentication > Users bölümünden:
1. "Add user" butonuna tıklayın
2. Email ve şifre girin
3. "Create user" ile oluşturun

### 5. Development Server'ı Başlatın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📱 Kullanım

### Müşteri Tarafı

1. Ana sayfadan "QR Kod Okut" butonuna tıklayın
2. Kamera iznini verin
3. Ürün QR kodunu kameraya tutun
4. Ürün bilgileri ve güncel fiyat gösterilecektir

### Admin Tarafı

1. `/admin/login` adresine gidin
2. Supabase'de oluşturduğunuz email/şifre ile giriş yapın
3. Dashboard'dan ürün ekleyin
4. Her ürün için QR kod oluşturulacaktır
5. QR kodları indirip yazdırabilirsiniz

## 🚀 Production Deployment (Vercel)

### 1. GitHub'a Push Edin

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

### 2. Vercel'de Deploy Edin

1. [vercel.com](https://vercel.com) adresine gidin
2. "Import Project" ile GitHub repo'nuzu seçin
3. Environment Variables ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. "Deploy" butonuna tıklayın

### 3. Production URL'i Kullanın

Deploy tamamlandıktan sonra Vercel size bir URL verecektir (örn: `https://halis-giyim.vercel.app`). Bu URL üzerinden QR kodlar çalışacaktır.

## 📂 Proje Yapısı

```
halis_giyim/
├── app/
│   ├── admin/              # Admin panel
│   │   ├── dashboard/      # Dashboard sayfası
│   │   ├── login/          # Login sayfası
│   │   ├── products/       # Ürün yönetimi
│   │   └── layout.tsx      # Admin layout
│   ├── product/[code]/     # Ürün detay sayfası
│   ├── scan/               # QR okuyucu sayfası
│   ├── globals.css         # Global stiller
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Ana sayfa
├── components/
│   ├── admin/              # Admin componentleri
│   │   └── QRCodeDisplay.tsx
│   └── ui/                 # UI componentleri
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── lib/
│   ├── supabase/           # Supabase clients
│   │   ├── client.ts       # Browser client
│   │   └── server.ts       # Server client
│   └── types/
│       └── database.ts     # TypeScript types
├── middleware.ts           # Auth middleware
├── supabase_schema.sql     # Database schema
└── package.json
```

## 🔒 Güvenlik

- **RLS (Row Level Security)**: Public kullanıcılar sadece okuyabilir
- **Auth Middleware**: Admin rotaları korumalı
- **Server Actions**: Tüm veri işlemleri server-side
- **Validation**: Form validasyonları ve hata yönetimi

## 💡 Önemli Notlar

- QR kodlar ürün linkini içerir, fiyat bilgisi içermez
- Fiyat değiştiğinde QR kod yeniden basılmasına gerek yoktur
- Sistem her zaman veritabanından güncel fiyatı çeker
- Mobil cihazlarda kamera erişimi için HTTPS gereklidir (Vercel otomatik sağlar)

## 🐛 Sorun Giderme

### QR Okuyucu Çalışmıyor
- Tarayıcı kamera iznini kontrol edin
- HTTPS bağlantısı olduğundan emin olun
- Farklı tarayıcı deneyin (Chrome/Safari önerilir)

### Admin Girişi Yapamıyorum
- Supabase'de kullanıcı oluşturduğunuzdan emin olun
- Environment variables doğru ayarlandığından emin olun
- Tarayıcı console'da hata mesajlarını kontrol edin

### Ürün Bulunamadı Hatası
- Ürün kodunun veritabanında olduğundan emin olun
- QR kodun doğru URL'i içerdiğini kontrol edin

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Tarayıcı console'u kontrol edin
2. Supabase Dashboard > Logs bölümünü inceleyin
3. `.env.local` dosyasının doğru olduğundan emin olun

## 📄 Lisans

Bu proje özel kullanım içindir.

---

**Geliştirici Notu**: Sistem production-ready olarak tasarlanmıştır. Küçük esnaf için basit, hızlı ve bakım maliyeti düşüktür.
