'use client'
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

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
            <h1 className="sm:text-4xl text-xl font-extrabold text-center text-green-700 mb-10 tracking-wide">
                📦 আমার অর্ডার ড্যাশবোর্ড
            </h1>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {orders.length > 0 ? (
                    orders.slice().reverse().map((order) => (
                        <motion.div
                            key={order._id}
                            className="bg-gradient-to-br break-words from-white to-green-50 border border-green-100 shadow-xl rounded-2xl p-2 cursor-pointer hover:shadow-2xl transition transform hover:-translate-y-2"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedOrder(order)}
                        >
                            <img
                                src={order.productImage}
                                alt={order.productName}
                                className="h-46 rounded-xl mb-4 shadow-md"
                            />
                            <h2 className="text-xl font-semibold text-gray-800">{order.productName}</h2>
                            <p className="text-green-600 font-bold mt-1">
                                ৳ {order.totalPrice} ({order.quantity} pcs)
                            </p>
                            <div className="flex items-center gap-x-2">
                                <p className="text-sm text-gray-500">👤 {order.name}</p>
                                <p className="text-xs text-gray-400">📅 {new Date(order.date).toLocaleDateString()}</p>
                            </div>
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
                        className="fixed inset-0 bg-black/70 py-10 overflow-auto backdrop-blur-sm flex items-center justify-center z-50 p-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl top-60 flex flex-col shadow-2xl relative print-area"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            style={{
                                width: "794px",   // A4 width
                                height: "1123px", // A4 height
                                padding: "32px",
                                overflow: "hidden" // scroll ছাড়াই A4 ফিট করবে
                            }}
                        >
                            {/* Close button */}
                            <button
                                className="absolute top-1.5 right-2 text-gray-500 hover:text-red-500 text-xl no-print"
                                onClick={() => setSelectedOrder(null)}
                            >
                                ✖
                            </button>

                            {/* 🛍️ Shop Logo */}
                            <div className="flex justify-center mb-4 border-b pb-3">
                                <img
                                    src="/logo/my-logo.jpg"
                                    alt="Shop Logo"
                                    className="h-16 object-contain"
                                />
                            </div>

                            {/* Order Details */}
                            <img
                                src={selectedOrder.productImage}
                                alt={selectedOrder.productName}
                                className="h-56 self-center rounded-xl mb-4 shadow-lg"
                            />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                                {selectedOrder.productName}
                            </h2>
                            <p className="text-green-600 font-bold text-lg mb-4 text-center">
                                ৳ {selectedOrder.totalPrice} ({selectedOrder.quantity} pcs)
                            </p>

                            <div className="space-y-2 text-gray-700 text-base">
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
                            {!["confirmed", "rejected"].includes(selectedOrder.status) && (
                                <div className="mt-6 flex gap-4 no-print">
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
                            )}

                            {["confirmed", "rejected"].includes(selectedOrder.status) && (
                                <p className="mt-6 text-center font-semibold text-lg">
                                    {selectedOrder.status === "confirmed" ? (
                                        <span className="text-green-600">✅ অর্ডার কনফার্ম হয়েছে</span>
                                    ) : (
                                        <span className="text-red-600">❌ অর্ডার বাতিল হয়েছে</span>
                                    )}
                                </p>
                            )}

                            {/* 🖨️ Print Button */}
                            <div className="mt-6 flex justify-center no-print">
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                                    onClick={() => window.print()}
                                >
                                    🖨️ Print
                                </button>
                            </div>

                            {/* 🏬 Shop Address */}
                            <div className="mt-6 text-center text-gray-600 border-t pt-3 text-sm space-y-2">
                                <p>🏬 আমাদের ঠিকানা:</p>
                                <div className="flex flex-col gap-y-1">
                                    <div className="flex items-center gap-3">
                                        <Phone className="text-green-500 w-5 h-5" />
                                        <p className="text-gray-700">+880 1566-099299, +880 1813-623629</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail className="text-green-500 w-5 h-5" />
                                        <p className="text-gray-700">khandokarabdullahbd@gmail.com</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <MapPin className="text-green-500 w-5 h-5" />
                                        <p className="text-gray-700">৩৩, লবনচরা বান্দাবাজার, শিপইয়ার্ড রোড, খুলনা</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
