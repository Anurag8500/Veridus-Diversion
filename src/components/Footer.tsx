import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-border-subtle bg-background-base">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="max-w-sm">
                    <Link href="/" className="text-2xl font-medium tracking-tight text-text-primary block mb-3">
                        VERIDUS
                    </Link>
                    <p className="text-sm text-text-secondary">
                        The Trust Layer for Academic Credentials
                    </p>
                    <p className="text-sm text-text-tertiary mt-8">
                        &copy; {new Date().getFullYear()} Veridus Inc. All rights reserved.
                    </p>
                </div>

                <div className="flex gap-16">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-2">Navigation</h4>
                        <Link href="/" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Home</Link>
                        <Link href="#how-it-works" className="text-sm text-text-secondary hover:text-text-primary transition-colors">How It Works</Link>
                        <Link href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Features</Link>
                        <Link href="#access" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Access</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-2">Additional</h4>
                        <Link href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">GitHub</Link>
                        <Link href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Devfolio</Link>
                        <Link href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Team</Link>
                        <Link href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
