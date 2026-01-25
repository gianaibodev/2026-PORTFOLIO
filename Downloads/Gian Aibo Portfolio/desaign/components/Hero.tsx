"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-base/10 rounded-full blur-[100px] pointer-events-none" />

      {/* SVG Node Lines Background (Simplified simulation) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <path 
            d="M 50% 50% Q 20% 40% 10% 20%" 
            stroke="url(#gradient-line)" 
            strokeWidth="2" 
            fill="none" 
            className="animate-pulsing-branch"
        />
        <path 
            d="M 50% 50% Q 80% 60% 90% 80%" 
            stroke="url(#gradient-line)" 
            strokeWidth="2" 
            fill="none" 
            className="animate-pulsing-branch" 
            style={{ animationDelay: "1s" }}
        />
        <path 
            d="M 50% 50% Q 30% 70% 20% 90%" 
            stroke="url(#gradient-line)" 
            strokeWidth="2" 
            fill="none" 
            className="animate-pulsing-branch" 
            style={{ animationDelay: "0.5s" }}
        />
        <defs>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c9b8a0" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#a78b71" stopOpacity="0.8" />
            </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
            <h1 className="font-playfair italic font-medium leading-[1.1] text-foreground mb-8" style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
                The future of <br/>
                <span className="text-gold-base">your des(ai)gn</span>
            </h1>
        </motion.div>

        <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
             className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
            <button className="px-8 py-4 bg-white text-black rounded-full font-inter font-medium text-sm hover:bg-gold-light transition-colors w-full sm:w-auto">
                Get Started
            </button>
            <button className="px-8 py-4 glass-card border-white/20 text-white rounded-full font-inter font-medium text-sm hover:bg-white/5 transition-colors w-full sm:w-auto">
                View Showreel
            </button>
        </motion.div>

        {/* Central Node Card */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="relative w-full aspect-video max-w-4xl mx-auto glass-card border border-white/10 shadow-2xl overflow-hidden group"
        >
             <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent z-10" />
             <div className="absolute inset-0 flex items-center justify-center text-white/20 font-playfair text-4xl italic">
                 Interactive Node
             </div>
             
             {/* Satellite Cards (Floating) */}
             <motion.div 
                className="absolute -right-12 top-12 w-48 h-32 glass-card bg-black/40 border-white/10 z-20 hidden md:flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             >
                 <div className="w-8 h-8 rounded-full bg-gold-base/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gold-base animate-pulse" />
                 </div>
             </motion.div>

             <motion.div 
                className="absolute -left-8 bottom-12 w-40 h-40 glass-card bg-black/40 border-white/10 z-20 hidden md:block"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             />
        </motion.div>
      </div>
    </section>
  );
}
