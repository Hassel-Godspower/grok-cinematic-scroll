import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Grok Cinematic Scroll Engine",
  description:
    "Open-source Draftly-style 3D cinematic scroll websites. Pure JS frame-sequence engine. No WebGL. Deploy anywhere.",
  openGraph: {
    title: "Grok Cinematic Scroll Engine",
    description:
      "Prompt → frames → scroll-driven cinematic websites. Fully open source.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}
