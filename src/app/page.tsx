import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import { getContent } from "@/app/actions";

export default async function Home() {
  const content = await getContent();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <Hero content={content} />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Achievements />
      <Services content={content} />
      <Contact content={content} />
    </main>
  );
}
