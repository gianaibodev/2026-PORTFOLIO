"use client";

import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import SyntheticHero from "@/components/ui/synthetic-hero";
import { QuoteSection } from "@/components/quote-section";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";
import { SplineSceneBasic } from "@/components/demos/spline-scene-demo";
import CircularGalleryDemo from "@/components/demos/circular-gallery-demo";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    // Add scroll reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".fade-in-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full">
      <Navigation />

      {/* Hero Section with Animated Shader Background */}
      <div id="home" className="w-screen h-screen flex flex-col relative">
        <SyntheticHero
          title="Building the future at the intersection of design, technology, and AI."
          description="Computer Scientist | Product Designer | AI Enthusiast | Community Leader. Top 1 out of 7000+ students, scaling communities from 500+ to 1,500+ members globally."
          badgeText="Portfolio 2025"
          badgeLabel="Welcome"
          ctaButtons={[
            { text: "View My Work", href: "#projects", primary: true },
            { text: "Learn More", href: "#about" }
          ]}
          microDetails={[
            "Top 1 out of 7000+ students",
            "1,500+ community members led",
            "50+ events organized"
          ]}
        />
      </div>

      {/* Quote Section - Appears after scroll */}
      <section className="w-full fade-in-on-scroll">
        <QuoteSection />
      </section>

      {/* Featured Projects - Scroll Morph Hero */}
      <section id="projects" className="w-full h-[800px] relative fade-in-on-scroll">
        <ScrollMorphHero />
      </section>

      {/* Interactive 3D Section */}
      <section id="interactive-3d" className="w-full p-8 md:p-16 bg-background fade-in-on-scroll">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-8 text-center"
          >
            Interactive Experiences
          </motion.h2>
          <motion.div variants={itemVariants}>
            <SplineSceneBasic />
          </motion.div>
        </motion.div>
      </section>

      {/* Circular Gallery Section */}
      <section className="w-full py-16 bg-[#FAFAFA] dark:bg-background fade-in-on-scroll">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-4 text-center text-gray-900 dark:text-white"
          >
            Project Gallery
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Scroll or drag to explore my curated collection of work
          </motion.p>
          <motion.div variants={itemVariants}>
            <CircularGalleryDemo />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-20 bg-background fade-in-on-scroll">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-8"
          >
            About Me
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground mb-6"
          >
            I&apos;m <span className="font-bold text-blue-500">Gian Aibo C. Boyero</span>, a Computer Science student graduating in 2025 with a 1.3 (97%) GPA, ranked 1 out of 7000+ students.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground mb-6"
          >
            As the former CEO & Organizer of Google Developer Groups on Campus USLS and GDSC Lead (a program by Google), I scaled global membership from 500+ to 1,500+ in five months, organized 50+ events with 2,650+ attendees, and led 40+ officers.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground"
          >
            My passion lies at the intersection of design, technology, and AI — creating products that are both beautiful and impactful.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-20 bg-muted/50 fade-in-on-scroll">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-8"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground mb-8"
          >
            I&apos;m always open to new opportunities, collaborations, and conversations.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:hello@gianaibo.com"
              className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-8 py-3 text-white font-medium hover:bg-blue-600 transition-colors"
            >
              Send Email
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com/in/gianaibo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border-2 border-blue-500 px-8 py-3 text-blue-500 font-medium hover:bg-blue-500 hover:text-white transition-colors"
            >
              LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
