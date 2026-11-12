import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type FeatureSplitProps = {
  tagline: string;
  title: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  /** Гарчгийн доорх <Stats /> */
  stats?: ReactNode;
  /** Товчнууд */
  actions?: ReactNode;
  /** Гарчгийн доорх догол мөрүүд */
  children: ReactNode;
};

export function FeatureSplit({ tagline, title, image, imageAlt, reverse, stats, actions, children }: FeatureSplitProps) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-card bg-gray lg:h-[640px]",
        reverse ? "lg:flex-row-reverse" : "lg:flex-row",
      )}
    >
      <div className="flex min-w-0 flex-none flex-col justify-center gap-8 p-6 md:p-12 lg:flex-[0_0_50%]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-tesla-red-dark">{tagline}</p>
            <div className="flex flex-col gap-6">
              <h2 className="heading-2">{title}</h2>
              {children}
            </div>
          </div>
          {stats}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-6">{actions}</div>}
      </div>
      <div className="relative h-[280px] min-w-0 flex-none md:h-[400px] lg:h-auto lg:flex-[0_0_50%]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1408px) 640px, (min-width: 992px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </article>
  );
}
