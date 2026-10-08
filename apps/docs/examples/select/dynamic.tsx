"use client";

import { Select, SelectItem } from "@/components/ui/select";

const frameworks = [
  { id: "next", name: "Next.js" },
  { id: "remix", name: "React Router" },
  { id: "vite", name: "Vite" },
  { id: "tanstack", name: "TanStack Start" },
  { id: "astro", name: "Astro" },
];

export default function SelectDynamic() {
  return (
    <Select
      className="w-full max-w-56"
      label="Framework"
      placeholder="Pick a framework"
      items={frameworks}
    >
      {(item) => <SelectItem>{item.name}</SelectItem>}
    </Select>
  );
}
