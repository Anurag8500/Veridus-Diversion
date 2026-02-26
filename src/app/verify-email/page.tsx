"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("Verifying your email...");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Invalid verification link.");
            return;
        }

        const verifyEmail = async () => {
            try {
                const response = await fetch("/api/auth/verify-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();

                if (response.ok) {
                    setStatus("success");
                    setMessage(data.message || "Email verified successfully. You may now sign in.");
                } else {
                    setStatus("error");
                    setMessage(data.message || "Verification failed");
                }
            } catch (error) {
                setStatus("error");
                setMessage("An unexpected error occurred. Please try again later.");
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <AuthLayout
            title="Email Verification"
            description="Activating your VERIDUS account."
        >
            <div className="flex flex-col items-center justify-center py-8 text-center">
                {status === "loading" && (
                    <div className="space-y-4">
                        <Loader2 className="w-12 h-12 text-brand animate-spin mx-auto" />
                        <p className="text-text-primary font-medium">{message}</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="space-y-6">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-text-primary">Success!</h3>
                            <p className="text-text-secondary">{message}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link 
                                href="/signin" 
                                className="w-full bg-brand text-background-base rounded-xl py-3 px-6 font-medium hover:bg-brand-hover transition-all flex items-center justify-center gap-2"
                            >
                                Go to Sign In <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                )}

                {status === "error" && (
                    <div className="space-y-6">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-text-primary">Verification Failed</h3>
                            <p className="text-text-secondary">{message}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link 
                                href="/signup" 
                                className="w-full bg-brand text-background-base rounded-xl py-3 px-6 font-medium hover:bg-brand-hover transition-all flex items-center justify-center gap-2"
                            >
                                Back to Signup <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AuthLayout>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <AuthLayout title="Email Verification" description="Loading...">
                <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="w-12 h-12 text-brand animate-spin mx-auto" />
                </div>
            </AuthLayout>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}
