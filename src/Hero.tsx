import React, { useEffect, useState, useRef } from "react";
import { Splite } from "./components/ui/splite";

function CounterItem({ target, suffix, label }: { target: number | string, suffix?: string, label: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || typeof target !== "number") return;
    
    let start = 0;
    const end = target;
    const duration = 2000;
    const incrementTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, incrementTime || 16);

    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <div ref={elementRef} className="flex flex-col items-center justify-center p-6 text-center">
      <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
        {typeof target === "number" ? count : target}
        {suffix}
      </div>
      <div className="text-xs md:text-sm font-semibold tracking-widest text-zinc-500 uppercase mt-2">
        {label}
      </div>
    </div>
  );
}

export function StatsCounter() {
  return (
    <div className="stats-counter-wrap w-full bg-black py-10 md:py-16 border-t border-zinc-900">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <CounterItem target={60} suffix="+" label="Roadmaps" />
          <CounterItem target={8} suffix="" label="Domains" />
          <CounterItem target={100} suffix="%" label="Free" />
          <CounterItem target="AI" suffix="" label="Powered" />
        </div>
      </div>
    </div>
  );
}

export function Marquee() {
  const items = [
    "IAS", "IPS", "VLSI", "ML Engineer", "DevOps", 
    "ECE", "Power Systems", "Web Dev", "Blockchain", "Cloud Architect"
  ];
  
  return (
    <div className="marquee-wrap w-full bg-black py-6 border-y border-zinc-800 overflow-hidden relative select-none">
      {/* Gradient masks on left and right for smooth fade */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <div className="flex w-max animate-marquee whitespace-nowrap gap-16 text-zinc-300 font-bold uppercase tracking-widest text-sm md:text-base">
        {[...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="flex items-center gap-4">
            <span className="text-white">{item}</span>
            <span className="text-zinc-600">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <>
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

      <StatsCounter />
      <Marquee />
    </>
  );
}
