import { connectDB } from "@/lib/connectDb";
import { getCollection } from "@/lib/mongoClient";
import notification from "@/models/notification";
import Order from "@/models/orders";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {
            productId,
            productName,
            productImage,
            price,
            quantity,
            totalPrice,
            name,
            mobile,
            division,
            district,
            upazilla,
            address,
            paymentMethod,
            date
        } = await request.json();

        // Validation
        if (!name || !mobile || !division || !district || !upazilla || !address) {
            return NextResponse.json({ message: 'সকল তথ্য দিন', success: false });
        }

        await connectDB();

        const saveNotify = new notification({
            title: `${productName} এর অর্ডার এসেছে!`
        });
        await saveNotify.save();

        const saveOrder = new Order({
            productId,
            productName,
            productImage,
            price,
            quantity,
            totalPrice,
            name,
            mobile,
            division,
            district,
            upazilla,
            address,
            paymentMethod: paymentMethod || "Cash on Delivery",
            date: date || new Date().toISOString(),
            status: "pending" // ডিফল্ট স্ট্যাটাস রাখলাম
        });

        await saveOrder.save();

        return NextResponse.json({ message: 'অর্ডার সফল হয়েছে 🎉', success: true });

    } catch (error) {
        console.error("Order API error:", error);
        return NextResponse.json({ message: 'সার্ভারে সমস্যা হয়েছে 😢', success: false });
    }
}

export async function GET() {
    try {
        const collection = await getCollection("orders");
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'সার্ভারে সমস্যা', success: false });
    }
}

export async function PATCH(request) {
    try {
        const { orderId, status } = await request.json();
        const collection = await getCollection("orders");
        await collection.findOneAndUpdate({ _id: new ObjectId(orderId) }, {
            $set: {
                status
            }
        });
        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'সার্ভারে সমস্যা', success: false });
    }
}