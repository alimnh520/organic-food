'use client';

import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-green-50 border-t border-t-pink-200 via-white to-green-50 text-gray-800 mt-10">
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                    {/* Logo & About */}
                    <div className="flex flex-col md:flex-row items-start gap-3">
                        <img
                            src="/logo/my-image.png"
                            alt="Logo"
                            className="h-16 object-cover rounded"
                        />
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                            🛍️ আমাদের সংগ্রহে রয়েছে – ৯৯ টাকায় দরকারি সব পণ্য, 👗 ফ্যাশন ও অ্যাকসেসরিজ, <br /> ⚡ আধুনিক ইলেকট্রনিক ও গ্যাজেট, ⌚ স্টাইলিশ ঘড়ি, 🏠 ঘর সাজানোর পণ্য, <br /> 🌾 অর্গানিক ফুড, 💅 হেলথ ও বিউটি প্রোডাক্ট, 👶 মা ও শিশুর যত্নের সামগ্রী, <br /> 🏥 মেডিকেল সরঞ্জাম এবং 💼 লাইফস্টাইলের সব কিছুই।
                            <br />✨ মানসম্মত পণ্য, দ্রুত ডেলিভারি আর বিশ্বস্ত অনলাইন সার্ভিস — সব এক ছাদের নিচে।
                        </p>

                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-600" />
                            <span>৩৩, লবনচরা বান্দাবাজার, খুলনা</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-green-600" />
                            <a href="tel:+8801566099299" className="hover:text-green-600 transition">
                                +880 1566-099299
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-green-600" />
                            <a href="mailto:khandokarabdullahbd@gmail.com" className="hover:text-green-600 transition">
                                khandokarabdullahbd@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-3">
                        <a
                            href="https://www.facebook.com/abdullahonlineshoppingbd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-green-100 dark:hover:bg-green-700 transition"
                        >
                            <Facebook className="w-5 h-5 text-blue-600" />
                        </a>
                        <a
                            href="https://wa.link/eefh9h"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-green-100 dark:hover:bg-green-700 transition"
                        >
                            <FaWhatsapp className="w-5 h-5 text-green-500" />
                        </a>
                        <a
                            href="#"
                            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-green-100 dark:hover:bg-green-700 transition"
                        >
                            <Instagram className="w-5 h-5 text-pink-500" />
                        </a>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="mt-6 pt-4 border-t border-t-pink-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} Nahid Hasan. সর্বস্বত্ব সংরক্ষিত।</p>
                    <p className="flex items-center gap-2">
                        💵 <span className="font-medium text-gray-700 dark:text-gray-300">Cash on Delivery</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
