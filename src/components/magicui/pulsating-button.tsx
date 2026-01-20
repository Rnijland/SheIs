"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PulsatingButtonProps {
  children: ReactNode;
  className?: string;
  pulseColor?: string;
  duration?: string;
  onClick?: () => void;
  href?: string;
}

export function PulsatingButton({
  children,
  className,
  pulseColor = "rgba(201, 160, 80, 0.5)",
  duration = "1.5s",
  onClick,
  href,
}: PulsatingButtonProps) {
  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full",
        "bg-accent px-8 py-4 font-semibold text-accent-foreground",
        "transition-transform duration-300 hover:scale-105 active:scale-95",
        className
      )}
    >
      <span
        className="absolute inset-0 animate-pulse rounded-full"
        style={{
          background: `radial-gradient(circle, ${pulseColor} 0%, transparent 70%)`,
          animation: `pulse ${duration} ease-in-out infinite`,
        }}
      />
      <span
        className="absolute -inset-1 animate-ping rounded-full opacity-20"
        style={{
          background: pulseColor,
          animationDuration: duration,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  );
}
