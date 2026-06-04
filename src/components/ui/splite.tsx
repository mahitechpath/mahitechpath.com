import React, { Component, ErrorInfo, ReactNode, Suspense } from "react";
import Spline from "@splinetool/react-spline";

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Spline Error Boundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

type SpliteProps = {
  scene: string;
  className?: string;
};

export const Splite = ({ scene, className }: SpliteProps) => {
  return (
    <div className={className}>
      <ErrorBoundary
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 font-mono text-sm p-6 text-center bg-black/40 rounded-3xl border border-zinc-800/80 backdrop-blur-sm">
            <span className="text-6xl mb-4 select-none animate-bounce">🤖</span>
            <h4 className="text-lg font-bold text-white mb-1">Interactive 3D Assistant</h4>
            <p className="text-xs text-zinc-500 max-w-[240px]">WebGL is unavailable or failed to initialize on this device.</p>
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center text-zinc-500 font-mono text-sm">
              Loading 3D Scene...
            </div>
          }
        >
          <Spline scene={scene} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
