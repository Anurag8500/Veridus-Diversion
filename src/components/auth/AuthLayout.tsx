"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-background-base flex flex-col relative overflow-hidden selection:bg-brand-muted selection:text-text-primary">
            {/* Dynamic Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] opacity-[0.06] pointer-events-none">
                <motion.div
                    animate={{
                        rotate: [0, 90, 180, 270, 360],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full bg-gradient-to-tr from-brand to-transparent blur-[120px] rounded-full"
                />
            </div>

            {/* Mini Navbar */}
            <nav className="relative z-10 w-full px-6 h-24 flex items-center justify-between max-w-7xl mx-auto">
                <Link href="/" className="text-xl font-bold tracking-widest text-text-primary uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    VERIDUS
                </Link>
                <Link href="/" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                    Return Home
                </Link>
            </nav>

            {/* Main Form Area */}
            <main className="flex-grow flex items-center justify-center p-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md"
                >
                    <div className="bg-background-elevated/60 backdrop-blur-xl border border-border-base p-8 sm:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-8">
                                <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary mb-3 tracking-tight">
                                    {title}
                                </h1>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    {description}
                                </p>
                            </div>

                            {children}
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
