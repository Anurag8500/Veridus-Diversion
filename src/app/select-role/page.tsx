"use client";

import { useState, useEffect } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { useRouter } from "next/navigation";
import { User as UserIcon, Building2, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SelectRolePage() {
    const router = useRouter();
    const { update } = useSession();
    const [role, setRole] = useState<"student" | "institution">("student");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleConfirm = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/set-role", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role }),
            });

            const data = await response.json();

            if (response.ok) {
                // Update the NextAuth session with the new role
                await update({ role });

                // Redirect based on the set role
                const targetPath = role === "student" 
                    ? "/dashboard/student/overview" 
                    : "/dashboard/institution/overview";
                
                router.push(targetPath);
                router.refresh();
            } else {
                setError(data.message || "Failed to set role");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Choose Your Role"
            description="Complete your profile by selecting your role on VERIDUS."
        >
            <div className="space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <div className="p-1 bg-background-surface border border-border-base rounded-xl flex">
                    <button
                        onClick={() => setRole("student")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-lg transition-all ${
                            role === "student"
                                ? "bg-brand text-background-base shadow-lg"
                                : "text-text-secondary hover:text-text-primary"
                        }`}
                    >
                        <UserIcon className="w-5 h-5" /> Student
                    </button>
                    <button
                        onClick={() => setRole("institution")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-lg transition-all ${
                            role === "institution"
                                ? "bg-brand text-background-base shadow-lg"
                                : "text-text-secondary hover:text-text-primary"
                        }`}
                    >
                        <Building2 className="w-5 h-5" /> Institution
                    </button>
                </div>

                <div className="bg-background-surface/50 border border-border-subtle rounded-2xl p-6 text-center">
                    <p className="text-text-secondary text-sm leading-relaxed">
                        {role === "student" 
                            ? "As a student, you can access your verified credentials and share them securely with institutions."
                            : "As an institution, you can issue digital degrees and verify academic records for students."
                        }
                    </p>
                </div>

                <button 
                    onClick={handleConfirm}
                    disabled={loading}
                    className="w-full bg-brand text-background-base rounded-xl py-3.5 px-4 font-medium hover:bg-brand-hover hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Saving Role...
                        </>
                    ) : (
                        <>
                            Continue to {role === "student" ? "Student" : "Institution"} Dashboard <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
        </AuthLayout>
    );
}
