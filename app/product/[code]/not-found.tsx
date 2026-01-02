export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="space-y-4">
                    <h1 className="text-6xl font-bold text-gray-900">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700">
                        Ürün Bulunamadı
                    </h2>
                    <p className="text-gray-600">
                        Aradığınız ürün sistemde kayıtlı değil. Lütfen QR kodu kontrol edin veya yöneticinizle iletişime geçin.
                    </p>
                </div>

                <div className="flex gap-3 justify-center">
                    <a
                        href="/scan"
                        className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                        Tekrar Tara
                    </a>
                    <a
                        href="/"
                        className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg border border-gray-300"
                    >
                        Ana Sayfa
                    </a>
                </div>
            </div>
        </div>
    );
}
