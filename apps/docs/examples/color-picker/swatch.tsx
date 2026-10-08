"use client";

import { ColorSwatch } from "@/components/ui/color-picker";

const palette = [
  { name: "Ink", value: "#0f172a" },
  { name: "Ocean", value: "#0369a1" },
  { name: "Moss", value: "#4d7c0f" },
  { name: "Clay", value: "#c2410c" },
  { name: "Rose", value: "#be123c" },
  { name: "Frost", value: "#e0f2fe" },
];

export default function ColorSwatchDemo() {
  return (
    <ul className="grid w-full max-w-md grid-cols-3 gap-3 sm:grid-cols-6">
      {palette.map((c) => (
        <li key={c.value} className="flex flex-col gap-1.5">
          <div className="aspect-square w-full">
            <ColorSwatch
              color={c.value}
              colorName={c.name}
              className="size-full rounded-lg"
            />
          </div>
          <span className="font-medium text-xs">{c.name}</span>
          <span className="font-mono text-[0.7rem] text-muted-foreground uppercase">
            {c.value}
          </span>
        </li>
      ))}
    </ul>
  );
}
