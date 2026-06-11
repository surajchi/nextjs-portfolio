"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/data/skills";
import SectionWrapper from "@/components/SectionWrapper";
import Image from "next/image";

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper title="Technical Skills" id="skills">
      <div ref={ref} className="space-y-14">
        {skills.map((group, gi) => (
          <div key={group.category}>
            {/* Category header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="flex items-center gap-4 mb-7 justify-center"
            >
              <div className="flex items-center gap-3 mb-4 justify-center">
                <div className="h-px flex-1 max-w-16" style={{ background: "var(--border-strong)" }} />
                <span
                  className="font-mono-custom text-xs tracking-[0.2em] uppercase font-bold"
                  style={{ color: "var(--accent-color)" }}
                >
                  {group.category}
                </span>
                <div className="h-px flex-1 max-w-16" style={{ background: "var(--border-strong)" }} />
              </div>
            </motion.div>

            {/* Skill cards */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {group.items.map((skill, si) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: gi * 0.1 + si * 0.07,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  whileHover={{ y: -6, scale: 1.05, transition: { duration: 0.2 } }}
                  className="group glass-card rounded-2xl p-5 cursor-pointer flex flex-col items-center gap-3 w-[110px]"
                >
                  <div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:border-[var(--accent-border)]"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <p
                    className="text-xs font-semibold text-center tracking-wide"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {skill.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
