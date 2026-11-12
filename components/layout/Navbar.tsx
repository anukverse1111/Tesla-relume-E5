"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

const sideColumn = "flex flex-none md:min-w-px md:flex-[1_0_0]";

/**
 * tesla.com маягийн header: хуудасны дээд хэсэгт зураг дээр тунгалаг, цагаан бичвэртэй,
 * гүйлгэхэд цагаан дэвсгэртэй болно. Утсан дээр цэс "Цэс" товчоор нээгдэнэ.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header
      data-solid={scrolled || open}
      data-open={open}
      // Цэсний холбоос дарахад цэс хаагдана
      onClick={(event) => (event.target as Element).closest("a") && setOpen(false)}
      className="group/nav fixed inset-x-0 top-0 z-50 flex min-h-[72px] items-center px-page text-white transition-colors duration-300 data-[solid=true]:bg-white data-[solid=true]:text-black data-[solid=true]:shadow-[0_1px_0_rgba(0,0,0,0.08)] motion-reduce:transition-none"
    >
      <div className="flex w-full flex-wrap items-center justify-between gap-x-4 md:flex-nowrap md:justify-center md:gap-8">
        <div className={`${sideColumn} h-[72px] items-center md:h-auto`}>
          {/* Зураг дээр байх үед лого цагаан */}
          <Logo
            className="w-24 justify-start md:w-[120px] md:justify-center"
            imgClassName="group-data-[solid=false]/nav:brightness-0 group-data-[solid=false]/nav:invert"
          />
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((current) => !current)}
          className="cursor-pointer px-3 py-1.5 font-medium md:hidden"
        >
          {open ? "Хаах" : "Цэс"}
        </button>

        <NavLinks id="site-menu" />

        <div className={`${sideColumn} order-4 hidden w-full pb-6 group-data-[open=true]/nav:flex md:order-none md:flex md:w-auto md:justify-end md:pb-0`}>
          <Button href="/#test-drive" size="sm">
            Туршилтын жолоодлого
          </Button>
        </div>
      </div>
    </header>
  );
}
