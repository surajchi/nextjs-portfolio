/**
 * Central site config — single source of truth for SEO/metadata.
 *
 * ⚠️ Set NEXT_PUBLIC_SITE_URL to your real deployed URL (e.g. in Vercel project
 * settings or .env.local). The fallback below is only a placeholder; Open Graph
 * previews and the sitemap need the correct absolute URL to work.
 */
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://surajchi.vercel.app",
  name: "Suraj Chinkate",
  title: "Suraj — Full-Stack Developer",
  description:
    "Portfolio of Suraj Chinkate — Full-Stack Developer specializing in React, Node.js, Python and modern web technologies.",
  tagline: "Building modern, scalable & immersive web applications.",
  author: "Suraj Chinkate",
  jobTitle: "Full-Stack Developer",
  email: "chinkatesuraj@gmail.com",
  socials: {
    github: "https://github.com/surajchi",
    linkedin: "https://www.linkedin.com/in/surajchinkate",
  },
} as const;
