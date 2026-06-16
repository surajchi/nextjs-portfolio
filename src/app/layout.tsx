import type { Metadata } from "next";
import "./globals.css";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "@/lib/theme-provider";
import Navbar from "@/components/Navbar";
import ThreeBackground from "@/components/ThreeBackground";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ["React Developer", "Full Stack", "Node.js", "Portfolio", "MERN", "TypeScript", "Django"],
  authors: [{ name: SITE.author, url: SITE.url }],
  creator: SITE.author,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE.title,
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: SITE.jobTitle,
  email: `mailto:${SITE.email}`,
  sameAs: [SITE.socials.github, SITE.socials.linkedin],
  knowsAbout: ["React", "TypeScript", "Node.js", "Python", "Django", "Next.js"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <MotionConfig reducedMotion="user">
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
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
