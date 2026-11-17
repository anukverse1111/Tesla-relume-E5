import Image from "next/image";
import type { ReactNode } from "react";

import { HoverSurface } from "@/components/motion/HoverSurface";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollZoom } from "@/components/motion/ScrollZoom";
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

/**
 * Зураг + бичвэртэй хоёр хуваасан карт.
 * Хулганы ард гадаргуу гэрэлтэнэ (glow-card), бичвэр дэлгэцэнд орохдоо дараалан гарч,
 * зураг доош гүйлгэхэд ойртоно (ScrollZoom), tagline нь лугшдаг цэгтэй.
 */
export function FeatureSplit({ tagline, title, image, imageAlt, reverse, stats, actions, children }: FeatureSplitProps) {
  return (
    <HoverSurface
      as="article"
      className={cn(
        "glow-card flex flex-col overflow-hidden rounded-card bg-gray lg:h-[640px]",
        reverse ? "lg:flex-row-reverse" : "lg:flex-row",
      )}
    >
      <Reveal className="flex min-w-0 flex-none flex-col justify-center gap-8 p-6 md:p-12 lg:flex-[0_0_50%]">
        <div className="flex flex-col gap-4">
          <p className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-small font-semibold text-tesla-red-dark ring-1 ring-current/35">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-60 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-current" />
            </span>
            {tagline}
          </p>
          <div className="flex flex-col gap-6">
            <h2 className="heading-2">{title}</h2>
            {children}
          </div>
        </div>
        {stats}
        {actions && <div className="flex flex-wrap items-center gap-6">{actions}</div>}
      </Reveal>
      <ScrollZoom className="relative h-[280px] min-w-0 flex-none overflow-hidden md:h-[400px] lg:h-auto lg:flex-[0_0_50%]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1408px) 640px, (min-width: 992px) 50vw, 100vw"
          className="scroll-zoom-media object-cover"
        />
      </ScrollZoom>
    </HoverSurface>
  );
}
