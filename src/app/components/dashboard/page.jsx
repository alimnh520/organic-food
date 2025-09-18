'use client'
import React, { useState } from "react";
import { Bell, Package, PlusCircle, List, Megaphone, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Orders from "./Orders";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifications from "./Notification";
import AllProducts from "./Products";
import { AddNotice } from "./AddNotice";
import { AllMessage } from "./Messages";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("orders");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar (Mobile Overlay + Desktop Fixed) */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-green-600 text-white shadow-lg p-4 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:inset-0`}
            >
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-center">📊 ড্যাশবোর্ড</h1>
                    {/* Close btn on mobile */}
                    <button
                        className="md:hidden p-2 rounded hover:bg-green-500"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <nav className="space-y-2">
                    <SidebarButton label="অর্ডারসমূহ" icon={<Package className="w-5 h-5" />} active={activeTab === "orders"} onClick={() => { setActiveTab("orders"); setSidebarOpen(false); }} />
                    <SidebarButton label="নতুন পণ্য" icon={<PlusCircle className="w-5 h-5" />} active={activeTab === "add-product"} onClick={() => { setActiveTab("add-product"); setSidebarOpen(false); }} />
                    <SidebarButton label="সকল পণ্য" icon={<List className="w-5 h-5" />} active={activeTab === "products"} onClick={() => { setActiveTab("products"); setSidebarOpen(false); }} />
                    <SidebarButton label="নতুন নোটিশ" icon={<Megaphone className="w-5 h-5" />} active={activeTab === "add-notice"} onClick={() => { setActiveTab("add-notice"); setSidebarOpen(false); }} />
                    <SidebarButton label="সকল বার্তা" icon={<List className="w-5 h-5" />} active={activeTab === "notices"} onClick={() => { setActiveTab("notices"); setSidebarOpen(false); }} />
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                {/* Top bar */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        {/* Hamburger button */}
                        <button
                            className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                        </button>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
                            {tabTitle(activeTab)}
                        </h2>
                    </div>

                    <div className="fixed right-6 p-2 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-green-100 dark:hover:bg-gray-700">
                        <Notifications active={activeTab} />
                    </div>
                </div>

                {/* Content Section */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 sm:p-4 p-0 md:p-6 rounded-2xl shadow-md"
                >
                    {activeTab === "orders" && <Orders />}
                    {activeTab === "add-product" && <AddProduct />}
                    {activeTab === "products" && <AllProducts />}
                    {activeTab === "add-notice" && <AddNotice />}
                    {activeTab === "notices" && <AllMessage />}
                </motion.div>
            </main>

            {/* Toast container */}
            <ToastContainer />
        </div>
    );
}

function SidebarButton({ label, icon, active, onClick }) {
    return (
        <button
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition text-left ${active
                    ? "bg-white text-green-700 font-bold"
                    : "hover:bg-green-500 text-white"
                }`}
            onClick={onClick}
        >
            {icon} {label}
        </button>
    );
}

function tabTitle(tab) {
    const titles = {
        orders: "অর্ডারসমূহ",
        "add-product": "নতুন পণ্য যোগ করুন",
        products: "সকল পণ্য",
        "add-notice": "নতুন নোটিশ",
        notices: "📩 প্রাপ্ত বার্তাগুলো",
    };
    return titles[tab] || "ড্যাশবোর্ড";
}

function AddProduct() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: "",
        details: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file" && files[0]) {
            const file = files[0];
            const maxSize = 3 * 1024 * 1024;
            if (file.size > maxSize) {
                toast.error("⚠️ ছবির সাইজ 3MB এর বেশি হতে পারবে না!", { position: "bottom-right" });
                setFormData((prev) => ({ ...prev, [name]: null }));
                e.target.value = "";
                return;
            }
            setFormData((prev) => ({ ...prev, [name]: file }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value) data.append(key, value);
            });

            const res = await fetch("/api/products", { method: "POST", body: data });
            const result = await res.json();

            if (result.success) {
                toast.success(result.message, { position: "bottom-right" });
                setFormData({ name: "", price: "", stock: "", details: "", image: null });
                e.target.reset();
            } else {
                toast.error(result.message || "কিছু সমস্যা হয়েছে!", { position: "bottom-right" });
            }
        } catch (error) {
            console.log(error);
            toast.error("⚠️ সার্ভার এরর হয়েছে!", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold mb-3">🆕 নতুন পণ্য যোগ করুন</h3>
            <input type="text" name="name" placeholder="পণ্যের নাম" onChange={handleChange} className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100" />
            <input type="number" name="price" placeholder="দাম (৳)" onChange={handleChange} className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100" />
            <input type="number" name="stock" placeholder="স্টক" onChange={handleChange} className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100" />
            <input type="text" name="details" placeholder="বিবরণ" onChange={handleChange} className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100" />
            <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" name="image" onChange={handleChange} className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100" />

            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                {loading ? (
                    <div className="flex items-center justify-center gap-x-2">
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
                        </svg>
                        লোড হচ্ছে...
                    </div>
                ) : (
                    "✅ যোগ করুন"
                )}
            </button>
        </form>
    );
}