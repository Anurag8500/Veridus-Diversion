import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Degree from "@/models/Degree";

/**
 * Public API endpoint for credential verification.
 * Anyone can access this endpoint to verify a degreeId.
 * GET /api/verify/[degreeId]
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ degreeId: string }> }
) {
    try {
        await connectDB();
        const resolvedParams = await params;
        const degreeId = resolvedParams.degreeId;

        // 1. Fetch degree and populate institution name
        const degree = await Degree.findOne({ degreeId })
            .populate("universityId", "name")
            .lean();

        // 2. Handle missing credential
        if (!degree) {
            return NextResponse.json(
                { success: false, message: "Credential not found" },
                { status: 404 }
            );
        }

        // 3. Construct safe response (excluding sensitive ObjectIds/IDs)
        const safeCredential = {
            degreeId: degree.degreeId,
            studentName: degree.studentName,
            degreeTitle: degree.degreeTitle,
            branch: degree.branch,
            issueDate: degree.issueDate,
            status: degree.status,
            institutionName: (degree.universityId as any)?.name || "Unknown Institution"
        };

        return NextResponse.json(
            {
                success: true,
                credential: safeCredential
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("[PUBLIC VERIFY API ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Internal server error during verification" },
            { status: 500 }
        );
    }
}
