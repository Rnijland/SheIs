"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useMemo } from "react";

interface AnimatedListProps {
  children: ReactNode[];
  className?: string;
  delay?: number;
}

export function AnimatedList({
  children,
  className,
  delay = 0.1,
}: AnimatedListProps) {
  const items = useMemo(() => children, [children]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <AnimatedListItem key={index} delay={index * delay}>
            {item}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface AnimatedListItemProps {
  children: ReactNode;
  delay?: number;
}

function AnimatedListItem({ children, delay = 0 }: AnimatedListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
