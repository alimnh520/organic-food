'use client'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NoticeHeadline() {
    const [notice, setNotice] = useState('');
    const [visitor, setVisitor] = useState('');
    useEffect(() => {
        async function getNotice(params) {
            const res = await fetch('/api/notices', { method: 'GET' });
            const data = await res.json();
            setNotice(data.message);
        }
        getNotice();
        async function getVisitor() {
            const res = await fetch('/api/admin/visitor', { method: 'GET' });
            const data = await res.json();
            setVisitor(data.message);
        }
        getVisitor();
    }, []);
    console.log(visitor)
    return (
        <div className="bg-red-600/60 overflow-hidden relative flex">
            <div className="h-12 z-10 w-fit bg-red-400 text-white rounded-r-full px-2 sm:px-4 border-r-2 flex items-center justify-center text-sm sm:text-base absolute left-0">
               Our page visitor : {visitor}
            </div>
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="whitespace-nowrap py-2 text-white text-2xl font-semibold"
            >
                {notice ? notice.text : 'Loading....'}
            </motion.div>
        </div>
    );
}
