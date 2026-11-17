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
  /** Тоо бүрийг тусдаа бөөрөнхий хүрээнд оруулна. Гарчиг, картгүй задгай байрлах үед хэрэглэнэ */
  framed?: boolean;
};

export function Stats({ items, valueSize = "h3", columns = 2, framed }: StatsProps) {
  const three = columns === 3;

  return (
    <div className={cn("flex py-2", three ? "flex-col gap-4 md:flex-row md:gap-6" : "gap-6")}>
      {items.map((item) => (
        <div
          key={item.value}
          className={cn(
            // Ойрын зай: тоо, тайлбар хоорондоо 4px, зэргэлдээ тооноос 24px
            "flex min-w-px flex-col gap-1",
            three ? "flex-none md:flex-[1_0_0]" : "flex-[1_0_0] wrap-anywhere",
            framed && "rounded-card bg-gray p-5 ring-1 ring-current/8 ring-inset md:p-6",
          )}
        >
          {/* Металл зураас: Reveal дотор байвал дэлгэцэнд орохдоо зүүнээс зурагдана. Хүрээтэй үед илүүц */}
          {!framed && (
            <span aria-hidden className="stat-line mb-3 block h-px w-full bg-linear-to-r from-current/45 to-transparent" />
          )}
          {/* Улаан өнгө цагаан, саарал, бараан дэвсгэр дээр 4.5:1 орчим тул 20px-ийн h5 ч уншигдана */}
          <p className={cn("text-tesla-red tabular-nums", valueSize === "h3" ? "heading-3" : "heading-5")}>
            <CountUp value={item.value} />
          </p>
          <p className="opacity-80">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
