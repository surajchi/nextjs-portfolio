"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export default function Resume() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <SectionWrapper title="Resume" id="resume">
      <div ref={ref} className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-sm w-full"
        >
          <Card className="p-10 text-center relative overflow-hidden rounded-3xl">
            {/* Gold accent bar top */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, var(--accent-color), var(--accent-2))" }}
            />

            <CardContent className="p-0">
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--accent-color), var(--accent-2))",
                  boxShadow: "var(--shadow)",
                }}
              >
                <FileText size={28} style={{ color: "var(--primary-foreground)" }} />
              </div>

              <h3
                className="font-display text-xl font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                My Resume
              </h3>

              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
                Download my latest CV to explore my skills, projects &amp; professional experience.
              </p>

              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  variant="gold"
                  size="pill"
                  className="gap-2.5 text-sm font-semibold"
                >
                  <a href="/resume.pdf" download>
                    <Download size={15} />
                    Download CV
                  </a>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
