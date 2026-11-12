"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/#models", label: "Model 3" },
  { href: "/#models", label: "Model Y L Premium" },
  { href: "/model-y", label: "Model Y" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Үндсэн цэс"
      className="order-3 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 whitespace-nowrap md:order-none md:w-auto md:flex-nowrap md:gap-8"
    >
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          aria-current={link.href === pathname ? "page" : undefined}
          className="hover:underline aria-[current=page]:font-semibold"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
