import Image from "next/image";

import { Button } from "@/components/ui/Button";

type PromoCardProps = {
  title: string;
  description?: string;
  href: string;
  image: string;
  imageAlt: string;
};

export function PromoCard({ title, description, href, image, imageAlt }: PromoCardProps) {
  return (
    <article className="flex flex-none flex-col overflow-hidden rounded-card bg-white md:flex-row lg:min-w-px lg:flex-[1_0_0]">
      <div className="flex min-w-0 flex-none flex-col items-start justify-center gap-6 p-6 md:flex-[0_0_50%]">
        {description ? (
          <div className="flex flex-col gap-2">
            <h3 className="heading-5">{title}</h3>
            <p>{description}</p>
          </div>
        ) : (
          <h3 className="heading-5">{title}</h3>
        )}
        <Button href={href} variant="link" chevron>
          Дэлгэрэнгүй
        </Button>
      </div>
      <div className="relative h-60 min-w-0 flex-none md:h-80 md:flex-[0_0_50%]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1408px) 312px, (min-width: 992px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </article>
  );
}
