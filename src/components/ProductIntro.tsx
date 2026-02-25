import Link from "next/link";

export function ProductIntro() {
    return (
        <section className="py-24 px-6 border-t border-border-subtle bg-background-surface">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-text-primary mb-6">
                    A New Standard for Academic Verification
                </h2>
                <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
                    VERIDUS enables institutions to issue secure digital degrees while allowing instant verification of academic credentials anywhere in the world.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/signin/university" className="px-6 py-3 bg-background-elevated border border-border-base text-text-primary rounded-lg font-medium hover:border-text-secondary transition-colors">
                        Issue Degree
                    </Link>
                    <Link href="/signin/student" className="px-6 py-3 bg-background-elevated border border-border-base text-text-primary rounded-lg font-medium hover:border-text-secondary transition-colors">
                        Verify Degree
                    </Link>
                </div>
            </div>
        </section>
    );
}
