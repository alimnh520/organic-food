import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
        },
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        productImage: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        deliveryCharge: {
            type: Number,
            required: true,
            default: 0, // ডিফল্ট ডেলিভারি চার্জ 0
            min: 0,
        },
        referCode: {
            type: String,
            trim: true,
            default: null, // রেফার কোড দিতে না চাইলে null
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        division: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        upazilla: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        paymentMethod: {
            type: String,
            enum: ["Cash on Delivery", "Bkash", "Nagad"],
            default: "Cash on Delivery",
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "rejected"],
            default: "pending",
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
