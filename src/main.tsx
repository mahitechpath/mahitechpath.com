import React from "react";
import ReactDOM from "react-dom/client";
import { Hero } from "./Hero";
import "./index.css";

const rootEl = document.getElementById("hero-spline-root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <Hero />
    </React.StrictMode>
  );
}
