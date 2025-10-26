'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function ProductDetails({ product }) {

    if (!product) {
        return (
            <div className="w-full flex justify-center items-center py-20">
                <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    const discountedPrice = product.discount && product.discount > 0
        ? Math.round(product.price - (product.price * product.discount) / 100)
        : product.price

    const isSoldOut = product.stock === 0

    return (
        <motion.div
            className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row gap-6">

                {/* Product Image */}
                <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-700 p-4">
                    <Zoom>
                        <img
                            src={product.product_image || "/logo/placeholder.jpg"}
                            alt={product.product_name || "Product Image"}
                            className="h-[400px] md:h-[500px] object-contain rounded-xl shadow-lg cursor-zoom-in"
                        />
                    </Zoom>
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-600">
                            {product.product_name || "Unnamed Product"}
                        </h1>

                        {product.details ? (
                            <p className="text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-line">
                                {product.details}
                            </p>

                        ) : (
                            <p className="text-gray-500 mt-2">বিস্তারিত পাওয়া যায়নি।</p>
                        )}

                        {/* Price Section */}
                        <div className="mt-4 flex flex-col gap-3">
                            <div className="flex items-center gap-3 flex-wrap">
                                {/* Original Price */}
                                {product.discount && product.discount > 0 && (
                                    <span className="text-gray-400 line-through text-lg">৳ {product.price}</span>
                                )}
                                {/* Discounted Price */}
                                <span className="text-2xl font-bold text-blue-600">💰 {discountedPrice} টাকা</span>
                                {/* Discount Badge */}
                                {product.discount && product.discount > 0 && (
                                    <span className="text-red-500 font-semibold text-sm px-2 py-1 bg-red-100 rounded-full">
                                        -{product.discount}%
                                    </span>
                                )}
                            </div>

                            {/* Delivery Info (Just Text, No Charge) */}
                            <p className="text-gray-600 text-sm">🚚 খুলনার ভিতরে ৪০ টাকা, খুলনার বাইরে ৮০ টাকা ডেলিভারি চার্জ প্রযোজ্য</p>
                        </div>

                        {/* Stock Info */}
                        <p className={`mt-2 font-medium ${isSoldOut ? 'text-red-600' : 'text-gray-500'}`}>
                            স্টক: {product.stock ?? "N/A"} {isSoldOut && '(Sold Out)'}
                        </p>
                    </div>

                    {/* Order Button */}
                    <Link
                        href={isSoldOut ? '#' : `/components/products/order/${product._id}`}
                        className="w-full"
                    >
                        <button
                            className={`mt-6 w-full px-6 py-3 flex items-center justify-center gap-2 text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105
                                ${isSoldOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                            disabled={isSoldOut}
                        >
                            <ShoppingCart className="w-5 h-5" /> {isSoldOut ? 'Out of Stock' : 'এখনই অর্ডার করুন'}
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
