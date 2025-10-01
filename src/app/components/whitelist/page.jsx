'use client'

import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WhiteList() {
    const [wishlist, setWishlist] = useState([]);
    const [orders, setOrders] = useState([]);

    // localStorage থেকে ডেটা লোড
    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('whitelist')) || [];
        const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];

        setWishlist(savedWishlist);
        setOrders(savedOrders);
    }, []);

    // ✅ হোয়াইটলিস্ট থেকে রিমুভ
    const removeFromWhitelist = (productId) => {
        const updated = wishlist.filter(p => p._id !== productId && p.id !== productId);
        localStorage.setItem('whitelist', JSON.stringify(updated));
        setWishlist(updated);
    };

    // ✅ অর্ডার লিস্ট খালি হলে মেসেজ
    if (wishlist.length === 0 && orders.length === 0) {
        return (
            <div className="text-center py-24">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                    কোনো পণ্য হোয়াইটলিস্ট বা অর্ডারে নেই 😢
                </h2>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-10 space-y-12">
            {/* ✅ হোয়াইটলিস্ট */}
            <div>
                <h1 className="sm:text-3xl text-xl font-bold text-green-600 mb-5 text-center">আমার হোয়াইটলিস্ট</h1>
                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {wishlist.slice().reverse().map((product) => (
                            <motion.div
                                key={product._id || product.id}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer"
                            >
                                <Link href={`/components/products/${product._id || product.id}`}>
                                    <img
                                        src={product.product_image || product.img}
                                        alt={product.product_name || product.name}
                                        className="h-36 sm:h-48 transition-transform duration-500 transform hover:scale-110"
                                    />
                                </Link>
                                <div className="p-4 space-y-2">
                                    <h2 className="text-lg truncate font-semibold text-gray-800 dark:text-gray-100">
                                        {product.product_name || product.name}
                                    </h2>
                                    <p className="text-green-600 font-bold">৳ {product.price}</p>
                                    <p className="text-gray-500 dark:text-gray-400">স্টক: {product.stock}</p>
                                    <div className="flex justify-between mt-2">
                                        <button
                                            onClick={() => removeFromWhitelist(product._id || product.id)}
                                            className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                                        >
                                            <Heart className="w-4 h-4 text-white" /> রিমুভ
                                        </button>

                                        <Link href={`/components/products/order/${product._id || product.id}`}>
                                            <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">
                                                <ShoppingCart className="w-4 h-4" /> অর্ডার
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">হোয়াইটলিস্ট খালি 😢</p>
                )}
            </div>

            {/* ✅ অর্ডার লিস্ট */}
            <div>
                <h1 className="sm:text-3xl text-xl font-bold text-blue-600 mb-5 text-center"> আমার অর্ডারসমূহ</h1>
                {orders.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {orders.slice().reverse().map((order, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white dark:bg-gray-800 break-words rounded-lg shadow-md overflow-hidden relative transition"
                            >
                                <img
                                    src={order.productImage}
                                    alt={order.productName}
                                    className="h-48"
                                />
                                <div className="p-4 space-y-2">
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                        {order.productName}
                                    </h2>
                                    <p className="text-green-600 font-bold">৳ {order.totalPrice} ({order.quantity} pcs)</p>
                                    <p className="text-gray-500 text-sm">👤 {order.name}</p>
                                    <p className="text-gray-400 text-xs">📅 {new Date(order.date).toLocaleDateString()}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">কোনো অর্ডার দেওয়া হয়নি 😢</p>
                )}
            </div>
        </div>
    );
}
