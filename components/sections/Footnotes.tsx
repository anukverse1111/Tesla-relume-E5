import type { ReactNode } from "react";

export function Footnotes({ notes, source }: { notes: string[]; source: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <ol className="flex list-decimal flex-col gap-2 pl-5 text-small">
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ol>
      <p className="text-small">{source}</p>
    </div>
  );
}
