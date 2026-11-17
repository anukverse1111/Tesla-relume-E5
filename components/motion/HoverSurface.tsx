"use client";

import type { PointerEvent, ReactNode } from "react";

type HoverSurfaceProps = {
  as?: "div" | "article";
  /** Хулганы байрлалаар хамгийн ихдээ хэдэн градус хазайх. 0 бол хазайхгүй */
  tilt?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Хулганы байрлалыг --spot-x, --spot-y (px), хазайлтыг --rx, --ry CSS хувьсагчаар өгнө.
 * Гэрэл, хазайлтыг өөрөө зурахгүй: spotlight, glow-card, silver-card utility-ууд эдгээрийг ашиглана.
 */
export function HoverSurface({ as: Tag = "div", tilt = 0, className, children }: HoverSurfaceProps) {
  const move = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    element.style.setProperty("--spot-x", `${x}px`);
    element.style.setProperty("--spot-y", `${y}px`);
    if (tilt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.style.setProperty("--ry", `${(x / rect.width - 0.5) * 2 * tilt}deg`);
      element.style.setProperty("--rx", `${(0.5 - y / rect.height) * 2 * tilt}deg`);
    }
  };

  const leave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <Tag onPointerMove={move} onPointerLeave={leave} className={className}>
      {children}
    </Tag>
  );
}
