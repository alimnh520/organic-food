'use client'
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '@/app/Provider';

export default function OrderPage() {
    const router = useRouter();
    const { id } = useParams();
    const { products } = useContext(UserContext);
    const productId = id;

    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const [divisionList, setDivisionList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [upazillaList, setUpazillaList] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazilla, setSelectedUpazilla] = useState('');

    // 🛒 Context থেকে পণ্য খুঁজে নেওয়া
    useEffect(() => {
        let productArray = [];
        if (Array.isArray(products)) {
            productArray = products;
        } else if (products?.data && Array.isArray(products.data)) {
            productArray = products.data;
        }
        const prod = productArray.find(p => p._id === productId);
        setProduct(prod);
    }, [products, productId]);

    // 🏙️ Location Data
    useEffect(() => {
        async function fetchData() {
            try {
                const [divRes, disRes, upzRes] = await Promise.all([
                    fetch(process.env.NEXT_PUBLIC_DIVISION),
                    fetch(process.env.NEXT_PUBLIC_DISTRICT),
                    fetch(process.env.NEXT_PUBLIC_UPAZILLA),
                ]);
                const divData = await divRes.json();
                const disData = await disRes.json();
                const upzData = await upzRes.json();

                setDivisionList(Array.isArray(divData) ? divData : divData.data || []);
                setDistrictList(Array.isArray(disData) ? disData : disData.data || []);
                setUpazillaList(Array.isArray(upzData) ? upzData : upzData.data || []);
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        }
        fetchData();
    }, []);

    const handleQuantity = (type) => {
        if (!product) return;
        if (type === 'inc' && quantity < product.stock) setQuantity(quantity + 1);
        if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
    };

    // ডিসকাউন্ট প্রাইস ক্যালকুলেট
    const discountedPrice = product?.discount && product.discount > 0
        ? Math.round(product.price - (product.price * product.discount) / 100)
        : product?.price;

    const handleOrder = async () => {
        if (!name || !mobile || !selectedDivision || !selectedDistrict || !selectedUpazilla || !address) {
            toast.error('সব তথ্য পূরণ করুন!', { position: "bottom-right" });
            return;
        }
        setLoading(true);

        const order = {
            productId: product._id,
            productName: product.product_name,
            productImage: product.product_image,
            price: discountedPrice, // এখানে ডিসকাউন্ট প্রাইস ব্যবহার
            quantity,
            totalPrice: discountedPrice * quantity, // ডিসকাউন্ট প্রাইস দিয়ে টোটাল
            name,
            mobile,
            division: divisionList.find(d => d.BBS_CODE === selectedDivision)?.NAME,
            district: districtList.find(d => d.BBS_CODE === selectedDistrict)?.NAME,
            upazilla: upazillaList.find(u => u.BBS_CODE === selectedUpazilla)?.NAME,
            address,
            paymentMethod: 'Cash on Delivery',
            date: new Date().toISOString()
        };

        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const updatedOrders = [...existingOrders, order];
        localStorage.setItem('orders', JSON.stringify(updatedOrders));

        try {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message, { position: "bottom-right" });
                router.push('/');
            }
        } catch (err) {
            console.error("Backend error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!product) return <p className="text-center py-12">লোড হচ্ছে...</p>;

    return (
        <div className="max-w-3xl mx-auto py-5 px-6">
            <motion.h1
                className="sm:text-3xl text-xl font-bold text-green-600 mb-10 text-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                অর্ডার ফর্ম
            </motion.h1>

            <motion.div
                className="bg-white shadow-2xl rounded-2xl p-8 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="flex flex-col md:flex-row gap-6">
                    <img src={product.product_image} alt={product.product_name} className="w-full md:w-1/3 h-64 object-cover rounded-xl shadow-lg" />
                    <div className="flex-1 space-y-3">
                        <h2 className="text-2xl break-words font-semibold">{product.product_name}</h2>
                        <div className="flex items-center gap-x-2">
                            <p className="text-green-600 font-bold text-xl">৳ {discountedPrice}</p>
                            {product.discount && product.discount > 0 && <p className="text-gray-500 line-through">৳ {product.price}</p>}
                        </div>
                        <p className="text-gray-500">স্টক: {product.stock}</p>

                        <div className="flex items-center gap-4 mt-2">
                            <button onClick={() => handleQuantity('dec')} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">-</button>
                            <span className="text-lg font-semibold">{quantity}</span>
                            <button onClick={() => handleQuantity('inc')} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">+</button>
                            <span className="ml-auto font-bold text-green-600">Total: ৳ {discountedPrice * quantity}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <input type="text" placeholder="নাম" className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="মোবাইল" className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={mobile} onChange={e => setMobile(e.target.value)} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={selectedDivision} onChange={e => { setSelectedDivision(e.target.value); setSelectedDistrict(''); setSelectedUpazilla(''); }}>
                            <option value="">বিভাগ নির্বাচন করুন</option>
                            {divisionList.map(d => <option key={d.ID} value={d.BBS_CODE}>{d.NAME}</option>)}
                        </select>

                        <select className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={selectedDistrict} onChange={e => { setSelectedDistrict(e.target.value); setSelectedUpazilla(''); }} disabled={!selectedDivision}>
                            <option value="">জেলা নির্বাচন করুন</option>
                            {districtList.filter(d => d.DIVISION_BBS_CODE.toString() === selectedDivision.toString()).map(dis => <option key={dis.ID} value={dis.BBS_CODE}>{dis.NAME}</option>)}
                        </select>

                        <select className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={selectedUpazilla} onChange={e => setSelectedUpazilla(e.target.value)} disabled={!selectedDistrict}>
                            <option value="">উপজেলা নির্বাচন করুন</option>
                            {upazillaList.filter(u => u.DISTRICT_BBS_CODE.toString() === selectedDistrict.toString()).map(upz => <option key={upz.ID} value={upz.BBS_CODE}>{upz.NAME}</option>)}
                        </select>
                    </div>

                    <textarea placeholder="বিস্তারিত ঠিকানা" className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={address} onChange={e => setAddress(e.target.value)} />
                </div>

                <motion.button
                    onClick={handleOrder}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {loading ? "লোড হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
                </motion.button>
            </motion.div>
            <ToastContainer />
        </div>
    );
}
