'use client'
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathName = usePathname();

    const links = [
        { name: 'হোম', href: '/' },
        { name: 'পণ্য', href: '/components/products' },
        { name: 'আমাদের সম্পর্কে', href: '/components/about' },
        { name: 'যোগাযোগ', href: '/components/contact' },
        { name: 'আমার হোয়াইটলিস্ট', href: '/components/whitelist' },
        { name: 'ড্যাশবোর্ড', href: '/components/dashboard' },
    ];

    return (
        <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center h-16">
                {/* লোগো */}
                <div className="flex items-center gap-3">
                    <img src="/logo/06c5f32c-625a-4122-871a-8280c514fe.jpg" alt="লোগো" className="h-10 w-10 object-contain" />
                    <div className="flex items-center gap-x-2">
                        <img src="/logo/Polish_20250918_125903584.png" alt="" className='h-9' />
                        <p className='italic logo-font text-2xl mt-2 text-yellow-400'>TRADERS</p>
                    </div>
                </div>

                {/* ডেস্কটপ মেনু */}
                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-800  relative group font-medium transition"
                        >
                            {link.name}
                            <span className={`absolute left-0 ${pathName === link.href && "w-full"} -bottom-1 w-0 h-0.5 bg-gray-800 transition-all group-hover:w-full`}></span>
                        </Link>
                    ))}
                </nav>

                {/* মোবাইল মেনু বাটন */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-gray-800 "
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* মোবাইল মেনু animation সহ */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden bg-white shadow-md"
                    >
                        <nav className="flex flex-col gap-4 p-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-gray-800  hover:text-gray-800 font-medium transition"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
