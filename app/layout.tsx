import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Halis Giyim - QR Ürün Bilgi Sistemi',
    description: 'QR kod ile ürün bilgisi ve fiyat sorgulama sistemi',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <body>{children}</body>
        </html>
    );
}
