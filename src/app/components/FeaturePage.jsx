'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Truck, CreditCard, RefreshCw, Headphones } from 'lucide-react'
import Link from 'next/link'

const features = [
    {
        id: 'cod',
        title: 'Cash on Delivery',
        desc: 'Pay when the product arrives — a safe and convenient payment option.',
        icon: CreditCard,
        colorFrom: 'from-yellow-400',
        colorTo: 'to-orange-500',
    },
    {
        id: 'refund',
        title: 'Return & Refund Policy',
        desc: 'Easy returns and refunds when the product does not meet quality or description.',
        icon: RefreshCw,
        colorFrom: 'from-pink-400',
        colorTo: 'to-red-500',
    },
    {
        id: 'support',
        title: '24/7 Online Support',
        desc: 'Live chat and message support available for orders, returns and any inquiries.',
        icon: Headphones,
        colorFrom: 'from-indigo-400',
        colorTo: 'to-violet-500',
    },
]

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
    hover: { scale: 1.03, y: -6, transition: { duration: 0.2 } },
}

export default function FeaturesPage() {
    const [showPolicy, setShowPolicy] = useState(false)
    const [showHow, setShowHow] = useState(false)
    const [expandedReason, setExpandedReason] = useState(null)

    const validReasons = [
        'Item is defective or not working',
        'The item is fake or counterfeit',
        'Component or accessory missing',
        'Missing freebie from the order',
        'Item does not match description or picture',
        'I did not order this size',
        'Received the wrong item',
        'Item does not fit me',
        'Item is damaged / broken / dented / scratched',
        'Change of mind (selected items only)',
        'One or more items from my order are missing',
        'Received expired items',
        'Order marked delivered but not received',
        'Received empty parcel',
    ]

    return (
        <main className="min-h-screen bg-white text-gray-800 py-10 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="text-center mb-10">
                    <h1 className="sm:text-3xl text-2xl md:text-4xl font-extrabold">
                        Fast, Secure & Trusted Services
                    </h1>
                    <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                        These features make your shopping simple, secure and fast. If you have any questions — contact our Support team.
                    </p>
                </header>

                {/* Feature cards */}
                <motion.section
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                    aria-label="features"
                >
                    {features.map((f) => {
                        const Icon = f.icon
                        return (
                            <motion.article
                                key={f.id}
                                variants={cardVariant}
                                whileHover="hover"
                                className="relative rounded-2xl bg-gray-50 shadow-sm overflow-hidden border border-gray-100"
                                role="region"
                                aria-labelledby={`feature-${f.id}`}
                            >
                                <div
                                    className={`absolute -top-6 left-6 w-16 h-16 rounded-full opacity-40 ${f.colorFrom} ${f.colorTo} bg-gradient-to-br`}
                                    style={{ filter: 'blur(20px)' }}
                                    aria-hidden="true"
                                />
                                <div className="p-6 pt-10">
                                    <div className="flex items-start gap-4">
                                        <div className={`flex-shrink-0 rounded-lg p-3 bg-gradient-to-br ${f.colorFrom} ${f.colorTo} text-white shadow-lg`} aria-hidden="true">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 id={`feature-${f.id}`} className="text-lg font-semibold text-gray-900">
                                                {f.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-xs text-gray-800 font-medium">Trusted</span>
                                            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-xs text-gray-800 font-medium">Secure</span>
                                        </div>

                                        {/* For refund card provide quick link */}
                                        {f.id === 'refund' && (
                                            <button
                                                onClick={() => setShowPolicy(true)}
                                                className="text-sm px-3 py-1 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
                                            >
                                                Read Policy
                                            </button>
                                        )}
                                    </div>

                                    <div className="mt-4 text-xs text-gray-500">
                                        <span className="font-semibold">Note:</span> Terms & conditions apply.
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0"
                                    aria-hidden="true"
                                />
                            </motion.article>
                        )
                    })}
                </motion.section>

                {/* CTA */}
                <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900">Millions trust our services</h4>
                        <p className="text-sm text-gray-600 mt-1">Order today — we deliver fast and safely.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/components/products" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow">Shop Now</Link>
                        <Link href="/components/contact" className="px-4 py-2 bg-transparent border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition">Contact</Link>
                    </div>
                </div>

                {/* HOW TO RETURN (toggle) */}
                <section className="mt-10 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">How to Return a Product?</h2>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setShowHow(!showHow)} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md">
                                {showHow ? 'Hide' : 'Show'}
                            </button>
                            <button onClick={() => setShowPolicy(true)} className="px-3 py-1 bg-gray-50 text-gray-700 rounded-md border">Returns Policy</button>
                        </div>
                    </div>

                    {showHow && (
                        <div className="mt-4 text-sm text-gray-700 space-y-3">
                            How to Return a Product?
                            Sign in to your Daraz Account, then go to the "Account" option on the bottom of your homepage.
                            Tap on "View All Orders" at the top of the page.
                            Under the "All" section, scroll up or down to the order you want to return.
                            Tap on the "Return/Refund" option for the relevant order.
                            Select the type of return problem you're facing.
                            Fill out the Online Return Form with all the relevant information and proof.
                            Select Pick Up or Drop Off as per your preference.
                            Submit the request, after reading the Return/Refund policy.
                            Head to your nearest drop-off point or wait for collection by our pick-up service. Ensure that your contact information is correct and available to avail our pickup services.
                            You can view your return tracking number as soon as you have filled the Online Return Form and logged your return request.

                            Conditions on Returning the Product
                            To ensure a smooth and hassle-free return process, please review the requirements below:
                            The product must be in its original condition—unused, unworn, unwashed, and free of any flaws. For fashion items, feel free to try them on to check the size, as this counts as unworn.
                            Make sure you include the original tags, user manuals, warranty cards, freebies, invoice, and any accessories that came with the product.
                            Please return the product in its original, undamaged manufacturer's packaging or box. If the product was delivered in Daraz packaging/box, kindly use the same packaging/box for the return. To avoid damage, do not tape or place stickers directly on the manufacturer's packaging/box.
                            If your returned item does not meet these requirements, we may not be able to process your refund request.
                            Important Reminder:
                            If your return request is rejected, the item will be sent back to you within 4-6 days, after the Quality Check Process.
                            After three failed delivery attempts, the item will be marked as scrap, and no refund will be provided.
                            We appreciate your understanding and cooperation in following these guidelines to ensure a smooth process. If you have any questions, feel free to contact our support team — we're always here to help!

                        </div>
                    )}
                </section>

                {/* Returns Policy Modal (simple inline expandable panel for accessibility) */}
                {showPolicy && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-auto max-h-[90vh] border border-gray-200">
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-2xl font-bold">Returns Policy — Free & Easy Returns</h3>
                                        <p className="text-sm text-gray-600 mt-2">This Returns Policy applies to purchases made through the platform. Requests must be raised within 7 days from date of delivery (for most items).</p>
                                    </div>
                                    <div>
                                        <button onClick={() => setShowPolicy(false)} className="text-sm px-3 py-1 bg-gray-100 rounded">Close</button>
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <section className="prose prose-sm max-w-none text-gray-700">
                                    Returns Policy
                                    Free & Easy Returns Policy
                                    This Returns Policy applies to all purchases made through the Daraz platform.
                                    Customers can filr a return on any item purchased from Daraz but only selected items can be returned (as per the case), and the requests can be submitted through the platform. This Policy helps customers and sellers understand the conditions for such returns and how Daraz processes the return requests.
                                    Daraz reserve the right to amend, vary or modify these terms at any time, without giving prior notice to the customers and the sellers.
                                    The return request must be raised within 14 days from the date of delivery (for all items).
                                    Customers are responsible for ensuring that the correct item is properly packed and returned, along with any included gifts, accessories, or peripherals, if applicable. If an incorrect or incomplete return is sent to the seller or Daraz, customers will not receive the replacement item; they'll have to place a new order.
                                    All Daraz Mall items are 100% authentic and covered under the 3x Money Back Guarantee.
                                    Groceries and Digital Goods are excluded from the 3x Money Back Guarantee.
                                    Warranty After Usage
                                    For electronic appliances and mobile phones, if issues arise after usage or after the return period ends, please check if the product is covered under seller warranty or brand warranty.
                                    For purchases under Daraz Like New:
                                    Phones → 3-Month Warranty
                                    Laptops & Tablets → 6-Month Warranty
                                    Refer to the Warranty Policy for full terms and conditions.
                                    Valid Reasons To Return An Item
                                    Item is defective or not working
                                    The item is fake or is a counterfeit item
                                    Component or accessory is missing from the item
                                    Item has missing freebie
                                    Item does not match description or picture
                                    I did not order this size
                                    I received the wrong item
                                    Item does not fit me
                                    Item is damaged/broken/has dent or scratches
                                    I do not want this item anymore i.e., Change of Mind (on selected items)
                                    One or More Items from my Order are Missing
                                    Received Expired Items
                                    Order Not Received but Marked as Delivered
                                    Received Empty Parcel
                                    Change Of Mind Policy
                                    One of the return reasons available to you is 'I don't want this item anymore,' which means you're returning the product because it is no longer needed. This can cover situations like a delay in delivery, a change of mind, or finding the same product at a better price elsewhere. However, this reason doesn't apply to every product category.

                                    You can return eligible items within the specified return period, as long as they meet the conditions outlined in our Change of Mind Returns policy. For clarity, items that qualify for Change of Mind returns will be clearly mentioned on their Product Description Page (PDP). However, please note that items listed as non-returnable are not eligible for Change of Mind returns. We’re here to help ensure your shopping experience is hassle-free!

                                    To make things easier for you, the table below gives a general overview of the categories where Change of Mind returns may be acceptable. However, some sub-categories may have exceptions. We strongly urge customers to check the Product Display Page (PDP) carefully before placing your order to avoid any confusion.

                                    Refund Policy
                                    Note: Please note that this policy does not apply to Daraz Global products.

                                    At Daraz, we aim to make the refund process as straightforward and transparent as possible. Whether you've changed your mind or received an item that didn't meet your expectations, we offer various refund options to suit your needs. On this page, you'll find everything you need to know about refund types, eligibility, timelines, and methods to ensure a smooth and hassle-free experience.

                                    When are you Eligible for a Refund?
                                    The Customers' eligibility for a refund and when the refund is processed/received depends on several factors, including but not limited to, Daraz's Return Policy, Terms and Conditions under this Policy and customers’ payment methods.
                                    In general most items can be returned for a refund/replacement within 14 days of delivery as long as the items are in original and unused condition, subject to the terms of this Policy.
                                    Refunds are usually made through the payment method as given in below. In some circumstances, an alternative refund method may be used (e.g. Daraz Wallet)
                                    What are the Different Types of Refunds Offered by Daraz?
                                    The refund process at Daraz varies depending on the type of refund case. Here's an overview:

                                    Refunds for Returns: Once your returned item reaches our warehouse and successfully clears the Quality Check (QC), the refund process will be initiated.
                                    Refunds for Canceled Orders: If your order is canceled, the refund is automatically processed once the cancellation request is successfully completed.
                                    Refunds for Failed Deliveries: In cases of failed deliveries, the refund process begins as soon as the item is returned to the seller. Please note that the timeline may vary depending on the location of your shipping address.
                                    Refunds for Refund Only: These are cases where the is presented with an issue where a physical return of the product is not possible like the customer hasn't received the item at all, the item is expired, the package is empty, or one or more items in the parcel are missing. In this case, the customer will file a return, submit proofs in the form of pictures, Daraz will review it, and process a refund if the case is valid.
                                    How Are Your Refunds Processed?
                                    The Refund process first starts by checking your order's refund eligibility (which is based on your whole return case). If your product is eligible for a refund, the tables below will guide you about Refund Timelines, Refund Methods, and Refund Mechanisms.

                                    The shipping fee is refunded along with the amount paid for your returned product.

                                    The time required to complete a refund depends on the refund method you have selected. The refund time starts once the Quality Check is completed. (For quality check timelines refer tables below)
                                </section>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button onClick={() => setShowPolicy(false)} className="px-4 py-2 bg-gray-100 rounded">Close</button>
                                    <a href="/components/contact" className="px-4 py-2 bg-blue-600 text-white rounded">Contact Support</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </main>
    )
}
