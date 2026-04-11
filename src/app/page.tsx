import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { StatsSection } from "@/components/sections/stats-section";
import { PlatformsSection } from "@/components/sections/platforms-section";
import { AboutSection } from "@/components/sections/about-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <PlatformsSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
