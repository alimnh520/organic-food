"use client";
import { useEffect, useState } from "react";

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

    // 🟢 মাউস ড্র্যাগ দিয়ে স্ক্রল
    const handleDragScroll = (e) => {
        const container = e.currentTarget;
        let isDown = false;
        let startX;
        let scrollLeft;

        const start = (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        };

        const end = () => {
            isDown = false;
        };

        const move = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
        };

        container.addEventListener("mousedown", start);
        container.addEventListener("mouseleave", end);
        container.addEventListener("mouseup", end);
        container.addEventListener("mousemove", move);

        return () => {
            container.removeEventListener("mousedown", start);
            container.removeEventListener("mouseleave", end);
            container.removeEventListener("mouseup", end);
            container.removeEventListener("mousemove", move);
        };
    };

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
                    className="flex gap-6 overflow-x-scroll pb-4 cursor-grab active:cursor-grabbing"
                    ref={(el) => {
                        if (el) handleDragScroll({ currentTarget: el });
                    }}
                >
                    {products.map((p) => (
                        <div
                            key={p._id}
                            className="flex-shrink-0 w-60 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
                        >
                            <img
                                src={p.product_image}
                                alt={p.product_name}
                                className="w-full h-40 object-cover rounded-md"
                            />
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
