'use client';
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import NoticeHeadline from './Notice';

export default function Animation() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [slides, setSlides] = useState([]);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const res = await fetch("/api/slider");
            const data = await res.json();
            if (data.slides) {
                setSlides(data.slides);
            } else {
                console.error("⚠️ No slides found!");
            }
        } catch (err) {
            console.error("❌ Failed to fetch slides:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (slides.length > 0)
            setActiveIndex((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        if (slides.length > 0)
            setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (slides.length > 1) {
            const timer = setInterval(handleNext, 6000);
            return () => clearInterval(timer);
        }
    }, [slides]);

    const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].clientX;
        if (touchStartX.current - touchEndX.current > 75) handleNext(); // left swipe
        if (touchEndX.current - touchStartX.current > 75) handlePrev(); // right swipe
    };

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center py-20">
                <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (slides.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">⚠️ কোনো স্লাইড পাওয়া যায়নি!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-1 w-full">
            <div className="flex flex-col sm:flex-row w-full gap-3">
                {/* 🔹 Main Slider */}
                <div
                    className="relative sm:flex-1 h-[180px] sm:h-[220px] md:h-[300px] lg:h-[320px] overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                        style={{ backgroundImage: `url(${slides[activeIndex]?.imageUrl})` }}
                    >
                    </div>
                    
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 bg-[#f5f5f5] top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 hover:text-gray-600 py-5 text-xl sm:text-3xl z-10"
                    >
                        <RiArrowLeftWideLine />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 bg-[#f5f5f5] top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 hover:text-gray-600 py-5 text-xl sm:text-3xl z-10"
                    >
                        <RiArrowRightWideLine />
                    </button>

                    {/* 🔹 Indicators */}
                    <div className="absolute bottom-3 w-full flex justify-center gap-1.5">
                        {slides.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === idx
                                    ? 'bg-[#f85606] scale-125'
                                    : 'bg-white/70'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

            </div>

            {/* 🔹 Notice Bar */}
            <NoticeHeadline />
        </div>
    );
}
