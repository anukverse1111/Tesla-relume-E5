import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const variants = {
  home: "h-[560px] md:h-[720px] lg:h-[900px]",
  // Тогтмол header зургийн дээр байрлах тул түүний өндрийг нэмнэ
  detail: "h-[560px] pt-[calc(var(--spacing-header)+48px)] md:h-[720px] md:pt-[calc(var(--spacing-header)+64px)] lg:h-[900px]",
  cta: "h-[480px] pt-12 md:pt-16 lg:h-[640px]",
};

type HeroProps = {
  variant?: keyof typeof variants;
  image: string;
  title: string;
  titleAs?: "h1" | "h2";
  description: ReactNode;
  preload?: boolean;
  /** Товчнууд */
  children: ReactNode;
};

export function Hero({ variant = "home", image, title, titleAs: Title = "h1", description, preload, children }: HeroProps) {
  return (
    <section className={cn("has-overlay flex justify-center overflow-hidden px-page", variants[variant])}>
      <Image src={image} alt="" fill sizes="100vw" preload={preload} className="object-cover" />
      <div className="relative z-1 flex h-max w-full max-w-large flex-col items-center gap-8">
        <div className="flex flex-col gap-6 text-center text-white">
          <Title className="heading-1">{title}</Title>
          <p className="text-medium">{description}</p>
        </div>
        <div className="flex flex-wrap items-start gap-4">{children}</div>
      </div>
    </section>
  );
}
