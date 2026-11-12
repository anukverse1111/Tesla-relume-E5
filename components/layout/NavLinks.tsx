"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/#models", label: "Model 3" },
  { href: "/#models", label: "Model Y L Premium" },
  { href: "/model-y", label: "Model Y" },
];

/** Утсан дээр Navbar-ын "Цэс" товчоор нээгдэх босоо жагсаалт, том дэлгэцэнд нэг мөр */
export function NavLinks({ id }: { id?: string }) {
  const pathname = usePathname();

  return (
    <nav
      id={id}
      aria-label="Үндсэн цэс"
      className="order-3 hidden w-full flex-col py-2 whitespace-nowrap group-data-[open=true]/nav:flex md:order-none md:flex md:w-auto md:flex-row md:items-center md:gap-8 md:py-0"
    >
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          aria-current={link.href === pathname ? "page" : undefined}
          className="py-3 text-medium hover:underline aria-[current=page]:font-semibold md:py-0 md:text-regular"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
