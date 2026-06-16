import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Required for `output: export` (static HTML export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
