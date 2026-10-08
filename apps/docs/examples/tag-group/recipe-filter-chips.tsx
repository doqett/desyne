"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import { Tag, TagGroup } from "@/components/ui/tag-group";

const articles = [
  {
    id: 1,
    title: "Designing accessible date pickers",
    category: "design",
    minutes: 8,
  },
  {
    id: 2,
    title: "Server components and client islands",
    category: "engineering",
    minutes: 12,
  },
  {
    id: 3,
    title: "How we price usage-based plans",
    category: "product",
    minutes: 6,
  },
  {
    id: 4,
    title: "Color tokens that survive dark mode",
    category: "design",
    minutes: 5,
  },
  {
    id: 5,
    title: "Zero-downtime Postgres migrations",
    category: "engineering",
    minutes: 15,
  },
  {
    id: 6,
    title: "Writing a changelog people read",
    category: "product",
    minutes: 4,
  },
];
const categories = [
  { id: "all", name: "All" },
  { id: "design", name: "Design" },
  { id: "engineering", name: "Engineering" },
  { id: "product", name: "Product" },
];

export default function TagGroupRecipeFilterChips() {
  const [category, setCategory] = useState<Key>("all");
  const visible = articles.filter(
    (a) => category === "all" || a.category === category,
  );
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <TagGroup
        aria-label="Category"
        items={categories}
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[category]}
        onSelectionChange={(keys) => {
          const [key] = [...keys];
          if (key !== undefined) setCategory(key);
        }}
      >
        {(c) => <Tag className="rounded-full px-3">{c.name}</Tag>}
      </TagGroup>
      <ul className="divide-y rounded-lg border bg-card">
        {visible.map((a) => (
          <li
            key={a.id}
            className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm"
          >
            <span className="truncate">{a.title}</span>
            <span className="shrink-0 text-muted-foreground text-xs">
              {a.minutes} min
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
