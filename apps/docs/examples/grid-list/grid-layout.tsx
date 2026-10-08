"use client";

import {
  GridList,
  GridListItem,
  GridListItemDescription,
  GridListItemLabel,
} from "@/components/ui/grid-list";

const templates = [
  { id: "blank", name: "Blank", meta: "Start from scratch", tint: "bg-muted" },
  {
    id: "landing",
    name: "Landing page",
    meta: "Hero, features, pricing",
    tint: "bg-brand/15",
  },
  {
    id: "blog",
    name: "Blog",
    meta: "Posts and categories",
    tint: "bg-info/15",
  },
  {
    id: "docs",
    name: "Docs",
    meta: "Sidebar and search",
    tint: "bg-success/15",
  },
  {
    id: "store",
    name: "Store",
    meta: "Products and cart",
    tint: "bg-warning/15",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    meta: "Case studies",
    tint: "bg-destructive/10",
  },
];

export default function GridListGridLayout() {
  return (
    <GridList
      aria-label="Templates"
      items={templates}
      layout="grid"
      selectionMode="single"
      defaultSelectedKeys={["landing"]}
      variant="plain"
      className="grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-3"
    >
      {(t) => (
        <GridListItem
          textValue={t.name}
          className="flex-col items-stretch gap-2 rounded-lg border bg-card p-2 data-selected:border-brand data-selected:bg-card data-selected:text-foreground data-selected:ring-2 data-selected:ring-brand/30 [&_[slot=selection]]:absolute [&_[slot=selection]]:top-3 [&_[slot=selection]]:right-3"
        >
          <div className={`aspect-4/3 rounded-md ${t.tint}`} />
          <span className="flex min-w-0 flex-col px-1 pb-1">
            <GridListItemLabel>{t.name}</GridListItemLabel>
            <GridListItemDescription>{t.meta}</GridListItemDescription>
          </span>
        </GridListItem>
      )}
    </GridList>
  );
}
