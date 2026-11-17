import { glossary } from "@/data/glossary";

/**
 * Сайтад гардаг бүх нэр томьёоны тайлбарын жагсаалт.
 * Нэр томьёо бүр өөрийн бөөрөнхий хавтанд (нийтлэг хүрээ), нэр ба тайлбар нь ойрхон (ойрын зай).
 */
export function Glossary() {
  return (
    <dl className="grid gap-3 md:grid-cols-2 md:gap-4">
      {Object.entries(glossary).map(([key, entry]) => (
        <div key={key} className="grid content-start gap-1 rounded-card bg-gray p-5 ring-1 ring-current/8 ring-inset">
          <dt className="font-semibold">{entry.term}</dt>
          <dd className="opacity-80">{entry.text}</dd>
        </div>
      ))}
    </dl>
  );
}
