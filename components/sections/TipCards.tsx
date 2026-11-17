"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/lib/cn";

type Tip = { title: string; text: ReactNode };

/** Хулганы байрлалаас хамааран картыг хамгийн ихдээ хэдэн градус хазайлгах */
const MAX_TILT = 6;

/**
 * Мөнгөлөг саарал картууд. Бичвэрийн эхний 2 мөр харагдаж, үлдсэнийг "Дэлгэрэнгүй" товчоор дэлгэнэ.
 * Micro animation: дэлгэцэнд орохдоо дараалан гарч ирэх, hover дээр өргөгдөж хазайх,
 * металл гялбаа гүйх, хулганы ард гэрэл тусах, дэлгэх үед өндөр зөөлөн өөрчлөгдөх.
 */
export function TipCards({ items }: { items: Tip[] }) {
  const grid = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = grid.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={grid} className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {items.map((item, index) => (
        <TipCard key={item.title} {...item} index={index} inView={inView} />
      ))}
    </div>
  );
}

function TipCard({ title, text, index, inView }: Tip & { index: number; inView: boolean }) {
  const card = useRef<HTMLElement>(null);
  const body = useRef<HTMLParagraphElement>(null);
  const bodyId = useId();
  const [expanded, setExpanded] = useState(false);
  // Хураах animation дуусах хүртэл line-clamp-ийг (…) буцааж тавихгүй
  const [clamped, setClamped] = useState(true);
  const [overflows, setOverflows] = useState(true);
  const [fullHeight, setFullHeight] = useState<number>();

  // Бичвэр 2 мөрөнд багтах эсэх, бүтэн өндрийг хэмжинэ (дэлгэцийн өргөн өөрчлөгдөхөд дахин)
  useLayoutEffect(() => {
    const element = body.current;
    if (!element) return;
    const measure = () => {
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      setFullHeight(element.scrollHeight);
      setOverflows(element.scrollHeight > lineHeight * 2 + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    if (expanded) {
      setExpanded(false);
      // Хөдөлгөөнгүй горимд transitionend гарахгүй тул шууд хураана
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setClamped(true);
    } else {
      setClamped(false);
      setExpanded(true);
    }
  };

  const tilt = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    element.style.setProperty("--spot-x", `${x * 100}%`);
    element.style.setProperty("--spot-y", `${y * 100}%`);
    element.style.setProperty("--ry", `${(x - 0.5) * 2 * MAX_TILT}deg`);
    element.style.setProperty("--rx", `${(0.5 - y) * 2 * MAX_TILT}deg`);
  };

  const resetTilt = () => {
    card.current?.style.setProperty("--rx", "0deg");
    card.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      ref={card}
      onPointerMove={tilt}
      onPointerLeave={resetTilt}
      data-inview={inView}
      data-expanded={expanded}
      style={{ animationDelay: `${index * 90}ms` }}
      className="group/tip silver-card flex flex-col gap-2 rounded-card p-6 motion-safe:data-[inview=true]:animate-fade-up motion-safe:data-[inview=false]:opacity-0"
    >
      <span aria-hidden className="relative z-1 text-small font-semibold tracking-widest text-black/55 transition-colors duration-300 group-hover/tip:text-tesla-red-dark">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="relative z-1 heading-5">{title}</h3>
      <p
        ref={body}
        id={bodyId}
        onTransitionEnd={(event) => event.propertyName === "max-height" && !expanded && setClamped(true)}
        style={{ maxHeight: expanded && fullHeight ? fullHeight : "2lh" }}
        className={cn(
          "relative z-1 overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none",
          clamped && "line-clamp-2",
        )}
      >
        {text}
      </p>
      {overflows && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={bodyId}
          onClick={toggle}
          className="group/more relative z-1 mt-2 inline-flex cursor-pointer items-center gap-2 self-start text-small font-semibold"
        >
          <span className="bg-linear-to-r from-current to-current bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover/more:bg-[length:100%_1px] motion-reduce:transition-none">
            {expanded ? "Хураах" : "Дэлгэрэнгүй"}
          </span>
          <span
            aria-hidden
            className="flex size-6 items-center justify-center rounded-full bg-black/10 transition duration-300 group-hover/more:bg-black group-hover/more:text-white group-data-[expanded=true]/tip:rotate-45 motion-reduce:transition-none"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              <path d="M6 1.5v9M1.5 6h9" />
            </svg>
          </span>
        </button>
      )}
    </article>
  );
}
