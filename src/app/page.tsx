import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import BlogPreview from "@/components/sections/BlogPreview";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
export default function Home() {
  
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Resume />
      <BlogPreview />
      <Contact />
    </>
  );
}
