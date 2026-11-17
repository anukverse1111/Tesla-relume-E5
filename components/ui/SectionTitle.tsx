export function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    // Ойрын зай: гарчиг-тайлбарын зай (12–16px) нь агуулга хүртэлх зайнаас (48–80px) хамаагүй бага тул нэг бүлэг болж уншигдана
    <div className="flex max-w-large flex-col gap-3 md:gap-4">
      <h2 className="heading-2">{title}</h2>
      <p className="text-medium opacity-80">{description}</p>
    </div>
  );
}
