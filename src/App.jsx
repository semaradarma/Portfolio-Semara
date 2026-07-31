import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/context/LanguageContext";
import OpeningScreen from "@/components/UI/OpeningScreen";
import Navbar from "@/components/Layout/Navbar";
import Hero from "@/components/Sections/Hero";
import About from "@/components/Sections/About";
import Skills from "@/components/Sections/Skills";
import Projects from "@/components/Sections/Projects";
import Testimonials from "@/components/Sections/Testimonials";
import Contact from "@/components/Sections/Contact";
import Footer from "@/components/Layout/Footer";

export default function App() {
  const [showOpening, setShowOpening] = useState(true);

  const handleComplete = () => setShowOpening(false);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen">
        <AnimatePresence>
          {showOpening && <OpeningScreen onComplete={handleComplete} />}
        </AnimatePresence>

        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
