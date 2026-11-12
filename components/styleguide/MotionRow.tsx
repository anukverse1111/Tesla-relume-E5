"use client";

import { useState, type CSSProperties } from "react";

type MotionRowProps = {
  name: string;
  value: string;
  usage: string;
  /** CSS хугацаа, жишээ нь "150ms" */
  duration: string;
};

export function MotionRow({ name, value, usage, duration }: MotionRowProps) {
  const [moved, setMoved] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setMoved((current) => !current)}
      className="grid w-full cursor-pointer gap-4 rounded-card bg-gray p-6 text-left md:grid-cols-2 md:items-center"
    >
      <span className="grid gap-0.5 text-[12px]">
        <span className="font-mono font-semibold">{name}</span>
        <span className="font-mono text-black/60">{value}</span>
        <span className="text-black/60">{usage}</span>
      </span>
      <span className="relative block h-5" aria-hidden="true">
        <span className="absolute inset-x-0 top-1/2 h-px bg-black/15" />
        <span
          className="absolute top-0 size-5 rounded-full bg-black transition-[left] duration-(--motion-duration) motion-reduce:transition-none"
          style={{ "--motion-duration": duration, left: moved ? "calc(100% - 20px)" : "0px" } as CSSProperties}
        />
      </span>
    </button>
  );
}
