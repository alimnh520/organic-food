"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function OfferProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchOfferProducts() {
            try {
                const res = await fetch("/api/products", { method: "GET" });
                const data = await res.json();
                if (data.success) {
                    const filtered = data.message
                        .filter((p) => p.discount && p.discount > 0)
                        .sort((a, b) => b.discount - a.discount)
                        .slice(0, 5);
                    setProducts(filtered);
                }
            } catch (err) {
                console.error("Offer products fetch error:", err);
            }
        }
        fetchOfferProducts();
    }, []);

    return (
        <div className="py-3 sm:px-0 px-4 flex flex-col gap-y-5">
            <div className="flex items-center justify-between">
                <h1 className="sm:text-3xl text-xl font-bold text-blue-600 mb-5 w-full pb-2 border-b border-b-blue-600">
                    Flash Sale
                </h1>
                <Link
                    href="/components/offered"
                    className="w-32 px-2 py-2 bg-gradient-to-r from-blue-600 to-purple-500 rounded-md text-white -mt-6 sm:-mt-4 text-center hover:bg-green-700 transition"
                >
                    See More
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="w-full flex justify-center items-center py-20">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {products.map((p) => {
                        const discountedPrice = Math.round(p.price - (p.price * p.discount) / 100);
                        return (
                            <div
                                key={p._id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer group p-2"
                            >
                                <Link href={`/components/products/${p._id}`} className="relative flex items-center justify-center">
                                    {/* 🖼 Product Image */}
                                    <img
                                        src={p.product_image}
                                        alt={p.product_name}
                                        className={`h-32 sm:h-44 relative transition-transform duration-500 transform group-hover:scale-110 ${p.stock === 0 ? "opacity-60" : ""
                                            }`}
                                    />

                                    {/* 🔖 Discount Badge */}
                                    {p.discount > 0 && (
                                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                                            -{p.discount}%
                                        </div>
                                    )}

                                    {/* ❌ Sold Out Badge */}
                                    {p.stock === 0 && (
                                        <div className="absolute z-20 flex items-center justify-center">
                                            <img src="/logo/sold.png" alt="" className='w-20 h-20 sm:w-28 sm:h-28 rotate-45  rounded-full object-center' />
                                        </div>
                                    )}
                                </Link>

                                {/* 🏷 Name */}
                                <h4 className="mt-3 truncate text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100 px-1">
                                    {p.product_name}
                                </h4>

                                {/* 💰 Price Section */}
                                {p.discount > 0 ? (
                                    <div className="mt-1 flex items-center gap-x-3 px-1">
                                        <div className="flex items-center gap-x-2">
                                            <p className="text-green-600 font-bold">৳ {discountedPrice}</p>
                                            <p className="text-gray-500 line-through">৳ {p.price}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-green-600 font-bold px-1">৳ {p.price}</p>
                                )}

                                {/* 📦 Stock and Sold Count */}
                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 px-1 mt-1">
                                    <p>Stock: {p.stock}</p>
                                    <p>Sold: {p?.soldCount || 0}</p>
                                </div>

                                {/* 🛒 Order Button */}
                                <div className="mt-3 px-1 pb-2">
                                    <Link href={`/components/products/order/${p._id}`}>
                                        <button
                                            disabled={p.stock === 0}
                                            className={`flex items-center gap-1 py-2 text-sm rounded w-full justify-center transition ${p.stock === 0
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-500 hover:bg-blue-600 text-white"
                                                }`}
                                        >
                                            <ShoppingCart className="w-4 h-4 mb-1" />{" "}
                                            {p.stock === 0 ? "Out" : "Order Now"}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
