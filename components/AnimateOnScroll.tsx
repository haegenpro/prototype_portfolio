"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: "up" | "left" | "scale";
  delay?: number;
}

export function AnimateOnScroll({
  children,
  className,
  variant = "up",
  delay = 0,
}: Props) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const animClass =
    variant === "left"
      ? "scroll-animate-left"
      : variant === "scale"
        ? "scroll-animate-scale"
        : "scroll-animate";

  return (
    <div
      ref={ref}
      className={cn(animClass, isVisible && "visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
