import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Required for `output: export` (static HTML export).
export const dynamic = "force-static";

// Branded social-share card — mirrors the site's teal/mint "S" identity.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(1000px 500px at 18% 12%, #16302750 0%, transparent 60%), #0F1A16",
          color: "#F2F5F4",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand tile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 104,
            height: 104,
            borderRadius: 26,
            background: "linear-gradient(135deg, #69C6A2, #4F9F98)",
            color: "#0C1813",
            fontSize: 64,
            fontWeight: 700,
            marginBottom: 44,
          }}
        >
          S
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1.5,
          }}
        >
          {SITE.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 38,
            color: "#69C6A2",
          }}
        >
          {`> ${SITE.jobTitle}`}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            color: "#8AA39B",
            maxWidth: 760,
          }}
        >
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
