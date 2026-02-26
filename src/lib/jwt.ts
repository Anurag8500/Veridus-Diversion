import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("Please define the JWT_SECRET environment variable in .env.local");
}

export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

/**
 * Signs a JWT token with the given payload.
 * Expires in 7 days.
 */
export function signToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verifies and decodes a JWT token.
 * Returns the decoded payload or null if invalid.
 */
export function verifyToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
        console.error("JWT verification failed");
        return null;
    }
}
