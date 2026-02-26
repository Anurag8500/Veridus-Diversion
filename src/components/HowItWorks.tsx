"use client";

import { motion, Variants } from "framer-motion";

export function HowItWorks() {
    const steps = [
        {
            num: "01",
            title: "Institution uploads academic degree information.",
            desc: "Secure intake of verified credentials directly from the issuing institution."
        },
        {
            num: "02",
            title: "Credential is securely registered and recorded.",
            desc: "Information is hashed and immutably stored on the blockchain."
        },
        {
            num: "03",
            title: "Student receives a permanent digital credential.",
            desc: "A tamper-proof digital wallet item that belongs to the student forever."
        },
        {
            num: "04",
            title: "Employers or organizations verify the degree instantly.",
            desc: "A single click or scan provides absolute proof of authenticity."
        }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section id="how-it-works" className="py-32 px-6 relative bg-background-base">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-text-primary mb-6">
                        How VERIDUS Works
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl">
                        A seamless, secure pipeline from issuance to verification. Four steps to absolute trust.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
                >
                    {steps.map((step, idx) => (
                        <motion.div variants={itemVariants} key={idx} className="relative group">
                            {/* Animated connecting line for larger screens */}
                            {idx !== steps.length - 1 && (
                                <div className="hidden lg:block absolute top-10 left-[calc(100%-2rem)] w-[calc(100%+0.5rem)] h-[1px] bg-border-base z-0 overflow-hidden">
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        whileInView={{ x: "0%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 + (idx * 0.2), ease: "easeInOut" }}
                                        className="w-full h-full bg-brand/50"
                                    />
                                </div>
                            )}

                            <div className="bg-background-elevated/80 backdrop-blur-md border border-border-base p-8 rounded-3xl h-full relative z-10 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgb(255,255,255,0.04)] hover:-translate-y-2">
                                <span className="text-sm font-mono text-text-tertiary mb-8 block px-3 py-1 rounded-full bg-white/5 w-max group-hover:bg-white/10 group-hover:text-text-primary transition-colors">
                                    Step {step.num}
                                </span>
                                <h3 className="text-xl font-medium text-text-primary mb-4 leading-snug">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-primary/80 transition-colors">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
