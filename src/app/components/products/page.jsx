'use client'
import React, { useState, useEffect, useContext } from 'react';
import { Heart, ShoppingCart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { UserContext } from '@/app/Provider';

export default function Page() {
    const { products } = useContext(UserContext);
    const [whitelist, setWhitelist] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

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

    // সার্চ ফাংশন
    useEffect(() => {
        if (!products) return; // context থেকে data না আসলে exit
        if (searchTerm === "") {
            setFilteredProducts(products);
        } else {
            const results = products.filter(p =>
                p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(results);
        }
    }, [searchTerm, products]);


    return (
        <div className="py-6 px-5 sm:px- mx-auto flex flex-col sm:w-10/12 w-full bg-white sm:px-4 sm:pt-4 gap-y-5">
            <h1 className="text-3xl font-bold text-green-600 mb-6 w-full pb-2 border-b border-b-green-600">সকল পণ্য</h1>

            {/* সার্চ */}
            <div className="flex items-center gap-2 mb-6">
                <input
                    type="text"
                    placeholder="পণ্যের নাম লিখুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={() => { }}
                    className="flex items-center gap-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                >
                    <Search className="w-4 h-4" /> সার্চ
                </button>
            </div>

            {/* পণ্য গ্রিড */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-9">
                <AnimatePresence>
                    {filteredProducts.slice().reverse().map((product) => (
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
        </div>
    );
}
