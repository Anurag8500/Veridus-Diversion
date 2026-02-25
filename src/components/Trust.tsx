"use client";

import { motion, Variants } from "framer-motion";

export function Trust() {
    const qualities = [
        { name: "Secure", desc: "Military-grade encryption for all credential data." },
        { name: "Instant", desc: "Real-time verification without manual delays." },
        { name: "Permanent", desc: "Records stay on the ledger safely forever." },
        { name: "Reliable", desc: "99.99% uptime for global access." }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="py-32 px-6 border-y border-border-subtle bg-background-base relative overflow-hidden">
            {/* Subtle radial gradient background */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand opacity-[0.01] blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="md:w-1/3"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                        Platform Trust
                    </div>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-text-primary mb-6 leading-tight">
                        Built on Absolute Trust
                    </h2>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        VERIDUS provides unparalleled confidence in academic achievements through consensus and cryptography.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="md:w-2/3 grid grid-cols-2 gap-x-8 gap-y-12 w-full"
                >
                    {qualities.map((q, idx) => (
                        <motion.div variants={itemVariants} key={idx} className="flex flex-col gap-3 group">
                            <div className="text-2xl font-medium text-text-primary pb-4 border-b border-border-subtle group-hover:border-brand/40 transition-colors relative">
                                {q.name}
                                <div className="absolute bottom-0 left-0 h-px bg-brand w-0 group-hover:w-full transition-all duration-500 ease-out" />
                            </div>
                            <p className="text-text-secondary leading-relaxed mt-2 text-balance group-hover:text-text-primary/90 transition-colors">
                                {q.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
