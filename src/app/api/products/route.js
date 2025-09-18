import { UploadImage } from "@/cloudinary/cloudUpload";
import { connectDB } from "@/lib/connectDb";
import { getCollection } from "@/lib/mongoClient";
import products from "@/models/products";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import cloudinary from "@/cloudinary/cloudConfig";

export async function POST(req) {
    try {

        const formData = await req.formData();
        const name = formData.get("name");
        const price = formData.get("price");
        const stock = formData.get("stock");
        const details = formData.get("details");
        const image = formData.get("image");

        const imageResult = await UploadImage(image);

        await connectDB();

        const saveProduct = new products({
            product_name: name,
            product_image: imageResult.secure_url,
            image_id: imageResult.public_id,
            price,
            stock,
            details
        });
        await saveProduct.save();

        return NextResponse.json({ success: true, message: "✅ পণ্য সফলভাবে যোগ করা হয়েছে!" });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'success', success: false });
    }

}

export async function GET() {
    try {
        const collection = await getCollection("products");
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'success', success: false });
    }
}


export async function PATCH(request) {
    try {
        const { price, stock, id } = await request.json();

        if (price == null || stock == null) {
            return NextResponse.json({ success: false, message: "দাম এবং স্টক দিন" });
        }

        const collection = await getCollection("products");
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: { price, stock } });

        return NextResponse.json({ success: true, message: "পণ্য আপডেট হয়েছে!" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "সার্ভার এরর" });
    }
}

export async function DELETE(request) {
    try {
        const { id, image_id } = await request.json();
   
        await cloudinary.uploader.destroy(image_id, {
            resource_type: 'image',
        });

        const collection = await getCollection("products");
        await collection.deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ success: true, message: "পণ্য ডিলেট হয়েছে!" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "সার্ভার এরর" });
    }
}