import { getProducts } from './actions';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Ürün Yönetimi</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                >
                    + Yeni Ürün Ekle
                </Link>
            </div>

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
                                        Açıklama
                                    </th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="border-b border-gray-100 hover:bg-gray-50"
                                    >
                                        <td className="py-3 px-4 font-mono text-sm">
                                            {product.product_code}
                                        </td>
                                        <td className="py-3 px-4 font-medium">{product.name}</td>
                                        <td className="py-3 px-4 text-green-600 font-semibold">
                                            ₺{product.price.toFixed(2)}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 text-sm max-w-xs truncate">
                                            {product.description || '-'}
                                        </td>
                                        <td className="py-3 px-4 text-right space-x-2">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                            >
                                                Düzenle
                                            </Link>
                                            <a
                                                href={`/product/${product.product_code}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                            >
                                                Görüntüle
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            ) : (
                <Card>
                    <div className="text-center py-12 space-y-4">
                        <p className="text-gray-600 text-lg">Henüz ürün eklenmemiş</p>
                        <Link
                            href="/admin/products/new"
                            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                        >
                            İlk Ürünü Ekle
                        </Link>
                    </div>
                </Card>
            )}
        </div>
    );
}
