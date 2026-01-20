"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-flex animate-gradient bg-gradient-to-r from-[#c9a050] via-[#e8d5a3] to-[#c9a050] bg-[length:200%_auto] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}

// Add the animation to globals.css or use this inline style approach
// The animation is defined in the component style
export function ShimmerText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "relative inline-block",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "before:animate-shimmer before:bg-[length:200%_100%]",
        className
      )}
      style={{
        background: "linear-gradient(90deg, #c9a050 0%, #e8d5a3 50%, #c9a050 100%)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "gradient 3s linear infinite",
      }}
    >
      {children}
    </span>
  );
}
