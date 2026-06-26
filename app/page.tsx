import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Subsidy from "@/components/home/Subsidy";
import Testimonials from "@/components/home/Testimonials";
import Services from "@/components/home/Services";
import Contact from "@/components/home/Contact";
import Footer from "@/components/layout/Footer";
import Benefits from "@/components/home/Benefits";

export default function Home() {
  return (
    <main className="bg-[#f8f6fb] overflow-x-hidden">
      {/* <Navbar /> */}
      <Hero />
      <WhyChooseUs />
      <Benefits />
      <Subsidy />
      <Testimonials />
      <Services />
      <Contact />
      {/* <Footer /> */}
    </main>
  );
}