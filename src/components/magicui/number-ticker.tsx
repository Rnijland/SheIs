"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  suffix = "",
  prefix = "",
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(direction === "up" ? 0 : value, {
    mass: 1,
    stiffness: 75,
    damping: 15,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString("nl-NL")
  );

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        spring.set(direction === "up" ? value : 0);
      }, delay * 1000);
    }
  }, [isInView, spring, value, direction, delay]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
