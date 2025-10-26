'use client'

import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WhiteList() {
    const [wishlist, setWishlist] = useState([]);
    const [orders, setOrders] = useState([]);

    // Load from localStorage
    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('whitelist')) || [];
        const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];

        setWishlist(savedWishlist);
        setOrders(savedOrders);
    }, []);

    // Remove from wishlist
    const removeFromWhitelist = (productId) => {
        const updated = wishlist.filter(p => p._id !== productId && p.id !== productId);
        localStorage.setItem('whitelist', JSON.stringify(updated));
        setWishlist(updated);
    };

    if (wishlist.length === 0 && orders.length === 0) {
        return (
            <div className="text-center py-24 px-5">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                    No items in wishlist or orders 😢
                </h2>
            </div>
        );
    }

    return (
        <div className=" sm:w-[1280px] mx-auto px-4 py-10 space-y-12">
            {/* ✅ Wishlist Section */}
            <div>
                <h1 className="sm:text-3xl text-xl font-bold text-green-600 mb-5 text-center">
                    My Wishlist
                </h1>

                {wishlist.length > 0 ? (
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {wishlist.slice().reverse().map((product) => {
                            const discountPrice =
                                product.discount && product.discount > 0
                                    ? Math.round(product.price - (product.price * product.discount) / 100)
                                    : null;

                            const isSoldOut = product.stock === 0;

                            return (
                                <motion.div
                                    key={product._id || product.id}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer"
                                >
                                    <div className="relative overflow-hidden">
                                        {/* 🔖 Discount Tag */}
                                        {product.discount > 0 && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-20 shadow">
                                                -{product.discount}%
                                            </div>
                                        )}

                                        {/* 🚫 Sold Out Overlay */}
                                        {isSoldOut && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
                                                <span className="text-white text-lg font-bold">SOLD OUT</span>
                                            </div>
                                        )}

                                        <Link href={`/components/products/${product._id || product.id}`}>
                                            <img
                                                src={product.product_image || product.img}
                                                alt={product.product_name || product.name}
                                                className={`h-36 sm:h-48 w-full object-cover transition-transform duration-500 ${!isSoldOut ? 'hover:scale-110' : 'opacity-60'
                                                    }`}
                                            />
                                        </Link>
                                    </div>

                                    <div className="p-4 space-y-2">
                                        <h2 className="text-base sm:text-lg truncate font-semibold text-gray-800 dark:text-gray-100">
                                            {product.product_name || product.name}
                                        </h2>

                                        {/* 💰 Price */}
                                        {discountPrice ? (
                                            <div className="flex items-center gap-2">
                                                <p className="text-green-600 font-bold">৳ {discountPrice}</p>
                                                <p className="text-gray-500 line-through text-sm">৳ {product.price}</p>
                                            </div>
                                        ) : (
                                            <p className="text-green-600 font-bold">৳ {product.price}</p>
                                        )}

                                        <p
                                            className={`text-sm ${isSoldOut
                                                    ? 'text-red-500 font-semibold'
                                                    : 'text-gray-500 dark:text-gray-400'
                                                }`}
                                        >
                                            Stock: {isSoldOut ? 'Out of Stock' : product.stock}
                                        </p>

                                        {/* ❤️ Remove + 🛒 Order Buttons */}
                                        <div className="flex justify-between mt-2 gap-2">
                                            <button
                                                onClick={() => removeFromWhitelist(product._id || product.id)}
                                                className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm rounded"
                                            >
                                                <Heart className="w-4 h-4" /> Remove
                                            </button>

                                            <Link
                                                href={`/components/products/order/${product._id || product.id}`}
                                                className={`flex-1 ${isSoldOut ? 'pointer-events-none opacity-50' : ''
                                                    }`}
                                            >
                                                <button className="w-full flex items-center justify-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm rounded">
                                                    <ShoppingCart className="w-4 h-4" /> Order
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Your wishlist is empty 😢</p>
                )}
            </div>

            {/* ✅ Orders Section */}
            <div>
                <h1 className="sm:text-3xl text-xl font-bold text-blue-600 mb-5 text-center">
                    My Orders
                </h1>

                {orders.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {orders.slice().reverse().map((order, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative"
                            >
                                <img
                                    src={order.productImage}
                                    alt={order.productName}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="p-4 space-y-2">
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                                        {order.productName}
                                    </h2>
                                    <p className="text-green-600 font-bold">
                                        ৳ {order.totalPrice} ({order.quantity} pcs)
                                    </p>
                                    <p className="text-gray-500 text-sm">👤 {order.name}</p>
                                    <p className="text-gray-400 text-xs">
                                        📅 {new Date(order.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No orders found 😢</p>
                )}
            </div>
        </div>
    );
}
