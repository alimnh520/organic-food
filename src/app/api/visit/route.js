// app/api/products/visit/route.js
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongoClient";

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { id } = body;
        if (!id) return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });

        const collection = await getCollection("products");

        await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { viewCount: 1 } },
            { new: true, projection: { viewCount: 1 } }
        );

        return NextResponse.json({ success: true, message: 'success' });
    } catch (err) {
        console.error("Visit increment error:", err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
