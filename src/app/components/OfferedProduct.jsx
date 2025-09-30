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
                        .filter(p => p.discount && p.discount > 0)
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
                <h1 className="sm:text-3xl text-xl font-bold text-green-600 mb-5 w-full pb-2 border-b border-b-green-600">
                    🎉 ফ্লাস সেল
                </h1>
                <Link href='/components/offered' className="w-32 px-2 py-2 bg-green-600 rounded-md text-white -mt-6 sm:-mt-4">আরো দেখুন</Link>
            </div>

            {products.length === 0 ? (
                <p className="text-center text-gray-500">
                    ❌ এখনো কোনো অফারের পণ্য নেই
                </p>
            ) : (
                <div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {products.map((p) => (
                        <div
                            key={p._id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative cursor-pointer"
                        >
                            <Link href={`/components/products/${p._id}`}>
                                <img
                                    src={p.product_image}
                                    alt={p.product_name}
                                    className="h-36 sm:h-48 transition-transform duration-500 transform hover:scale-110"
                                />
                            </Link>
                            <h4 className="mt-3 truncate font-semibold text-gray-800 dark:text-gray-100">
                                {p.product_name}
                            </h4>

                            {/* আসল দাম + ডিসকাউন্টেড দাম */}
                            {p.discount > 0 ? (
                                <div className="mt-1 flex items-center gap-x-3">
                                    <div className="flex items-center gap-x-2">
                                        <p className="text-green-600 font-bold">
                                            ৳ {Math.round(p.price - (p.price * p.discount) / 100)}
                                        </p>
                                        <p className="text-gray-500 line-through">
                                            ৳ {p.price}
                                        </p>
                                    </div>
                                    <p className="text-sm text-red-500">
                                        ছাড়: {p.discount}%
                                    </p>
                                </div>
                            ) : (
                                <p className="text-green-600 font-bold">৳ {p.price}</p>
                            )}
                            <div className="flex items-center gap-x-2">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">স্টক: {p.stock}</p>
                                <p className="text-gray-500 truncate dark:text-gray-400 text-sm flex items-center gap-2">
                                    <span className="w-0.5 h-4 bg-gray-200 -mt-1"></span>
                                    বিক্রিত হয়েছে: {p?.soldCount}
                                </p>
                            </div>

                            {/* 🛒 অর্ডার বাটন */}
                            <div className="mt-3">
                                <Link href={`/components/products/order/${p._id}`}>
                                    <button className="flex items-center gap-1 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded w-full justify-center">
                                        <ShoppingCart className="w-4 h-4" /> অর্ডার করুন
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
