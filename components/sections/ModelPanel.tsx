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
      <Image src={image} alt={imageAlt} fill sizes="100vw" preload={preload} className="object-cover" />
      {/* Дээд, доод бичвэр уншигдахаар бараан градиент */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/60 via-black/5 to-black/50" />

      <div className="relative z-1 flex max-w-large flex-col gap-3">
        <Title className="heading-1">{name}</Title>
        <p className="text-medium">{description}</p>
      </div>

      <div className="relative z-1 flex w-full max-w-[560px] flex-col gap-4 md:flex-row">
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
