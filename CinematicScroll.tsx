"use client";

import { useEffect, useRef, useState } from "react";
import { GrokScrollEngine } from "@/lib/scroll-engine";

interface CinematicScrollProps {
  frameCount?: number;
  framePath?: string;
  extension?: string;
  /** Height of the scroll stage in viewport heights (e.g. 6 = 600vh) */
  stageHeightVh?: number;
  children?: React.ReactNode;
  className?: string;
  onProgress?: (progress: number, frame: number) => void;
}

export default function CinematicScroll({
  frameCount = 120,
  framePath = "/frames/frame_",
  extension = "webp",
  stageHeightVh = 6,
  children,
  className = "",
  onProgress,
}: CinematicScrollProps) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const engineRef = useRef<GrokScrollEngine | null>(null);

  useEffect(() => {
    const engine = new GrokScrollEngine({
      canvasId: "frame-canvas",
      stageSelector: ".cinematic-stage",
      frameCount,
      framePath,
      extension,
      onReady: () => setReady(true),
      onProgress: (p, f) => {
        setProgress(p);
        onProgress?.(p, f);
      },
    });

    engineRef.current = engine;
    engine.start();

    return () => {
      engine.destroy();
    };
  }, [frameCount, framePath, extension, onProgress]);

  return (
    <section
      className={`cinematic-stage relative w-full ${className}`}
      style={{ height: `${stageHeightVh * 100}vh` }}
    >
      {/* Sticky canvas track */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          id="frame-canvas"
          className="absolute inset-0 h-full w-full"
          style={{ display: "block" }}
        />

        {/* Loading indicator */}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
              <p className="text-sm text-white/70 tracking-wide">
                Loading cinematic frames…
              </p>
            </div>
          </div>
        )}

        {/* Overlay content passed as children */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {children}
        </div>

        {/* Progress indicator (bottom) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 pointer-events-none">
          <div className="h-1 w-32 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="text-xs text-white/50 font-mono tabular-nums">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </section>
  );
}
