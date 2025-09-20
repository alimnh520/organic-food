import { UploadImage } from "@/cloudinary/cloudUpload";
import { connectDB } from "@/lib/connectDb";
import { getCollection } from "@/lib/mongoClient";
import products from "@/models/products";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import cloudinary from "@/cloudinary/cloudConfig";

// 🟢 নতুন প্রোডাক্ট যোগ
export async function POST(req) {
    try {
        const formData = await req.formData();
        const name = formData.get("name");
        const price = formData.get("price");
        const stock = formData.get("stock");
        const details = formData.get("details");
        const category = formData.get("category"); // 🆕 ক্যাটাগরি
        const discount = formData.get("discount") || 0; // 🆕 ডিসকাউন্ট (ডিফল্ট 0)
        const image = formData.get("image");

        if (!category) {
            return NextResponse.json({ success: false, message: "⚠️ ক্যাটাগরি নির্বাচন করুন!" });
        }

        const imageResult = await UploadImage(image);

        await connectDB();

        const saveProduct = new products({
            product_name: name,
            product_image: imageResult.secure_url,
            image_id: imageResult.public_id,
            price: Number(price),
            stock: Number(stock),
            details,
            category,
            discount: Number(discount) || 0, // 🆕 ডিসকাউন্ট সেভ
        });

        await saveProduct.save();

        return NextResponse.json({ success: true, message: "✅ পণ্য সফলভাবে যোগ করা হয়েছে!" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}

// 🟢 সব প্রোডাক্ট নিয়ে আসা
export async function GET() {
    try {
        const collection = await getCollection("products");
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}

// 🟢 প্রোডাক্ট আপডেট (price, stock, category, discount)
export async function PATCH(request) {
    try {
        const { price, stock, id, category, discount } = await request.json();

        if (price == null || stock == null) {
            return NextResponse.json({ success: false, message: "⚠️ দাম এবং স্টক দিন" });
        }

        const updateData = { price, stock };
        if (category) updateData.category = category;
        if (discount !== undefined) updateData.discount = Number(discount) || 0;

        const collection = await getCollection("products");
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

        return NextResponse.json({ success: true, message: "✅ পণ্য আপডেট হয়েছে!" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}

// 🟢 প্রোডাক্ট ডিলেট
export async function DELETE(request) {
    try {
        const { id, image_id } = await request.json();

        await cloudinary.uploader.destroy(image_id, { resource_type: "image" });

        const collection = await getCollection("products");
        await collection.deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ success: true, message: "🗑️ পণ্য ডিলেট হয়েছে!" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}
