'use client'
import React, { useState, useEffect, useContext } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { UserContext } from '@/app/Provider';

export default function NewProducts() {
    const { products } = useContext(UserContext); // Context থেকে products
    const [showAll, setShowAll] = useState(false);
    const [whitelist, setWhitelist] = useState([]);

    const visibleProducts = showAll
        ? products.slice(0, 10) // প্রথম 10 টি ডেটা
        : products.slice(0, 4); // প্রথম 4 টি ডেটা

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

    return (
        <div className="sm:py-12 px-5">
            <h1 className="text-3xl font-bold text-green-600 mb-8 w-full pb-2 border-b border-b-green-600">নতুন পণ্য</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-9">
                <AnimatePresence>
                    {visibleProducts.slice().reverse().map((product) => (
                        <motion.div
                            key={product._id}
                            layout
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer"
                        >
                            <div className="relative overflow-hidden h-48">
                                <Link href={`/components/products/${product._id}`}>
                                    <img
                                        src={product.product_image}
                                        alt={product.product_name}
                                        className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
                                    />
                                </Link>
                            </div>
                            <div className="p-4 space-y-2">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{product.product_name}</h2>
                                <p className="text-green-600 font-bold">৳ {product.price}</p>
                                <p className="text-gray-500 dark:text-gray-400">স্টক: {product.stock}</p>
                                <div className="flex justify-between mt-2">
                                    <button
                                        onClick={() => toggleWhitelist(product)}
                                        className={`flex items-center gap-1 px-3 py-1 rounded transition ${isWhitelisted(product._id)
                                            ? 'bg-red-500 text-white'
                                            : 'bg-red-100 hover:bg-red-200 text-red-500'
                                            }`}
                                    >
                                        <Heart
                                            className={`w-4 h-4 ${isWhitelisted(product._id) ? 'text-white' : 'text-red-500'}`}
                                        />
                                        হোয়াটলিস্ট
                                    </button>

                                    <Link href={`/components/products/order/${product._id}`}>
                                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">
                                            <ShoppingCart className="w-4 h-4" /> অর্ডার
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="text-center mt-8">
                {!showAll ? (
                    <motion.button
                        onClick={() => setShowAll(true)}
                        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ➕ আরো দেখুন
                    </motion.button>
                ) : (
                    <motion.button
                        onClick={() => setShowAll(false)}
                        className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🔽 লুকান
                    </motion.button>
                )}
            </div>
        </div>
    );
}
