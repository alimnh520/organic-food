import { connectDB } from "@/lib/connectDb";
import { getCollection } from "@/lib/mongoClient";
import notification from "@/models/notification";
import Order from "@/models/orders";
import products from "@/models/products";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {
            productId,
            quantity,
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

        const product = await products.findById(productId);
        if (!product) {
            return NextResponse.json({ message: 'পণ্য পাওয়া যায়নি', success: false });
        }

        const pricePerUnit = product.discountedPrice > 0 ? product.discountedPrice : product.price;
        const deliveryCharge = product.delivery_charge || 0;

        const finalTotalPrice = pricePerUnit * quantity + deliveryCharge;

        // Notify
        const saveNotify = new notification({
            title: `${product.product_name} এর অর্ডার এসেছে!`
        });
        await saveNotify.save();

        // Save Order
        const saveOrder = new Order({
            productId,
            productName: product.product_name,
            productImage: product.product_image,
            price: pricePerUnit,
            quantity,
            totalPrice: finalTotalPrice,
            deliveryCharge,             // 🟢 ডেলিভারি চার্জ
            name,
            mobile,
            division,
            district,
            upazilla,
            address,
            paymentMethod: paymentMethod || "Cash on Delivery",
            date: date || new Date(),
            status: "pending"
        });

        await saveOrder.save();

        await products.updateOne(
            { _id: productId },
            { $inc: { soldCount: quantity } }
        );

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