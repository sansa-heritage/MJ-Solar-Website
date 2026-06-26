// app/about/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Project from "@/components/project/Project";
import Features from "@/components/project/Features";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectDetails from "@/components/project/ProjectDetails";
import TestimonialCard from "@/components/project/TestimonialCard";
import SolarCTA from "@/components/project/SolarCTA";
import RelatedProjects from "@/components/project/RelatedProjects";

export default function ProjectPage() {
  return (
    <main className="bg-[#f8f6fb] px-4">
      <Navbar />
      <Project />
      <Features />
      <ProjectGallery />
      <ProjectDetails />
      <TestimonialCard />
      <div className="mt-15">
        <SolarCTA />
      </div>
      <RelatedProjects />
      {/* <Footer /> */}
    </main>
  );
}
