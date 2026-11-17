import type { ReactNode } from "react";

/** Зүүлт тайлбар ба эх сурвалжийг нэг бөөрөнхий хүрээнд бүлэглэнэ (Gestalt: нийтлэг хүрээ) */
export function Footnotes({ notes, source }: { notes: string[]; source: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-card p-5 text-small ring-1 ring-current/12 ring-inset md:p-6">
      <ol className="flex list-decimal flex-col gap-2 pl-5 opacity-85">
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ol>
      <p className="border-t border-current/12 pt-4 opacity-70">{source}</p>
    </div>
  );
}
