"use client";

import { Children, useState, type ReactNode } from "react";

const arrowClass = "cursor-pointer border border-white bg-gray p-[11px]";

export function ModelSlider({ children }: { children: ReactNode }) {
  const count = Children.count(children);
  const [active, setActive] = useState(0);

  const go = (index: number) => setActive((index + count) % count);

  return (
    <div className="flex flex-col gap-8">
      <div
        className="flex gap-card-gap transition-transform duration-400 motion-reduce:transition-none"
        style={{
          transform: `translateX(calc(${active} * -1 * (var(--spacing-card-width) + var(--spacing-card-gap))))`,
        }}
      >
        {children}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`${index + 1}-р карт`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => go(index)}
              className="size-2 cursor-pointer rounded-full bg-black opacity-20 transition-opacity duration-200 aria-[current=true]:bg-tesla-red aria-[current=true]:opacity-100 motion-reduce:transition-none"
            />
          ))}
        </div>
        <div className="flex gap-4">
          <button type="button" aria-label="Өмнөх карт" onClick={() => go(active - 1)} className={arrowClass}>
            <img src="/assets/icons/arrow-back.svg" alt="" width={24} height={24} />
          </button>
          <button type="button" aria-label="Дараах карт" onClick={() => go(active + 1)} className={arrowClass}>
            <img src="/assets/icons/arrow-forward.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
