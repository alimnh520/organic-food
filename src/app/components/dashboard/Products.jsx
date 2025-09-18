'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

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
    };

    const cancelEditing = () => {
        setEditingProductId(null);
        setPrice('');
        setStock('');
    };

    // ✅ Save Changes (Update price & stock)
    const saveChanges = async (id) => {
        if (!price || !stock) {
            toast.error("দয়া করে দাম এবং স্টক ঠিকভাবে দিন!", { position: "bottom-right" });
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`/api/products`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ price: Number(price), stock: Number(stock), id })
            });
            const data = await res.json();
            if (data.success) {
                toast.success("✅ পণ্য আপডেট হয়েছে!", { position: "bottom-right" });
                setProducts(products.map(p => p._id === id ? { ...p, price: Number(price), stock: Number(stock) } : p));
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

    return (
        <div className="max-w-6xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">📦 সকল পণ্য</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.slice().reverse().map(product => (
                    <motion.div
                        key={product._id}
                        className="bg-white shadow-md rounded-xl p-5 dark:bg-gray-800"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="relative overflow-hidden h-48">
                            <img
                                src={product.product_image}
                                alt={product.product_name}
                                className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
                            />
                        </div>
                        <h2 className="text-xl font-semibold mt-2 text-gray-800 dark:text-gray-100">{product.product_name}</h2>

                        {/* দাম */}
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            💰 দাম: {editingProductId === product._id ? (
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="border px-2 py-1 rounded w-24 dark:bg-gray-700 dark:text-gray-100"
                                />
                            ) : product.price}
                        </p>

                        {/* স্টক */}
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            📦 স্টক: {editingProductId === product._id ? (
                                <input
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    className="border px-2 py-1 rounded w-24 dark:bg-gray-700 dark:text-gray-100"
                                />
                            ) : product.stock}
                        </p>

                        <div className="mt-4 flex gap-2">
                            {editingProductId === product._id ? (
                                <>
                                    <button
                                        onClick={() => saveChanges(product._id)}
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
