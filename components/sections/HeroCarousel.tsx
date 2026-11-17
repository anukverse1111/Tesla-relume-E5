"use client";

import { Children, useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Нэг слайд дэлгэцэнд байх хугацаа (мс). Явцын зураасны animation дуусахад дараагийнх руу шилжинэ */
const SLIDE_DURATION = 6000;

const glassButton =
  "flex cursor-pointer items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md transition duration-200 hover:bg-white/30 motion-reduce:transition-none";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Нүүрний бүтэн дэлгэцийн хэсгүүдийг хажуу тийш гүйлгэнэ.
 * - Утсан дээр хуруугаар, компьютер дээр сум, цэг, ← → товчоор шилжинэ (scroll-snap)
 * - Хулганы ард зөөлөн гэрэл (spotlight) дагана
 * - 6 секунд тутам автоматаар шилжинэ. Keyboard focus, дэлгэцээс гарах, таб нуугдах үед зогсоно.
 *   Зогсоох товчтой, prefers-reduced-motion үед автоматаар гүйхгүй.
 */
export function HeroCarousel({ label, children }: { label: string; children: ReactNode }) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  // Доош гүйлгэж carousel дэлгэцээс гарсан эсвэл таб нуугдсан үед автомат гүйлт зогсоно
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let inView = true;
    const update = () => setVisible(inView && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // Аль слайд дэлгэцэнд байгааг scroll-оос тодорхойлно (хуруугаар гүйлгэсэн ч зөв ажиллана)
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { root: element, threshold: 0.6 },
    );
    element.querySelectorAll("[data-index]").forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [count]);

  const go = useCallback(
    (index: number) => {
      const element = track.current;
      if (!element) return;
      const next = (index + count) % count;
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      element.scrollTo({ left: next * element.clientWidth, behavior: smooth ? "smooth" : "auto" });
      setActive(next);
    },
    [count],
  );

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") go(active + 1);
    else if (event.key === "ArrowLeft") go(active - 1);
    else return;
    event.preventDefault();
  };

  // Гэрлийн байрлалыг React render-гүйгээр CSS хувьсагчаар шинэчилнэ
  const moveSpotlight = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  const running = playing && visible && !focused;

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label={label}
      className="relative"
      // Зөвхөн keyboard-оор focus хийхэд зогсоно. Хулганаар цэг дарахад гүйлт үргэлжилнэ
      onFocus={(event) => event.target.matches(":focus-visible") && setFocused(true)}
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setFocused(false)}
    >
      <div
        ref={track}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-live={running ? "off" : "polite"}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-offset-[-4px] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            data-index={index}
            data-active={index === active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${count}`}
            onPointerMove={moveSpotlight}
            className="group/slide spotlight relative isolate w-full flex-none snap-start snap-always"
          >
            {slide}
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Өмнөх слайд"
        onClick={() => go(active - 1)}
        className={cn(glassButton, "absolute top-1/2 left-4 z-10 hidden size-12 -translate-y-1/2 md:flex lg:left-8")}
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        aria-label="Дараах слайд"
        onClick={() => go(active + 1)}
        className={cn(glassButton, "absolute top-1/2 right-4 z-10 hidden size-12 -translate-y-1/2 md:flex lg:right-8")}
      >
        <Chevron direction="right" />
      </button>

      <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-3 md:bottom-5">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`${index + 1}-р слайд`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => go(index)}
            className="group/dot flex h-6 cursor-pointer items-center"
          >
            <span
              className={cn(
                "relative block h-1 overflow-hidden rounded-full bg-white/35 transition-[width] duration-300 motion-reduce:transition-none",
                index === active ? "w-10" : "w-4 group-hover/dot:bg-white/60",
              )}
            >
              {index === active && (
                <span
                  // key: слайд солигдох бүрт animation-ыг эхнээс нь эхлүүлнэ
                  key={active}
                  onAnimationEnd={() => go(active + 1)}
                  style={{ animationDuration: `${SLIDE_DURATION}ms`, animationPlayState: running ? "running" : "paused" }}
                  className={cn("absolute inset-0 origin-left bg-white", playing ? "animate-progress" : "scale-x-100")}
                />
              )}
            </span>
          </button>
        ))}
        <button
          type="button"
          aria-label={playing ? "Автомат гүйлтийг зогсоох" : "Автомат гүйлтийг эхлүүлэх"}
          onClick={() => setPlaying((value) => !value)}
          className={cn(glassButton, "ml-1 size-8")}
        >
          <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            {playing ? (
              <>
                <rect x="3" y="2" width="3" height="10" rx="1" />
                <rect x="8" y="2" width="3" height="10" rx="1" />
              </>
            ) : (
              <path d="M4 2.5v9a.5.5 0 0 0 .77.42l7-4.5a.5.5 0 0 0 0-.84l-7-4.5A.5.5 0 0 0 4 2.5z" />
            )}
          </svg>
        </button>
      </div>
    </section>
  );
}
