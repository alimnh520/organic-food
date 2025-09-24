'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function ProductDetails({ product }) {

    // যদি product null বা undefined হয়
    if (!product) {
        return (
            <p className="text-center text-red-500 py-12 text-lg">
                ❌ কোনো পণ্য পাওয়া যায়নি
            </p>
        )
    }

    // ডিসকাউন্ট প্রাইস ক্যালকুলেট
    const discountedPrice = product.discount && product.discount > 0
        ? Math.round(product.price - (product.price * product.discount) / 100)
        : null

    return (
        <motion.div
            className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row gap-6">

                {/* ছবি */}
                <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-700 p-4">
                    <img
                        src={product.product_image || "/logo/placeholder.jpg"}
                        alt={product.product_name || "Product Image"}
                        className="w-full h-[400px] md:h-[500px] object-contain rounded-xl shadow-lg"
                    />
                </div>

                {/* ডিটেইলস */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-4">
                    <div>
                        <h1 className="text-3xl break-words font-bold text-green-600">
                            {product.product_name || "Unnamed Product"}
                        </h1>

                        {product.details ? (
                            <p className="text-gray-700 dark:text-gray-300 mt-2">
                                {product.details}
                            </p>
                        ) : (
                            <p className="text-gray-500 mt-2">বিস্তারিত পাওয়া যায়নি।</p>
                        )}

                        {/* দাম + ডিসকাউন্ট */}
                        <div className="mt-4">
                            {discountedPrice ? (
                                <div className="flex items-center gap-x-2">
                                    <p className="text-2xl font-semibold text-blue-600">💰 ৳ {discountedPrice}</p>
                                    <p className="text-gray-500 line-through">৳ {product.price}</p>
                                    <p className="text-red-500 text-sm ml-2">ছাড়: {product.discount}%</p>
                                </div>
                            ) : (
                                <p className="text-2xl font-semibold text-blue-600">
                                    💰 ৳ {product.price}
                                </p>
                            )}
                        </div>

                        <p className="text-gray-500 mt-1">স্টক: {product.stock ?? "N/A"}</p>
                    </div>

                    <Link
                        href={`/components/products/order/${product._id}?price=${discountedPrice ?? product.price}`}
                        className="w-full"
                    >
                        <button className="mt-6 w-full px-6 py-3 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105">
                            <ShoppingCart className="w-5 h-5" /> এখনই অর্ডার করুন
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
