'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const categories = [
    { label: "99 TK Shop", value: "others" },
    { label: "Fashion", value: "fashion" },
    { label: "Electronic", value: "electronics" },
    { label: "Gadgets", value: "gazette" },
    { label: "Watch", value: "sourcing_service" },
    { label: "Home Decoration", value: "decorate" },
    { label: "Organic Food", value: "organic_food" },
    { label: "Health & Beauty", value: "home_and_healthy" },
    { label: "Mother & Baby Care", value: "mother_and_baby" },
    { label: "Medical Item", value: "medical_equipments" },
    { label: "Lifestyle", value: "life_style" },
];

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-blue-100 via-white to-pink-100 text-gray-800 mt-10 border-t border-pink-200">
            <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-10 justify-between">

                {/* Logo & About */}
                <div className="flex flex-col gap-4 md:w-1/3">
                    <img src="/logo/my-image.png" alt="Logo" className="h-16 w-auto object-contain rounded-md shadow-sm" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                        🛍️ আমাদের সংগ্রহে রয়েছে সব দরকারি পণ্য, ফ্যাশন, ইলেকট্রনিক্স, গ্যাজেট, ঘড়ি, ঘর সাজানো, অর্গানিক ফুড, হেলথ ও বিউটি, মা ও শিশু যত্নের সামগ্রী, মেডিকেল সরঞ্জাম ও লাইফস্টাইল প্রোডাক্ট।
                        <br />✨ মানসম্মত পণ্য, দ্রুত ডেলিভারি এবং বিশ্বস্ত অনলাইন সার্ভিস।
                    </p>
                </div>

                {/* Categories & Quick Links */}
                <div className="flex flex-col sm:flex-row md:w-1/3 gap-5 sm:mt-5">
                    {/* Categories */}
                    <div className="flex-1 text-blue-400">
                        <h4 className="text-lg font-semibold mb-2 border-b border-blue-400">Categories</h4>
                        <div className="flex gap-4">
                            <ul className="flex list-disc list-inside flex-col gap-1 text-sm">
                                {categories.slice(0, Math.ceil(categories.length / 2)).map(cat => (
                                    <li key={cat.value}>
                                        <Link href={`/components/category/${cat.value}`} className="hover:text-pink-600 transition">{cat.label}</Link>
                                    </li>
                                ))}
                            </ul>
                            <ul className="flex list-disc list-inside flex-col gap-1 text-sm">
                                {categories.slice(Math.ceil(categories.length / 2)).map(cat => (
                                    <li key={cat.value}>
                                        <Link href={`/components/category/${cat.value}`} className="hover:text-pink-600 transition">{cat.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-blue-400">
                        <h4 className="text-lg font-semibold mb-2 border-b border-blue-400">Quick Links</h4>
                        <ul className="flex list-disc list-inside flex-col gap-1 text-sm">
                            <li><Link href="/" className="hover:text-pink-600 transition">Home</Link></li>
                            <li><Link href="/components/about" className="hover:text-pink-600 transition">About</Link></li>
                            <li><Link href="/components/contact" className="hover:text-pink-600 transition">Contact</Link></li>
                            <li><Link href="/components/products" className="hover:text-pink-600 transition">Products</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Contact & Socials */}
                
                <div className="flex flex-col md:w-1/3 gap-4 sm:mt-5 sm:ml-5">
                    <div className="space-y-2 text-sm text-gray-600 sm:ml-3">
                        <div className="flex items-center gap-2 -ml-1">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span>৩৩, লবনচরা বান্দাবাজার, খুলনা</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-blue-500" />
                            <a href="tel:+8801566099299" className="hover:text-blue-600 transition">+880 1566-099299</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-500" />
                            <a href="mailto:khandokarabdullahbd@gmail.com" className="hover:text-blue-600 transition">khandokarabdullahbd@gmail.com</a>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-2">
                        <a href="https://www.facebook.com/abdullahonlineshoppingbd" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition">
                            <Facebook className="w-5 h-5 text-blue-600" />
                        </a>
                        <a href="https://wa.link/eefh9h" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition">
                            <FaWhatsapp className="w-5 h-5 text-green-500" />
                        </a>
                        <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-pink-100 transition">
                            <Instagram className="w-5 h-5 text-pink-500" />
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="mt-8 pt-4 border-t border-pink-200 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 px-4 sm:px-6 lg:px-8">
                <p>© {new Date().getFullYear()} Nahid Hasan. সর্বস্বত্ব সংরক্ষিত।</p>
                <p className="flex items-center gap-2 mt-2 sm:mt-0">
                    💵 <span className="font-medium text-gray-700">Cash on Delivery</span>
                </p>
            </div>
        </footer>
    );
}
