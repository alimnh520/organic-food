'use client'
import React, { useEffect, useState } from 'react';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import NoticeHeadline from './Notice';

const Animation = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [visitor, setVisitor] = useState('');

    const animateImg = [
        { img: "/animation/ads.jpg", text: '', number: "-1" },
        { img: "/animation/discount.jpg", text: '', number: "-2" },
        { img: "/animation/animate2.png", text: 'গ্যাজেট', number: "-3" },
        { img: "/animation/animate3.png", text: 'ইলেকট্রনিক্স', number: "-4" },
        { img: "/animation/animate4.png", text: 'হোম এন্ড হেলদি', number: "-5" },
        { img: "/animation/animate1.png", text: 'অর্গানিক ফুড', number: "-6" },
    ];

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % animateImg.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) =>
            prev === 0 ? animateImg.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const getVisitor = async () => {
            try {
                const res = await fetch('/api/admin/visitor', { method: 'GET' });
                const data = await res.json();
                if (data.success) setVisitor(data.message);
            } catch (error) {
                console.log(error);
            }
        }
        getVisitor();
    }, []);

    function toBanglaNumber(num) {
        const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().split("").map(d => banglaDigits[d]).join("");
    }

    return (
        <div className="relative w-full h-[300px] px-5 sm:px-0 md:h-[450px] lg:h-[500px] flex">
            {/* Main Background */}
            <div
                className="flex-1 bg-cover bg-center relative rounded-lg overflow-hidden"
                style={{ backgroundImage: `url(${animateImg[activeIndex].img})` }}
            >
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex} // change triggers animation
                            initial={{ opacity: 0, y: -20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex flex-col items-center justify-between"
                        >
                            {/* উপরের টেক্সট */}
                            <p className="italic logo-font text-lg sm:text-5xl mt-2.5 text-yellow-600">
                                {animateImg[activeIndex].text}
                            </p>

                            {/* নিচে NoticeHeadline */}
                            <div className="w-full flex flex-col">
                                {visitor && <p className='bg-white w-fit px-5 self-end rounded-tl-full rounded-bl-full py-1'>আমাদের শপের ভিজিটর : {toBanglaNumber(visitor)} জন</p>}
                                <NoticeHeadline />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                </div>

                {/* Navigation */}
                <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white text-3xl sm:text-4xl z-10 hover:scale-110 transition"
                >
                    <CiCircleChevLeft />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white text-3xl sm:text-4xl z-10 hover:scale-110 transition"
                >
                    <CiCircleChevRight />
                </button>
            </div>

            {/* Right Side Thumbnails */}
            <div className="w-28 hidden sm:block sm:w-32 md:w-36 lg:w-40 ml-4 overflow-y-auto space-y-3">
                {animateImg.map((item, idx) => (
                    <div
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`cursor-pointer rounded-md overflow-hidden border-2 transition 
                        ${activeIndex === idx
                                ? "border-green-500 scale-105"
                                : "border-transparent opacity-70 hover:opacity-100"
                            }`}
                    >
                        <img
                            src={item.img}
                            alt="thumbnail"
                            className="w-full h-20 object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Animation;
