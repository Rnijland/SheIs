"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="mr-2 mb-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

interface TextRevealByWordProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextRevealByWord({
  text,
  className,
  delay = 0,
}: TextRevealByWordProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.span
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
        className="block"
      >
        {text}
      </motion.span>
    </div>
  );
}
