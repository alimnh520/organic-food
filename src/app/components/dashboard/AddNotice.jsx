'use client'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '@/app/Provider';

import { useState } from "react";

export function AddNotice() {
    const [notice, setNotice] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/notices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(notice),
        });
        const result = await res.json();
        setNotice('');
        toast.success(result.message, { position: "bottom-right" });
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold mb-3">📢 নতুন নোটিশ লিখুন</h3>
            <input type="text" placeholder="নোটিশ শিরোনাম" value={notice} className="w-full border p-2 rounded-lg" onChange={(e) => setNotice(e.target.value)} />
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">{loading ? "লোড হচ্ছে..." : "📢 প্রকাশ করুন"}</button>
            <ToastContainer />
        </form>
    );
}