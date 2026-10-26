import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#05050a] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Documentation</h1>
        <p className="mb-12 text-lg text-white/60">
          Everything you need to use the Grok Cinematic Scroll Engine in your own projects.
        </p>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-semibold">Quick Start</h2>
          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-5 text-sm text-emerald-300">
            <code>{`npm install
npm run dev

# Open http://localhost:3000`}</code>
          </pre>
        </section>

        {/* Component Usage */}
        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-semibold">Using the Component</h2>
          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-5 text-sm text-emerald-300">
            <code>{`import CinematicScroll from "@/components/CinematicScroll";

export default function Page() {
  return (
    <CinematicScroll
      frameCount={240}
      framePath="/frames/frame_"
      extension="webp"
      stageHeightVh={8}
      onProgress={(progress, frame) => {
        console.log(progress, frame);
      }}
    >
      <h1 className="text-5xl font-bold text-white">
        Your overlay content
      </h1>
    </CinematicScroll>
  );
}`}</code>
          </pre>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold">Props</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="pb-3 pr-4 font-medium">Prop</th>
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 pr-4 font-medium">Default</th>
                  <th className="pb-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-mono text-indigo-300">frameCount</td>
                  <td className="py-3 pr-4">number</td>
                  <td className="py-3 pr-4">120</td>
                  <td className="py-3">Total number of frames</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-mono text-indigo-300">framePath</td>
                  <td className="py-3 pr-4">string</td>
                  <td className="py-3 pr-4">/frames/frame_</td>
                  <td className="py-3">Path prefix (frame_0000.webp etc.)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-mono text-indigo-300">extension</td>
                  <td className="py-3 pr-4">string</td>
                  <td className="py-3 pr-4">webp</td>
                  <td className="py-3">File extension</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-mono text-indigo-300">stageHeightVh</td>
                  <td className="py-3 pr-4">number</td>
                  <td className="py-3 pr-4">6</td>
                  <td className="py-3">Scroll length in viewport heights</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-mono text-indigo-300">onProgress</td>
                  <td className="py-3 pr-4">function</td>
                  <td className="py-3 pr-4">—</td>
                  <td className="py-3">(progress: 0-1, frame: number) =&gt; void</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-indigo-300">children</td>
                  <td className="py-3 pr-4">ReactNode</td>
                  <td className="py-3 pr-4">—</td>
                  <td className="py-3">Overlay content (positioned absolutely)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Creating frames */}
        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-semibold">Creating Real Frames</h2>
          <ol className="mb-6 list-decimal space-y-3 pl-5 text-white/70">
            <li>Generate a cinematic still with any image model (Flux, Seedream, Imagen…)</li>
            <li>Turn it into a 6–10s video with an image-to-video model (Veo, Kling, LTX…)</li>
            <li>Extract frames with FFmpeg:</li>
          </ol>
          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-5 text-sm text-emerald-300">
            <code>{`ffmpeg -i input.mp4 \\
  -vf "fps=24,scale=1280:720:flags=lanczos" \\
  -c:v libwebp -quality 82 \\
  public/frames/frame_%04d.webp`}</code>
          </pre>
        </section>

        {/* Core engine */}
        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-semibold">Using the Core Engine (Vanilla JS)</h2>
          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-5 text-sm text-emerald-300">
            <code>{`import { GrokScrollEngine } from "@/lib/scroll-engine";

const engine = new GrokScrollEngine({
  canvasId: "frame-canvas",
  stageSelector: ".cinematic-stage",
  frameCount: 240,
  framePath: "/frames/frame_",
  onReady: () => console.log("Ready"),
  onProgress: (p, f) => console.log(p, f),
});

await engine.start();
// later
engine.destroy();`}</code>
          </pre>
        </section>

        {/* Architecture */}
        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-semibold">Architecture</h2>
          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-5 text-sm text-white/80">
            <code>{`Prompt
  ↓
AI Still (Flux / Seedream / …)
  ↓
Image-to-Video (Veo / Kling / LTX)
  ↓
FFmpeg → numbered WebP frames
  ↓
GrokScrollEngine (sticky canvas + scroll progress)
  ↓
Production static site`}</code>
          </pre>
        </section>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-2 font-semibold">Need help?</h3>
          <p className="text-white/60">
            Open an issue on the repository or check the{" "}
            <Link href="/examples" className="text-indigo-400 hover:underline">
              examples page
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
