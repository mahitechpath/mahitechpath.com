import React from "react";
import { Splite } from "./components/ui/splite";

export function Hero() {
  return (
    <section className="hero-section-wrap relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-12 md:py-20 bg-black text-white">
      {/* Grid background effect - extremely subtle white grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl">
        {/* Left column: Minimalist Copy (NEO Style) */}
        <div className="lg:col-span-7 text-left space-y-6 md:pr-8">
          
          {/* CPI large logo & small caps subtitle */}
          <div className="space-y-1">
            <div className="text-8xl md:text-9xl font-black tracking-tighter text-white select-none leading-none">
              CPI
            </div>
            <div className="text-xs font-bold tracking-[0.4em] text-zinc-400 uppercase pl-1.5">
              CAREER ROADMAP PLATFORM
            </div>
          </div>

          {/* Description copy (2-3 lines) */}
          <p className="text-lg md:text-xl font-medium text-zinc-300 max-w-xl leading-relaxed pl-1.5">
            The only platform that guides Indian students from zero to career-ready. Phase by phase. Week by week.
          </p>

          {/* Minimal outlined buttons */}
          <div className="flex flex-wrap gap-4 pt-4 pl-1.5">
            <a
              href="#roadmap-search"
              className="px-8 py-3.5 rounded-xl border-2 border-white bg-transparent text-white font-bold hover:bg-white hover:text-black transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started 🚀
            </a>
            <a
              href="leaderboard.html"
              className="px-8 py-3.5 rounded-xl border border-zinc-500 bg-transparent text-zinc-400 font-bold hover:border-white hover:text-white transition-all duration-300 backdrop-blur-md"
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
