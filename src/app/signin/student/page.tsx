"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";

export default function StudentSignIn() {
    return (
        <AuthLayout
            title="Student Login"
            description="Sign in to view and manage your verified academic credentials."
        >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-tertiary">
                                <User className="h-4 w-4" />
                            </div>
                            <input
                                type="email"
                                className="w-full bg-background-surface border border-border-base rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Password</label>
                            <Link href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                                Forgot Password?
                            </Link>
                        </div>
                        <input
                            type="password"
                            className="w-full bg-background-surface border border-border-base rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button className="w-full mt-6 bg-brand text-background-base rounded-xl py-3.5 px-4 font-medium hover:bg-brand-hover hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2">
                    Access My Credentials <ArrowRight className="w-4 h-4" />
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col gap-4 text-center">
                <p className="text-sm text-text-secondary">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup/student" className="text-text-primary hover:text-brand font-medium transition-colors">
                        Create Student Account
                    </Link>
                </p>
                <p className="text-sm text-text-tertiary">
                    Institution login?{" "}
                    <Link href="/signin/university" className="text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4">
                        Sign in as University
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
