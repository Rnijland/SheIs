"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  onClick?: () => void;
  asChild?: boolean;
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "rgba(201, 160, 80, 0.5)",
  shimmerSize = "0.1em",
  borderRadius = "0.5rem",
  shimmerDuration = "2s",
  background = "linear-gradient(135deg, #1a3a4a 0%, #2a4a5a 100%)",
  onClick,
}: ShimmerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden px-6 py-3 font-medium text-white transition-all duration-300",
        "hover:scale-105 active:scale-95",
        className
      )}
      style={{
        borderRadius,
        background,
      }}
    >
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius }}
      >
        <span
          className="absolute inset-0 animate-shimmer"
          style={{
            background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
            backgroundSize: "200% 100%",
            animation: `shimmer ${shimmerDuration} infinite`,
          }}
        />
      </span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
