"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Доош гүйлгэхэд доторх зураг 1.15 → 1 болж ойртоно (ModelStack-тай ижил parallax zoom).
 * --enter-г scroll-той шууд холбож, transition-гүй тул гүйлгэх хурдаар яг дагана.
 */
export function ScrollZoom({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Дэлгэцийн доод ирмэгээс орж ирээд дэлгэцийн 20%-д хүрэхэд бүрэн ойртоно
      element.style.setProperty("--enter", clamp((viewport - rect.top) / (viewport * 0.8)).toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={ref} className={cn("scroll-zoom", className)}>
      {children}
    </div>
  );
}
