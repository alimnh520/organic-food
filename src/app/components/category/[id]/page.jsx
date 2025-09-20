'use client'
import React, { useState, useEffect, useContext } from 'react';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { UserContext } from '@/app/Provider';
import { useParams, useRouter } from 'next/navigation';

export default function AllProducts() {
    const { id } = useParams();
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

    const categories = [
        { label: "অর্গানিক খাবার", value: "organic_food" },
        { label: "গেজেট", value: "gazette" },
        { label: "মেডিকেল সরঞ্জাম", value: "medical_equipments" },
        { label: "ফ্যাশন", value: "fashion" },
        { label: "ইলেকট্রনিক্স", value: "electronics" },
        { label: "সোর্সিং সার্ভিস", value: "sourcing_service" },
        { label: "সাজসজ্জা", value: "decorate" },
        { label: "হেলথ্ এন্ড বিউটি", value: "home_and_healthy" },  // 🆕 নতুন
        { label: "মা ও শিশু", value: "mother_and_baby" },        // 🆕 নতুন
        { label: "লাইফস্টাইল", value: "life_style" },            // 🆕 নতুন
        { label: "অন্যান্য", value: "others" },
    ];

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
                {categories.filter(cat => cat.value === id).map(elem => elem.label)}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-9">
                <AnimatePresence>
                    {products.filter(p => p.category === id).slice().reverse().map((product) => {
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
                                <div className="relative overflow-hidden h-48">
                                    <div className="absolute top-2 left-2 z-20 bg-white/90 dark:bg-black/70 px-2 py-1 rounded-full flex items-center gap-2 text-xs shadow">
                                        <Eye className="w-4 h-4 text-gray-600 dark:text-gray-200" />
                                        <span className="text-gray-700 dark:text-gray-100">{product.viewCount ?? 0}</span>
                                    </div>
                                    <Link href={`/components/products/${product._id}`} onClick={(e) => handleProductClick(e, product._id, `/components/products/${product._id}`)}>
                                        <img
                                            src={product.product_image}
                                            alt={product.product_name}
                                            className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
                                        />
                                    </Link>
                                </div>
                                <div className="p-4 space-y-2">
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{product.product_name}</h2>

                                    {/* দাম + ডিসকাউন্ট */}
                                    {discountedPrice ? (
                                        <div>
                                            <div className="flex items-center gap-x-2">
                                                <p className="text-green-600 font-bold">৳ {discountedPrice}</p>
                                                <p className="text-gray-500 line-through">৳ {product.price}</p>
                                            </div>
                                            <p className="text-red-500 text-sm">ছাড়: {product.discount}%</p>
                                        </div>
                                    ) : (
                                        <p className="text-green-600 font-bold">৳ {product.price}</p>
                                    )}

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
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
