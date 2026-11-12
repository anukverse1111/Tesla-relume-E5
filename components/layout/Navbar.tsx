import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

const sideColumn = "flex flex-none md:min-w-px md:flex-[1_0_0]";

export function Navbar() {
  return (
    <header className="flex min-h-[72px] items-center bg-white px-page py-3 md:py-0">
      <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-3 md:flex-nowrap md:justify-center md:gap-8">
        <div className={sideColumn}>
          <Logo className="w-24 justify-start md:w-[120px] md:justify-center" />
        </div>
        <NavLinks />
        <div className={`${sideColumn} justify-end`}>
          <Button href="/#test-drive" size="sm">
            Туршилтын жолоодлого
          </Button>
        </div>
      </div>
    </header>
  );
}
