// app/api/products/visit/route.js
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongoClient";

export async function PATCH(request) {
    try {
        const collection = await getCollection("admin");
        await collection.updateOne(
            { _id: new ObjectId('68cb0578a9e815a9c3f030dd') },
            { $inc: { visitor: 1 } },
            { new: true, projection: { visitor: 1 } }
        );

        return NextResponse.json({ success: true, message: 'success' });
    } catch (err) {
        console.error("Visit increment error:", err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
export async function GET() {
    try {
        const collection = await getCollection("admin");
        const data = await collection.find({}).toArray();
        console.log(data[0].visitor);

        return NextResponse.json({ message: data[0].visitor, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}
