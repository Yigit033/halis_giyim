import { getProducts } from './actions';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Ürün Yönetimi</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg text-center text-sm sm:text-base"
                >
                    + Yeni Ürün Ekle
                </Link>
            </div>

            {products.length > 0 ? (
                <>
                    {/* Mobile Card View */}
                    <div className="sm:hidden space-y-3">
                        {products.map((product) => (
                            <Card key={product.id}>
                                <div className="p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1 flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 truncate">
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-gray-500 font-mono">
                                                {product.product_code}
                                            </p>
                                        </div>
                                        <p className="text-lg font-bold text-green-600 ml-3">
                                            ₺{product.price.toFixed(2)}
                                        </p>
                                    </div>
                                    {product.description && (
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {product.description}
                                        </p>
                                    )}
                                    <div className="flex gap-2 pt-2">
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium text-center transition-all"
                                        >
                                            Düzenle
                                        </Link>
                                        <a
                                            href={`/product/${product.product_code}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium text-center transition-all"
                                        >
                                            Görüntüle
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Desktop Table View */}
                    <Card className="hidden sm:block">
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
                </>
            ) : (
                <Card>
                    <div className="text-center py-8 sm:py-12 space-y-4">
                        <div className="text-4xl">📦</div>
                        <p className="text-gray-600 text-base sm:text-lg">Henüz ürün eklenmemiş</p>
                        <Link
                            href="/admin/products/new"
                            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base"
                        >
                            İlk Ürünü Ekle
                        </Link>
                    </div>
                </Card>
            )}
        </div>
    );
}
