"use client";

import { BellOffIcon } from "lucide-react";
import { ListBox } from "@/components/ui/list-box";

export default function ListBoxEmpty() {
  return (
    <ListBox
      aria-label="Notification rules"
      className="w-full max-w-64"
      renderEmptyState={() => (
        <div className="flex flex-col items-center gap-2">
          <BellOffIcon className="size-5 text-muted-foreground/60" />
          No notification rules yet.
        </div>
      )}
    >
      {[]}
    </ListBox>
  );
}
