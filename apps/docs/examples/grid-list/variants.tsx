"use client";

import { GridList, GridListItem } from "@/components/ui/grid-list";

const items = ["Inbox", "Drafts", "Sent"];

export default function GridListVariants() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-3">
      {(["bordered", "separated", "plain"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs capitalize">
            {variant}
          </span>
          <GridList
            aria-label={variant}
            variant={variant}
            selectionMode="single"
            defaultSelectedKeys={["Inbox"]}
          >
            {items.map((i) => (
              <GridListItem key={i} id={i}>
                {i}
              </GridListItem>
            ))}
          </GridList>
        </div>
      ))}
    </div>
  );
}
