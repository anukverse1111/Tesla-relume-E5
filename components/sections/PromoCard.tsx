import Image from "next/image";

import { HoverSurface } from "@/components/motion/HoverSurface";
import { Button } from "@/components/ui/Button";

type PromoCardProps = {
  title: string;
  description?: string;
  href: string;
  image: string;
  imageAlt: string;
};

/**
 * Мөнгөлөг урамшууллын карт (TipCards-тай ижил silver-card): hover дээр өргөгдөж хазайх,
 * металл гялбаа гүйх, хулганы ард гэрэл тусах, зураг аажим ойртох.
 */
export function PromoCard({ title, description, href, image, imageAlt }: PromoCardProps) {
  return (
    <HoverSurface
      as="article"
      tilt={3}
      className="group/promo silver-card flex flex-none flex-col rounded-card md:flex-row lg:min-w-px lg:flex-[1_0_0]"
    >
      <div className="relative z-1 flex min-w-0 flex-none flex-col items-start justify-center gap-6 p-6 md:flex-[0_0_50%]">
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
      <div className="relative z-1 h-60 min-w-0 flex-none overflow-hidden md:h-80 md:flex-[0_0_50%]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1408px) 312px, (min-width: 992px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/promo:scale-105 motion-reduce:transition-none motion-reduce:group-hover/promo:scale-100"
        />
      </div>
    </HoverSurface>
  );
}
