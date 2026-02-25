"use client";

import { Shield, UserCheck, Zap, QrCode, Building, Globe } from "lucide-react";
import { motion, Variants } from "framer-motion";

export function Features() {
    const features = [
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Tamper-Proof Credentials",
            desc: "Academic records cannot be altered once issued. The blockchain guarantees immutability."
        },
        {
            icon: <UserCheck className="w-6 h-6" />,
            title: "Student Ownership",
            desc: "Students permanently access and control their credentials securely from any device."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Instant Verification",
            desc: "Verification completed within seconds, eliminating weeks of manual background checks."
        },
        {
            icon: <QrCode className="w-6 h-6" />,
            title: "QR-Based Sharing",
            desc: "Credentials can be shared securely using simple URLs or generated QR codes."
        },
        {
            icon: <Building className="w-6 h-6" />,
            title: "Authorized Issuance",
            desc: "Only cryptographically verified institutions hold the authority to issue credentials."
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Global Accessibility",
            desc: "Credentials can be verified from anywhere in the world, at any time."
        }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section id="features" className="py-32 px-6 border-t border-border-subtle bg-background-surface relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand opacity-[0.015] blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-text-primary mb-6">
                        Platform Features
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
                        Built for security, designed for simplicity.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, idx) => (
                        <motion.div
                            variants={itemVariants}
                            key={idx}
                            className="group p-8 rounded-3xl border border-border-base bg-background-elevated hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="w-14 h-14 rounded-2xl bg-brand-muted/50 flex items-center justify-center text-text-primary mb-8 border border-white/5 group-hover:scale-110 group-hover:bg-brand text-background-base group-hover:text-background-base transition-all duration-300">
                                <div className="group-hover:text-background-base text-white">{feature.icon}</div>
                            </div>
                            <h3 className="text-xl font-medium text-text-primary mb-4 group-hover:text-glow transition-all">
                                {feature.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed group-hover:text-text-primary/90 transition-colors">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
