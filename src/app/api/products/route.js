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
        const category = formData.get("category");
        const discount = formData.get("discount") || 0;
        const delivery_charge = formData.get("delivery_charge") || 0; // ✅ নতুন
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
            discount: Number(discount) || 0,
            delivery_charge: Number(delivery_charge) || 0, // ✅ সেভ করা
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
        const formData = await request.formData();

        const id = formData.get("id");
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));
        const discount = Number(formData.get("discount")) || 0;
        const deliveryCharge = Number(formData.get("delivery_charge")) || 0; // ✅ নতুন
        const category = formData.get("category");
        const image_id = formData.get("image_id"); // পুরোনো ইমেজ আইডি
        const newImage = formData.get("newImage"); // নতুন ইমেজ ফাইল

        if (!id || isNaN(price) || isNaN(stock)) {
            return NextResponse.json({ success: false, message: "⚠️ দাম এবং স্টক দিন" });
        }

        // আপডেট ডাটা
        const updateData = { price, stock, discount, delivery_charge: deliveryCharge };
        if (category) updateData.category = category;

        // ✅ নতুন ছবি থাকলে পুরোনো ডিলিট + নতুন আপলোড
        let updatedImageUrl = null;
        let updatedImageId = null;

        if (newImage && newImage.size > 0) {
            // পুরোনো ইমেজ ডিলিট করো
            if (image_id) {
                await cloudinary.uploader.destroy(image_id, { resource_type: "image" });
            }

            // নতুন ইমেজ আপলোড করো
            const uploadResult = await UploadImage(newImage); // { secure_url, public_id } রিটার্ন করবে
            updatedImageUrl = uploadResult.secure_url;
            updatedImageId = uploadResult.public_id;

            updateData.product_image = updatedImageUrl;
            updateData.image_id = updatedImageId;
        }

        const collection = await getCollection("products");
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

        return NextResponse.json({
            success: true,
            message: "✅ পণ্য আপডেট হয়েছে!",
            updatedImage: updatedImageUrl,
            updatedImageId: updatedImageId,
        });
    } catch (err) {
        console.error("PATCH error:", err);
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
