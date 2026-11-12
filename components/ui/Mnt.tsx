import { formatMnt } from "@/data/currency";

/** Долларын үнийн ард ойролцоо төгрөгийн дүн */
export function Mnt({ usd }: { usd: number }) {
  return <span className="whitespace-nowrap">(≈ {formatMnt(usd)})</span>;
}
