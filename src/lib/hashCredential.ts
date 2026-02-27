import crypto from "crypto";

/**
 * Interface representing the canonical credential data used for hashing.
 */
export interface CredentialData {
    degreeId: string;
    studentName: string;
    degreeTitle: string;
    branch: string;
    issueDate: string | Date;
    institutionName: string;
}

/**
 * Generates a deterministic SHA-256 hash from credential data.
 * 
 * This hash depends only on the following fields:
 * degreeId, studentName, degreeTitle, branch, issueDate, institutionName.
 * 
 * @param data The credential data to hash.
 * @returns A hex-encoded SHA-256 string.
 */
export function generateCredentialHash(data: CredentialData): string {
    // 1. Construct canonical object in strict deterministic order
    const canonicalObject = {
        degreeId: data.degreeId,
        studentName: data.studentName,
        degreeTitle: data.degreeTitle,
        branch: data.branch,
        issueDate: data.issueDate instanceof Date 
            ? data.issueDate.toISOString() 
            : data.issueDate,
        institutionName: data.institutionName
    };

    // 2. Convert to deterministic string
    const canonicalString = JSON.stringify(canonicalObject);

    // 3. Compute SHA-256 hash
    return crypto
        .createHash("sha256")
        .update(canonicalString)
        .digest("hex");
}
