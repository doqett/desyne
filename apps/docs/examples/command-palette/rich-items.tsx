"use client";

import { FileTextIcon, FolderKanbanIcon, UserRoundIcon } from "lucide-react";
import { useState } from "react";
import { Text } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  CommandItem,
  CommandPalette,
  CommandSection,
} from "@/components/ui/command-palette";

export default function CommandPaletteRichItems() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        Search workspace
      </Button>
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setOpen}
        placeholder="Search projects, docs and people…"
      >
        <CommandSection title="Projects">
          <CommandItem textValue="Website relaunch">
            <FolderKanbanIcon />
            <span className="flex min-w-0 flex-col">
              <Text slot="label">Website relaunch</Text>
              <Text
                slot="description"
                className="text-muted-foreground text-xs"
              >
                Marketing · 24 open issues
              </Text>
            </span>
          </CommandItem>
          <CommandItem textValue="Billing v2">
            <FolderKanbanIcon />
            <span className="flex min-w-0 flex-col">
              <Text slot="label">Billing v2</Text>
              <Text
                slot="description"
                className="text-muted-foreground text-xs"
              >
                Platform · 9 open issues
              </Text>
            </span>
          </CommandItem>
        </CommandSection>
        <CommandSection title="Docs">
          <CommandItem textValue="Incident response runbook">
            <FileTextIcon />
            <span className="flex min-w-0 flex-col">
              <Text slot="label">Incident response runbook</Text>
              <Text
                slot="description"
                className="text-muted-foreground text-xs"
              >
                Updated 2 days ago by Priya
              </Text>
            </span>
          </CommandItem>
        </CommandSection>
        <CommandSection title="People">
          <CommandItem textValue="Marcus Lee">
            <UserRoundIcon />
            <span className="flex min-w-0 flex-col">
              <Text slot="label">Marcus Lee</Text>
              <Text
                slot="description"
                className="text-muted-foreground text-xs"
              >
                Engineering manager
              </Text>
            </span>
          </CommandItem>
        </CommandSection>
      </CommandPalette>
    </>
  );
}
