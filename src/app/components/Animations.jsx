'use client'
import React, { useState } from 'react';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

const Animation = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const animateImg = [
        { img: "/animation/flat-lay-box-nuts-stethoscope.jpg", number: "-1" },
        { img: "/animation/modern-stationary-collection-arrangement.jpg", number: "-2" },
        { img: "/animation/view-healthy-food-incased-pill-shaped-container.jpg", number: "-3" },
        { img: "/animation/still-life-teenager-s-desk.jpg", number: "-4" },
        { img: "/animation/wireless-earphones-smartphone-cup-coffee.jpg", number: "-5" },

    ];

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % animateImg.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) =>
            prev === 0 ? animateImg.length - 1 : prev - 1
        );
    };

    return (
        <div className="relative w-full h-[300px] md:h-[450px] lg:h-[500px] flex">
            {/* Main Background */}
            <div
                className="flex-1 bg-cover bg-center relative rounded-lg overflow-hidden"
                style={{ backgroundImage: `url(${animateImg[activeIndex].img})` }}
            >
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={activeIndex} // change triggers animation
                            initial={{ opacity: 0, y: -20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center px-4 leading-10 italic logo-font text-2xl mt-2 text-yellow-400"
                        >
                            Organic Food and Medical Equipment <br />
                            Electronics
                        </motion.p>
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
            <div className="w-28 sm:w-32 md:w-36 lg:w-40 ml-4 overflow-y-auto space-y-3">
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
