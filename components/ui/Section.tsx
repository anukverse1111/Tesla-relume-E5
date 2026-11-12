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

export function Section({ id, gray, flushTop, wideGap, center, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("overflow-hidden px-page py-section-lg", gray && "bg-gray", flushTop && "pt-0", className)}
    >
      <div
        className={cn("mx-auto flex w-full max-w-site flex-col", wideGap && "gap-12 md:gap-20", center && "items-center")}
      >
        {children}
      </div>
    </section>
  );
}
