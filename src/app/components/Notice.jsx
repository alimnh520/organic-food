'use client'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NoticeHeadline() {
    const [notice, setNotice] = useState('');
    useEffect(() => {
        async function getNotice(params) {
            const res = await fetch('/api/notices', { method: 'GET' });
            const data = await res.json();
            setNotice(data.message);
        }
        getNotice();
    }, [])
    return (
        <div className="bg-red-600/60 py-3 overflow-hidden relative">
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="whitespace-nowrap text-white text-2xl font-semibold"
            >
                {notice ? notice.text : 'Loading....'}
            </motion.div>
        </div>
    );
}
