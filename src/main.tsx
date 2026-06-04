import React from "react";
import ReactDOM from "react-dom/client";
import { Hero } from "./Hero";
import { PlatformFeatures } from "./PlatformFeatures";
import "./index.css";

const heroRoot = document.getElementById("hero-spline-root");
if (heroRoot) {
  ReactDOM.createRoot(heroRoot).render(
    <React.StrictMode>
      <Hero />
    </React.StrictMode>
  );
}

const featuresRoot = document.getElementById("platform-features-root");
if (featuresRoot) {
  ReactDOM.createRoot(featuresRoot).render(
    <React.StrictMode>
      <PlatformFeatures />
    </React.StrictMode>
  );
}
