'use client'
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Fetch all orders
    async function fetchOrders() {
        try {
            const res = await fetch('/api/order', { method: 'GET' });
            const data = await res.json();
            if (data.success) setOrders(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    // Update order status (confirm / reject)
    async function updateOrderStatus(orderId, status) {
        try {
            const res = await fetch(`/api/order`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, status })
            });

            const data = await res.json();
            if (data.success) {
                setOrders((prev) =>
                    prev.map((o) => (o._id === orderId ? { ...o, status } : o))
                );
                setSelectedOrder(null);
            }
        } catch (err) {
            console.error("Status update failed:", err);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-12 px-6">
            <h1 className="text-4xl font-extrabold text-center text-green-700 mb-10 tracking-wide">
                📦 আমার অর্ডার ড্যাশবোর্ড
            </h1>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {orders.length > 0 ? (
                    orders.slice().reverse().map((order) => (
                        <motion.div
                            key={order._id}
                            className="bg-gradient-to-br from-white to-green-50 border border-green-100 shadow-xl rounded-2xl p-5 cursor-pointer hover:shadow-2xl transition transform hover:-translate-y-2"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedOrder(order)}
                        >
                            <img
                                src={order.productImage}
                                alt={order.productName}
                                className="w-full h-44 object-cover rounded-xl mb-4 shadow-md"
                            />
                            <h2 className="text-xl font-semibold text-gray-800">{order.productName}</h2>
                            <p className="text-green-600 font-bold mt-1">
                                ৳ {order.totalPrice} ({order.quantity} pcs)
                            </p>
                            <p className="text-sm text-gray-500 mt-1">👤 {order.name}</p>
                            <p className="text-xs text-gray-400">📅 {new Date(order.date).toLocaleDateString()}</p>
                            {order.status && (
                                <p className="mt-2">
                                    <span
                                        className={`px-2 py-1 text-xs rounded font-medium ${order.status === "confirmed"
                                                ? "bg-green-100 text-green-700"
                                                : order.status === "rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </p>
                            )}
                        </motion.div>
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500 text-lg">
                        😔 কোনো অর্ডার পাওয়া যায়নি
                    </p>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            {/* Close button */}
                            <button
                                className="absolute top-1.5 right-2 text-gray-500 hover:text-red-500 text-xl"
                                onClick={() => setSelectedOrder(null)}
                            >
                                ✖
                            </button>

                            {/* Order Details */}
                            <img
                                src={selectedOrder.productImage}
                                alt={selectedOrder.productName}
                                className="w-full h-56 object-cover rounded-xl mb-4 shadow"
                            />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {selectedOrder.productName}
                            </h2>
                            <p className="text-green-600 font-bold text-lg mb-4">
                                ৳ {selectedOrder.totalPrice} ({selectedOrder.quantity} pcs)
                            </p>
                            <div className="space-y-2 text-gray-700">
                                <p><span className="font-semibold">👤 ক্রেতার নাম:</span> {selectedOrder.name}</p>
                                <p><span className="font-semibold">📞 মোবাইল:</span> {selectedOrder.mobile}</p>
                                <p><span className="font-semibold">🌍 বিভাগ:</span> {selectedOrder.division}</p>
                                <p><span className="font-semibold">🏙️ জেলা:</span> {selectedOrder.district}</p>
                                <p><span className="font-semibold">🏡 উপজেলা:</span> {selectedOrder.upazilla}</p>
                                <p><span className="font-semibold">📍 ঠিকানা:</span> {selectedOrder.address}</p>
                                <p><span className="font-semibold">💳 পেমেন্ট:</span> {selectedOrder.paymentMethod}</p>
                                <p><span className="font-semibold">🕒 তারিখ:</span> {new Date(selectedOrder.date).toLocaleString()}</p>
                            </div>

                            {/* ✅ Confirm / Reject Buttons */}
                            <div className="mt-6 flex gap-4">
                                <button
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                                    onClick={() => updateOrderStatus(selectedOrder._id, "confirmed")}
                                >
                                    ✅ Confirm
                                </button>
                                <button
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
                                    onClick={() => updateOrderStatus(selectedOrder._id, "rejected")}
                                >
                                    ❌ Reject
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
