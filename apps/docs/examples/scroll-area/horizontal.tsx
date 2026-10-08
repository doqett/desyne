import { ScrollArea } from "@/components/ui/scroll-area";

const collections = [
  { name: "Linen bedding", count: 24, hue: 30 },
  { name: "Stoneware", count: 41, hue: 200 },
  { name: "Wool throws", count: 12, hue: 350 },
  { name: "Oak furniture", count: 18, hue: 80 },
  { name: "Ceramic lamps", count: 9, hue: 260 },
  { name: "Rugs", count: 33, hue: 150 },
  { name: "Glassware", count: 27, hue: 190 },
];

export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea
      orientation="horizontal"
      aria-label="Collections"
      className="w-full max-w-lg"
    >
      <ul className="flex w-max gap-3 pb-3">
        {collections.map((c) => (
          <li key={c.name} className="w-36 shrink-0">
            <div
              className="aspect-[4/5] rounded-lg"
              style={{
                background: `linear-gradient(160deg, oklch(0.9 0.05 ${c.hue}), oklch(0.75 0.08 ${c.hue}))`,
              }}
            />
            <p className="mt-2 font-medium text-sm">{c.name}</p>
            <p className="text-muted-foreground text-xs">{c.count} products</p>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
