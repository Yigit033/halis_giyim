'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useRouter } from 'next/navigation';

export default function QRScanner() {
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string>('');
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const router = useRouter();

    const startScanning = async () => {
        try {
            setError('');
            const scanner = new Html5Qrcode('qr-reader');
            scannerRef.current = scanner;

            await scanner.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                (decodedText) => {
                    // QR kod okununca
                    stopScanning();

                    // URL ise product code'u çıkar
                    if (decodedText.includes('/product/')) {
                        const code = decodedText.split('/product/')[1];
                        router.push(`/product/${code}`);
                    } else {
                        // Direkt product code ise
                        router.push(`/product/${decodedText}`);
                    }
                },
                (errorMessage) => {
                    // Hata mesajlarını gösterme (sürekli scan ederken normal)
                }
            );

            setIsScanning(true);
        } catch (err) {
            setError('Kamera erişimi reddedildi veya kullanılamıyor. Lütfen tarayıcı ayarlarınızı kontrol edin.');
            console.error('QR Scanner error:', err);
        }
    };

    const stopScanning = async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
                scannerRef.current.clear();
            } catch (err) {
                console.error('Error stopping scanner:', err);
            }
        }
        setIsScanning(false);
    };

    useEffect(() => {
        return () => {
            stopScanning();
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
            <div className="max-w-2xl mx-auto pt-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        QR Kod Okuyucu
                    </h1>
                    <p className="text-gray-600">
                        Ürün QR kodunu kameraya tutun
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
                    <div
                        id="qr-reader"
                        className={`w-full ${isScanning ? 'block' : 'hidden'} rounded-lg overflow-hidden`}
                    />

                    {!isScanning && (
                        <div className="text-center space-y-4 py-12">
                            <div className="w-32 h-32 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-16 h-16 text-primary-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-600">
                                Kamerayı başlatmak için butona tıklayın
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-800 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        {!isScanning ? (
                            <button
                                onClick={startScanning}
                                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                            >
                                Kamerayı Başlat
                            </button>
                        ) : (
                            <button
                                onClick={stopScanning}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                            >
                                Durdur
                            </button>
                        )}
                    </div>
                </div>

                <div className="text-center">
                    <a
                        href="/"
                        className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                        ← Ana Sayfaya Dön
                    </a>
                </div>
            </div>
        </div>
    );
}
