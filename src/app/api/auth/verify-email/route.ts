import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Token is required." },
                { status: 400 }
            );
        }

        await connectDB();

        // Check User collection
        const user = await User.findOne({
            emailVerificationToken: token,
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid verification link." },
                { status: 400 }
            );
        }

        // Check if token has expired
        if (user.emailVerificationExpires && user.emailVerificationExpires < new Date()) {
            return NextResponse.json(
                { success: false, message: "Verification link has expired." },
                { status: 410 }
            );
        }

        // Verify email
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        return NextResponse.json(
            {
                success: true,
                message: "Email verified successfully.",
                role: user.role,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[VERIFY EMAIL ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
