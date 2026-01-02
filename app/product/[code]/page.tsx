import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/types/database';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
    params: {
        code: string;
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_code', params.code)
        .single();

    if (error || !data) {
        notFound();
    }

    const product = data as Product;

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
            <div className="max-w-3xl mx-auto pt-8 space-y-6">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-8 text-white text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Ürün Bilgileri
                        </h1>
                        <p className="text-primary-100">
                            Güncel fiyat ve detaylar
                        </p>
                    </div>

                    {/* Product Info */}
                    <div className="p-8 md:p-12 space-y-8">
                        {/* Product Name */}
                        <div className="text-center space-y-2">
                            <p className="text-sm text-gray-500 uppercase tracking-wide">
                                Ürün Adı
                            </p>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                                {product.name}
                            </h2>
                        </div>

                        {/* Price */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 text-center border-2 border-green-200">
                            <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">
                                Fiyat
                            </p>
                            <p className="text-6xl md:text-7xl font-bold text-green-600">
                                ₺{product.price.toFixed(2)}
                            </p>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Ürün Açıklaması
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Product Code */}
                        <div className="pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500 text-center">
                                Ürün Kodu: <span className="font-mono font-semibold">{product.product_code}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                    <a
                        href="/scan"
                        className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                        Başka Ürün Tara
                    </a>
                    <a
                        href="/"
                        className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg border border-gray-300"
                    >
                        Ana Sayfa
                    </a>
                </div>
            </div>
        </div>
    );
}

export async function generateMetadata({ params }: ProductPageProps) {
    const supabase = createClient();
    const { data } = await supabase
        .from('products')
        .select('name')
        .eq('product_code', params.code)
        .single();

    const product = data as { name: string } | null;

    return {
        title: product ? `${product.name} - Halis Giyim` : 'Ürün Bulunamadı',
    };
}
