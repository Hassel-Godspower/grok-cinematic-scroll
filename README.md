# Grok Cinematic Scroll Engine

**Open-source implementation of the Draftly-style “3D cinematic scroll” effect.**

Pure JavaScript · No WebGL · No Three.js · Sticky canvas + frame sequence

---

## Pages

| Route       | Description                                      |
|-------------|--------------------------------------------------|
| `/`         | Landing page with embedded demo                  |
| `/demo`     | Full immersive cinematic experience              |
| `/examples` | Gallery of patterns and templates                |
| `/docs`     | Complete documentation & API reference           |

---

## Quick Start

```bash
git clone <your-repo-url>
cd grok-cinematic-scroll
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

1. Push this repository to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo → Deploy

No environment variables required for the demo.

---

## Project Structure

```
grok-cinematic-scroll/
├── app/
│   ├── page.tsx              # Homepage
│   ├── demo/page.tsx         # Full immersive demo
│   ├── docs/page.tsx         # Documentation
│   ├── examples/page.tsx     # Examples gallery
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── CinematicScroll.tsx   # Main React component
│   └── Navbar.tsx
├── lib/
│   └── scroll-engine.ts      # Core pure-JS engine
├── public/
│   └── frames/               # 120 sample cinematic frames
└── ...
```

---

## Using in your own pages

```tsx
import CinematicScroll from "@/components/CinematicScroll";

export default function MyPage() {
  return (
    <CinematicScroll
      frameCount={240}
      framePath="/frames/frame_"
      extension="webp"
      stageHeightVh={8}
    >
      <div className="flex h-full items-center justify-center">
        <h1 className="text-5xl font-bold text-white">Your Content</h1>
      </div>
    </CinematicScroll>
  );
}
```

---

## Replacing sample frames with real AI frames

```bash
ffmpeg -i your-cinematic-video.mp4 \
  -vf "fps=24,scale=1280:720:flags=lanczos" \
  -c:v libwebp -quality 82 \
  public/frames/frame_%04d.webp
```

Then update the `frameCount` prop.

---

## Tech Stack

- **Next.js 15** (App Router) – multi-page frontend
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Pure Canvas + Scroll** (no WebGL / Three.js)

> **Note about NestJS**: This is a **Next.js** project. Next.js is the right tool for multi-page React frontends that deploy cleanly to Vercel. NestJS is a backend framework (great for APIs, auth, agent pipelines). If you later want a full agentic builder (prompt → AI still → video → frames → site), NestJS can power the backend while this Next.js app remains the frontend.

---

## License

MIT
