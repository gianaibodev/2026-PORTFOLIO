"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: "#21346e" }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster=""
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_044704_dd33cb15-c23f-4cfc-aa09-a0465d4dcb54.mp4"
          type="video/mp4"
        />
      </video>

      {/* Content Container */}
      <div className="relative z-10 w-full min-h-screen px-4 sm:px-6 lg:px-8 xl:px-12 pt-32 md:pt-48">
        <div className="max-w-7xl mx-auto">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="font-rubik font-bold uppercase text-white leading-[0.98] tracking-[-2px] md:tracking-[-4px]"
              style={{
                fontSize: "clamp(3.75rem, 10vw, 100px)",
                fontFamily: "var(--font-rubik), sans-serif",
              }}
            >
              <span className="block">NEW ERA</span>
              <span className="block">OF DESIGN</span>
              <span className="block">STARTS NOW</span>
            </h1>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            <button
              className="relative w-[184px] h-[65px] flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
              style={{
                fontFamily: "var(--font-rubik), sans-serif",
              }}
            >
              {/* SVG Background Shape */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 184 65"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M10 0H174C179.523 0 184 4.47715 184 10V55C184 60.5228 179.523 65 174 65H10C4.47715 65 0 60.5228 0 55V10C0 4.47715 4.47715 0 10 0Z"
                  fill="white"
                />
              </svg>
              {/* Button Text */}
              <span
                className="relative z-10 font-bold uppercase text-[20px]"
                style={{ color: "#161a20" }}
              >
                GET STARTED
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
