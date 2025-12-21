"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { renderCanvas } from "@/components/ui/canvas";

export function QuoteSection() {
  useEffect(() => {
    // Wait for canvas to be in DOM
    const timer = setTimeout(() => {
      renderCanvas("quote-canvas");
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-blue-50/30 dark:via-blue-950/20 to-background overflow-hidden">
      {/* Canvas Mouse Trail Effect */}
      <canvas
        className="bg-transparent pointer-events-none absolute inset-0 mx-auto z-0"
        id="quote-canvas"
        style={{ width: '100%', height: '100%' }}
      ></canvas>

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <Quote className="h-12 w-12 text-blue-500 mx-auto mb-6 opacity-60" />
        </motion.div>

        <motion.blockquote
          variants={itemVariants}
          className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-foreground mb-8"
        >
          <span className="text-blue-500 font-semibold">Scaling communities</span> from 500+ to 1,500+ members globally in five months taught me that{" "}
          <span className="text-blue-500 font-semibold">leadership isn't about position</span> — it's about{" "}
          <span className="text-blue-500 font-semibold">creating spaces where others can thrive.</span>
        </motion.blockquote>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4 mt-12"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            — Gian Aibo C. Boyero
          </p>
          <p className="text-sm text-muted-foreground/70">
            Former CEO & GDG Organizer & GDSC Lead of USLS
          </p>
          <p className="text-xs text-muted-foreground/60">
            Google Developer Programs
          </p>
        </motion.div>

        {/* Achievement badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mt-16"
        >
          <div className="px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              500+ to 1,500+ members globally
            </p>
          </div>
          <div className="px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Top 1 out of 7000+ students
            </p>
          </div>
          <div className="px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              50+ events organized
            </p>
          </div>
          <div className="px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              2,650+ attendees
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

