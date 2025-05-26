import { AboutSection } from "@/components/sections/about-section";
import { BookSection } from "@/components/sections/book-section";
import { CordelSection } from "@/components/sections/cordel-section";
import { HeroSection } from "@/components/sections/hero-section";
import { VideosSection } from "@/components/sections/videos-section";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section - Full width */}
      <HeroSection />

      {/* Content Sections */}
      <AboutSection />
      <CordelSection />
      <BookSection />
      <VideosSection />
    </main>
  );
}
