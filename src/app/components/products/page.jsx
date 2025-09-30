'use client'
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Heart, ShoppingCart, Search, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { UserContext } from '@/app/Provider';
import { useRouter } from 'next/navigation';

export default function Page() {
    const { products } = useContext(UserContext);
    const [whitelist, setWhitelist] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const router = useRouter()

    // বাংলা ক্যাটাগরি লিস্ট
    const categories = [
        { label: "সব", value: "all" },
        { label: "অর্গানিক খাবার", value: "organic_food" },
        { label: "গেজেট", value: "gazette" },
        { label: "মেডিকেল সরঞ্জাম", value: "medical_equipments" },
        { label: "ফ্যাশন", value: "fashion" },
        { label: "ইলেকট্রনিক্স", value: "electronics" },
        { label: "সাজসজ্জা", value: "decorate" },
        { label: "হেলথ্ এন্ড বিউটি", value: "home_and_healthy" },  // 🆕 নতুন
        { label: "মা ও শিশু", value: "mother_and_baby" },        // 🆕 নতুন
        { label: "লাইফস্টাইল", value: "life_style" },
        { label: "সোর্সিং সার্ভিস", value: "sourcing_service" },         // 🆕 নতুন
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

    // সার্চ + ক্যাটাগরি ফিল্টার
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        let result = products;

        if (selectedCategory !== "all") {
            result = result.filter((p) => p.category === selectedCategory);
        }

        if (searchTerm.trim() !== "") {
            result = result.filter((p) =>
                p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return result;
    }, [products, searchTerm, selectedCategory]);

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
        <div className="py-6 px-5 sm:px-8 mx-auto flex flex-col sm:w-10/12 w-full bg-white dark:bg-gray-900 gap-y-6">
            <h1 className="sm:text-3xl text-xl font-bold text-green-600 mb-2 w-full pb-2 border-b border-b-green-600">
                সকল পণ্য
            </h1>

            {/* সার্চ */}
            <div className="flex items-center gap-2 mb-2">
                <input
                    type="text"
                    placeholder="পণ্যের নাম লিখুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                />
                <button className="flex items-center gap-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
                    <Search className="w-4 h-4" /> সার্চ
                </button>
            </div>

            {/* ক্যাটাগরি */}
            <div className="overflow-x-scroll scroll-bar pb-2">
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

            {/* পণ্য গ্রিড */}
            {/* পণ্য গ্রিড */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-2">
                <AnimatePresence>
                    {filteredProducts.slice().reverse().map((product) => {
                        const discountedPrice =
                            product.discount && product.discount > 0
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
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden relative cursor-pointer"
                            >
                                {/* ছবি */}
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
                                {/* কনটেন্ট */}
                                <div className="p-2">
                                    <h2 className="text-sm truncate font-semibold text-gray-800 dark:text-gray-100">
                                        {product.product_name}
                                    </h2>

                                    {/* দাম + ডিসকাউন্ট */}
                                    {discountedPrice ? (
                                        <div className="flex items-center gap-x-2">
                                            <p className="text-green-600 font-bold text-sm">৳ {discountedPrice}</p>
                                            <p className="text-gray-500 line-through text-xs">৳ {product.price}</p>
                                            <p className="text-red-500 text-[11px]">-{product.discount}%</p>
                                        </div>
                                    ) : (
                                        <p className="text-green-600 font-bold text-sm">৳ {product.price}</p>
                                    )}

                                    <div className="flex items-center gap-x-2 text-xs mt-1">
                                        <p className="text-gray-500 dark:text-gray-400">স্টক: {product.stock}</p>
                                        <span className="w-px h-3 bg-gray-200"></span>
                                        <p className="text-gray-500 dark:text-gray-400">বিক্রি: {product?.soldCount}</p>
                                    </div>

                                    {/* বোতাম */}
                                    <div className="flex justify-between mt-2">
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

                                        <Link href={`/components/products/order/${product._id}`}>
                                            <button className="flex items-center gap-1 px-2 text-[11px] py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">
                                                <ShoppingCart className="w-3 h-3" /> অর্ডার
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>


            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 py-8">❌ কোনো পণ্য পাওয়া যায়নি</p>
            )}
        </div>
    );
}
