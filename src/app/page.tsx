import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section"
import { CordelSection } from "@/components/sections/cordel-section";
import { BookSection } from "@/components/sections/book-section";
import { VideosSection } from "@/components/sections/videos-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CordelSection />
      <BookSection />
      <VideosSection />
    </div>
  );
}
