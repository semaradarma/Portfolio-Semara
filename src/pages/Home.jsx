import React from "react";
import Navbar from "../components/Layout/Navbar";
import Hero from "../components/Sections/Hero";
import About from "../components/Sections/About";
import Skills from "../components/Sections/Skills";
import Projects from "../components/Sections/Projects";
import Testimonials from "../components/Sections/Testimonials";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Layout/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
