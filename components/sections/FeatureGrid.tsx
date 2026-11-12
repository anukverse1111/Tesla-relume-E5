import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type FeatureGridProps = {
  items: { title: string; text: ReactNode }[];
  columns?: 3 | 4;
  /** Саарал дэвсгэртэй хэсэг дотор карт цагаан байна */
  onGray?: boolean;
};

export function FeatureGrid({ items, columns = 3, onGray }: FeatureGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8", columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {items.map((item) => (
        <article key={item.title} className={cn("flex flex-col gap-2 rounded-card p-6", onGray ? "bg-white" : "bg-gray")}>
          <h3 className="heading-5">{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
