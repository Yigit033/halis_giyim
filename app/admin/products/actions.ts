'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Product, ProductInsert, ProductUpdate } from '@/lib/types/database';

export async function getProducts(): Promise<Product[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error('Ürünler yüklenirken hata oluştu');
    }

    return (data as Product[]) || [];
}

export async function getProductById(id: string): Promise<Product> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        throw new Error('Ürün bulunamadı');
    }

    return data as Product;
}

export async function createProduct(product: ProductInsert) {
    const supabase = createClient();

    // Check if product_code already exists
    const { data: existing } = await supabase
        .from('products')
        .select('id')
        .eq('product_code', product.product_code)
        .maybeSingle();

    if (existing) {
        return { error: 'Bu ürün kodu zaten kullanılıyor' };
    }

    const { data, error } = await supabase
        .from('products')
        // @ts-expect-error - Supabase type inference limitation
        .insert(product)
        .select()
        .single();

    if (error) {
        return { error: 'Ürün eklenirken hata oluştu' };
    }

    revalidatePath('/admin/products');
    revalidatePath('/admin/dashboard');
    return { data: data as Product };
}

export async function updateProduct(id: string, product: ProductUpdate) {
    const supabase = createClient();

    // If product_code is being updated, check if it's already in use
    if (product.product_code) {
        const { data: existing } = await supabase
            .from('products')
            .select('id')
            .eq('product_code', product.product_code)
            .neq('id', id)
            .maybeSingle();

        if (existing) {
            return { error: 'Bu ürün kodu zaten kullanılıyor' };
        }
    }

    const { data, error } = await supabase
        .from('products')
        // @ts-expect-error - Supabase type inference limitation
        .update(product)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return { error: 'Ürün güncellenirken hata oluştu' };
    }

    revalidatePath('/admin/products');
    revalidatePath('/admin/dashboard');
    revalidatePath(`/admin/products/${id}/edit`);
    return { data: data as Product };
}

export async function deleteProduct(id: string) {
    const supabase = createClient();

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        return { error: 'Ürün silinirken hata oluştu' };
    }

    revalidatePath('/admin/products');
    revalidatePath('/admin/dashboard');
    return { success: true };
}
