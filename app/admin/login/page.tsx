'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError('Giriş başarısız. Email veya şifre hatalı.');
                return;
            }

            if (data.session) {
                router.push('/admin/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 animate-fade-in">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-gray-900">Admin Girişi</h1>
                    <p className="text-gray-600">Ürün yönetimi için giriş yapın</p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />

                        <Input
                            type="password"
                            label="Şifre"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-red-800 text-sm">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                        </Button>
                    </form>
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
