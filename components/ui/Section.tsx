import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  gray?: boolean;
  flushTop?: boolean;
  wideGap?: boolean;
  center?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * gray хэсэг нь дэлгэцийн ирмэгээс бага зэрэг дотогш орсон бөөрөнхий самбар (Gestalt: нийтлэг хүрээ).
 * Дараалсан хоёр саарал хэсэг ч margin-ий ачаар тусдаа бүлэг болж ялгарна. Нимгэн хүрээ нь бараан
 * дэвсгэрээс самбарыг тодруулна (дүрс ба дэвсгэр).
 */
export function Section({ id, gray, flushTop, wideGap, center, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "overflow-hidden px-page py-section-lg",
        gray && "mx-2 my-2 rounded-panel bg-gray ring-1 ring-current/8 ring-inset md:mx-4 md:my-4",
        flushTop && "pt-0",
        className,
      )}
    >
      <div
        className={cn("mx-auto flex w-full max-w-site flex-col", wideGap && "gap-12 md:gap-20", center && "items-center")}
      >
        {children}
      </div>
    </section>
  );
}
