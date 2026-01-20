"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  name: string;
  description: string;
  icon?: ReactNode;
  className?: string;
  background?: ReactNode;
  href?: string;
}

export function BentoCard({
  name,
  description,
  icon,
  className,
  background,
  href,
}: BentoCardProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-card border border-border",
        "transform-gpu transition-all duration-300",
        "hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5",
        href && "cursor-pointer",
        className
      )}
    >
      {background && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30">
          {background}
        </div>
      )}
      <div className="relative z-10 flex flex-col gap-2 p-6">
        {icon && (
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
            {icon}
          </div>
        )}
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-accent/[0.03]" />
    </Wrapper>
  );
}
