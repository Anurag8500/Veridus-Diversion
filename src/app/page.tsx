import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductIntro } from "@/components/ProductIntro";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { AccessPortals } from "@/components/AccessPortals";
import { Trust } from "@/components/Trust";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background-base text-text-primary selection:bg-brand-muted selection:text-text-primary">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <ProductIntro />
        <HowItWorks />
        <Features />
        <AccessPortals />
        <Trust />
        <Cta />
      </main>

      <Footer />
    </div>
  );
}
