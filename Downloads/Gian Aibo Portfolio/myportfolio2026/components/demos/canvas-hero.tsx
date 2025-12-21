"use client";

import { useEffect } from "react";
import Link from "next/link";
import { renderCanvas } from "@/components/ui/canvas";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Plus } from "lucide-react";
import { motion } from "framer-motion";

export function CanvasHero() {
  useEffect(() => {
    // Wait for canvas to be in DOM
    const timer = setTimeout(() => {
      const canvas = document.getElementById("canvas");
      if (canvas) {
        renderCanvas();
      }
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 animation-delay-8 animate-fadeIn mt-20 flex flex-col items-center justify-center px-4 text-center md:mt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-7xl"
        >
          <motion.div
            variants={itemVariants}
            className="z-10 mb-6 mt-10 sm:justify-center md:mb-4 md:mt-20"
          >
            <div className="relative flex items-center whitespace-nowrap rounded-full border bg-popover px-3 py-1 text-xs leading-6 text-primary/60">
              <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
              Welcome to my Portfolio
              <Link
                href="#projects"
                className="hover:text-blue-500 ml-1 flex items-center font-semibold transition-colors"
              >
                <div className="absolute inset-0 flex" aria-hidden="true" />
                Explore{" "}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10 mt-4 md:mt-6">
            <div className="px-2">
              <div className="border-blue-500/20 relative mx-auto h-full max-w-7xl border p-6 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)] md:px-12 md:py-20">
                <Plus
                  strokeWidth={4}
                  className="text-blue-500 absolute -left-5 -top-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-blue-500 absolute -bottom-5 -left-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-blue-500 absolute -right-5 -top-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-blue-500 absolute -bottom-5 -right-5 h-10 w-10"
                />
                <h1 className="flex select-none flex-col px-3 py-2 text-center text-4xl font-semibold leading-none tracking-tight md:flex-col md:text-7xl lg:flex-row lg:text-8xl">
                  Building the future at the intersection of design, technology, and AI.
                </h1>
                <div className="flex items-center justify-center gap-1 mt-4">
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <p className="text-xs text-green-500">Available Now</p>
                </div>
              </div>
            </div>

            <motion.h1
              variants={itemVariants}
              className="mt-8 text-2xl md:text-2xl"
            >
              Welcome! I&apos;m{" "}
              <span className="text-blue-500 font-bold">Gian Aibo</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="md:text-md mx-auto mb-16 mt-2 max-w-2xl px-6 text-sm text-primary/60 sm:px-6 md:max-w-4xl md:px-20 lg:text-lg"
            >
              Computer Scientist | Product Designer | AI Enthusiast | Community Leader
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-2"
            >
              <Link href="#projects">
                <Button variant="default" size="lg" className="group">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline" size="lg">
                  Get In Touch
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <canvas
        className="bg-background pointer-events-none absolute inset-0 mx-auto z-0"
        id="canvas"
        style={{ width: '100%', height: '100%' }}
      ></canvas>
    </section>
  );
}
