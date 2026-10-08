"use client";

import {
  DatabaseBackupIcon,
  RocketIcon,
  RotateCcwIcon,
  ScrollTextIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CommandItem, CommandPalette } from "@/components/ui/command-palette";

const actions = [
  { id: "deploy", name: "Deploy to production", icon: RocketIcon },
  { id: "rollback", name: "Roll back last deploy", icon: RotateCcwIcon },
  { id: "backup", name: "Create database backup", icon: DatabaseBackupIcon },
  { id: "logs", name: "View build logs", icon: ScrollTextIcon },
];

export default function CommandPaletteDisabled() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        Run a command
      </Button>
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setOpen}
        items={actions}
        disabledKeys={["deploy", "rollback"]}
      >
        {(a) => (
          <CommandItem textValue={a.name}>
            <a.icon /> {a.name}
            {(a.id === "deploy" || a.id === "rollback") && (
              <span className="ml-auto text-muted-foreground text-xs">
                Requires admin
              </span>
            )}
          </CommandItem>
        )}
      </CommandPalette>
    </>
  );
}
