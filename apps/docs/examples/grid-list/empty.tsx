"use client";

import { InboxIcon } from "lucide-react";
import { GridList } from "@/components/ui/grid-list";

export default function GridListEmpty() {
  return (
    <GridList
      aria-label="Saved searches"
      className="w-full max-w-80"
      renderEmptyState={() => (
        <div className="flex flex-col items-center gap-2">
          <InboxIcon className="size-6 text-muted-foreground/60" />
          <p className="font-medium text-foreground">No saved searches</p>
          <p>Save a search from the results page to get back to it quickly.</p>
        </div>
      )}
    >
      {[]}
    </GridList>
  );
}
