'use client';
import React, { useState, useEffect, useContext } from 'react';
import { Eye, Heart, ShoppingCart, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { UserContext } from '@/app/Provider';
import { useParams, useRouter } from 'next/navigation';

export default function AllProducts() {
    const { id } = useParams();
    const { products } = useContext(UserContext);
    const [whitelist, setWhitelist] = useState([]);
    const router = useRouter();

    // Load Wishlist
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('whitelist')) || [];
        setWhitelist(saved);
    }, []);

    // Toggle Wishlist
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
        return (
            <p className="text-center py-12 text-gray-500">
                ❌ No products found
            </p>
        );
    }

    const categories = [
        { label: "99 TK Shop", value: "others" },
        { label: "Fashion", value: "fashion" },
        { label: "Electronic", value: "electronics" },
        { label: "Gadgets", value: "gazette" },
        { label: "Watch", value: "sourcing_service" },
        { label: "Home Decoration", value: "decorate" },
        { label: "Organic Food", value: "organic_food" },
        { label: "Health & Beauty", value: "home_and_healthy" },
        { label: "Mother & Baby Care", value: "mother_and_baby" },
        { label: "Medical Item", value: "medical_equipments" },
        { label: "Lifestyle", value: "life_style" },
    ];

    const handleProductClick = async (e, productId, href) => {
        e.preventDefault();
        try {
            await fetch('/api/visit', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: productId }),
            });
        } catch (err) {
            console.error('Visit API error:', err);
        } finally {
            router.push(href);
        }
    };

    return (
        <div className="py-6 px-4 sm:w-[1280px] mx-auto flex flex-col w-full bg-white dark:bg-gray-900 gap-y-6">
            <h1 className="sm:text-3xl text-xl font-bold text-blue-600 mb-2 w-full pb-2 border-b border-b-blue-600">
                {categories.filter(cat => cat.value === id).map(elem => elem.label)}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-2">
                <AnimatePresence>
                    {products
                        .filter((p) => p.category === id)
                        .slice()
                        .reverse()
                        .map((product) => {
                            const discountedPrice =
                                product.discount && product.discount > 0
                                    ? Math.round(product.price - (product.price * product.discount) / 100)
                                    : null;

                            const isOutOfStock = product.stock <= 0;

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
                                    <div className="relative overflow-hidden h-32 sm:h-44 flex justify-center items-center p-2">
                                        {/* 👁 View count */}
                                        <div className="absolute top-2 right-2 z-20 bg-white/90 dark:bg-black/70 px-2 py-1 rounded-full flex items-center gap-1 text-[10px] sm:text-xs shadow">
                                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-200" />
                                            <span className="text-gray-700 dark:text-gray-100">
                                                {product.viewCount ?? 0}
                                            </span>
                                        </div>

                                        {/* 🏷 Discount Tag */}
                                        {product.discount > 0 && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md z-10">
                                                -{product.discount}%
                                            </div>
                                        )}

                                        {/* Sold Out Overlay */}

                                        {product.stock === 0 && (
                                            <div className="absolute left-5 bottom-5 z-20 flex items-center justify-center">
                                                <img src="/logo/sold.png" alt="" className='w-20 h-20 sm:w-28 sm:h-28 rotate-45  rounded-full object-center' />
                                            </div>
                                        )}

                                        <Link
                                            href={`/components/products/${product._id}`}
                                            onClick={(e) =>
                                                handleProductClick(
                                                    e,
                                                    product._id,
                                                    `/components/products/${product._id}`
                                                )
                                            }
                                        >
                                            <img
                                                src={product.product_image}
                                                alt={product.product_name}
                                                className={`h-32 sm:h-44 w-full object-cover transition-transform duration-500 transform hover:scale-110 ${product.stock === 0 ? 'opacity-60' : ''
                                                    }`}
                                            />
                                        </Link>
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-2 space-y-1">
                                        <h2 className="text-sm sm:text-base truncate font-semibold text-gray-800 dark:text-gray-100">
                                            {product.product_name}
                                        </h2>

                                        {/* 💰 Price & Discount */}
                                        {discountedPrice ? (
                                            <div className="flex items-center gap-x-2 sm:gap-x-3">
                                                <div className="flex items-center gap-x-1 sm:gap-x-2">
                                                    <p className="text-green-600 text-sm sm:text-base font-bold">
                                                        ৳ {discountedPrice}
                                                    </p>
                                                    <p className="text-gray-500 line-through text-xs sm:text-sm">
                                                        ৳ {product.price}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-green-600 font-bold text-sm sm:text-base">
                                                ৳ {product.price}
                                            </p>
                                        )}

                                        {/* 📦 Stock & Sold */}
                                        <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm">
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Stock: {product.stock}
                                            </p>
                                            <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1 truncate">
                                                <span className="w-0.5 h-4 bg-gray-200"></span>
                                                Sold: {product?.soldCount}
                                            </p>
                                        </div>

                                        {/* ❤️ Whitelist & 🛒 Order Buttons */}
                                        <div className="flex justify-between mt-2 gap-2">
                                            <button
                                                onClick={() => toggleWhitelist(product)}
                                                className={`flex truncate items-center justify-center sm:w-auto w-16 gap-1 px-2 py-1 sm:py-2 text-xs sm:text-sm rounded transition ${isWhitelisted(product._id)
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-red-100 hover:bg-red-200 text-red-500'
                                                    }`}
                                            >
                                                <Heart
                                                    className={`w-3 h-3 sm:w-4 mb-0.5 sm:h-4 ${isWhitelisted(product._id)
                                                        ? 'text-white'
                                                        : 'text-red-500'
                                                        }`}
                                                />
                                                Cart
                                            </button>

                                            <Link
                                                href={`/components/products/order/${product._id}`}
                                                className="flex-1"
                                            >
                                                <button
                                                    disabled={product.stock === 0}
                                                    className={`w-full flex items-center justify-center gap-1 px-2 py-1 sm:py-2 text-xs sm:text-sm rounded transition ${product.stock === 0
                                                        ? 'bg-gray-400 cursor-not-allowed text-white'
                                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                                        }`}
                                                >
                                                    <ShoppingCart className="w-3 h-3 sm:w-4 mb-0.5 sm:h-4" />{' '}
                                                    {product.stock === 0 ? 'Out' : 'Order Now'}
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
