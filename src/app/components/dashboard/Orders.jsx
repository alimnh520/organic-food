'use client'
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

    // Update order status
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
                toast.success(`Order ${status} successfully!`, { position: "bottom-right" });
                setSelectedOrder(null);
            }
        } catch (err) {
            console.error("Status update failed:", err);
            toast.error("Status update failed!", { position: "bottom-right" });
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
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-2 cursor-pointer hover:shadow-2xl transition transform hover:-translate-y-1"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedOrder(order)}
                        >
                            <img
                                src={order.productImage}
                                alt={order.productName}
                                className="h-44 w-full rounded-xl mb-3 object-cover shadow-sm"
                            />
                            <h2 className="text-lg truncate font-semibold text-gray-800 dark:text-gray-100">
                                {order.productName}
                            </h2>
                            <p className="text-green-600 font-bold mt-1">
                                ৳ {order.totalPrice} ({order.quantity} pcs)
                            </p>
                            <div className="flex justify-between mt-1 text-sm text-gray-500">
                                <span>👤 {order.name}</span>
                                <span>📅 {new Date(order.date).toLocaleDateString()}</span>
                            </div>
                            <span
                                className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${order.status === "confirmed"
                                    ? "bg-green-100 text-green-700"
                                    : order.status === "rejected"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {order.status}
                            </span>
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
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-50 overflow-auto pt-6 pb-10 px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl relative w-full max-w-4xl p-6 print:overflow-visible"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                        >
                            {/* Close button */}
                            <button
                                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl no-print"
                                onClick={() => setSelectedOrder(null)}
                            >
                                ✖
                            </button>

                            {/* Logo */}
                            <div className="flex justify-center mb-4">
                                <img
                                    src="/logo/my-image.png"
                                    alt="Shop Logo"
                                    className="h-16 object-contain"
                                />
                            </div>

                            {/* Order Table */}
                            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
                                অর্ডার বিস্তারিত
                            </h2>
                            <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden text-sm">
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <td className="px-4 py-2 font-semibold">ক্রেতার নাম</td>
                                        <td className="px-4 py-2">{selectedOrder.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">মোবাইল</td>
                                        <td className="px-4 py-2">{selectedOrder.mobile}</td>
                                    </tr>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <td className="px-4 py-2 font-semibold">পণ্যের নাম</td>
                                        <td className="px-4 py-2">{selectedOrder.productName}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">দাম (প্রতি পিস)</td>
                                        <td className="px-4 py-2">৳ {selectedOrder.price}</td>
                                    </tr>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <td className="px-4 py-2 font-semibold">Quantity</td>
                                        <td className="px-4 py-2">{selectedOrder.quantity}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">ডেলিভারি চার্জ</td>
                                        <td className="px-4 py-2">৳ {selectedOrder.deliveryCharge || 0}</td>
                                    </tr>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <td className="px-4 py-2 font-semibold">মোট দাম</td>
                                        <td className="px-4 py-2">৳ {selectedOrder.totalPrice}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">পেমেন্ট মেথড</td>
                                        <td className="px-4 py-2">{selectedOrder.paymentMethod}</td>
                                    </tr>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <td className="px-4 py-2 font-semibold">ঠিকানা</td>
                                        <td className="px-4 py-2">
                                            {selectedOrder.division}, {selectedOrder.district}, {selectedOrder.upazilla}, {selectedOrder.address}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">স্ট্যাটাস</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 rounded text-sm font-semibold ${selectedOrder.status === "confirmed"
                                                    ? "bg-green-100 text-green-700"
                                                    : selectedOrder.status === "rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {selectedOrder.status}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Confirm / Reject Buttons */}
                            {selectedOrder.status === "pending" && (
                                <div className="mt-4 flex gap-4 justify-center no-print">
                                    <button
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                        onClick={() => updateOrderStatus(selectedOrder._id, "confirmed")}
                                    >
                                        ✅ Confirm
                                    </button>
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                        onClick={() => updateOrderStatus(selectedOrder._id, "rejected")}
                                    >
                                        ❌ Reject
                                    </button>
                                </div>
                            )}

                            {/* Print Button */}
                            <div className="mt-4 flex justify-center no-print">
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                                    onClick={() => window.print()}
                                >
                                    🖨️ Print
                                </button>
                            </div>

                            {/* Shop Address */}
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
            <ToastContainer />
        </div>
    );
}
