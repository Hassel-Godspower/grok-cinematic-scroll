"use client";

import CinematicScroll from "@/components/CinematicScroll";
import { useState } from "react";

export default function DemoPage() {
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(0);

  return (
    <main className="min-h-screen bg-[#05050a] text-white">
      {/* Minimal header for this page */}
      <div className="fixed top-16 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <div className="rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-xs text-white/60 backdrop-blur">
          Frame {frame.toString().padStart(3, "0")} / 120 · {Math.round(progress * 100)}%
        </div>
      </div>

      <CinematicScroll
        frameCount={120}
        framePath="/frames/frame_"
        extension="webp"
        stageHeightVh={8}
        onProgress={(p, f) => {
          setProgress(p);
          setFrame(f);
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
          {/* Start */}
          <div
            className="transition-all duration-500"
            style={{
              opacity: progress < 0.12 ? 1 : Math.max(0, 1 - (progress - 0.12) * 6),
              transform: `translateY(${progress < 0.12 ? 0 : (progress - 0.12) * 80}px)`,
            }}
          >
            <p className="mb-3 text-sm font-medium tracking-[0.2em] text-indigo-300 uppercase">
              Full Immersive Demo
            </p>
            <h1 className="overlay-text mb-4 text-4xl font-bold sm:text-6xl md:text-7xl">
              Scroll to feel it
            </h1>
            <p className="overlay-text mx-auto max-w-md text-white/70">
              120 frames · sticky canvas · pure native scroll
            </p>
          </div>

          {/* Middle */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{
              opacity:
                progress > 0.3 && progress < 0.7
                  ? Math.min(1, (progress - 0.3) * 4)
                  : progress >= 0.7
                  ? Math.max(0, 1 - (progress - 0.7) * 5)
                  : 0,
            }}
          >
            <div className="text-center">
              <h2 className="overlay-text mb-3 text-3xl font-bold sm:text-5xl">
                Cinematic depth
              </h2>
              <p className="overlay-text text-lg text-white/70">
                Without a single line of WebGL
              </p>
            </div>
          </div>

          {/* End */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{
              opacity: progress > 0.82 ? Math.min(1, (progress - 0.82) * 6) : 0,
            }}
          >
            <div className="text-center">
              <h2 className="overlay-text mb-4 text-3xl font-bold sm:text-5xl">
                Production ready
              </h2>
              <p className="overlay-text mb-8 text-white/70">
                Export static HTML + frames. Deploy anywhere.
              </p>
              <a
                href="/docs"
                className="pointer-events-auto inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Read the docs →
              </a>
            </div>
          </div>
        </div>
      </CinematicScroll>
    </main>
  );
}
