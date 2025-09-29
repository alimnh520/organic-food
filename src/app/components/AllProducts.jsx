'use client'
import React, { useState, useEffect, useContext } from 'react';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { UserContext } from '@/app/Provider';
import { useRouter } from 'next/navigation';

export default function AllProducts() {
    const { products } = useContext(UserContext);
    const [whitelist, setWhitelist] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('whitelist')) || [];
        setWhitelist(saved);
    }, []);

    const toggleWhitelist = (product) => {
        let updated = [];
        if (whitelist.some((p) => p._id === product._id)) {
            updated = whitelist.filter((p) => p._id !== product._id);
        } else {
            updated = [...whitelist, product];
        }
        setWhitelist(updated);
        localStorage.setItem('whitelist', JSON.stringify(updated));
    };

    const isWhitelisted = (id) => whitelist.some((p) => p._id === id);

    if (!products || products.length === 0) {
        return <p className="text-center py-12 text-gray-500">❌ কোনো পণ্য পাওয়া যায়নি</p>;
    }

    const handleProductClick = async (e, productId, href) => {
        e.preventDefault();
        try {
            await fetch('/api/visit', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: productId })
            });
        } catch (err) {
            console.error("Visit API error:", err);
        } finally {
            router.push(href);
        }
    };

    return (
        <div className="py-4 px-3 sm:px-0 flex flex-col gap-y-5">

            <div className="flex items-center justify-between">
                <h1 className="sm:text-3xl text-xl font-bold text-green-600 mb-5 w-full pb-2 border-b border-b-green-600">
                    সকল পণ্য
                </h1>
                <Link href='/components/products' className="w-32 px-2 py-2 bg-green-600 rounded-md text-white -mt-6 sm:-mt-4">আরো দেখুন</Link>
            </div>

            {/* grid ঠিক করা */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                <AnimatePresence>
                    {products.slice().reverse().map((product) => {
                        const discountedPrice = product.discount && product.discount > 0
                            ? Math.round(product.price - (product.price * product.discount) / 100)
                            : null;

                        return (
                            <motion.div
                                key={product._id}
                                layout
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer"
                            >
                                {/* Product Image */}
                                <div className="relative overflow-hidden h-36 sm:h-48 flex justify-center items-center">
                                    <div className="absolute top-2 right-2 z-20 bg-white/90 dark:bg-black/70 px-2 py-1 rounded-full flex items-center gap-1 text-[10px] sm:text-xs shadow">
                                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-200" />
                                        <span className="text-gray-700 dark:text-gray-100">{product.viewCount ?? 0}</span>
                                    </div>
                                    <Link href={`/components/products/${product._id}`} onClick={(e) => handleProductClick(e, product._id, `/components/products/${product._id}`)}>
                                        <img
                                            src={product.product_image}
                                            alt={product.product_name}
                                            className="h-36 sm:h-48 transition-transform duration-500 transform hover:scale-110"
                                        />
                                    </Link>
                                </div>

                                {/* Product Details */}
                                <div className="p-2 space-y-1">
                                    <h2 className="text-sm sm:text-base truncate font-semibold text-gray-800 dark:text-gray-100">
                                        {product.product_name}
                                    </h2>

                                    {/* দাম + ডিসকাউন্ট */}
                                    {discountedPrice ? (
                                        <div className='flex items-center gap-x-2 sm:gap-x-3'>
                                            <div className="flex items-center gap-x-1 sm:gap-x-2">
                                                <p className="text-green-600 text-sm sm:text-base font-bold">৳ {discountedPrice}</p>
                                                <p className="text-gray-500 line-through text-xs sm:text-sm">৳ {product.price}</p>
                                            </div>
                                            <p className="text-red-500 text-xs sm:text-sm">ছাড়: {product.discount}%</p>
                                        </div>
                                    ) : (
                                        <p className="text-green-600 font-bold text-sm sm:text-base">৳ {product.price}</p>
                                    )}

                                    <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm">
                                        <p className="text-gray-500 dark:text-gray-400">স্টক: {product.stock}</p>
                                        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1 truncate">
                                            <span className="w-0.5 h-4 bg-gray-200 hidden sm:inline-block"></span>
                                            বিক্রিত হয়েছে: {product?.soldCount}
                                        </p>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-between mt-2 gap-2">
                                        <button
                                            onClick={() => toggleWhitelist(product)}
                                            className={`flex truncate items-center sm:w-auto w-16 gap-1 px-2 py-1 text-xs sm:text-sm rounded transition ${isWhitelisted(product._id)
                                                ? 'bg-red-500 text-white'
                                                : 'bg-red-100 hover:bg-red-200 text-red-500'
                                                }`}
                                        >
                                            <Heart
                                                className={`w-3 hidden sm:inline h-3 sm:w-4 sm:h-4 ${isWhitelisted(product._id) ? 'text-white' : 'text-red-500'}`}
                                            />
                                            Add to cart
                                        </button>

                                        <Link href={`/components/products/order/${product._id}`} className="flex-1">
                                            <button className="w-full flex items-center justify-center gap-1 px-2 py-1 text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white rounded">
                                                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" /> অর্ডার
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
