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

                    <div className="flex items-center gap-x-3">
                        <img src="/logo/Polish_20250919_010532269.png" alt="লোগো" className="w-10 h-10 object-contain" />
                        <h1 className="text-2xl font-bold text-center mt-2"> ড্যাশবোর্ড</h1>
                    </div>

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
            <main className="flex-1 p-4 overflow-y-auto">
                {/* Top bar */}
                <div className="flex justify-between items-center relative">
                    <div className="flex items-center gap-3">
                        {/* Hamburger button */}
                        <button
                            className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                        </button>
                    </div>

                    <div className="fixed sm:right-6 right-2 sm:top-24 z-50 top-[60px] p-2 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-green-100 dark:hover:bg-gray-700">
                        <Notifications active={activeTab} />
                    </div>
                </div>

                {/* Content Section */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 sm:p-4 p-0 rounded-2xl shadow-md"
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

// add product section

export function AddProduct() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: "",
        details: "",
        image: null,
        category: "",
    });

    // ক্যাটাগরি লিস্ট (বাংলা দেখাবে, ইংরেজি ভ্যালু backend এ যাবে)
    const categories = [
        { label: "অর্গানিক খাবার", value: "organic_food" },
        { label: "গেজেট", value: "gazette" },
        { label: "মেডিকেল সরঞ্জাম", value: "medical_equipments" },
        { label: "ফ্যাশন", value: "fashion" },
        { label: "ইলেকট্রনিক্স", value: "electronics" },
        { label: "সোর্সিং সার্ভিস", value: "sourcing_service" },
        { label: "সাজসজ্জা", value: "decorate" },
        { label: "হোম এন্ড হেলথি", value: "home_and_healthy" },  // 🆕 নতুন
        { label: "মা ও শিশু", value: "mother_and_baby" },        // 🆕 নতুন
        { label: "লাইফস্টাইল", value: "life_style" },            // 🆕 নতুন
        { label: "অন্যান্য", value: "others" },
    ];

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
                setFormData({ name: "", price: "", stock: "", details: "", image: null, category: "" });
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
        <form onSubmit={handleSubmit} className="space-y-4 sm:p-0 p-2">
            <h3 className="text-lg font-semibold mb-3">🆕 নতুন পণ্য যোগ করুন</h3>

            <input type="text" name="name" placeholder="পণ্যের নাম" onChange={handleChange} className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100" />
            <input type="number" name="price" placeholder="দাম (৳)" onChange={handleChange} className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100" />
            <input type="number" name="stock" placeholder="স্টক" onChange={handleChange} className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100" />
            <input type="text" name="details" placeholder="বিবরণ" onChange={handleChange} className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100" />

            {/* ক্যাটাগরি ড্রপডাউন */}
            <select
                name="category"
                onChange={handleChange}
                value={formData.category}
                className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100"
                required
            >
                <option value="">-- ক্যাটাগরি নির্বাচন করুন --</option>
                {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                        {cat.label}
                    </option>
                ))}
            </select>

            <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" name="image" onChange={handleChange} className="w-full border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100" />

            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                {loading ? "লোড হচ্ছে..." : "✅ যোগ করুন"}
            </button>
        </form>
    );
}
