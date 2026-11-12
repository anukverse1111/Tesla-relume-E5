export function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex max-w-large flex-col gap-6">
      <h2 className="heading-2">{title}</h2>
      <p className="text-medium">{description}</p>
    </div>
  );
}
