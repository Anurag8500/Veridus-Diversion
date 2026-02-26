import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password, role } = body;

        // Validate required fields
        if (!name || !email || !password || !role) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate role
        if (!["student", "institution"].includes(role)) {
            return NextResponse.json(
                { success: false, message: "Invalid role selected" },
                { status: 400 }
            );
        }

        await connectDB();

        // Check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return NextResponse.json(
                { success: false, message: "Account already exists with this email." },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Create user
        await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role,
            isEmailVerified: false,
            emailVerificationToken: verificationToken,
            emailVerificationExpires: verificationExpires,
        });

        // Send verification email
        await sendVerificationEmail(email.toLowerCase(), verificationToken);

        return NextResponse.json(
            { success: true, message: "Verification email sent. Please check your inbox." },
            { status: 201 }
        );
    } catch (error) {
        console.error("[SIGNUP ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
