import Link from "next/link";

import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Нүүр хуудас" className={cn("flex h-9 flex-none items-center", className)}>
      <img src="/assets/icons/logo-tesla-wordmark.svg" alt="" width={342} height={35} className="h-auto w-full" />
    </Link>
  );
}
