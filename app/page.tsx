import Hero from "@/components/sections/Hero/Hero";
// Import komponen lain saat sudah dibuat:
import About from "@/components/sections/About/About";
import Experience from "@/components/sections/Experience/Experience";
import Education from "@/components/sections/Education/Education";
import Contact from "@/components/sections/Contact/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}