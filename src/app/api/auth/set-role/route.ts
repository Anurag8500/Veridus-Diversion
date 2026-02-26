import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    try {
        const { role } = await req.json();

        if (!role || !["student", "institution"].includes(role)) {
            return NextResponse.json(
                { success: false, message: "Invalid role selected" },
                { status: 400 }
            );
        }

        // Get the user ID from the NextAuth token
        const token = await getToken({ 
            req, 
            secret: process.env.NEXTAUTH_SECRET 
        });

        if (!token || !token.userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        const user = await User.findById(token.userId);
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Update user role in database
        user.role = role;
        await user.save();

        // Note: NextAuth's token will naturally update on the next request 
        // because we fetch the role in the jwt callback (if we refactor it to do so)
        // or the client can trigger a session refresh.

        return NextResponse.json(
            { success: true, message: "Role updated successfully", role: user.role },
            { status: 200 }
        );
    } catch (error) {
        console.error("[SET ROLE ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
