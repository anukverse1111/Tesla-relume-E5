import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

// Улаан, мөнгөлөг товч өөрсдийн micro animation-тай (globals.css btn-red, btn-silver), бусад нь hover дээр бүдгэрнэ
const fade = "transition-opacity duration-150 hover:opacity-80 motion-reduce:transition-none";

const variants = {
  primary: "btn-red",
  /** Цайвар саарал мөнгөлөг үндсэн товч (Model Y хуудас) */
  silver: "btn-silver",
  secondary: cn("bg-black-5", fade),
  onImage: cn("bg-white/20 text-white", fade),
  link: cn("gap-2 border-0", fade),
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
  /** Өргөн зэрэг байрлалын нэмэлт класс */
  className?: string;
  children: ReactNode;
};

export function Button({ href, variant = "primary", size = "md", chevron = false, className: extra, children }: ButtonProps) {
  const className = cn(
    "group/btn inline-flex items-center justify-center border border-transparent font-medium whitespace-nowrap",
    variants[variant],
    variant !== "link" && sizes[size],
    extra,
  );

  const content = (
    <>
      {children}
      {/* currentColor тул цагаан, бараан, мөнгөлөг дэвсгэр дээр бичвэртэйгээ ижил өнгөтэй. Hover дээр баруун тийш түлхэгдэнэ */}
      {chevron && (
        <svg
          aria-hidden
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/btn:translate-x-0"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      )}
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
