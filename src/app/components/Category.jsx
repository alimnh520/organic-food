"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoriesPage() {
    const categories = [
        { label: "99 TK Shop", value: "others", image: "/categories/99.jpg" },
        { label: "Electronic", value: "electronics", image: "/categories/applications-of-electronics.png" },
        { label: "Home Decoration", value: "decorate", image: "/categories/decorate.jpg" },
        { label: "Organic Food", value: "organic_food", image: "/categories/organic.jpg" },
        { label: "Health & Beauty", value: "home_and_healthy", image: "/categories/health.jpg" },
        { label: "Mother & Baby Care", value: "mother_and_baby", image: "/categories/mother.jpg" },
        { label: "Medical Item", value: "medical_equipments", image: "/categories/medical.jpg" },
        { label: "All Sourcing", value: "sourcing_service", image: "/categories/AdobeStock_124121137-1568x1045.jpeg" },
        { label: "Gadgets", value: "gazette", image: "/categories/maxresdefault.jpg" },
        { label: "Fashion", value: "fashion", image: "/categories/ashion.jpg" },
        { label: "Lifestyle", value: "life_style", image: "/categories/lifestyle.jpg" },
    ];

    return (
        <div className="py-5 px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
            <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-green-700 mb-10 drop-shadow-sm">
                🌿 Our Categories 🌿
            </h1>

            {/* গ্রিড লেআউট */}
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-6">
                {categories.map((cat, index) => (
                    <motion.div
                        key={cat.value}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                    >
                        <Link href={`/components/category/${cat.value}`} className="flex flex-col items-center justify-center">
                            {/* ইমেজ */}
                            <div className="relative h-28 w-28 sm:w-32 sm:h-32 overflow-hidden rounded-full">
                                <Image
                                    src={cat.image}
                                    alt={cat.label}
                                    fill
                                    className="h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-70 group-hover:opacity-40 transition duration-500"></div>
                            </div>

                            {/* লেবেল */}
                            <div className="text-center">
                                <p className="text-green-700 font-bold text-sm sm:text-base drop-shadow-lg group-hover:text-red-500 transition">
                                    {cat.label}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
