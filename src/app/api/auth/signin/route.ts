import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        await connectDB();

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Check if email is verified
        if (!user.isEmailVerified) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please verify your email before signing in.",
                },
                { status: 403 }
            );
        }

        // Generate JWT
        const token = signToken({
            userId: (user._id as string).toString(),
            email: user.email,
            role: user.role,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Logged in successfully",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[SIGNIN ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
