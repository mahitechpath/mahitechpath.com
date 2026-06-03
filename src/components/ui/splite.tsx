import React, { Suspense } from "react";
import Spline from "@splinetool/react-spline";

type SpliteProps = {
  scene: string;
  className?: string;
};

export const Splite = ({ scene, className }: SpliteProps) => {
  return (
    <div className={className}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center text-zinc-500 font-mono text-sm">
            Loading 3D Scene...
          </div>
        }
      >
        <Spline scene={scene} />
      </Suspense>
    </div>
  );
};
