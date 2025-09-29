"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesPage() {
    const categories = [
        { label: "অর্গানিক খাবার", value: "organic_food", image: "/categories/images.jpg" },
        { label: "গ্যাজেট", value: "gazette", image: "/categories/maxresdefault.jpg" },
        { label: "মেডিকেল সরঞ্জাম", value: "medical_equipments", image: "/categories/medicine-elements-tools_667648-1830.jpg" },
        { label: "ফ্যাশন", value: "fashion", image: "/categories/1600w-ABoOPrHi6D8.webp" },
        { label: "ইলেকট্রনিক্স", value: "electronics", image: "/categories/applications-of-electronics.png" },
        { label: "সাজসজ্জা", value: "decorate", image: "/categories/living-room-rug-shelves-7b5d7a52-dcb3e3a7b7e04df99893aeaa76f57d08.jpg" },
        { label: "হেলথ্ এন্ড বিউটি", value: "home_and_healthy", image: "/categories/health-beauty-studio-vector-logo-stroke-pink-rose-flower-illustration-brand-lettering-95564351.webp" }, // 🆕
        { label: "মা ও শিশু", value: "mother_and_baby", image: "/categories/360_F_455448048_94bxabQM0jCJA3zXMn7cAUfV4U01Ok8f.jpg" },        // 🆕
        { label: "লাইফস্টাইল", value: "life_style", image: "/categories/lifestyle-logo-design-template-5e8c38a6b91aff44f6a05638a8dc7d1d_screen.jpg" },
        { label: "সোর্সিং সার্ভিস", value: "sourcing_service", image: "/categories/AdobeStock_124121137-1568x1045.jpeg" },             // 🆕
        { label: "অন্যান্য", value: "others", image: "/categories/VJwzw5IGgePKH9vjq8XxocT3aiVxIdntOW9Ww81v.png" },
    ];


    return (
        <div className="py-3 sm:px-0 flex flex-col gap-y-5">
            <h1 className="sm:text-3xl text-xl font-bold text-green-600 mb-5 w-full pb-2 border-b border-b-green-600">
                🛒 আমাদের পণ্যের ক্যাটাগরি
            </h1>

            {/* Drag-to-Scroll Wrapper */}
            <div
                className="w-full flex gap-6 pb-4 overflow-x-scroll scroll-bar"
            >
                {categories.map((cat) => (
                    <div
                        key={cat.value}
                        className="flex-shrink-0 w-36 md:w-40 cursor-pointer group"
                    >
                        {/* Image */}
                        <div className="relative w-full h-28 md:h-32 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition">
                            <Link href={`/components/category/${cat.value}`}>
                                <Image
                                    src={cat.image}
                                    alt={cat.label}
                                    width={200}
                                    height={200}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                />
                            </Link>
                        </div>

                        {/* Label */}
                        <p className="mt-2 text-center font-semibold text-gray-700 dark:text-gray-200 group-hover:text-green-600">
                            {cat.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
