"use client";

import { SearchXIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CommandItem, CommandPalette } from "@/components/ui/command-palette";

const customers = [
  { id: "c1", name: "Brightline Logistics" },
  { id: "c2", name: "Cedar & Stone" },
  { id: "c3", name: "Harbor Health" },
  { id: "c4", name: "Northwind Traders" },
];

export default function CommandPaletteEmptyState() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        Find customer
      </Button>
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setOpen}
        items={customers}
        aria-label="Find customer"
        placeholder="Search customers by name…"
        emptyMessage={
          <div className="flex flex-col items-center gap-1">
            <SearchXIcon className="size-5" />
            <p className="font-medium text-foreground">No customers found</p>
            <p className="text-xs">Check the spelling, or search by email.</p>
          </div>
        }
      >
        {(c) => <CommandItem>{c.name}</CommandItem>}
      </CommandPalette>
    </>
  );
}
