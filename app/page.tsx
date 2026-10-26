import Link from "next/link";

const examples = [
  {
    title: "Full Immersive Demo",
    description: "Long 8vh stage with progressive overlay text that fades in and out as you scroll.",
    href: "/demo",
    tag: "Live",
  },
  {
    title: "Homepage Hero",
    description: "Shorter stage used on the landing page with multiple text states.",
    href: "/#demo",
    tag: "Live",
  },
  {
    title: "Product Reveal (coming)",
    description: "Classic Apple-style product turntable / deconstruction sequence.",
    href: "#",
    tag: "Template",
  },
  {
    title: "Storytelling Sections",
    description: "Multiple shorter cinematic stages stacked for narrative websites.",
    href: "#",
    tag: "Template",
  },
];

export default function ExamplesPage() {
  return (
    <main className="min-h-screen bg-[#05050a] text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Examples</h1>
        <p className="mb-12 max-w-2xl text-lg text-white/60">
          Ready-to-use patterns built with the Grok Cinematic Scroll Engine.
          Click any live example to experience it.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {examples.map((ex) => (
            <Link
              key={ex.title}
              href={ex.href}
              className={`group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.07] ${
                ex.href === "#" ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold group-hover:text-indigo-300 transition">
                  {ex.title}
                </h2>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    ex.tag === "Live"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {ex.tag}
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                {ex.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">Build your own</h3>
          <p className="mb-6 text-white/60">
            Replace the sample frames with your AI-generated sequence and you have a full cinematic site.
          </p>
          <Link
            href="/docs"
            className="inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Read the docs
          </Link>
        </div>
      </div>
    </main>
  );
}
