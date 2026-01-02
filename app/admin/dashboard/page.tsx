import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import type { Product } from '@/lib/types/database';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const supabase = createClient();

    // Get products count
    const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

    // Get recent products
    const { data: recentProducts } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    const products: Product[] = (recentProducts as Product[]) || [];

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg text-center text-sm sm:text-base"
                >
                    + Yeni Ürün Ekle
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
                <Card>
                    <div className="text-center space-y-1 sm:space-y-2 p-2 sm:p-4">
                        <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-wide">
                            Toplam Ürün
                        </p>
                        <p className="text-3xl sm:text-5xl font-bold text-primary-600">
                            {productsCount || 0}
                        </p>
                    </div>
                </Card>

                <Card>
                    <div className="text-center space-y-1 sm:space-y-2 p-2 sm:p-4">
                        <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-wide">
                            Sistem Durumu
                        </p>
                        <p className="text-xl sm:text-3xl font-bold text-green-600">✓ Aktif</p>
                    </div>
                </Card>

                <Card>
                    <div className="text-center space-y-1 sm:space-y-2 p-2 sm:p-4 col-span-2 sm:col-span-1">
                        <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-wide">
                            QR Okuyucu
                        </p>
                        <a
                            href="/scan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base"
                        >
                            Teste Git →
                        </a>
                    </div>
                </Card>
            </div>

            {/* Recent Products */}
            <div className="space-y-3 sm:space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Son Eklenen Ürünler</h2>

                {products.length > 0 ? (
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                            Ürün Kodu
                                        </th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                            Ürün Adı
                                        </th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                            Fiyat
                                        </th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                            Eklenme Tarihi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 font-mono text-sm">
                                                {product.product_code}
                                            </td>
                                            <td className="py-3 px-4 font-medium">
                                                {product.name}
                                            </td>
                                            <td className="py-3 px-4 text-green-600 font-semibold">
                                                ₺{product.price.toFixed(2)}
                                            </td>
                                            <td className="py-3 px-4 text-gray-600 text-sm">
                                                {new Date(product.created_at).toLocaleDateString('tr-TR')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                ) : (
                    <Card>
                        <p className="text-center text-gray-600 py-8">
                            Henüz ürün eklenmemiş. İlk ürününüzü ekleyin!
                        </p>
                    </Card>
                )}

                <div className="text-center">
                    <Link
                        href="/admin/products"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                        Tüm Ürünleri Görüntüle →
                    </Link>
                </div>
            </div>
        </div>
    );
}
