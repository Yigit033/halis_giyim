'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateProduct, deleteProduct } from '../../actions';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import QRCodeDisplay from '@/components/admin/QRCodeDisplay';
import type { Product } from '@/lib/types/database';

interface EditProductFormProps {
    product: Product;
}

export default function EditProductForm({ product }: EditProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [formData, setFormData] = useState({
        product_code: product.product_code,
        name: product.name,
        price: product.price.toString(),
        description: product.description || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const price = parseFloat(formData.price);
            if (isNaN(price) || price < 0) {
                setError('Geçerli bir fiyat girin');
                setLoading(false);
                return;
            }

            const result = await updateProduct(product.id, {
                product_code: formData.product_code.trim(),
                name: formData.name.trim(),
                price,
                description: formData.description.trim() || null,
            });

            if (result.error) {
                setError(result.error);
                setLoading(false);
                return;
            }

            router.push('/admin/products');
            router.refresh();
        } catch (err) {
            setError('Ürün güncellenirken bir hata oluştu');
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        const result = await deleteProduct(product.id);

        if (result.error) {
            setError(result.error);
            setLoading(false);
            return;
        }

        router.push('/admin/products');
        router.refresh();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Ürün Düzenle</h1>
                <p className="text-gray-600 mt-2">
                    Ürün bilgilerini güncelleyin veya QR kodu yazdırın
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form */}
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Ürün Bilgileri</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Ürün Kodu *"
                            placeholder="PROD001"
                            value={formData.product_code}
                            onChange={(e) =>
                                setFormData({ ...formData, product_code: e.target.value })
                            }
                            required
                        />

                        <Input
                            label="Ürün Adı *"
                            placeholder="Beyaz Gömlek"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            required
                        />

                        <Input
                            label="Fiyat (₺) *"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="299.90"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({ ...formData, price: e.target.value })
                            }
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Açıklama
                            </label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                rows={4}
                                placeholder="Ürün açıklaması (opsiyonel)"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-red-800 text-sm">{error}</p>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" disabled={loading} className="flex-1">
                                {loading ? 'Güncelleniyor...' : 'Güncelle'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="flex-1"
                            >
                                İptal
                            </Button>
                        </div>
                    </form>

                    {/* Delete Section */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-red-600 mb-2">
                            Tehlikeli Bölge
                        </h3>
                        {!showDeleteConfirm ? (
                            <Button
                                variant="danger"
                                onClick={() => setShowDeleteConfirm(true)}
                                className="w-full"
                            >
                                Ürünü Sil
                            </Button>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-sm text-gray-700">
                                    Bu ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                                </p>
                                <div className="flex gap-3">
                                    <Button
                                        variant="danger"
                                        onClick={handleDelete}
                                        disabled={loading}
                                        className="flex-1"
                                    >
                                        Evet, Sil
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="flex-1"
                                    >
                                        İptal
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* QR Code */}
                <Card>
                    <h2 className="text-xl font-semibold mb-4">QR Kod</h2>
                    <QRCodeDisplay
                        productCode={product.product_code}
                        productName={product.name}
                    />
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>Not:</strong> QR kodu yazdırdıktan sonra fiyat değişikliklerinde
                            yeni QR kod yazdırmanıza gerek yoktur. QR kod her zaman güncel fiyatı gösterir.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
