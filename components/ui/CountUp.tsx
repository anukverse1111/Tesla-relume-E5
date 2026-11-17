"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1600;

/** "17,035,000,000", "7x", "30,864" → угтвар, тоо, дагавар, бутархайн орон */
function parse(value: string) {
  const match = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  const decimals = number.split(".")[1]?.length ?? 0;
  return { prefix, target: Number(number.replaceAll(",", "")), suffix, decimals, grouped: number.includes(",") };
}

/**
 * Дэлгэцэнд орохдоо 0-ээс тоолж гарна (ease-out). Байрлал хөдлөхгүйн тулд эцсийн утгаар зай эзэлж,
 * дэлгэц уншигчид эцсийн утгыг шууд уншина. Тоо биш утга, prefers-reduced-motion үед шууд харуулна.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const parsed = parse(value);
    const element = ref.current;
    if (!parsed || !element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const format = (n: number) =>
      parsed.prefix +
      n.toLocaleString("en-US", {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
        useGrouping: parsed.grouped,
      }) +
      parsed.suffix;

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        const eased = 1 - Math.pow(2, -10 * t); // easeOutExpo
        setDisplay(t === 1 ? value : format(parsed.target * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    setDisplay(format(0));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      <span className="sr-only">{value}</span>
      <span aria-hidden className="invisible">
        {value}
      </span>
      <span aria-hidden className="absolute inset-0">
        {display}
      </span>
    </span>
  );
}
