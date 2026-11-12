import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type StatItem = {
  value: string;
  label: ReactNode;
};

type StatsProps = {
  items: StatItem[];
  valueSize?: "h2" | "h5";
  columns?: 2 | 3;
};

export function Stats({ items, valueSize = "h2", columns = 2 }: StatsProps) {
  const three = columns === 3;

  return (
    <div className={cn("flex py-2", three ? "flex-col gap-4 md:flex-row md:gap-6" : "gap-6")}>
      {items.map((item) => (
        <div
          key={item.value}
          className={cn(
            "flex min-w-px flex-col gap-2",
            three ? "flex-none md:flex-[1_0_0]" : "flex-[1_0_0] wrap-anywhere",
          )}
        >
          <p className={valueSize === "h2" ? "heading-2" : "heading-5"}>{item.value}</p>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
