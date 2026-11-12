import Link from "next/link";
import type { ReactNode } from "react";

import { signOut } from "@/app/admin/actions";
import { cn } from "@/lib/cn";

export const inputClass =
  "w-full rounded-[4px] border border-black/20 bg-white px-3 py-2 text-regular outline-none focus:border-tesla-red-dark focus:ring-2 focus:ring-tesla-red-dark/20";

export const buttonClass = {
  primary:
    "inline-flex cursor-pointer items-center justify-center gap-2 border border-tesla-red bg-tesla-red px-[19px] py-[7px] font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-wait disabled:opacity-60",
  secondary:
    "inline-flex cursor-pointer items-center justify-center gap-2 border border-transparent bg-black-5 px-[19px] py-[7px] font-medium transition-opacity hover:opacity-80 disabled:cursor-wait disabled:opacity-60",
  ghost:
    "inline-flex cursor-pointer items-center justify-center gap-1 rounded-[4px] px-2 py-1 text-small font-medium hover:bg-black-5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent",
};

export function AdminHeader({ email }: { email?: string }) {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" aria-label="Админ нүүр">
            <img src="/assets/icons/logo-tesla-wordmark.svg" alt="Tesla" width={120} height={16} className="h-4 w-auto" />
          </Link>
          <span className="text-small font-medium text-black/60">Админ</span>
        </div>
        <div className="flex items-center gap-4 text-small">
          <Link href="/" className="hover:underline" target="_blank">
            Сайт харах ↗
          </Link>
          {email && (
            <form action={signOut} className="flex items-center gap-3">
              <span className="hidden text-black/60 md:inline">{email}</span>
              <button type="submit" className={buttonClass.ghost}>
                Гарах
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}

export function AdminMain({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={cn("mx-auto flex max-w-[960px] flex-col gap-6 px-4 py-8 md:px-8 md:py-12", className)}>{children}</main>;
}

export function Alert({ tone = "error", children }: { tone?: "error" | "success" | "info"; children: ReactNode }) {
  const tones = {
    error: "border-tesla-red-dark/30 bg-tesla-red/5 text-tesla-red-dark",
    success: "border-green-700/30 bg-green-50 text-green-800",
    info: "border-black/10 bg-white text-black/80",
  };
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cn("rounded-card border px-4 py-3 text-small", tones[tone])}>
      {children}
    </div>
  );
}
