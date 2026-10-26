"use client";

import CinematicScroll from "@/components/CinematicScroll";
import { useState } from "react";

export default function Home() {
  const [progress, setProgress] = useState(0);

  return (
    <main className="min-h-screen bg-[#05050a] text-white">
      {/* ========== HERO / INTRO ========== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-transparent to-transparent" />

        <div className="relative z-10 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Open Source · No WebGL · Pure Scroll
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
            Grok{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Cinematic Scroll
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60 leading-relaxed">
            The exact same “3D cinematic scroll” effect used by Draftly —
            reimplemented as clean, open source, production-ready code.
            Pre-rendered frames. Sticky canvas. Native scrollbar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#demo"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Experience the Effect ↓
            </a>
            <a
              href="/demo"
              className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium text-white/80 transition hover:bg-white/5"
            >
              Full Immersive Demo
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ========== THE CINEMATIC DEMO ========== */}
      <div id="demo">
        <CinematicScroll
          frameCount={120}
          framePath="/frames/frame_"
          extension="webp"
          stageHeightVh={7}
          onProgress={(p) => setProgress(p)}
        >
          {/* Overlay content that appears over the frames */}
          <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
            <div
              className="transition-opacity duration-300"
              style={{
                opacity: progress < 0.15 ? 1 : Math.max(0, 1 - (progress - 0.15) * 4),
              }}
            >
              <p className="mb-3 text-sm font-medium tracking-widest text-indigo-300 uppercase">
                Frame Sequence Engine
              </p>
              <h2 className="overlay-text mb-4 text-4xl font-bold sm:text-6xl">
                This is pure scroll
              </h2>
              <p className="overlay-text mx-auto max-w-lg text-white/70">
                120 pre-rendered frames. No WebGL. No Three.js.
                Just the browser scrollbar driving a cinematic experience.
              </p>
            </div>

            {/* Mid-scroll message */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{
                opacity:
                  progress > 0.35 && progress < 0.65
                    ? Math.min(1, (progress - 0.35) * 5)
                    : progress >= 0.65
                    ? Math.max(0, 1 - (progress - 0.65) * 5)
                    : 0,
              }}
            >
              <div className="text-center">
                <h2 className="overlay-text mb-3 text-3xl font-bold sm:text-5xl">
                  Feels like 3D
                </h2>
                <p className="overlay-text text-white/70">
                  Because the motion was generated with real depth
                </p>
              </div>
            </div>

            {/* End message */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{
                opacity: progress > 0.8 ? Math.min(1, (progress - 0.8) * 5) : 0,
              }}
            >
              <div className="text-center">
                <h2 className="overlay-text mb-3 text-3xl font-bold sm:text-5xl">
                  Ready for production
                </h2>
                <p className="overlay-text text-white/70">
                  Export as static HTML + frames. Deploy anywhere.
                </p>
              </div>
            </div>
          </div>
        </CinematicScroll>
      </div>

      {/* ========== HOW IT WORKS ========== */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
            How the engine works
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-white/60">
            The same pipeline Draftly uses, fully open and reproducible.
          </p>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Generate Still",
                desc: "AI creates a cinematic keyframe from your prompt.",
              },
              {
                step: "02",
                title: "Animate to Video",
                desc: "Image-to-video model turns the still into smooth motion.",
              },
              {
                step: "03",
                title: "Extract Frames",
                desc: "FFmpeg slices the video into 120–400 optimized WebP frames.",
              },
              {
                step: "04",
                title: "Scroll Playback",
                desc: "Native scroll progress maps to frame index on a sticky canvas.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="mb-4 text-sm font-mono text-indigo-400">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CODE SNIPPET ========== */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Drop-in usage
          </h2>
          <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/60 p-6 text-sm leading-relaxed text-emerald-300">
            <code>{`import CinematicScroll from "@/components/CinematicScroll";

export default function Page() {
  return (
    <CinematicScroll
      frameCount={240}
      framePath="/frames/frame_"
      stageHeightVh={8}
    >
      <h1 className="text-5xl font-bold">Your overlay content</h1>
    </CinematicScroll>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-white/10 px-6 py-12 text-center text-sm text-white/40">
        <p>
          Grok Cinematic Scroll Engine · Open source · Built to be forked and
          extended
        </p>
        <p className="mt-2">
          Replace the sample frames with your own AI-generated sequence and you
          have a full Draftly-style site.
        </p>
      </footer>
    </main>
  );
}
