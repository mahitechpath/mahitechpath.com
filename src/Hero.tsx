import React from "react";
import { Spotlight } from "./components/ui/spotlight";
import { Splite } from "./components/ui/splite";

export function Hero() {
  return (
    <section className="hero-section-wrap relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-12 md:py-20">
      {/* Spotlight light effects matching NEO theme colors */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#00ffcc" />
      <Spotlight className="top-20 right-0 md:-right-20" fill="#0088ff" />

      {/* Grid background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl">
        {/* Left column: Branding & Copy (NEO Style) */}
        <div className="lg:col-span-7 text-left space-y-6 md:pr-8">
          
          {/* CPI large logo & small caps subtitle */}
          <div className="space-y-1">
            <div className="text-8xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#0088ff] via-[#00ffcc] to-[#10b981] select-none hover:scale-[1.01] transition-transform duration-300 w-max leading-none">
              CPI
            </div>
            <div className="text-xs font-bold tracking-[0.4em] text-zinc-500 dark:text-zinc-400 uppercase pl-1.5">
              CAREERPATH INDIA
            </div>
          </div>

          {/* 3-line heading layout */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white leading-none font-sans flex flex-col gap-1.5">
            <span className="block">The only roadmap</span>
            <span className="block">you need to</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#0088ff] via-[#00ffcc] to-[#10b981] italic">
              get placed.
            </span>
          </h1>

          {/* Short Tagline */}
          <p className="text-lg md:text-xl font-medium text-zinc-600 dark:text-zinc-400 max-w-xl pl-1">
            From zero to career-ready.
          </p>

          {/* Premium buttons */}
          <div className="flex flex-wrap gap-4 pt-2 pl-1">
            <a
              href="#roadmap-search"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0088ff] to-[#00ffcc] text-black font-bold hover:shadow-[0_0_25px_rgba(0,255,204,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started 🚀
            </a>
            <a
              href="leaderboard.html"
              className="px-8 py-3.5 rounded-xl bg-zinc-200/60 hover:bg-zinc-300/60 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-300 backdrop-blur-md"
            >
              View Leaderboard 🏆
            </a>
          </div>
        </div>

        {/* Right column: Interactive 3D Spline Scene (no borders or boxes) */}
        <div className="lg:col-span-5 w-full h-[400px] md:h-[500px] lg:h-[600px] relative flex items-center justify-center overflow-visible">
          {/* The 3D scene taking full width and height */}
          <Splite
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full absolute inset-0 scale-105 md:scale-110 lg:scale-125 transform"
          />
        </div>
      </div>
    </section>
  );
}
