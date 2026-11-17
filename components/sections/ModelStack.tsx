"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";

/** Давхарласан картуудын дээд ирмэг хоорондын зай (px) */
const PEEK = 20;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Доош гүйлгэхэд картууд нэг нэгээрээ дээш гарч ирээд өмнөхийнхөө дээр давхарлагдана (sticky stacking cards).
 * Animation бүгд scroll-той шууд холбогдсон (transition, хоцрогдолгүй) тул гүйлгэх хурдаар яг дагана:
 * - Орж ирж буй картын зураг 1.15 → 1 болж томролтоос буурна (parallax zoom)
 * - Доор нь орж буй карт жижгэрч, ар тийш хазайж, бараан болно
 * - Карт байрандаа ойртоход бичвэр доороос гарч ирнэ
 * Зөвхөн transform, opacity өөрчлөх тул GPU дээр жигд ажиллана. prefers-reduced-motion үед зөвхөн давхарлагдана.
 */
export function ModelStack({ children }: { children: ReactNode }) {
  const cards = Children.toArray(children);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = list.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(element.querySelectorAll<HTMLElement>("[data-stack-item]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      // Эхлээд бүх хэмжээг уншаад дараа нь бичнэ (layout thrash-гүй)
      const viewport = window.innerHeight;
      const rects = items.map((item) => item.getBoundingClientRect());
      const stickTops = items.map((item) => parseFloat(getComputedStyle(item).top));

      items.forEach((item, index) => {
        const rect = rects[index];
        const stickTop = stickTops[index];

        // Орж ирэлт: дэлгэцийн доороос байрандаа хүрэх хүртэл 0 → 1
        const enter = clamp((viewport - rect.top) / (viewport - stickTop));
        item.style.setProperty("--enter", enter.toFixed(4));
        item.dataset.shown = String(enter > 0.55);

        // Дарагдалт: дараагийн карт энэ картыг бүрхэх хэмжээгээр 0 → 1
        const next = rects[index + 1];
        let cover = 0;
        if (next) {
          const nextStick = stickTop + PEEK;
          cover = clamp((rect.bottom - next.top) / (rect.bottom - nextStick));
        }
        item.style.setProperty("--cover", cover.toFixed(4));
      });
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
  }, [cards.length]);

  return (
    <div ref={list} className="flex flex-col gap-8 pb-8 md:gap-16">
      {cards.map((card, index) => (
        <div
          key={index}
          data-stack-item
          data-shown="true"
          className="stack-item group/stack sticky"
          style={{
            top: `calc(var(--spacing-header) + 24px + ${index * PEEK}px)`,
            // Сүүлийн карт давхарлагдах эцсийн хэмжээ: доор нь байгаа карт бүр бага зэрэг жижиг
            ["--depth" as string]: cards.length - 1 - index,
          }}
        >
          <div className="stack-card">{card}</div>
        </div>
      ))}
    </div>
  );
}
