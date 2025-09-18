'use client';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'ContentType': 'application/json' },
                body: JSON.stringify({ email: form.email, password: form.password })
            });
            const data = await res.json();
            toast.success(data.message, { position: "bottom-right" });
            if (data.success) {
                router.push('/components/dashboard');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen -mt-16 flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl w-full max-w-md p-8">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-500 p-4 rounded-full shadow-lg">
                        <FaUserShield className="text-white text-3xl" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
                    🛒 Admin Dashboard Login
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                    আপনার অ্যাডমিন একাউন্টে প্রবেশ করুন
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg shadow-inner focus:ring-2 focus:ring-green-400 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            placeholder="admin@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg shadow-inner focus:ring-2 focus:ring-green-400 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition flex justify-center items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                    ></path>
                                </svg>
                                লোড হচ্ছে...
                            </>
                        ) : (
                            "🔐 লগইন"
                        )}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
