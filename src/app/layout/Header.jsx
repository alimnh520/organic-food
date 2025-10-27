'use client'
import React, { useState } from 'react';
import { Menu, X, Home, ShoppingCart, LayoutDashboard, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathName = usePathname();

    const links = [
        { name: 'Home', href: '/', icon: <Home className="w-6 h-6 mr-2" /> },
        { name: 'Products', href: '/components/products', icon: <ShoppingBag className="w-6 h-6 mr-2" /> },
        { name: 'Cart', href: '/components/whitelist', icon: <ShoppingCart className="w-6 h-6 mr-2" /> },
        { name: 'Admin', href: '/components/dashboard', icon: <LayoutDashboard className="w-6 h-6 mr-2" /> },
    ];

    return (
        <header className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-16 flex justify-center gap-x-5 items-center h-16 sm:h-20">

                {/* Desktop Left Menu */}
                <nav className="hidden md:flex items-center gap-4">
                    {links.slice(0, 2).map((link) => {
                        const isActive = pathName === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center pr-1 text-white px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 ${isActive ? 'bg-white/20' : ''}`}
                            >
                                {link.icon}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img
                        src="/logo/my-image.png"
                        alt="লোগো"
                        className="sm:h-20 h-16 rounded-full object-cover shadow-md"
                    />
                </div>

                {/* Desktop Right Menu */}
                <nav className="hidden md:flex items-center gap-4">
                    {links.slice(2, 4).map((link) => {
                        const isActive = pathName === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center pr-1 text-white px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 ${isActive ? 'bg-white/20' : ''}`}
                            >
                                {link.icon}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden relative">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white mt-2 relative -right-8 hover:text-yellow-300 transition"
                    >
                        {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="md:hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 shadow-lg"
                    >
                        <nav className="flex flex-col gap-4 p-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center text-white font-medium rounded-lg p-2 transition hover:bg-white/10 ${pathName === link.href ? 'bg-white/20' : ''
                                        }`}
                                >
                                    <div className="mb-1">{link.icon}</div>
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
