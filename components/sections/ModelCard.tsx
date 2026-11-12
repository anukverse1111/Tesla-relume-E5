import Image from "next/image";
import Link from "next/link";

import type { Model } from "@/data/models";

export function ModelCard({ name, href, description, price, image, logo }: Model) {
  return (
    <article className="has-overlay flex h-[480px] w-card-width flex-none flex-col justify-end overflow-hidden rounded-card p-6 md:h-[560px] md:p-8">
      <Image src={image} alt="" fill sizes="(min-width: 768px) 608px, 100vw" className="object-cover" />
      <div className="relative z-1 flex flex-col gap-6 text-white">
        <p className="font-roboto text-medium">{description}</p>
        <div className="flex items-end gap-6">
          <div className="min-w-px flex-[1_0_0]">
            <h3 className="font-semibold">
              {href ? (
                <Link href={href} className="hover:underline">
                  {name}
                </Link>
              ) : (
                name
              )}
            </h3>
            <p>{price}</p>
          </div>
          <img src={logo} alt="" width={120} height={48} />
        </div>
      </div>
    </article>
  );
}
