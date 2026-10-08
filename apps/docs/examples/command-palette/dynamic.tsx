"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CommandItem, CommandPalette } from "@/components/ui/command-palette";

const pages = [
  { id: "dashboard", name: "Dashboard" },
  { id: "projects", name: "Projects" },
  { id: "team", name: "Team members" },
  { id: "invoices", name: "Invoices" },
  { id: "reports", name: "Reports" },
  { id: "settings", name: "Settings" },
];

export default function CommandPaletteDynamic() {
  const [isOpen, setOpen] = useState(false);
  const [last, setLast] = useState<string>();
  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="outline" onPress={() => setOpen(true)}>
        Jump to page
      </Button>
      {last && (
        <p className="text-muted-foreground text-sm">Navigated to: {last}</p>
      )}
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setOpen}
        items={pages}
        placeholder="Search pages…"
        onAction={(key) => {
          setLast(pages.find((p) => p.id === key)?.name);
        }}
      >
        {(page) => <CommandItem>{page.name}</CommandItem>}
      </CommandPalette>
    </div>
  );
}
