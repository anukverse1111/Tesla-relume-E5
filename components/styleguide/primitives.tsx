import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { ColorValue } from "./tokens";

export function SgSection({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 pt-16 md:pt-24">
      <h2 className="heading-3 mb-8 flex items-baseline gap-4 border-b border-black/15 pb-4">
        <span className="text-[12px] font-medium tracking-normal text-black/60">{number}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function SgH3({ children }: { children: ReactNode }) {
  return <h3 className="mt-12 mb-4 text-[20px] leading-[1.3] font-semibold first-of-type:mt-0">{children}</h3>;
}

export function SgNote({ children }: { children: ReactNode }) {
  return <p className="mb-6 max-w-[720px] text-small text-black/60">{children}</p>;
}

export function DemoBox({ dark, gray, className, children }: { dark?: boolean; gray?: boolean; className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "mb-4 overflow-hidden rounded-card p-6 md:p-8",
        dark ? "bg-black text-white" : gray ? "bg-gray" : "border border-black/15",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Зүүн талд токен, баруун талд утга, тайлбартай мөр */
export function SgRow({ name, children }: { name: ReactNode; children: ReactNode }) {
  return (
    <li className="grid gap-1 border-b border-black/15 py-3 md:grid-cols-[220px_minmax(0,1fr)] md:gap-5">
      <span className="font-mono text-[12px] font-semibold">{name}</span>
      <span className="text-small">{children}</span>
    </li>
  );
}

export function Swatch({ name, usage }: { name: string; usage: string }) {
  return (
    <li className="grid content-start gap-0.5 text-[12px]">
      <span
        className="mb-2 h-18 rounded-[4px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]"
        style={{ background: `var(${name})` }}
      />
      <span className="font-mono font-semibold">{name}</span>
      <span className="font-mono text-black/60">
        <ColorValue name={name} />
      </span>
      <span className="text-black/60">{usage}</span>
    </li>
  );
}

/** Саарал дэвсгэртэй жишээ ба тайлбар */
export function Tile({ title, spec, children }: { title: string; spec: ReactNode; children: ReactNode }) {
  return (
    <li className="grid content-start gap-1">
      <div className="relative mb-2 flex h-28 items-center justify-center overflow-hidden rounded-card bg-gray">{children}</div>
      <p className="text-small font-semibold">{title}</p>
      <p className="text-[12px] text-black/60">{spec}</p>
    </li>
  );
}
