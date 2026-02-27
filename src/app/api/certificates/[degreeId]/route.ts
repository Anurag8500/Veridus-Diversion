import connectDB from "@/lib/mongodb";
import Degree from "@/models/Degree";
import { generateCertificate } from "@/lib/certificateGenerator";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ degreeId: string }> }
) {
    try {
        await connectDB();
        const resolvedParams = await params;
        const degreeId = resolvedParams.degreeId;

        // 1. Fetch degree from database
        const degree = await Degree.findOne({
            degreeId: degreeId,
        })
        .populate("universityId", "name")
        .lean();

        // 2. Return 404 if degree doesn't exist
        if (!degree) {
            return NextResponse.json(
                { success: false, message: "Certificate not found" },
                { status: 404 }
            );
        }

        // 3. Define the file path for the certificate
        const filePath = path.join(process.cwd(), "storage", "certificates", `${degreeId}.pdf`);

        // 4. Generate the certificate if it doesn't already exist
        if (!fs.existsSync(filePath)) {
            await generateCertificate(degree);
        }

        // 5. Read the PDF file
        const pdfBuffer = fs.readFileSync(filePath);

        // 6. Return the PDF as an inline response
        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="${degreeId}.pdf"`,
            },
        });
    } catch (error: any) {
        console.error("[CERTIFICATE API ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
