"use client";

import { UserRoundPlusIcon } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CommandItem, CommandPalette } from "@/components/ui/command-palette";

const people = [
  { id: "ada", name: "Ada Mensah", email: "ada@lumen.app", initials: "AM" },
  {
    id: "bruno",
    name: "Bruno Costa",
    email: "bruno@lumen.app",
    initials: "BC",
  },
  { id: "chen", name: "Chen Wei", email: "chen@lumen.app", initials: "CW" },
  { id: "dara", name: "Dara O'Neill", email: "dara@lumen.app", initials: "DO" },
  { id: "eli", name: "Eli Rosen", email: "eli@lumen.app", initials: "ER" },
];

type Person = (typeof people)[number];

export default function CommandPaletteRecipeAssign() {
  const [isOpen, setOpen] = useState(false);
  const [assignee, setAssignee] = useState<Person | null>(null);
  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-muted-foreground text-xs">ENG-512</p>
          <p className="mt-0.5 font-medium text-sm">
            Retry failed webhook deliveries
          </p>
        </div>
        <Badge size="sm" color="warning">
          High
        </Badge>
      </div>
      <div className="mt-4 flex items-center justify-between">
        {assignee ? (
          <span className="flex items-center gap-2 text-sm">
            <Avatar
              size="sm"
              alt={assignee.name}
              fallback={assignee.initials}
              colorful
            />
            {assignee.name}
          </span>
        ) : (
          <span className="text-muted-foreground text-sm">Unassigned</span>
        )}
        <Button variant="ghost" size="sm" onPress={() => setOpen(true)}>
          <UserRoundPlusIcon /> {assignee ? "Reassign" : "Assign"}
        </Button>
      </div>
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setOpen}
        items={people}
        aria-label="Assign issue"
        placeholder="Assign to…"
        emptyMessage="No teammates match."
        className="max-w-md"
        onAction={(key) => {
          setAssignee(people.find((p) => p.id === key) ?? null);
        }}
      >
        {(p) => (
          <CommandItem textValue={`${p.name} ${p.email}`}>
            <Avatar size="xs" alt={p.name} fallback={p.initials} colorful />
            {p.name}
            <span className="ml-auto text-muted-foreground text-xs">
              {p.email}
            </span>
          </CommandItem>
        )}
      </CommandPalette>
    </div>
  );
}
