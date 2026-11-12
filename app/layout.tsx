import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

// Монгол "ө", "ү" үсэг зөвхөн cyrillic-ext дэд олонлогт байдаг
const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600"],
  variable: "--next-inter",
});

const roboto = Roboto({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: "400",
  variable: "--next-roboto",
});

export const metadata: Metadata = {
  title: "Tesla",
  description: "Model 3, Model Y L Premium, Model Y загваруудтай танилцаж, туршилтын жолоодлогод цаг аваарай.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="mn" className={`${inter.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
