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
        { label: "অন্যান্য", value: "others", image: "/categories/others.webp" },
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
        <div className="px-6 md:px-10 py-4">
            <h1 className="sm:text-3xl text-xl py-3 font-bold text-green-600 text-center">
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
