"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experience } from "@/data/experience";
import SectionWrapper from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Briefcase } from "lucide-react";

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper title="Professional Experience" id="experience">
      <div ref={ref} className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, var(--accent-color), transparent)" }}
        />

        {experience.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="relative pl-16 mb-10 last:mb-0"
          >
            {/* Timeline dot */}
            <motion.div
              className="timeline-dot absolute left-[18px] top-6 -translate-x-1/2"
              whileHover={{ scale: 1.4 }}
              transition={{ type: "spring", stiffness: 400 }}
            />

            {/* Card */}
            <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
              <Card className="p-7">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3
                        className="font-display text-xl font-bold mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {job.role}
                      </h3>
                      <p className="font-medium text-sm" style={{ color: "var(--accent-color)" }}>
                        {job.company}
                      </p>
                    </div>

                    {/* Status badge */}
                    <Badge
                      className="rounded-full px-3 py-1.5 text-xs font-semibold gap-1.5"
                      style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent-color)",
                        border: "1px solid var(--accent-border)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: "var(--accent-color)" }}
                      />
                      Current
                    </Badge>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {[
                      { icon: MapPin,     text: job.location },
                      { icon: Calendar,   text: `Joined ${job.joining}` },
                      { icon: Briefcase,  text: job.duration },
                    ].map(({ icon: Icon, text }) => (
                      <div
                        key={text}
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Icon size={12} />
                        {text}
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {job.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
