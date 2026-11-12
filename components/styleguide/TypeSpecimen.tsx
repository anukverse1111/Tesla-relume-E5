"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Бодит хэв маягийг харуулж, хөтчийн тооцоолсон утгыг доор нь бичнэ */
export function TypeSpecimen({ className, label, children }: { className?: string; label: string; children: ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [spec, setSpec] = useState("");

  useEffect(() => {
    const read = () => {
      if (!ref.current) return;
      const s = getComputedStyle(ref.current);
      const family = s.fontFamily.split(",")[0].replaceAll('"', "");
      const tracking = s.letterSpacing === "normal" ? "0" : s.letterSpacing;
      setSpec(`${family} ${s.fontWeight} · ${s.fontSize}/${s.lineHeight} · ${tracking}`);
    };
    read();
    document.fonts.ready.then(read);
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  return (
    <div className="grid gap-2 border-b border-black/15 p-6 last:border-b-0">
      <p ref={ref} className={className}>
        {children}
      </p>
      <p className="font-mono text-[11px] text-black/60">
        {label} — {spec}
      </p>
    </div>
  );
}
