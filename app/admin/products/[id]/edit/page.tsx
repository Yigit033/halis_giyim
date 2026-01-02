import { getProductById } from '../../actions';
import EditProductForm from './EditProductForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface EditProductPageProps {
    params: {
        id: string;
    };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    try {
        const product = await getProductById(params.id);
        return <EditProductForm product={product} />;
    } catch (error) {
        notFound();
    }
}
