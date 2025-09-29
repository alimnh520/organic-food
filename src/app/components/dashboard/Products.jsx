'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye } from 'lucide-react';

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [discount, setDiscount] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [newImage, setNewImage] = useState(null);

    // ✅ Fetch all products
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/products', { method: "GET" });
                const data = await res.json();
                if (data.success) setProducts(data.message);
            } catch (err) {
                console.error("Products fetch error:", err);
            }
        }
        fetchProducts();
    }, []);

    const startEditing = (product) => {
        setEditingProductId(product._id);
        setPrice(product.price);
        setStock(product.stock);
        setDiscount(product.discount ?? 0);
        setNewImage(null);
    };

    const cancelEditing = () => {
        setEditingProductId(null);
        setPrice('');
        setStock('');
        setDiscount('');
        setNewImage(null);
    };

    // ✅ Save Changes (Update price, stock, discount, image)
    const saveChanges = async (id, image_id) => {
        if (!price || !stock) {
            toast.error("দয়া করে দাম এবং স্টক ঠিকভাবে দিন!", { position: "bottom-right" });
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("price", Number(price));
            formData.append("stock", Number(stock));
            formData.append("discount", Number(discount) || 0);
            formData.append("id", id);
            formData.append("image_id", image_id);

            if (newImage) {
                formData.append("newImage", newImage);
            }

            const res = await fetch(`/api/products`, {
                method: 'PATCH',
                body: formData
            });

            const data = await res.json();
            if (data.success) {
                toast.success("✅ পণ্য আপডেট হয়েছে!", { position: "bottom-right" });
                setProducts(products.map(p =>
                    p._id === id
                        ? { ...p, price: Number(price), stock: Number(stock), discount: Number(discount) || 0, product_image: data.updatedImage || p.product_image }
                        : p
                ));
                cancelEditing();
            } else {
                toast.error(data.message, { position: "bottom-right" });
            }
        } catch (err) {
            console.error(err);
            toast.error("⚠️ সার্ভার এরর", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    // ✅ Delete Product
    const handleDelete = async (id, image_id) => {
        if (!confirm("আপনি কি নিশ্চিত ডিলেট করতে চান?")) return;
        setIsDelete(true);
        try {
            const res = await fetch(`/api/products`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, image_id })
            });
            const data = await res.json();
            if (data.success) {
                toast.success("🗑️ পণ্য ডিলেট হয়েছে!", { position: "bottom-right" });
                setProducts(products.filter(p => p._id !== id));
                cancelEditing();
            } else {
                toast.error(data.message, { position: "bottom-right" });
            }
        } catch (err) {
            console.error(err);
            toast.error("⚠️ সার্ভার এরর", { position: "bottom-right" });
        } finally {
            setIsDelete(false);
        }
    };

    const getDiscountedPrice = (product) => {
        if (product.discount > 0) {
            return product.price - (product.price * product.discount) / 100;
        }
        return product.price;
    };

    return (
        <div className="max-w-6xl mx-auto py-3 px-6">
            <h1 className="sm:text-3xl text-xl font-bold text-green-600 mb-8 text-center">📦 সকল পণ্য</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products?.slice().reverse().map(product => (
                    <motion.div
                        key={product._id}
                        className="bg-white shadow-md rounded-xl p-3 dark:bg-gray-800"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="relative overflow-hidden h-56">
                            <div className="absolute top-2 left-2 z-20 bg-white/90 dark:bg-black/70 px-2 py-1 rounded-full flex items-center gap-2 text-xs shadow">
                                <Eye className="w-4 h-4 text-gray-600 dark:text-gray-200" />
                                <span className="text-gray-700 dark:text-gray-100">{product.viewCount ?? 0}</span>
                            </div>

                            <img
                                src={product.product_image}
                                alt={product.product_name}
                                className="h-full transition-transform duration-500 transform hover:scale-110"
                            />
                        </div>
                        <h2 className="text-xl break-words font-semibold mt-2 text-gray-800 dark:text-gray-100">{product.product_name}</h2>

                        {/* দাম */}
                        {editingProductId === product._id ? (
                            <>
                                <div className="mt-2">
                                    <label className="block text-gray-600 dark:text-gray-300 text-sm">💰 দাম:</label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="border px-2 py-1 rounded w-full dark:bg-gray-700 dark:text-gray-100"
                                    />
                                </div>

                                <div className="mt-2">
                                    <label className="block text-gray-600 dark:text-gray-300 text-sm">🖼️ নতুন ছবি:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setNewImage(e.target.files[0])}
                                        className="border px-2 py-1 rounded w-full dark:bg-gray-700 dark:text-gray-100"
                                    />
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-300 mt-1">
                                💰 দাম:{" "}
                                {product.discount > 0 ? (
                                    <>
                                        <span className="line-through text-red-500 mr-2">{product.price}৳</span>
                                        <span className="text-green-600 font-bold">{getDiscountedPrice(product)}৳</span>
                                    </>
                                ) : (
                                    <span>{product.price}৳</span>
                                )}
                            </p>
                        )}

                        {/* স্টক */}
                        {editingProductId === product._id ? (
                            <div className="mt-2">
                                <label className="block text-gray-600 dark:text-gray-300 text-sm">📦 স্টক:</label>
                                <input
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    className="border px-2 py-1 rounded w-full dark:bg-gray-700 dark:text-gray-100"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-x-2">
                                <p className="text-gray-600 dark:text-gray-300 mt-1">📦 স্টক: {product.stock}</p>
                                <p className="text-gray-500 truncate dark:text-gray-400 flex items-center gap-2">
                                    <span className="w-0.5 h-4 bg-gray-200 -mt-1"></span>
                                    বিক্রিত হয়েছে: {product?.soldCount}
                                </p>
                            </div>
                        )}

                        {/* ডিসকাউন্ট */}
                        {editingProductId === product._id ? (
                            <div className="mt-2">
                                <label className="block text-gray-600 dark:text-gray-300 text-sm">🎉 ডিসকাউন্ট (%):</label>
                                <input
                                    type="number"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    className="border px-2 py-1 rounded w-full dark:bg-gray-700 dark:text-gray-100"
                                />
                            </div>
                        ) : (
                            product.discount > 0 && (
                                <p className="text-gray-600 dark:text-gray-300 mt-1">🎉 ডিসকাউন্ট: {product.discount}%</p>
                            )
                        )}

                        <div className="mt-4 flex gap-2">
                            {editingProductId === product._id ? (
                                <>
                                    <button
                                        onClick={() => saveChanges(product._id, product.image_id)}
                                        disabled={loading}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                    >
                                        {loading ? "লোড হচ্ছে..." : "সেভ"}
                                    </button>
                                    <button
                                        onClick={cancelEditing}
                                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        বাতিল
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id, product.image_id)}
                                        disabled={loading}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        {isDelete ? "লোড হচ্ছে..." : "ডিলেট"}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => startEditing(product)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <ToastContainer />
        </div>
    );
}
