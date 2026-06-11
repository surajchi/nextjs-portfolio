"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { useInView } from "react-intersection-observer";

interface CountUpProps {
  /** e.g. "10+", "5+", "1+" — digits are counted, the rest is kept as suffix */
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function CountUp({ value, className, style }: CountUpProps) {
  const target = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const obj = { v: 0 };
    animate(obj, {
      v: target,
      duration: 1500,
      ease: "outExpo",
      onUpdate: () => setDisplay(Math.round(obj.v)),
    });
  }, [inView, target]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
      {suffix}
    </span>
  );
}
