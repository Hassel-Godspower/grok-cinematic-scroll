"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GrokScrollEngine } from "@/lib/scroll-engine";

export default function MoniepointPage() {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const engineRef = useRef<GrokScrollEngine | null>(null);

  useEffect(() => {
    const engine = new GrokScrollEngine({
      canvasId: "moniepoint-canvas",
      stageSelector: ".moniepoint-stage",
      frameCount: 21,
      framePath: "/moniepoint/frame_",
      extension: "jpg",
      preloadCount: 21,
      onReady: () => setReady(true),
      onProgress: (p) => setProgress(p),
    });

    engineRef.current = engine;
    engine.start();

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  return (
    <main className="bg-[#05050a] text-white">
      {/* Fixed progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-75"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Loading overlay */}
      {!ready && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#05050a]">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          <p className="text-sm text-white/50">Loading Moniepoint sequence…</p>
        </div>
      )}

      {/* Cinematic stage – tall scroll area for smooth scrubbing */}
      <div className="moniepoint-stage relative" style={{ height: "500vh" }}>
        {/* Sticky canvas container */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          <canvas
            id="moniepoint-canvas"
            className="h-full w-full object-cover"
          />

          {/* Overlay content that changes with progress */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-16 px-6">
            {/* Top label */}
            <div className="text-center">
              <p className="mb-2 text-xs font-medium tracking-[0.25em] text-blue-400 uppercase">
                Moniepoint Business
              </p>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight transition-all duration-300">
                {progress < 0.25 && "Your card arrives"}
                {progress >= 0.25 && progress < 0.55 && "In your hands"}
                {progress >= 0.55 && progress < 0.85 && "Accept payments"}
                {progress >= 0.85 && "Unlock possibilities"}
              </h1>
            </div>

            {/* Bottom CTA – only near the end */}
            <div
              className={`transition-all duration-500 ${
                progress > 0.88
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="https://moniepoint.com/ng/business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto rounded-full bg-[#0066FF] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-600"
                >
                  Get Started Free
                </a>
                <Link
                  href="/"
                  className="pointer-events-auto rounded-full border border-white/20 px-6 py-3 text-sm text-white/70 transition hover:bg-white/5"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small footer space */}
      <div className="h-24 bg-[#05050a]" />
    </main>
  );
}
