import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import Navbar from "@/components/Navbar";
import ThreeBackground from "@/components/ThreeBackground";

export const metadata: Metadata = {
  title: "Suraj — Full-Stack Developer",
  description:
    "Portfolio of Suraj Chinkate — Full-Stack Developer specializing in React, Node.js, Python and modern web technologies.",
  keywords: ["React Developer", "Full Stack", "Node.js", "Portfolio", "MERN"],
  authors: [{ name: "Suraj Chinkate" }],
  openGraph: {
    title: "Suraj — Full-Stack Developer",
    description: "Building modern, scalable & immersive web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Subtle WebGL particle backdrop (replaces the old glowing orbs) */}
          <ThreeBackground />

          <Navbar />

          <main className="relative z-10 pt-[65px]">
            {children}
          </main>

          {/* Footer */}
          <footer
            className="relative z-10 py-8 px-6 text-center border-t"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-muted)",
            }}
          >
            <p className="text-xs font-mono-custom tracking-wide">
              © {new Date().getFullYear()}{" "}
              <span style={{ color: "var(--accent-color)" }}>Suraj Chinkate</span>
              {" — "}Crafted with Next.js, Three.js &amp; Tailwind
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
