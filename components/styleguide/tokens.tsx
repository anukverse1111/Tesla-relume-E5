"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

/** Токены утгыг globals.css-ээс шууд, одоогийн дэлгэцийн өргөнөөр уншина */
function useToken(name: string) {
  return useSyncExternalStore(
    subscribe,
    () => getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
    () => "",
  );
}

function parseColor(value: string) {
  if (value.startsWith("#")) {
    let hex = value.slice(1);
    if (hex.length <= 4) hex = [...hex].map((c) => c + c).join("");
    const [r, g, b, a = 255] = [0, 2, 4, 6].map((i) => parseInt(hex.slice(i, i + 2) || "ff", 16));
    return { r, g, b, a: a / 255 };
  }
  const parts = value.match(/[\d.]+/g)?.map(Number);
  if (!parts || parts.length < 3) return null;
  return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
}

type Color = NonNullable<ReturnType<typeof parseColor>>;

function toHex({ r, g, b }: Color) {
  return "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
}

function luminance({ r, g, b }: Color) {
  const [x, y, z] = [r, g, b].map((n) => {
    const c = n / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * x + 0.7152 * y + 0.0722 * z;
}

function contrast(a: Color, b: Color) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
}

export function TokenValue({ name }: { name: string }) {
  return <>{useToken(name)}</>;
}

/** Hex, тунгалаг бол хувь, тунгалаг биш бол цагаантай харьцуулсан contrast */
export function ColorValue({ name }: { name: string }) {
  const color = parseColor(useToken(name));
  if (!color) return null;
  if (color.a < 1) return <>{`${toHex(color)} · ${Math.round(color.a * 100)}%`}</>;
  return <>{`${toHex(color)} · ${contrast(color, { r: 255, g: 255, b: 255, a: 1 }).toFixed(1)}:1`}</>;
}

export function ContrastRatio({ foreground, background, nonText }: { foreground: string; background: string; nonText?: boolean }) {
  const fg = parseColor(useToken(foreground));
  const bg = parseColor(useToken(background));
  if (!fg || !bg) return null;
  const ratio = contrast(fg, bg);
  // WCAG: бичвэр 4.5:1 (том бичвэр 3:1), дүрс ба шугам 3:1
  const level = nonText ? (ratio >= 3 ? "AA · бичвэр биш" : "Хангалтгүй") : ratio >= 4.5 ? "AA" : ratio >= 3 ? "Зөвхөн том бичвэр" : "Хангалтгүй";
  return <>{`${ratio.toFixed(1)}:1 · ${level}`}</>;
}

type Breakpoint = "base" | "md" | "lg";
type Values = Record<string, Partial<Record<Breakpoint, string>>>;

function readResponsiveValues(names: string[]) {
  const values: Values = Object.fromEntries(names.map((name) => [name, {}]));

  const walk = (rules: CSSRuleList, media: string) => {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSMediaRule) {
        walk(rule.cssRules, rule.conditionText);
      } else if (rule instanceof CSSStyleRule && rule.selectorText.includes(":root")) {
        const bucket: Breakpoint | null = media === "" ? "base" : media.includes("62rem") ? "lg" : media.includes("48rem") ? "md" : null;
        if (!bucket) continue;
        for (const name of names) {
          const value = rule.style.getPropertyValue(name).trim();
          if (value) values[name][bucket] = value;
        }
      } else if ("cssRules" in rule) {
        walk((rule as CSSGroupingRule).cssRules, media);
      }
    }
  };

  for (const sheet of Array.from(document.styleSheets)) walk(sheet.cssRules, "");
  return values;
}

const cell = "border-b border-black/15 p-3 text-left whitespace-nowrap";

/** Токен бүрийн гурван дэлгэц дээрх утга, CSS файлаас уншина */
export function ResponsiveTokens({ names }: { names: string[] }) {
  const [values, setValues] = useState<Values>({});

  useEffect(() => {
    setValues(readResponsiveValues(names));
  }, [names]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-small">
        <thead>
          <tr>
            {["Токен", "< 768px", "768–991px", "≥ 992px"].map((label) => (
              <th key={label} className={`${cell} font-semibold`}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {names.map((name) => {
            const row = values[name] ?? {};
            const md = row.md ?? row.base;
            return (
              <tr key={name}>
                <td className={`${cell} font-mono font-semibold`}>{name}</td>
                <td className={`${cell} font-mono`}>{row.base}</td>
                <td className={`${cell} font-mono`}>{md}</td>
                <td className={`${cell} font-mono`}>{row.lg ?? md}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
