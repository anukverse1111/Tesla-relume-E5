/** Монголбанкны албан ханш. Шинэчлэхдээ зөвхөн энэ утгуудыг солино. */
export const usdToMnt = {
  rate: 3602.33,
  date: "2026.11.11",
  source: "Монголбанк",
  url: "https://www.mongolbank.mn/mn/currency-rates",
} as const;

/** Долларыг төгрөгт хөрвүүлж уншихад амар байдлаар бүхэлчилнэ: "479 мянган ₮", "1.6 сая ₮", "223 сая ₮" */
export function formatMnt(usd: number) {
  const mnt = usd * usdToMnt.rate;
  if (mnt >= 1_000_000) {
    const millions = mnt / 1_000_000;
    return `${millions >= 10 ? Math.round(millions) : millions.toFixed(1)} сая ₮`;
  }
  return `${Math.round(mnt / 1000)} мянган ₮`;
}
