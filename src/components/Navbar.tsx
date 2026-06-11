"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Projects", path: "/#projects" },
  { name: "Skills", path: "/#skills" },
  { name: "Experience", path: "/#experience" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.8)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.8)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border-color)"
            : "1px solid transparent",
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        }}
      >
        <div className="max-w-8xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono-custom"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-color), var(--accent-2))",
                color: "var(--primary-foreground)",
              }}
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              S
            </motion.div>
            <span
              className="font-display font-bold text-lg tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Suraj
              <span style={{ color: "var(--accent-color)" }}>.dev</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.path === "/" ? pathname === "/" : pathname?.startsWith(link.path.split("#")[0]) && link.path === pathname;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className="nav-link"
                  style={{
                    color: link.path === "/blog" && pathname === "/blog"
                      ? "var(--accent-color)"
                      : link.path === "/" && pathname === "/"
                      ? "var(--accent-color)"
                      : "var(--text-secondary)",
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={16} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-[65px] left-0 right-0 z-40 overflow-hidden"
            style={{
              background: "var(--nav-bg)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid var(--border-color)",
            }}
          >
            <div className="flex flex-col px-6 pb-6 pt-2 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.path}
                    className="block py-3 font-medium text-sm border-b font-mono-custom uppercase tracking-wide"
                    style={{
                      borderColor: "var(--border-color)",
                      color:
                        pathname === link.path
                          ? "var(--accent-color)"
                          : "var(--text-secondary)",
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
