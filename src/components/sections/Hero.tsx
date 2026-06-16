"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Download, ArrowDown } from "lucide-react";
import {
  FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaJsSquare,
} from "react-icons/fa";
import {
  SiMongodb, SiPostgresql, SiTailwindcss, SiExpress,
} from "react-icons/si";

const NAME = "Suraj";

const techStack = [
  { Icon: FaReact,       color: "#61dafb" },
  { Icon: FaNodeJs,      color: "#68a063" },
  { Icon: FaPython,      color: "#ffd43b" },
  { Icon: FaHtml5,       color: "#e34f26" },
  { Icon: FaCss3Alt,     color: "#1572b6" },
  { Icon: FaJsSquare,    color: "#f7df1e" },
  { Icon: SiMongodb,     color: "#4db33d" },
  { Icon: SiPostgresql,  color: "#336791" },
  { Icon: SiTailwindcss, color: "#38bdf8" },
  { Icon: SiExpress,     color: "#888"    },
];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Pointer-reactive state for the floating icons.
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const measure = () => {
      const el = rootRef.current;
      if (el) setSize({ w: el.clientWidth, h: el.clientHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setMouse({ x, y }));
  };

  // Scattered across the whole hero, kept clear of the centre text zone.
  const positions = useMemo(
    () => {
      const spots = [
        { top: 14, left: 11 }, { top: 24, left: 82 },
        { top: 68, left: 7 },  { top: 11, left: 58 },
        { top: 79, left: 73 }, { top: 46, left: 17 },
        { top: 33, left: 89 }, { top: 84, left: 41 },
        { top: 61, left: 86 }, { top: 9,  left: 37 },
      ];
      return techStack.map((_, i) => ({
        top: `${spots[i % spots.length].top}%`,
        left: `${spots[i % spots.length].left}%`,
        duration: 5 + ((i * 3) % 4),
        delay: (i % 5) * 0.4,
      }));
    },
    []
  );

  useEffect(() => {
    const ctx = rootRef.current;
    if (!ctx) return;
    const q = (sel: string) => ctx.querySelectorAll(sel);

    // Respect reduced-motion: skip the reveal animation but still show content
    // (elements start at opacity:0 via .reveal-hidden), so make them visible.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      q(".reveal-hidden").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
      });
      return;
    }

    animate(q(".hero-badge"), {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700,
      ease: "outExpo",
      delay: 100,
    });
    animate(q(".hero-char"), {
      opacity: [0, 1],
      translateY: [54, 0],
      rotateZ: [6, 0],
      duration: 850,
      ease: "outExpo",
      delay: stagger(38, { start: 220 }),
    });
    animate(q(".hero-underline"), {
      scaleX: [0, 1],
      duration: 800,
      ease: "outExpo",
      delay: 760,
    });
    animate(q(".hero-sub"), {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700,
      ease: "outExpo",
      delay: 700,
    });
    animate(q(".hero-desc"), {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700,
      ease: "outExpo",
      delay: 840,
    });
    animate(q(".hero-cta"), {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700,
      ease: "outExpo",
      delay: stagger(90, { start: 980 }),
    });
    animate(q(".hero-scroll"), {
      opacity: [0, 1],
      duration: 800,
      ease: "outExpo",
      delay: 1280,
    });
  }, []);

  return (
    <section
      ref={rootRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Floating tech icons — magnetically follow the cursor, disperse on leave */}
      <div className="absolute inset-0 pointer-events-none z-1" aria-hidden>
        {techStack.map(({ Icon, color }, i) => {
          // base position of this icon in px
          const baseX = (parseFloat(positions[i].left) / 100) * size.w;
          const baseY = (parseFloat(positions[i].top) / 100) * size.h;
          const dx = mouse.x - baseX;
          const dy = mouse.y - baseY;
          const dist = Math.hypot(dx, dy) || 1;
          // closer to the cursor => stronger pull (magnetic), capped at 1
          const pull = hovering ? Math.min(1, 180 / dist) : 0;
          const offX = dx * pull * 0.55;
          const offY = dy * pull * 0.55;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: positions[i].top, left: positions[i].left }}
              animate={{ y: [0, -16, 0] }}
              transition={{
                duration: positions[i].duration,
                delay: positions[i].delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* inner layer handles the cursor-follow / disperse spring */}
              <motion.div
                animate={{ x: offX, y: offY, scale: hovering ? 1 + pull * 0.5 : 1 }}
                transition={{ type: "spring", stiffness: 130, damping: 16, mass: 0.6 }}
              >
                <Icon
                  size={40}
                  style={{ color, opacity: 0.14 + pull * 0.4 }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 text-center max-w-3xl w-full">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <div
            className="hero-badge reveal-hidden px-4 py-1.5 rounded-full text-xs font-mono-custom font-bold tracking-widest uppercase inline-flex items-center"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-strong)",
              color: "var(--accent-color)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full mr-2"
              style={{ background: "var(--accent-color)" }}
            />
            Available for work
          </div>
        </div>

        {/* Name */}
        <h1
          className="font-display font-bold"
          style={{
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            lineHeight: 1.05,
            color: "var(--text-primary)",
          }}
        >
          <span className="hero-char reveal-hidden inline-block">Hi,</span>{" "}
          <span className="hero-char reveal-hidden inline-block">I&apos;m</span>{" "}
          <span
            className="relative inline-block"
            style={{ color: "var(--accent-color)" }}
          >
            {NAME.split("").map((ch, i) => (
              <span key={i} className="hero-char reveal-hidden inline-block">
                {ch}
              </span>
            ))}
            <span
              className="hero-underline absolute -bottom-1 left-0 h-0.5 w-full rounded"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent-color), var(--accent-2))",
                transformOrigin: "left",
              }}
            />
          </span>
        </h1>

        {/* Typewriter */}
        <h2
          className="hero-sub reveal-hidden mt-6 text-xl md:text-2xl font-medium font-mono-custom"
          style={{ color: "var(--text-secondary)" }}
        >
          <span style={{ color: "var(--accent-color)" }}>{">"}</span>{" "}
          <Typewriter
            words={[
              "Full-Stack Developer",
              "React Developer",
              "Node.js Engineer",
              "MERN Stack Developer",
            ]}
            loop
            cursor
            cursorStyle="_"
            typeSpeed={65}
            deleteSpeed={40}
            delaySpeed={1800}
          />
        </h2>

        {/* Description */}
        <p
          className="hero-desc reveal-hidden mt-6 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          I build modern, scalable and immersive web applications.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/SURAJ_CV.pdf"
            download
            className="hero-cta reveal-hidden btn-primary inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-sm"
          >
            <Download size={16} /> Download Resume
          </a>
          <a
            href="#contact"
            className="hero-cta reveal-hidden btn-outline inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-sm"
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Scroll cue */}
        <div
          className="hero-scroll reveal-hidden mt-16 flex flex-col items-center gap-2"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="text-xs font-mono-custom tracking-widest uppercase">
            Scroll
          </span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
