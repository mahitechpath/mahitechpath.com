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
    </div>
  );
};
