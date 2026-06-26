// app/about/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from '@/components/about/AboutHero';
import Learn from "@/components/about/Learn";
import KeyHighlights from "@/components/about/KeyHighlights";
import Choose from "@/components/about/Choose";
import Explore from "@/components/about/Explore";
import Commitment from "@/components/about/Commitment";
export default function AboutPage() {
  return (
    <main className="bg-[#f8f6fb] px-4">
      <Navbar />
        <AboutHero />
        <Learn />
        <KeyHighlights />
        <Choose />
        <Explore />
        <Commitment />
      {/* <Footer /> */}
    </main>
  );
}