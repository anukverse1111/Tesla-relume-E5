"use client";

import { useEffect, useRef, useState } from "react";

const PAGE_WIDTH = 1440;
const MAX_PREVIEW_HEIGHT = 320;

type SectionPreviewProps = {
  page: string;
  selector: string;
  title: string;
  source: string;
};

/** Бодит хуудсыг 1440px өргөнөөр нээж, зөвхөн тухайн хэсгийг жижигрүүлж харуулна */
export function SectionPreview({ page, selector, title, source }: SectionPreviewProps) {
  const clip = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(0);
  const [area, setArea] = useState({ top: 0, height: 900 });

  useEffect(() => {
    if (!clip.current) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / PAGE_WIDTH));
    observer.observe(clip.current);
    return () => observer.disconnect();
  }, []);

  // Iframe өндөр өөрчлөгдсөний дараа гүйлгэнэ, эс бөгөөс хуудасны төгсгөлд хязгаарлагдана
  useEffect(() => {
    frame.current?.contentWindow?.scrollTo(0, area.top);
  }, [area]);

  const measure = () => {
    const win = frame.current?.contentWindow;
    const element = win?.document.querySelector(selector);
    if (!win || !element) return;
    // Тогтмол header бусад хэсгийн дээд талыг дарахгүйн тулд нууна
    if (!selector.includes("header")) win.document.querySelector("body > header")?.setAttribute("hidden", "");
    const rect = element.getBoundingClientRect();
    setArea({ top: rect.top + win.scrollY, height: rect.height });
  };

  return (
    <li className="grid content-start gap-2">
      <div
        ref={clip}
        inert
        className="relative overflow-hidden rounded-card border border-black/15"
        style={{ height: Math.min(area.height * scale, MAX_PREVIEW_HEIGHT) || MAX_PREVIEW_HEIGHT / 2 }}
      >
        <iframe
          ref={frame}
          src={page}
          title={`${title} урьдчилан харах`}
          loading="lazy"
          scrolling="no"
          tabIndex={-1}
          onLoad={measure}
          className="absolute top-0 left-0 origin-top-left"
          style={{ width: PAGE_WIDTH, height: area.height, transform: `scale(${scale})` }}
        />
      </div>
      <p className="text-small font-semibold">{title}</p>
      <p className="font-mono text-[11px] text-black/60">{source}</p>
    </li>
  );
}
