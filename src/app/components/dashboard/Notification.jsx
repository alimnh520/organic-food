'use client'
import React, { useEffect, useState } from 'react'
import { Bell, Trash2 } from "lucide-react";

const Notifications = ({ active }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [notifications, setNotifications] = useState([]); // ✅ এখানে '' না, []

    const fetchNotification = async () => {
        try {
            const res = await fetch('/api/notification', { method: 'GET' });
            const data = await res.json();
            if (data.success) setNotifications(data.message || []); // ✅ fallback array
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotification();
    }, [active]);

    const handleDelete = async (id) => {
        try {
            const res = await fetch('/api/notification', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const data = await res.json();
            if (data.success) fetchNotification();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRead = async () => {
        try {
            await fetch('/api/notification', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            fetchNotification(); // ✅ পড়া হলে আবার লোড হবে
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative">
            {/* 🔔 Bell Button */}
            <button
                title="Notifications"
                className={`p-2 rounded-full relative hover:bg-gray-100 dark:hover:bg-gray-700 ${showNotification && 'bg-gray-200 dark:bg-gray-700'}`}
                onClick={() => {
                    setShowNotification(!showNotification);
                    handleRead();
                }}
            >
                {notifications.filter(elem => elem.isRead === false)?.length > 0 && (
                    <span className="bg-red-600 text-white size-5 flex items-center justify-center rounded-full absolute -top-1 -right-1 text-xs">
                        {notifications.filter(elem => !elem.isRead).length}
                    </span>
                )}
                <Bell className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>

            {/* 🔔 Notification Dropdown */}
            {showNotification && (
                <div className="w-64 rounded-md z-20 overflow-y-auto max-h-72 bg-white dark:bg-gray-700 absolute right-0 mt-2 shadow-lg">
                    {notifications.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">কোনো নোটিফিকেশন নেই</p>
                    ) : (
                        notifications.slice().reverse().map((n) => (
                            <div
                                key={n._id}
                                className={`flex justify-between items-center px-4 py-2 border-b last:border-b-0 
                                    ${n.isRead ? "bg-white dark:bg-gray-700" : "bg-green-50 dark:bg-green-900"}`}
                            >
                                <div>
                                    <p className={`text-sm ${n.isRead ? "text-gray-700 dark:text-gray-300" : "text-green-700 font-semibold"}`}>
                                        {n.title}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(n.createdAt).toLocaleString("bn-BD")}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(n._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Notifications;
