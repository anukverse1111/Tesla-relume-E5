import type { ReactNode } from "react";

import { CountUp } from "@/components/ui/CountUp";
import { cn } from "@/lib/cn";

export type StatItem = {
  value: string;
  label: ReactNode;
};

type StatsProps = {
  items: StatItem[];
  /** Тоо хэсгийнхээ гарчгаас (h2) нэг түвшин бага байна: h3 үндсэн, нягт жагсаалтад h5 */
  valueSize?: "h3" | "h5";
  columns?: 2 | 3;
};

export function Stats({ items, valueSize = "h3", columns = 2 }: StatsProps) {
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
          {/* Металл зураас: Reveal дотор байвал дэлгэцэнд орохдоо зүүнээс зурагдана */}
          <span aria-hidden className="stat-line mb-2 block h-px w-full bg-linear-to-r from-current/45 to-transparent" />
          {/* Улаан өнгө цагаан, саарал, бараан дэвсгэр дээр 4.5:1 орчим тул 20px-ийн h5 ч уншигдана */}
          <p className={cn("text-tesla-red tabular-nums", valueSize === "h3" ? "heading-3" : "heading-5")}>
            <CountUp value={item.value} />
          </p>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
