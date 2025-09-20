// app/api/products/visit/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDb"; // তুমি আগে যে helper ব্যবহার করছো
import products from "@/models/products";

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { id } = body;
        if (!id) return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });

        await connectDB();

        // increment viewCount atomically and return new value
        const updated = await products.findByIdAndUpdate(
            id,
            { $inc: { viewCount: 1 } },
            { new: true, projection: { viewCount: 1 } }
        );

        if (!updated) return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });

        return NextResponse.json({ success: true, viewCount: updated.viewCount });
    } catch (err) {
        console.error("Visit increment error:", err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
