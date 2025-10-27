'use client'

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Props:
 *  - adminId (optional): যদি সরাসরি কোনো অ্যাডমিন id আপডেট করতে চাও
 */
export default function ChangePassword({ adminId = null }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        if (!newPassword || !confirmPassword) {
            toast.error('দয়া করে উভয় ঘর পূরণ করুন।');
            return false;
        }
        if (newPassword.length < 8) {
            toast.error('পাসওয়ার্ড কমপক্ষে 8 অক্ষরের হতে হবে।');
            return false;
        }
        if (newPassword !== confirmPassword) {
            toast.error('নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মেলছে না।');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const res = await fetch('/api/admin/password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: adminId,
                    newPassword,
                }),
            });

            const data = await res.json();
            if (data.success) {
                toast.success(data.message || 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।', { position: "bottom-right" });
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                toast.error(data.message || 'কিছু ভুল হয়েছে। আবার চেষ্টা করুন।', { position: "bottom-right" });
            }
        } catch (err) {
            console.error('Change password error:', err);
            toast.error('সার্ভার এরর। পরে চেষ্টা করুন।', { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold text-green-600 mb-4">পাসওয়ার্ড পরিবর্তন</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block text-sm mb-1">নতুন পাসওয়ার্ড</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="কমপক্ষে 8 অক্ষর"
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:text-gray-100"
                        required
                        minLength={8}
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">কনফার্ম পাসওয়ার্ড</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="পাসওয়ার্ড আবার লিখুন"
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:text-gray-100"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {loading ? 'লোড হচ্ছে...' : 'পাসওয়ার্ড আপডেট করুন'}
                    </button>
                </div>
            </form>
        </div>
    );
}
