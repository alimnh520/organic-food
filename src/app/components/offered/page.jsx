"use client";
import React, { useState, useEffect } from "react";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OfferProductsPage() {
    const [products, setProducts] = useState([]);
    const [whitelist, setWhitelist] = useState([]);
    const router = useRouter();

    // Load Cart from local storage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("whitelist")) || [];
        setWhitelist(saved);
    }, []);

    // Fetch offer products
    useEffect(() => {
        async function fetchOfferProducts() {
            try {
                const res = await fetch("/api/products", { method: "GET" });
                const data = await res.json();
                if (data.success) {
                    const filtered = data.message
                        .filter((p) => p.discount && p.discount > 0)
                        .sort((a, b) => b.discount - a.discount);
                    setProducts(filtered);
                }
            } catch (err) {
                console.error("Offer products fetch error:", err);
            }
        }
        fetchOfferProducts();
    }, []);

    // Toggle Cart
    const toggleWhitelist = (product) => {
        let updated = [];
        if (whitelist.some((p) => p._id === product._id)) {
            updated = whitelist.filter((p) => p._id !== product._id);
        } else {
            updated = [...whitelist, product];
        }
        setWhitelist(updated);
        localStorage.setItem("whitelist", JSON.stringify(updated));
    };

    const isWhitelisted = (id) => whitelist.some((p) => p._id === id);

    // Track page visit
    const handleProductClick = async (e, productId, href) => {
        e.preventDefault();
        try {
            await fetch("/api/visit", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: productId }),
            });
        } catch (err) {
            console.error("Visit API error:", err);
        } finally {
            router.push(href);
        }
    };

    return (
        <div className="py-2 sm:py-6 px-4 mx-auto flex flex-col sm:w-[1280px] w-full bg-white dark:bg-gray-900 sm:gap-y-6 gap-y-3">
            <h1 className="sm:text-3xl text-xl font-bold text-blue-600 mb-5 w-full pb-2 border-b border-b-blue-600">
                Flash Sale
            </h1>

            {products.length === 0 ? (
                <div className="w-full flex justify-center items-center py-20">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-6">
                    <AnimatePresence>
                        {products.map((p) => {
                            const discountedPrice =
                                p.discount && p.discount > 0
                                    ? Math.round(p.price - (p.price * p.discount) / 100)
                                    : null;

                            return (
                                <motion.div
                                    key={p._id}
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
                                                {p.viewCount ?? 0}
                                            </span>
                                        </div>

                                        {/* 🔖 Discount tag */}
                                        {p.discount > 0 && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md z-10">
                                                -{p.discount}%
                                            </div>
                                        )}

                                        {/* ❌ Sold out overlay */}
                                        {p.stock === 0 && (
                                            <div className="absolute left-5 bottom-5 z-20 flex items-center justify-center">
                                                <img src="/logo/sold.png" alt="" className='w-20 h-20 sm:w-28 sm:h-28 rotate-45  rounded-full object-center' />
                                            </div>
                                        )}

                                        <Link
                                            href={`/components/products/${p._id}`}
                                            onClick={(e) =>
                                                handleProductClick(e, p._id, `/components/products/${p._id}`)
                                            }
                                        >
                                            <img
                                                src={p.product_image}
                                                alt={p.product_name}
                                                className={`h-32 sm:h-44 w-full object-cover transition-transform duration-500 transform hover:scale-110 ${p.stock === 0 ? "opacity-60" : ""
                                                    }`}
                                            />
                                        </Link>
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-2 space-y-1">
                                        <h2 className="text-sm sm:text-base truncate font-semibold text-gray-800 dark:text-gray-100">
                                            {p.product_name}
                                        </h2>

                                        {/* 💰 Price + Discount */}
                                        {discountedPrice ? (
                                            <div className="flex items-center gap-x-2 sm:gap-x-3">
                                                <div className="flex items-center gap-x-1 sm:gap-x-2">
                                                    <p className="text-green-600 text-sm sm:text-base font-bold">
                                                        ৳ {discountedPrice}
                                                    </p>
                                                    <p className="text-gray-500 line-through text-xs sm:text-sm">
                                                        ৳ {p.price}
                                                    </p>
                                                    <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1 truncate">
                                                        <span className="w-0.5 h-4 bg-gray-200"></span>
                                                        Sold: {p?.soldCount}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-x-1 sm:gap-x-2">
                                                <p className="text-green-600 font-bold text-sm sm:text-base">
                                                    ৳ {p.price}
                                                </p>
                                                <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1 truncate">
                                                    <span className="w-0.5 h-4 bg-gray-200"></span>
                                                    Sold: {p?.soldCount}
                                                </p>
                                            </div>
                                        )}

                                        {/* 📦 Stock info */}
                                        {/* <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm">
                                            <p className="text-gray-500 dark:text-gray-400">Stock: {p.stock}</p>
                                            <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                <span className="w-0.5 h-4 bg-gray-200"></span>
                                                Sold: {p?.soldCount}
                                            </p>
                                        </div> */}

                                        {/* ❤️ Cart + 🛒 Order Buttons */}
                                        <div className="flex justify-between mt-2 gap-2">
                                            <button
                                                onClick={() => toggleWhitelist(p)}
                                                className={`flex items-center justify-center sm:w-auto w-16 gap-1 px-2 py-1 sm:py-2 text-xs sm:text-sm rounded transition ${isWhitelisted(p._id)
                                                    ? "bg-red-500 text-white"
                                                    : "bg-red-100 hover:bg-red-200 text-red-500"
                                                    }`}
                                            >
                                                <Heart
                                                    className={`w-3 h-3 mb-0.5 sm:w-4 sm:h-4 ${isWhitelisted(p._id) ? "text-white" : "text-red-500"
                                                        }`}
                                                />
                                                Cart
                                            </button>

                                            <Link href={`/components/products/order/${p._id}`} className="flex-1">
                                                <button
                                                    disabled={p.stock === 0}
                                                    className={`w-full flex items-center justify-center gap-1 px-2 py-1 sm:py-2 text-xs sm:text-sm rounded transition ${p.stock === 0
                                                        ? "bg-gray-400 cursor-not-allowed text-white"
                                                        : "bg-blue-500 hover:bg-blue-600 text-white"
                                                        }`}
                                                >
                                                    <ShoppingCart className="w-3 h-3 mb-0.5 sm:w-4 sm:h-4" />
                                                    {p.stock === 0 ? "Sold Out" : "Order Now"}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
