"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function MoniepointPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLImageElement>(null);
  const handRef = useRef<HTMLImageElement>(null);
  const posRef = useRef<HTMLImageElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const payoffRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(cardRef.current, {
        y: -400,
        rotation: -25,
        scale: 0.7,
        opacity: 0,
      });
      gsap.set(handRef.current, {
        y: 300,
        opacity: 0,
        scale: 0.9,
      });
      gsap.set(posRef.current, {
        x: 400,
        opacity: 0,
        scale: 0.85,
      });
      gsap.set([stage1Ref.current, stage2Ref.current, stage3Ref.current], {
        opacity: 0,
      });
      gsap.set(payoffRef.current, { opacity: 0, y: 40 });

      // Master timeline controlled by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 4x viewport height of scroll
          scrub: 1.2, // smooth scrubbing
          pin: true,
          anticipatePin: 1,
        },
      });

      // === STAGE 1: Card drops in ===
      tl.to(stage1Ref.current, { opacity: 1, duration: 0.3 }, 0)
        .to(
          cardRef.current,
          {
            y: 0,
            rotation: -8,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          0
        )
        // slight float
        .to(
          cardRef.current,
          {
            y: -20,
            rotation: -5,
            duration: 0.8,
            ease: "sine.inOut",
          },
          1.2
        );

      // === STAGE 2: Hand appears and catches the card ===
      tl.to(stage1Ref.current, { opacity: 0, duration: 0.4 }, 2)
        .to(stage2Ref.current, { opacity: 1, duration: 0.4 }, 2)
        .to(
          handRef.current,
          {
            y: 80,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          2
        )
        .to(
          cardRef.current,
          {
            y: 120,
            x: -40,
            rotation: 12,
            scale: 0.85,
            duration: 1.1,
            ease: "power2.inOut",
          },
          2.1
        );

      // === STAGE 3: Move toward POS and insert ===
      tl.to(stage2Ref.current, { opacity: 0, duration: 0.4 }, 3.5)
        .to(stage3Ref.current, { opacity: 1, duration: 0.4 }, 3.5)
        .to(
          posRef.current,
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          3.5
        )
        .to(
          handRef.current,
          {
            x: 60,
            y: 40,
            scale: 0.9,
            duration: 1.2,
            ease: "power2.inOut",
          },
          3.6
        )
        .to(
          cardRef.current,
          {
            x: 90,
            y: -30,
            rotation: -5,
            scale: 0.55,
            duration: 1.2,
            ease: "power2.inOut",
          },
          3.6
        );

      // === STAGE 4: Payoff – Unlock endless possibilities ===
      tl.to(stage3Ref.current, { opacity: 0.3, duration: 0.5 }, 5.2)
        .to(
          payoffRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          5.3
        )
        .to(
          [cardRef.current, handRef.current, posRef.current],
          {
            scale: 0.9,
            duration: 0.6,
            ease: "power1.out",
          },
          5.3
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#0a0a0f] text-white overflow-hidden">
      {/* Navigation hint */}
      <div className="fixed top-20 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-xs text-white/50 backdrop-blur">
          Scroll to experience the Moniepoint story
        </div>
      </div>

      {/* Pinned scroll container */}
      <div ref={containerRef} className="relative h-screen w-full">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f172a] to-[#0a0a0f]" />

        {/* Stage labels (fade in/out) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          {/* Stage 1 text */}
          <div
            ref={stage1Ref}
            className="absolute text-center px-6"
          >
            <p className="mb-3 text-sm font-medium tracking-[0.2em] text-blue-400 uppercase">
              Your Moniepoint Card
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold">
              Designed for every business
            </h2>
          </div>

          {/* Stage 2 text */}
          <div
            ref={stage2Ref}
            className="absolute text-center px-6"
          >
            <p className="mb-3 text-sm font-medium tracking-[0.2em] text-blue-400 uppercase">
              In your hands
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold">
              Accept payments anywhere
            </h2>
          </div>

          {/* Stage 3 text */}
          <div
            ref={stage3Ref}
            className="absolute text-center px-6 top-24"
          >
            <p className="mb-3 text-sm font-medium tracking-[0.2em] text-blue-400 uppercase">
              One terminal. Endless possibilities
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold">
              Insert. Earn. Grow.
            </h2>
          </div>
        </div>

        {/* Visual elements */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          {/* POS Terminal */}
          <img
            ref={posRef}
            src="/moniepoint/card-pos.webp"
            alt="Moniepoint POS Terminal"
            className="absolute w-[280px] sm:w-[340px] md:w-[400px] object-contain drop-shadow-2xl"
            style={{ right: "15%", top: "50%", transform: "translateY(-50%)" }}
          />

          {/* Hand */}
          <img
            ref={handRef}
            src="/moniepoint/card-in-hand.webp"
            alt="Hand holding Moniepoint card"
            className="absolute w-[320px] sm:w-[400px] md:w-[480px] object-contain drop-shadow-2xl"
            style={{ left: "10%", bottom: "5%" }}
          />

          {/* The Card (main actor) */}
          <img
            ref={cardRef}
            src="/moniepoint/card-float.jpg"
            alt="Moniepoint Verve Card"
            className="absolute w-[220px] sm:w-[280px] md:w-[320px] object-contain drop-shadow-2xl rounded-xl"
            style={{ zIndex: 30 }}
          />
        </div>

        {/* Final Payoff */}
        <div
          ref={payoffRef}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm px-6 text-center"
        >
          <p className="mb-4 text-sm font-medium tracking-[0.25em] text-blue-400 uppercase">
            Moniepoint Business
          </p>
          <h2 className="mb-6 text-4xl sm:text-6xl font-bold leading-tight">
            Unlock endless<br />possibilities
          </h2>
          <p className="mb-10 max-w-lg text-lg text-white/70">
            Accept payments, manage your business, and grow with Nigeria’s most reliable business banking platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://moniepoint.com/ng/business"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#0066FF] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Get Started Free
            </a>
            <Link
              href="/"
              className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium text-white/80 transition hover:bg-white/5"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Extra space after pin so user can scroll out */}
      <div className="h-[20vh] bg-[#0a0a0f]" />
    </main>
  );
}
