'use client';
import { motion } from "framer-motion";
import { Leaf, HeartPulse, Users, ShieldCheck, MonitorSmartphone } from "lucide-react";

export default function AboutUs() {
    return (
        <main className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 min-h-screen py-10 px-6">
            <div className="max-w-6xl mx-auto">
                {/* শিরোনাম */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="sm:text-3xl text-xl font-bold text-center text-green-700 dark:text-green-300 drop-shadow mb-5"
                >
                    🌿 আমাদের সম্পর্ক
                </motion.h1>

                {/* পরিচিতি */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-4xl mx-auto mb-12"
                >
                    আমরা একটি বিশ্বস্ত প্রতিষ্ঠান, যেখানে পাওয়া যায় ১০০% খাঁটি{" "}
                    <span className="text-green-600 font-semibold">অর্গানিক খাদ্যপণ্য</span>,
                    উন্নতমানের{" "}
                    <span className="text-green-600 font-semibold">মেডিকেল সরঞ্জাম</span>,
                    এবং নিত্যপ্রয়োজনীয়{" "}
                    <span className="text-green-600 font-semibold">ইলেকট্রনিক্স পণ্য</span>।
                    আমাদের লক্ষ্য সুস্থতা, আধুনিকতা এবং সবার জন্য সহজলভ্য সেবা নিশ্চিত করা।
                </motion.p>

                {/* কার্ড সেকশন */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: Leaf,
                            title: "অর্গানিক খাদ্যপণ্য",
                            desc: "খাঁটি ও নিরাপদ খাদ্যপণ্য সরবরাহ করি, যাতে তোমার পরিবার থাকে সুস্থ ও প্রাণবন্ত।",
                        },
                        {
                            icon: HeartPulse,
                            title: "মেডিকেল সরঞ্জাম",
                            desc: "নতুন ও উন্নত মেডিকেল ইকুইপমেন্ট পাওয়া যায়, যা রোগী ও ডাক্তারদের আস্থা বাড়ায়।",
                        },
                        {
                            icon: MonitorSmartphone,
                            title: "ইলেকট্রনিক্স পণ্য",
                            desc: "স্মার্টফোন, কিচেন অ্যাপ্লায়েন্স, গ্যাজেট সহ আধুনিক ইলেকট্রনিক্স পণ্য সহজ দামে।",
                        },
                        {
                            icon: ShieldCheck,
                            title: "গুণগত মান",
                            desc: "আমরা প্রতিটি পণ্য যাচাই করে নিশ্চিত করি যেন কোনো প্রকার ভেজাল বা নিম্নমানের জিনিস না থাকে।",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 text-center flex flex-col items-center"
                        >
                            <item.icon className="w-12 h-12 text-green-600 mb-4" />
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* গ্রাহক আস্থা */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12"
                >
                    <div className="bg-green-600 dark:bg-green-900 text-white rounded-3xl p-8 shadow-xl text-center">
                        <Users className="w-10 h-10 mx-auto mb-3" />
                        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                            গ্রাহকের আস্থা, আমাদের শক্তি
                        </h2>
                        <p className="text-sm md:text-base max-w-3xl mx-auto">
                            তোমাদের আস্থা ও ভালোবাসাই আমাদের প্রেরণা। প্রতিটি গ্রাহক আমাদের পরিবারের সদস্য,
                            আর আমরা প্রতিশ্রুতিবদ্ধ তোমাদের জন্য স্বাস্থ্যকর খাদ্য, নিরাপদ মেডিকেল সরঞ্জাম ও আধুনিক ইলেকট্রনিক্স পৌঁছে দিতে।
                        </p>
                    </div>
                </motion.div>

                {/* স্লোগান */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-green-700 dark:text-green-300">
                        🌱 “স্বাস্থ্য, প্রযুক্তি আর আস্থার সমন্বয়ে গড়ে তুলি এক নতুন আগামী।”
                    </h2>
                </motion.div>
            </div>
        </main>
    );
}
