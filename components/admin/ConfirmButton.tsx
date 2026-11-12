"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

/** Илгээхээс өмнө баталгаажуулалт асуудаг submit товч */
export function ConfirmButton({ message, className, children }: { message: string; className?: string; children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {pending ? "Устгаж байна…" : children}
    </button>
  );
}
