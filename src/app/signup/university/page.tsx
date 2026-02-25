"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

export default function UniversitySignUp() {
    return (
        <AuthLayout
            title="Create University Account"
            description="Register your institution to begin issuing verified academic credentials through VERIDUS."
        >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Institution Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-tertiary">
                                <Building2 className="h-4 w-4" />
                            </div>
                            <input
                                type="text"
                                className="w-full bg-background-surface border border-border-base rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                                placeholder="e.g. Stanford University"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Official Institution Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-background-surface border border-border-base rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                            placeholder="admin@university.edu"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            className="w-full bg-background-surface border border-border-base rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full bg-background-surface border border-border-base rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button className="w-full mt-6 bg-brand text-background-base rounded-xl py-3.5 px-4 font-medium hover:bg-brand-hover hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2">
                    Create Account <ArrowRight className="w-4 h-4" />
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col gap-4 text-center">
                <p className="text-sm text-text-secondary">
                    Already registered?{" "}
                    <Link href="/signin/university" className="text-text-primary hover:text-brand font-medium transition-colors">
                        Sign in as University
                    </Link>
                </p>
                <p className="text-sm text-text-tertiary">
                    Are you a student?{" "}
                    <Link href="/signin/student" className="text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4">
                        Sign in here
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
