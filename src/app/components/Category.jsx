"use client";

import { useRef } from "react";
import Image from "next/image";

export default function CategoriesPage() {
    const categories = [
        { label: "অর্গানিক খাবার", value: "organic_food", image: "/categories/images.jpg" },
        { label: "গ্যাজেট", value: "gazette", image: "/categories/maxresdefault.jpg" },
        { label: "মেডিকেল সরঞ্জাম", value: "medical_equipments", image: "/categories/medicine-elements-tools_667648-1830.jpg" },
        { label: "ফ্যাশন", value: "fashion", image: "/categories/1600w-ABoOPrHi6D8.webp" },
        { label: "ইলেকট্রনিক্স", value: "electronics", image: "/categories/applications-of-electronics.png" },
        { label: "সোর্সিং সার্ভিস", value: "sourcing_service", image: "/categories/AdobeStock_124121137-1568x1045.jpeg" },
        { label: "সাজসজ্জা", value: "decorate", image: "/categories/living-room-rug-shelves-7b5d7a52-dcb3e3a7b7e04df99893aeaa76f57d08.jpg" },
        { label: "হোম এন্ড হেলথি", value: "home_and_healthy", image: "/categories/istockphoto-1365830421-612x612.jpg" }, // 🆕
        { label: "মা ও শিশু", value: "mother_and_baby", image: "/categories/360_F_455448048_94bxabQM0jCJA3zXMn7cAUfV4U01Ok8f.jpg" },        // 🆕
        { label: "লাইফস্টাইল", value: "life_style", image: "/categories/lifestyle-logo-design-template-5e8c38a6b91aff44f6a05638a8dc7d1d_screen.jpg" },              // 🆕
        { label: "অন্যান্য", value: "others", image: "/categories/VJwzw5IGgePKH9vjq8XxocT3aiVxIdntOW9Ww81v.png" },
    ];

    const scrollRef = useRef(null);
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
        isDown = true;
        scrollRef.current.classList.add("cursor-grabbing");
        startX = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft = scrollRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown = false;
        scrollRef.current.classList.remove("cursor-grabbing");
    };

    const handleMouseUp = () => {
        isDown = false;
        scrollRef.current.classList.remove("cursor-grabbing");
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="py-4">
            <h1 className="sm:text-3xl text-xl font-bold text-green-600 mb-5 w-full pb-2 border-b border-b-green-600">
                🛒 আমাদের পণ্যের ক্যাটাগরি
            </h1>

            {/* Drag-to-Scroll Wrapper */}
            <div
                ref={scrollRef}
                className="w-full flex gap-6 pb-4 overflow-x-scroll scrollbar-hide cursor-grab select-none"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {categories.map((cat) => (
                    <div
                        key={cat.value}
                        className="flex-shrink-0 w-36 md:w-40 cursor-pointer group"
                    >
                        {/* Image */}
                        <div className="relative w-full h-28 md:h-32 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition">
                            <Image
                                src={cat.image}
                                alt={cat.label}
                                width={200}
                                height={200}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            />
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
