'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '../actions';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        product_code: '',
        name: '',
        price: '',
        description: '',
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

            const result = await createProduct({
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
            setError('Ürün eklenirken bir hata oluştu');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
                <p className="text-gray-600 mt-2">
                    Ürün bilgilerini girin ve QR kod oluşturun
                </p>
            </div>

            <Card>
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
                            {loading ? 'Ekleniyor...' : 'Ürün Ekle'}
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
            </Card>
        </div>
    );
}
