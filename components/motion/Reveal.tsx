"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Дэлгэцэнд орохдоо шууд хүүхдүүд нь доороос дараалан гарч ирнэ (globals.css .reveal).
 * JS ажиллахгүй үед бүх зүйл харагдсаар байхаар data-inview-г зөвхөн client дээр тавина.
 */
export function Reveal({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    // Дэлгэцэнд аль хэдийн байгаа бол нуухгүй (ачаалахад анивчихгүй)
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    element.dataset.inview = "false";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.inview = "true";
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("reveal", className)}>
      {children}
    </div>
  );
}
