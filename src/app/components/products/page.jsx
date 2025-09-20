'use client'
import React, { useState, useEffect, useContext } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/Provider';

export default function Page() {
    const { products } = useContext(UserContext);
    const [whitelist, setWhitelist] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const router = useRouter();

    const categories = [
        { label: "সব", value: "all" },
        { label: "অর্গানিক খাবার", value: "organic_food" },
        { label: "গেজেট", value: "gazette" },
        { label: "মেডিকেল সরঞ্জাম", value: "medical_equipments" },
        { label: "ফ্যাশন", value: "fashion" },
        { label: "ইলেকট্রনিক্স", value: "electronics" },
        { label: "সোর্সিং সার্ভিস", value: "sourcing_service" },
        { label: "সাজসজ্জা", value: "decorate" },
        { label: "অন্যান্য", value: "others" },
    ];

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

    // filtered products
    const filteredProducts = (products || []).filter(p => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (searchTerm.trim() !== "" && !p.product_name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    // handle product click: increment viewCount then navigate
    const handleProductClick = async (e, productId, href) => {
        e.preventDefault();
        try {
            // optimistic UI: you can update local state if you keep products in local state.
            await fetch('/api/products/visit', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: productId })
            });
        } catch (err) {
            console.error("Visit API error:", err);
            // ignore error — still navigate
        } finally {
            router.push(href);
        }
    };

    return (
        <div className="py-6 px-5 sm:px-8 mx-auto flex flex-col sm:w-10/12 w-full bg-white dark:bg-gray-900 gap-y-6">
            <h1 className="text-3xl font-bold text-green-600 mb-2 w-full pb-2 border-b border-b-green-600">সকল পণ্য</h1>

            {/* search + categories */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2 w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="পণ্যের নাম লিখুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <div className="overflow-x-auto w-full md:w-1/2">
                    <div className="flex gap-3 items-center">
                        {categories.map((cat) => {
                            const active = selectedCategory === cat.value;
                            return (
                                <button
                                    key={cat.value}
                                    onClick={() => setSelectedCategory(cat.value)}
                                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition
                                        ${active
                                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-sm'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-9">
                <AnimatePresence>
                    {filteredProducts.slice().reverse().map((product) => (
                        <motion.div
                            key={product._id}
                            layout
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            whileHover={{ scale: 1.03 }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative"
                        >
                            <div className="relative overflow-hidden h-48">
                                {/* eye badge */}
                                <div className="absolute top-2 left-2 z-20 bg-white/90 dark:bg-black/70 px-2 py-1 rounded-full flex items-center gap-2 text-xs shadow">
                                    <Eye className="w-4 h-4 text-gray-600 dark:text-gray-200" />
                                    <span className="text-gray-700 dark:text-gray-100">{product.viewCount ?? 0}</span>
                                </div>

                                {/* clickable image — intercept click to call visit API then navigate */}
                                <a
                                    href={`/components/products/${product._id}`}
                                    onClick={(e) => handleProductClick(e, product._id, `/components/products/${product._id}`)}
                                    className="block w-full h-full"
                                >
                                    <img
                                        src={product.product_image}
                                        alt={product.product_name}
                                        className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
                                    />
                                </a>
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
                                        <Heart className={`w-4 h-4 ${isWhitelisted(product._id) ? 'text-white' : 'text-red-500'}`} />
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
