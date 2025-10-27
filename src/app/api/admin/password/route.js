// app/api/admin/change-password/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getCollection } from '@/lib/mongoClient';
import { ObjectId } from 'mongodb';

export async function POST(req) {
    try {
        const body = await req.json();
        const { newPassword } = body || {};

        if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
            return NextResponse.json({ success: false, message: 'পাসওয়ার্ড অন্তত 8 অক্ষরের হতে হবে।' }, { status: 400 });
        }

        const collection = await getCollection('admin');

        await collection.updateOne(
            { _id: new ObjectId('68cb0578a9e815a9c3f030dd') },
            { $set: { password: newPassword } }
        );

        const response = NextResponse.json({ success: true, message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।' });
        response.cookies.delete('abdullahonlineshop');
        return response;

    } catch (err) {
        console.error('Change password error:', err);
        return NextResponse.json({ success: false, message: 'সার্ভার এরর।' }, { status: 500 });
    }
}
