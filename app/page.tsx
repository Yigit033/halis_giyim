import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                        Halis Giyim
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600">
                        QR Kod ile Ürün Bilgisi Sorgulama
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 space-y-6">
                    <div className="w-24 h-24 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-primary-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                            />
                        </svg>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Ürün Bilgilerini Öğrenin
                        </h2>
                        <p className="text-gray-600">
                            Ürün üzerindeki QR kodu okutarak anlık fiyat ve detaylı bilgilere ulaşın
                        </p>
                    </div>

                    <Link href="/scan">
                        <Button size="lg" className="w-full md:w-auto px-12">
                            QR Kod Okut
                        </Button>
                    </Link>
                </div>

                <div className="text-sm text-gray-500">
                    <Link href="/admin/login" className="hover:text-primary-600 transition-colors">
                        Admin Girişi
                    </Link>
                </div>
            </div>
        </div>
    );
}
