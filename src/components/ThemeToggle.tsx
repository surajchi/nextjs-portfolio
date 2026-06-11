"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-14 h-7 rounded-full bg-transparent" />;

  const isDark = theme === "dark";

  const handleToggle = (e: React.MouseEvent) => {
    const newTheme = isDark ? "light" : "dark";
    const x = e.clientX;
    const y = e.clientY;
    const r = Math.ceil(
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
    );

    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${r}px`);

    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(() => setTheme(newTheme));
    } else {
      setTheme(newTheme);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className="relative w-14 h-7 rounded-full p-0.5 flex items-center transition-all duration-500"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #15201c, #1d2a26)"
          : "linear-gradient(135deg, #e9f1ec, #d7e7de)",
        border: "1px solid var(--border-strong)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.25)",
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="w-6 h-6 rounded-full flex items-center justify-center"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          background: isDark ? "#243430" : "#fff",
          border: "1px solid var(--accent-border)",
          boxShadow: isDark
            ? "0 2px 6px rgba(0,0,0,0.5)"
            : "0 2px 6px rgba(20,40,32,0.15)",
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -30, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 30, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={12} style={{ color: "var(--accent-color)" }} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 30, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -30, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={12} style={{ color: "var(--accent-color)" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}

// Add view transition styles globally on mount
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }
    ::view-transition-new(root) {
      clip-path: circle(0px at var(--vt-x, 50%) var(--vt-y, 50%));
      animation: nexus-theme-reveal 0.38s ease-out forwards;
    }
    ::view-transition-old(root) { z-index: -1; }
    @keyframes nexus-theme-reveal {
      to { clip-path: circle(var(--vt-r, 150vmax) at var(--vt-x, 50%) var(--vt-y, 50%)); }
    }
  `;
  if (!document.getElementById("vt-styles")) {
    style.id = "vt-styles";
    document.head.appendChild(style);
  }
}
