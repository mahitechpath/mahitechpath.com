import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FeatureNode {
  id: number;
  title: string;
  status: "completed" | "in-progress";
  energy: number;
  content: string;
  relatedIds: number[];
}

const FEATURES: FeatureNode[] = [
  { id: 1, title: "60+ Roadmaps", status: "completed", energy: 95, content: "Complete week-by-week career roadmaps for B.Tech and Government aspirants", relatedIds: [2, 3] },
  { id: 2, title: "AI Learning", status: "completed", energy: 90, content: "AI powered mock tests, doubt solver and smart notes", relatedIds: [1, 4] },
  { id: 3, title: "Mock Tests", status: "completed", energy: 85, content: "Phase-wise MCQ tests. Score 80% to unlock next phase", relatedIds: [1, 5] },
  { id: 4, title: "Progress Tracker", status: "in-progress", energy: 80, content: "Track your learning progress across all roadmaps", relatedIds: [2, 6] },
  { id: 5, title: "Leaderboard", status: "in-progress", energy: 75, content: "Compete with students across India", relatedIds: [3, 6] },
  { id: 6, title: "Made for India", status: "completed", energy: 100, content: "Covering B.Tech streams and Indian Government exams", relatedIds: [4, 5] }
];

export const PlatformFeatures: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const activeFeature = FEATURES.find(f => f.id === activeId) || FEATURES[0];

  // --- SVG Coordinates calculations ---
  const width = 450;
  const height = 450;
  const cx = width / 2;
  const cy = height / 2;
  const radius = 160;

  const getNodeCoordinates = (index: number) => {
    // Offset by -90deg so node 1 is at top
    const angle = (index * 2 * Math.PI) / FEATURES.length - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle)
    };
  };

  // --- 3D Hover Tilt hook (card level) ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    
    // Tilt thresholds
    const rx = (0.5 - py) * 15;
    const ry = (px - 0.5) * 15;

    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center select-none font-sans">
      
      {/* Title block */}
      <div className="text-center mb-8 px-4">
        <span className="text-[10px] tracking-[0.25em] font-black text-sky-400 uppercase">
          PLATFORM FEATURES
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-2">
          Everything you need to succeed
        </h2>
        <p className="text-sm text-gray-400 mt-2 max-w-lg mx-auto">
          Explore what CareerPath India offers to accelerate your goals
        </p>
      </div>

      {/* RADIAL ORBITAL TIMELINE CONTAINER */}
      <div 
        className="orbital-timeline-wrapper relative select-none" 
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* SVG connection lanes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${width} ${height}`}>
          {/* Main orbit track */}
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="3" />
          <circle 
            cx={cx} 
            cy={cy} 
            r={radius} 
            fill="none" 
            stroke="rgba(56, 189, 248, 0.08)" 
            strokeWidth="1" 
            strokeDasharray="6, 15" 
            className="vector-anim-spin" 
          />

          {/* Connectors to related features */}
          {activeFeature.relatedIds.map(relId => {
            const relIndex = relId - 1;
            const activeIndex = activeFeature.id - 1;
            const start = getNodeCoordinates(activeIndex);
            const end = getNodeCoordinates(relIndex);

            return (
              <g key={relId}>
                {/* Glowing underlay */}
                <line 
                  x1={start.x} 
                  y1={start.y} 
                  x2={end.x} 
                  y2={end.y} 
                  stroke="rgba(56, 189, 248, 0.25)" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />
                {/* Animated pulsing path */}
                <line 
                  x1={start.x} 
                  y1={start.y} 
                  x2={end.x} 
                  y2={end.y} 
                  stroke="#38bdf8" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  className="pulsing-connector"
                />
              </g>
            );
          })}
        </svg>

        {/* Central Hub Detail Panel */}
        <div className="orbital-central-hub">
          <div className="text-[10px] uppercase font-black tracking-widest text-sky-400">
            Feature Info
          </div>
          <h3 className="text-sm font-extrabold text-white mt-1 mb-1 leading-tight">
            {activeFeature.title}
          </h3>
          <div className="flex gap-2 items-center justify-center my-1">
            <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
              activeFeature.status === "completed" 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
            }`}>
              {activeFeature.status}
            </span>
            <span className="text-[8px] font-extrabold text-gray-500">
              ⚡ {activeFeature.energy}% energy
            </span>
          </div>
          <p className="text-[9.5px] text-gray-400 leading-tight mt-1">
            {activeFeature.content}
          </p>
        </div>

        {/* Orbit Node elements */}
        {FEATURES.map((feat, i) => {
          const coords = getNodeCoordinates(i);
          const isActive = feat.id === activeId;

          return (
            <div
              key={feat.id}
              onClick={() => setActiveId(feat.id)}
              className={`orbital-node flex items-center justify-center ${isActive ? "active" : ""}`}
              style={{
                left: `${coords.x}px`,
                top: `${coords.y}px`,
                transform: "translate(-50%, -50%)"
              }}
            >
              <span className="text-base select-none">
                {feat.id === 1 ? "🗺️" : feat.id === 2 ? "🤖" : feat.id === 3 ? "🎯" : feat.id === 4 ? "📊" : feat.id === 5 ? "🏆" : "🇮🇳"}
              </span>
              <div className="orbital-node-label">{feat.title}</div>
            </div>
          );
        })}
      </div>

      {/* 3D ANIMATED FEATURE CARDS GRID */}
      <div className="feature-cards-grid select-none">
        
        {/* Card 1: 🗺️ 60+ Career Roadmaps */}
        <div 
          className="feature-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="feature-card-icon-wrapper">
            <svg className="w-14 h-14 vector-anim-float" viewBox="0 0 60 60" fill="none">
              <path d="M10 15 L25 10 L35 15 L50 10 L50 45 L35 50 L25 45 L10 50 Z" stroke="#38bdf8" strokeWidth="2.5" strokeLinejoin="round" fill="rgba(56, 189, 248, 0.05)" />
              <path d="M25 10 L25 45" stroke="#38bdf8" strokeWidth="2.0" strokeDasharray="4 4" />
              <path d="M35 15 L35 50" stroke="#38bdf8" strokeWidth="2.0" strokeDasharray="4 4" />
              <circle cx="20" cy="25" r="3" fill="#10b981" />
              <circle cx="40" cy="35" r="3" fill="#ec4899" />
              <path d="M20 25 C25 22, 35 38, 40 35" stroke="#10b981" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <h3 className="feature-card-title">60+ Career Roadmaps</h3>
          <p className="feature-card-desc">
            Complete curriculum, week-by-week timeline guides, and core skills mappings for engineering domains and Civil Services.
          </p>
        </div>

        {/* Card 2: 🤖 AI Powered Learning */}
        <div 
          className="feature-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="feature-card-icon-wrapper">
            <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none">
              {/* Rotating lines group */}
              <g className="vector-anim-spin">
                <line x1="30" y1="30" x2="15" y2="15" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
                <line x1="30" y1="30" x2="45" y2="15" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
                <line x1="30" y1="30" x2="45" y2="45" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
                <line x1="30" y1="30" x2="15" y2="45" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
              </g>
              <circle cx="30" cy="30" r="8" fill="#38bdf8" className="vector-anim-pulse" />
              <circle cx="15" cy="15" r="4" fill="#a855f7" />
              <circle cx="45" cy="15" r="4" fill="#a855f7" />
              <circle cx="45" cy="45" r="4" fill="#10b981" />
              <circle cx="15" cy="45" r="4" fill="#10b981" />
            </svg>
          </div>
          <h3 className="feature-card-title">AI Powered Learning</h3>
          <p className="feature-card-desc">
            Ask doubts to the intelligent context-aware chat solver, configure custom syllabus paths, and mock technical evaluations.
          </p>
        </div>

        {/* Card 3: 📊 Track Progress */}
        <div 
          className="feature-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="feature-card-icon-wrapper">
            <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none">
              <rect x="12" y="10" width="8" height="40" rx="3" fill="rgba(56, 189, 248, 0.1)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" />
              <rect x="26" y="10" width="8" height="40" rx="3" fill="rgba(56, 189, 248, 0.1)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" />
              <rect x="40" y="10" width="8" height="40" rx="3" fill="rgba(56, 189, 248, 0.1)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" />
              
              {/* Dynamic rising bars */}
              <rect x="12" y="32" width="8" height="18" rx="3" fill="#38bdf8" className="vector-anim-chart1" style={{ transformOrigin: "bottom" }} />
              <rect x="26" y="24" width="8" height="26" rx="3" fill="#a855f7" className="vector-anim-chart2" style={{ transformOrigin: "bottom" }} />
              <rect x="40" y="16" width="8" height="34" rx="3" fill="#10b981" className="vector-anim-chart1" style={{ transformOrigin: "bottom" }} />
            </svg>
          </div>
          <h3 className="feature-card-title">Track Progress</h3>
          <p className="feature-card-desc">
            Never lose your place. Mark off completed weeks, tick off project goals, and see your readiness indicators update.
          </p>
        </div>

        {/* Card 4: 🎯 Mock Tests */}
        <div 
          className="feature-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="feature-card-icon-wrapper">
            <svg className="w-14 h-14 vector-anim-target" viewBox="0 0 60 60" fill="none">
              <circle cx="25" cy="35" r="18" stroke="#38bdf8" strokeWidth="2.5" fill="rgba(56, 189, 248, 0.05)" />
              <circle cx="25" cy="35" r="10" stroke="#38bdf8" strokeWidth="2.0" />
              <circle cx="25" cy="35" r="3" fill="#ec4899" />
              {/* Arrow */}
              <path d="M48 12 L32 28" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
              <polygon points="32,22 32,28 38,28" fill="#10b981" />
            </svg>
          </div>
          <h3 className="feature-card-title">Mock Tests</h3>
          <p className="feature-card-desc">
            Test yourself with timed mock sets. Review deep conceptual answers and verify core subject readiness.
          </p>
        </div>

        {/* Card 5: 🏆 Leaderboard */}
        <div 
          className="feature-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="feature-card-icon-wrapper">
            <svg className="w-14 h-14 vector-anim-float" viewBox="0 0 60 60" fill="none">
              <path d="M15 15 L45 15 L40 38 C38 45, 22 45, 20 38 Z" stroke="#38bdf8" strokeWidth="2.5" fill="rgba(56, 189, 248, 0.05)" />
              <path d="M30 42 L30 50" stroke="#38bdf8" strokeWidth="2.5" />
              <path d="M20 50 L40 50" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
              {/* Sparkles */}
              <circle cx="48" cy="18" r="2" fill="#eab308" className="vector-anim-pulse" />
              <circle cx="12" cy="24" r="2.5" fill="#eab308" className="vector-anim-pulse" />
            </svg>
          </div>
          <h3 className="feature-card-title">Leaderboard</h3>
          <p className="feature-card-desc">
            Compare progress markers with peers. Climb positions as you build projects, score quizzes, and level skills.
          </p>
        </div>

        {/* Card 6: 🇮🇳 Made for India */}
        <div 
          className="feature-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="feature-card-icon-wrapper">
            <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none">
              {/* Simplified India Map Shape */}
              <path d="M28 12 L34 16 L31 22 L37 25 L34 32 L38 36 L34 46 L30 48 L22 40 L24 35 L20 30 L22 24 L24 16 Z" stroke="#38bdf8" strokeWidth="2" strokeLinejoin="round" fill="rgba(56, 189, 248, 0.05)" />
              {/* Blinking dot locations */}
              <circle cx="31" cy="19" r="2.5" fill="#10b981" className="vector-anim-pulse" />
              <circle cx="34" cy="33" r="2.5" fill="#ec4899" className="vector-anim-pulse" />
              <circle cx="26" cy="38" r="2.5" fill="#eab308" className="vector-anim-pulse" />
            </svg>
          </div>
          <h3 className="feature-card-title">Made for India</h3>
          <p className="feature-card-desc">
            Curriculums and preparation strategies customized specifically for Indian B.Tech layouts and national/state government programs.
          </p>
        </div>

      </div>
    </div>
  );
};
