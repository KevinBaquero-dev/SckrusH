import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedProject from "@/components/sections/FeaturedProject";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedProject />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
