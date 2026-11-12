import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const variants = {
  primary: "border-royal-blue bg-royal-blue text-white",
  secondary: "bg-black-5",
  onImage: "bg-white/20 text-white",
  link: "gap-2 border-0",
};

// Figma-ийн дотор хүрээ: 1px хүрээ + 9/23 = 10/24
const sizes = {
  md: "px-[23px] py-[9px]",
  sm: "px-[19px] py-[7px]",
};

type ButtonProps = {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  chevron?: boolean;
  children: ReactNode;
};

export function Button({ href, variant = "primary", size = "md", chevron = false, children }: ButtonProps) {
  const className = cn(
    "inline-flex items-center justify-center border border-transparent font-medium whitespace-nowrap transition-opacity duration-150 hover:opacity-80 motion-reduce:transition-none",
    variants[variant],
    variant !== "link" && sizes[size],
  );

  const content = (
    <>
      {children}
      {chevron && <img src="/assets/icons/chevron-right.svg" alt="" width={24} height={24} />}
    </>
  );

  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <a href={href} className={className}>
      {content}
    </a>
  );
}
