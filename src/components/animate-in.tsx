"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimateIn({ children, delay, className }: AnimateInProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`animate-in-wrapper opacity-0 translate-y-6 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : ""
      } ${className ?? ""}`}
      style={{ transitionDelay: `${delay ?? 0}ms` }}
    >
      {children}
    </div>
  );
}