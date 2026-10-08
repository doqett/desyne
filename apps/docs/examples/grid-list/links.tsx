"use client";

import { ChevronRightIcon } from "lucide-react";
import {
  GridList,
  GridListItem,
  GridListItemDescription,
  GridListItemLabel,
} from "@/components/ui/grid-list";

const guides = [
  {
    id: "install",
    href: "/docs/installation",
    title: "Installation",
    detail: "Add the library to a Next.js app",
  },
  {
    id: "theming",
    href: "/docs/theming",
    title: "Theming",
    detail: "Customize tokens, colors and radius",
  },
  {
    id: "components",
    href: "/docs/components",
    title: "Components",
    detail: "Browse every component",
  },
];

export default function GridListLinks() {
  return (
    <GridList
      aria-label="Guides"
      items={guides}
      variant="separated"
      className="w-full max-w-80"
    >
      {(g) => (
        <GridListItem
          href={g.href}
          textValue={g.title}
          className="cursor-pointer"
        >
          <span className="flex min-w-0 flex-1 flex-col">
            <GridListItemLabel>{g.title}</GridListItemLabel>
            <GridListItemDescription>{g.detail}</GridListItemDescription>
          </span>
          <ChevronRightIcon className="size-4 text-muted-foreground" />
        </GridListItem>
      )}
    </GridList>
  );
}
