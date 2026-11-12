import { glossary } from "@/data/glossary";

/** Сайтад гардаг бүх нэр томьёоны тайлбарын жагсаалт */
export function Glossary() {
  return (
    <dl className="grid gap-x-8 gap-y-6 md:grid-cols-2">
      {Object.entries(glossary).map(([key, entry]) => (
        <div key={key} className="grid gap-1 border-t border-black/15 pt-4">
          <dt className="font-semibold">{entry.term}</dt>
          <dd>{entry.text}</dd>
        </div>
      ))}
    </dl>
  );
}
