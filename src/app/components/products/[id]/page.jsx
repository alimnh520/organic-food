'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { UserContext } from '@/app/Provider';

export default function ProductDetails() {
    const { id } = useParams();
    const { products } = useContext(UserContext); // Context থেকে products
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (products && products.length > 0) {
            const found = products.find(p => p._id === id);
            setProduct(found);
        }
    }, [id, products]);

    if (!product) {
        return <p className="text-center text-red-500 py-12">❌ কোনো পণ্য পাওয়া যায়নি</p>;
    }

    return (
        <motion.div
            className="max-w-4xl mx-auto py-12 px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="w-full h-80 object-cover"
                />
                <div className="p-6 space-y-4">
                    <h1 className="text-3xl font-bold text-green-600">{product.product_name}</h1>
                    {product.details && (
                        <p className="text-gray-700 dark:text-gray-300">{product.details}</p>
                    )}
                    <p className="text-xl font-semibold text-blue-600">💰 ৳ {product.price}</p>
                    <p className="text-gray-500">স্টক: {product.stock}</p>

                    <Link href={`/components/products/order/${product._id}`}>
                        <button className="mt-4 px-6 py-2 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                            <ShoppingCart className="w-4 h-4" /> এখনই অর্ডার করুন
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
