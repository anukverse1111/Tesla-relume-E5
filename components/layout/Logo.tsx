import Link from "next/link";

import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  /** Бараан дэвсгэр дээр цагаан лого */
  inverted?: boolean;
  imgClassName?: string;
};

export function Logo({ className, inverted, imgClassName }: LogoProps) {
  return (
    <Link href="/" aria-label="Нүүр хуудас" className={cn("flex h-9 flex-none items-center", className)}>
      <img
        src="/assets/icons/logo-tesla-wordmark.svg"
        alt=""
        width={342}
        height={35}
        className={cn("h-auto w-full", inverted && "brightness-0 invert", imgClassName)}
      />
    </Link>
  );
}
