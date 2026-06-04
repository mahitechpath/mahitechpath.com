import React from "react";
import { Spotlight } from "./components/ui/spotlight";
import { Splite } from "./components/ui/splite";

export function Hero() {
  return (
    <section className="hero-section-wrap relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden py-12 md:py-20">
      {/* Spotlight light effects */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#3182ce" />
      <Spotlight className="top-20 right-0 md:-right-20" fill="#48bb78" />

      {/* Grid background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl">
        {/* Left column: Branding & Copy */}
        <div className="lg:col-span-7 text-left space-y-6 md:pr-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-200/50 dark:bg-zinc-800/80 border border-zinc-300/70 dark:border-zinc-700/50 text-zinc-800 dark:text-zinc-300 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            THE 2026 EDITION &middot; 6 PORTALS &middot; 60 CAREERS
          </span>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight font-sans">
            The only roadmap you need to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-green-500">
              get placed in tech &amp; gov.
            </span>
          </h1>

          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            A comprehensive collection of phase-by-phase curriculums, projects, and placement tips designed to guide students from absolute foundations to production-grade engineering and premier civil services.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#roadmap-search"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-medium hover:from-blue-500 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-blue-500/10 hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started 🚀
            </a>
            <a
              href="leaderboard.html"
              className="px-6 py-3 rounded-xl bg-zinc-200/50 hover:bg-zinc-300/50 dark:bg-zinc-900/80 dark:hover:bg-zinc-800/80 text-zinc-800 dark:text-zinc-300 font-medium border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-300 backdrop-blur-md"
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
