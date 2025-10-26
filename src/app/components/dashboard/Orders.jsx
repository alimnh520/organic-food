'use client'
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [deliveryCharge, setDeliveryCharge] = useState(0);

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
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6">
            <h1 className="sm:text-3xl text-xl font-extrabold text-center text-green-700 mb-10 tracking-wide">
                আমার অর্ডার ড্যাশবোর্ড
            </h1>

            {/* Orders Table View */}
            {orders.length > 0 ? (
                <div className="overflow-x-auto shadow-md rounded-2xl border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
                        <thead className="bg-green-100 dark:bg-green-800 text-green-900 dark:text-white">
                            <tr>
                                <th className="px-3 py-3 text-left border-r border-r-green-100">ছবি</th>
                                <th className="px-3 py-3 text-left border-r border-r-green-100">পণ্যের নাম</th>
                                <th className="px-3 py-3 text-left border-r border-r-green-100">ক্রেতা</th>
                                <th className="px-3 py-3 text-left border-r border-r-green-100">তারিখ</th>
                                <th className="px-3 py-3 text-left border-r border-r-green-100">দাম</th>
                                <th className="px-3 py-3 text-left border-r border-r-green-100">পরিমাণ</th>
                                <th className="px-3 py-3 text-left border-r border-r-green-100">মোট</th>
                                <th className="px-3 py-3 text-left border-r border-r-green-100">স্ট্যাটাস</th>
                                <th className="px-3 py-3 text-left border-r border-r-green-100">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {orders.slice().reverse().map((order) => (
                                <tr key={order._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                    <td className="px-3 py-2 border-r border-r-green-100">
                                        <Link href={`/components/products/${order.productId}`}>
                                            <img src={order.productImage} alt={order.productName} className="w-14 h-14 rounded object-cover" />
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 border-r border-r-green-100 font-semibold w-80">{order.productName}</td>
                                    <td className="px-3 py-2 border-r border-r-green-100">{order.name}</td>
                                    <td className="px-3 py-2 border-r border-r-green-100">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="px-3 py-2 border-r border-r-green-100">৳ {order.price}</td>
                                    <td className="px-3 py-2 border-r border-r-green-100">{order.quantity}</td>
                                    <td className="px-3 py-2 border-r border-r-green-100 font-bold text-green-600">৳ {order.totalPrice}</td>
                                    <td className="px-3 py-2 border-r border-r-green-100">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${order.status === "confirmed"
                                                ? "bg-green-100 text-green-700"
                                                : order.status === "rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                setDeliveryCharge(0);
                                            }}
                                        >
                                            বিস্তারিত
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg mt-6">😔 কোনো অর্ডার পাওয়া যায়নি</p>
            )}

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
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl relative w-full max-w-4xl p-6"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                        >
                            <button
                                className="absolute top-3 no-print right-3 text-gray-500 hover:text-red-500 text-xl"
                                onClick={() => setSelectedOrder(null)}
                            >
                                ✖
                            </button>

                            <div className="flex justify-center mb-4">
                                <img src="/logo/my-image.png" alt="Shop Logo" className="h-16 object-contain" />
                            </div>

                            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
                                অর্ডার বিস্তারিত
                            </h2>

                            <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden text-sm">
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr><td className="px-4 py-2 font-semibold">ক্রেতার নাম</td><td className="px-4 py-2">{selectedOrder.name}</td></tr>
                                    <tr><td className="px-4 py-2 font-semibold">মোবাইল</td><td className="px-4 py-2">{selectedOrder.mobile}</td></tr>
                                    <tr><td className="px-4 py-2 font-semibold">পণ্যের নাম</td><td className="px-4 py-2">{selectedOrder.productName}</td></tr>
                                    <tr><td className="px-4 py-2 font-semibold">দাম</td><td className="px-4 py-2">৳ {selectedOrder.price}</td></tr>
                                    <tr><td className="px-4 py-2 font-semibold">পরিমাণ</td><td className="px-4 py-2">{selectedOrder.quantity}</td></tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">ডেলিভারি চার্জ</td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="number"
                                                className="border px-2 py-1 rounded w-28 text-center"
                                                value={deliveryCharge}
                                                onChange={(e) => setDeliveryCharge(Number(e.target.value))}
                                            /> ৳
                                        </td>
                                    </tr>
                                    <tr><td className="px-4 py-2 font-semibold">মোট দাম</td>
                                        <td className="px-4 py-2 font-bold text-green-600">
                                            ৳ {Number(selectedOrder.totalPrice) + Number(deliveryCharge || 0)}
                                        </td>
                                    </tr>
                                    <tr><td className="px-4 py-2 font-semibold">পেমেন্ট মেথড</td><td className="px-4 py-2">{selectedOrder.paymentMethod}</td></tr>
                                    <tr><td className="px-4 py-2 font-semibold">ঠিকানা</td><td className="px-4 py-2">{selectedOrder.division}, {selectedOrder.district}, {selectedOrder.upazilla}, {selectedOrder.address}</td></tr>
                                    <tr><td className="px-4 py-2 font-semibold">স্ট্যাটাস</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded text-sm font-semibold ${selectedOrder.status === "confirmed"
                                                ? "bg-green-100 text-green-700"
                                                : selectedOrder.status === "rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {selectedOrder.status}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {selectedOrder.status === "pending" && (
                                <div className="mt-4 flex gap-4 justify-center">
                                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                        onClick={() => updateOrderStatus(selectedOrder._id, "confirmed")}>
                                        ✅ Confirm
                                    </button>
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                        onClick={() => updateOrderStatus(selectedOrder._id, "rejected")}>
                                        ❌ Reject
                                    </button>
                                </div>
                            )}

                            <div className="mt-4 flex justify-center">
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow no-print"
                                    onClick={() => window.print()}
                                >
                                    🖨️ Print
                                </button>
                            </div>

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
