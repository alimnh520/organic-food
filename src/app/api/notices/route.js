import { getCollection } from "@/lib/mongoClient";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.json();

        const collection = await getCollection('notices');
        await collection.updateOne({}, { $set: { text: data } });

        return NextResponse.json({ success: true, message: "📢 নোটিশ সফলভাবে প্রকাশিত হয়েছে!" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'success', success: false });
    }
}

export async function GET(req) {
    try {
        const collection = await getCollection('notices');
        const data = await collection.find({}).toArray();
        return NextResponse.json({ success: true, message: data[0] });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'success', success: false });
    }
}
