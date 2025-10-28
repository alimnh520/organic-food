"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoriesPage() {
    const categories = [
        { label: "99 TK Shop", value: "others", image: "/categories/99.jpg" },
        { label: "Fashion", value: "fashion", image: "/categories/ashion.jpg" },
        { label: "Electronic", value: "electronics", image: "/categories/applications-of-electronics.png" },
        { label: "Gadgets", value: "gazette", image: "/categories/gaget.jpg" },
        { label: "Watch", value: "sourcing_service", image: "/categories/watch.jpg" },
        { label: "Home Decoration", value: "decorate", image: "/categories/decorate.jpg" },
        { label: "Organic Food", value: "organic_food", image: "/categories/organic.jpg" },
        { label: "Health & Beauty", value: "home_and_healthy", image: "/categories/health.jpg" },
        { label: "Mother & Baby Care", value: "mother_and_baby", image: "/categories/mother.jpg" },
        { label: "Medical Item", value: "medical_equipments", image: "/categories/medical.jpg" },
        { label: "Lifestyle", value: "life_style", image: "/categories/lifestyle.jpg" },
    ];

    return (
        <div className="py-2 px-4 sm:px-8 bg-gradient-to-br from-green-50 via-white to-green-100">
            <h1 className="text-center text-2xl flex items-center justify-center gap-x-2 sm:text-4xl font-extrabold text-red-600/60 mb-5 sm:mb-12 drop-shadow-md w-full border-b border-b-red-600/60">
                {/* <span className="w-12 h-0.5 bg-blue-600"></span> Our Categories <span className="w-12 h-0.5 bg-blue-600"></span> */}
                Popular Categories For You
            </h1>

            {/* Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
                {categories.map((cat, index) => (
                    <motion.div
                        key={cat.value}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group relative bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-500 cursor-pointer"
                    >
                        <Link
                            href={`/components/category/${cat.value}`}
                            className="flex flex-col items-center justify-center p-3"
                        >
                            {/* Image */}
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2">
                                <Image
                                    src={cat.image}
                                    alt={cat.label}
                                    fill
                                    className="object-contain rounded-full transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/5 rounded-full group-hover:bg-black/10 transition-all duration-500"></div>
                            </div>

                            {/* Label */}
                            <p className="text-center text-purple-500 font-semibold text-xs sm:text-sm group-hover:text-red-500 transition-colors duration-500 drop-shadow-sm">
                                {cat.label}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
