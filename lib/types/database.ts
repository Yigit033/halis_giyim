// Database Types
export interface Product {
    id: string;
    product_code: string;
    name: string;
    price: number;
    description: string | null;
    image_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface ProductInsert {
    product_code: string;
    name: string;
    price: number;
    description?: string | null;
    image_url?: string | null;
}

export interface ProductUpdate {
    product_code?: string;
    name?: string;
    price?: number;
    description?: string | null;
    image_url?: string | null;
}

export type Database = {
    public: {
        Tables: {
            products: {
                Row: Product;
                Insert: ProductInsert;
                Update: ProductUpdate;
            };
        };
    };
};
