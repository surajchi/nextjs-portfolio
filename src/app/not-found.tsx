"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="text-center"
      >
        <div
          className="text-[10rem] font-display font-bold leading-none mb-4"
          style={{
            background: "linear-gradient(135deg, var(--accent-color), var(--accent-2))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </div>

        <h1
          className="text-2xl font-display font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Page Not Found
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Button asChild variant="gold" size="pill" className="gap-2">
          <Link href="/">
            <Home size={14} />
            Go Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
