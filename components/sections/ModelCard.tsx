import Image from "next/image";
import Link from "next/link";

import { Mnt } from "@/components/ui/Mnt";
import type { Model } from "@/data/models";

import { cn } from "@/lib/cn";

type ModelCardProps = Model & {
  /** ModelStack доторх бүтэн өргөнтэй, өндөр карт. Бичвэр нь карт байрандаа ирэхэд гарч ирнэ */
  stacked?: boolean;
};

export function ModelCard({ name, href, description, priceText, priceUsd, image, logo, stacked }: ModelCardProps) {
  return (
    <article
      className={cn(
        "has-overlay flex flex-col justify-end overflow-hidden rounded-card p-6",
        stacked ? "h-[min(72svh,640px)] min-h-[420px] w-full md:p-12" : "h-[480px] w-card-width flex-none md:h-[560px] md:p-8",
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes={stacked ? "(min-width: 1408px) 1280px, 100vw" : "(min-width: 768px) 608px, 100vw"}
        className={cn("object-cover", stacked && "stack-media")}
      />
      <div
        className={cn(
          "relative z-1 flex flex-col gap-6 text-white",
          stacked &&
            "transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[shown=false]/stack:translate-y-8 group-data-[shown=false]/stack:opacity-0 motion-reduce:transition-none",
        )}
      >
        <p className="font-roboto text-medium">{description}</p>
        <div className="flex items-end gap-6">
          <div className="min-w-px flex-[1_0_0]">
            {/* Бүтэн өргөнтэй том карт тул h3 түвшин, жижиг slider карт нь энгийн бичвэрийн хэмжээ */}
            <h3 className={cn(stacked ? "heading-3" : "font-semibold")}>
              {href?.startsWith("/") ? (
                <Link href={href} className="hover:underline">
                  {name}
                </Link>
              ) : href ? (
                <a href={href} className="hover:underline">
                  {name}
                </a>
              ) : (
                name
              )}
            </h3>
            <p>
              {priceText}
              {priceUsd != null && (
                <>
                  {" "}
                  <Mnt usd={priceUsd} />
                </>
              )}
            </p>
          </div>
          <img src={logo} alt="" width={120} height={48} />
        </div>
      </div>
    </article>
  );
}
