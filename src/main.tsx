import React from "react";
import ReactDOM from "react-dom/client";
import { Hero } from "./Hero";
import "./index.css";

const heroRoot = document.getElementById("hero-spline-root");
if (heroRoot) {
  ReactDOM.createRoot(heroRoot).render(
    <React.StrictMode>
      <Hero />
    </React.StrictMode>
  );
}

