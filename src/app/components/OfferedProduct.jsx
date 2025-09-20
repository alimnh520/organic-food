"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function OfferProductsPage() {
    const [products, setProducts] = useState([]);

    // 🟢 ডাটা ফেচ
    useEffect(() => {
        async function fetchOfferProducts() {
            try {
                const res = await fetch("/api/products", { method: "GET" });
                const data = await res.json();
                if (data.success) {
                    // শুধু যেগুলোর ডিসকাউন্ট আছে সেগুলো নিয়ে আসবো
                    const filtered = data.message
                        .filter(p => p.discount && p.discount > 0)
                        .sort((a, b) => b.discount - a.discount) // বেশি ডিসকাউন্ট আগে
                        .slice(0, 20); // সর্বোচ্চ 20 টা
                    setProducts(filtered);
                }
            } catch (err) {
                console.error("Offer products fetch error:", err);
            }
        }
        fetchOfferProducts();
    }, []);


    return (
        <div className="py-3 px-5 sm:px-0 flex flex-col gap-y-5">
            <h1 className="sm:text-3xl text-xl font-bold text-green-600 mb-5 w-full pb-2 border-b border-b-green-600">
                🎉 ফ্লাস সেল
            </h1>

            {products.length === 0 ? (
                <p className="text-center text-gray-500">
                    ❌ এখনো কোনো অফারের পণ্য নেই
                </p>
            ) : (
                <div
                    className="flex gap-6 overflow-x-scroll scroll-bar pb-4">
                    {products.map((p) => (
                        <div
                            key={p._id}
                            className="flex-shrink-0 w-60 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
                        >
                            <Link href={`/components/products/${p._id}`}>
                                <img
                                    src={p.product_image}
                                    alt={p.product_name}
                                    className="w-full h-40 object-cover rounded-md"
                                />
                            </Link>
                            <h4 className="mt-3 font-semibold text-gray-800 dark:text-gray-100">
                                {p.product_name}
                            </h4>

                            {/* আসল দাম + ডিসকাউন্টেড দাম */}
                            {p.discount > 0 ? (
                                <div className="mt-1">
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

                            {/* 🛒 অর্ডার বাটন */}
                            <div className="mt-3">
                                <Link href={`/components/products/order/${p._id}`}>
                                    <button className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded w-full justify-center">
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
