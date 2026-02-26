"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Loader2, AlertCircle } from "lucide-react";

export default function OAuthSuccess() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [error, setError] = useState("");

    useEffect(() => {
        const handleAuthenticationFlow = async () => {
            // 1. Wait for NextAuth session to be established
            if (status === "loading") return;

            if (status === "unauthenticated") {
                router.replace("/signin");
                return;
            }

            try {
                // 2. Fetch the user profile from database using the NextAuth session
                const meRes = await fetch("/api/me");
                if (!meRes.ok) {
                    throw new Error("Failed to fetch user profile");
                }
                
                const user = await meRes.json();
                
                // 3. Conditional redirection based on role presence
                if (!user.role) {
                    router.replace("/select-role");
                } else if (user.role === "student") {
                    router.replace("/dashboard/student/overview");
                } else if (user.role === "institution") {
                    router.replace("/dashboard/institution/overview");
                } else {
                    router.replace("/");
                }
            } catch (err) {
                console.error("OAuth Post-Login Flow Failed:", err);
                setError("Could not complete authentication. Please try again.");
                setTimeout(() => router.replace("/signin"), 3000);
            }
        };

        handleAuthenticationFlow();
    }, [status, router]);

    return (
        <AuthLayout
            title="Finalizing Login"
            description="Syncing your account details..."
        >
            <div className="flex flex-col items-center justify-center py-12">
                {error ? (
                    <div className="text-center space-y-4">
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-500 text-sm">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <p>{error}</p>
                        </div>
                        <p className="text-text-secondary text-sm">Redirecting to sign in...</p>
                    </div>
                ) : (
                    <>
                        <Loader2 className="w-12 h-12 text-brand animate-spin mb-4" />
                        <p className="text-text-secondary animate-pulse">
                            {status === "loading" ? "Waiting for session..." : "Preparing your dashboard..."}
                        </p>
                    </>
                )}
            </div>
        </AuthLayout>
    );
}
