import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Degree from "@/models/Degree";
import { generateCredentialHash } from "@/lib/hashCredential";

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

        const institutionName = (degree.universityId as any)?.name || "Unknown Institution";
        let verificationStatus = degree.status;

        // 3. Perform Hash Integrity Check (Tamper-proofing)
        if (degree.credentialHash) {
            const calculatedHash = generateCredentialHash({
                degreeId: degree.degreeId,
                studentName: degree.studentName,
                degreeTitle: degree.degreeTitle,
                branch: degree.branch,
                issueDate: degree.issueDate,
                institutionName: institutionName
            });

            if (calculatedHash !== degree.credentialHash) {
                verificationStatus = "TAMPERED";
            }
        }

        // 4. Construct safe response (excluding sensitive ObjectIds/IDs)
        const safeCredential = {
            degreeId: degree.degreeId,
            studentName: degree.studentName,
            degreeTitle: degree.degreeTitle,
            branch: degree.branch,
            issueDate: degree.issueDate,
            status: verificationStatus,
            institutionName: institutionName,
            isAuthentic: verificationStatus !== "TAMPERED"
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
