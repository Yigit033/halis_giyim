-- QR Kod Tabanlı Ürün Bilgi Sistemi - Supabase Database Schema
-- Bu dosyayı Supabase Dashboard > SQL Editor'de çalıştırın

-- Products tablosu oluştur
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product code için index (hızlı arama için)
CREATE INDEX IF NOT EXISTS idx_products_product_code ON products(product_code);

-- Updated_at otomatik güncelleme için trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Updated_at trigger'ı ekle
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) aktif et
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public kullanıcılar sadece okuyabilir (SELECT)
CREATE POLICY "Public users can view products"
    ON products
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Authenticated kullanıcılar (admin) tüm işlemleri yapabilir
CREATE POLICY "Authenticated users can insert products"
    ON products
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
    ON products
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
    ON products
    FOR DELETE
    TO authenticated
    USING (true);

-- Örnek ürünler ekle (test için)
INSERT INTO products (product_code, name, price, description) VALUES
    ('PROD001', 'Beyaz Gömlek', 299.90, 'Klasik beyaz gömlek, %100 pamuk'),
    ('PROD002', 'Siyah Pantolon', 449.90, 'Slim fit siyah pantolon'),
    ('PROD003', 'Lacivert Ceket', 899.90, 'Erkek lacivert blazer ceket')
ON CONFLICT (product_code) DO NOTHING;

-- Veritabanı durumunu kontrol et
SELECT 
    'Products table created successfully' as status,
    COUNT(*) as sample_products_count
FROM products;
