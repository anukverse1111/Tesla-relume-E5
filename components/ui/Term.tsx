"use client";

import { useId, useRef, useState, type ReactNode } from "react";

import { glossary, type GlossaryKey } from "@/data/glossary";
import { cn } from "@/lib/cn";

const TOOLTIP_WIDTH = 288; // md:max-w-[18rem]

/**
 * Англи нэр томьёо. Хулгана очих, Tab-аар эсвэл утсан дээр дарж focus хийхэд монгол тайлбар гарна.
 * Утсан дээр тайлбар дэлгэцийн доод хэсэгт гарна. Том дэлгэцэд үгийн дээр гарах бөгөөд
 * үг баруун ирмэгт ойр бол тайлбарыг баруун тийш нь тэгшилнэ.
 */
export function Term({ id, children }: { id: GlossaryKey; children?: ReactNode }) {
  const entry = glossary[id];
  const tooltipId = useId();
  const trigger = useRef<HTMLSpanElement>(null);
  const [alignRight, setAlignRight] = useState(false);

  const place = () => {
    const rect = trigger.current?.getBoundingClientRect();
    if (rect) setAlignRight(rect.left + TOOLTIP_WIDTH + 16 > window.innerWidth);
  };

  return (
    <span className="group/term relative" onMouseEnter={place} onFocus={place}>
      <span
        ref={trigger}
        tabIndex={0}
        aria-describedby={tooltipId}
        className="cursor-help underline decoration-current/50 decoration-dotted underline-offset-4"
      >
        {children ?? entry.term}
      </span>
      <span
        role="tooltip"
        id={tooltipId}
        className={cn(
          // ring: хар footer дээр гарахад ирмэг нь ялгагдана
          "pointer-events-none invisible fixed inset-x-4 bottom-4 z-60 rounded-card bg-black px-3 py-2 ring-1 ring-white/25 text-left text-small leading-[1.5] font-normal tracking-normal text-white opacity-0 transition-opacity group-focus-within/term:visible group-focus-within/term:opacity-100 group-hover/term:visible group-hover/term:opacity-100 motion-reduce:transition-none",
          "md:absolute md:inset-x-auto md:bottom-full md:z-30 md:mb-2 md:w-max md:max-w-[18rem]",
          alignRight ? "md:right-0" : "md:left-0",
        )}
      >
        <span className="block font-semibold">{entry.term}</span>
        {entry.text}
      </span>
    </span>
  );
}
