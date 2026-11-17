import Image from "next/image";

import { Button } from "@/components/ui/Button";
import type { ModelPanel as ModelPanelData } from "@/data/models";

type ModelPanelProps = ModelPanelData & {
  titleAs?: "h1" | "h2";
  preload?: boolean;
};

/** tesla.com маягийн бүтэн дэлгэцийн хэсэг: дээр нэр, доор хоёр товч */
export function ModelPanel({ name, description, image, imageAlt, orderUrl, learnUrl, titleAs: Title = "h2", preload }: ModelPanelProps) {
  return (
    <section className="relative flex h-svh min-h-[600px] flex-col items-center justify-between overflow-hidden px-page pt-[calc(var(--spacing-header)+40px)] pb-12 text-center text-white md:pb-16">
      {/* HeroCarousel дотор идэвхтэй слайдын зураг аажим ойртоно (Ken Burns) */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        preload={preload}
        className="object-cover transition-transform duration-[7s] ease-out group-data-[active=false]/slide:scale-110 group-data-[active=false]/slide:duration-0 motion-reduce:scale-100! motion-reduce:transition-none group-data-[active=true]/slide:scale-105"
      />
      {/* Дээд, доод бичвэр уншигдахаар бараан градиент */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/60 via-black/5 to-black/50" />

      {/* Идэвхгүй слайдын бичвэр нуугдаж, идэвхтэй болоход доороос гарч ирнэ */}
      <div className="relative z-1 flex max-w-large flex-col gap-3 transition duration-700 ease-out group-data-[active=false]/slide:translate-y-6 group-data-[active=false]/slide:opacity-0 group-data-[active=false]/slide:duration-0 motion-reduce:translate-y-0! motion-reduce:transition-none">
        <Title className="heading-1">{name}</Title>
        <p className="text-medium">{description}</p>
      </div>

      <div className="relative z-1 flex w-full max-w-[560px] flex-col gap-4 transition duration-700 ease-out group-data-[active=true]/slide:delay-200 group-data-[active=false]/slide:translate-y-6 group-data-[active=false]/slide:opacity-0 group-data-[active=false]/slide:duration-0 motion-reduce:translate-y-0! motion-reduce:transition-none md:flex-row">
        <Button href={orderUrl} className="w-full md:flex-1">
          Захиалах
        </Button>
        <Button href={learnUrl} variant="onImage" className="w-full md:flex-1">
          Дэлгэрэнгүй
        </Button>
      </div>
    </section>
  );
}
