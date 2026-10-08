"use client";

import {
  BellIcon,
  KeyRoundIcon,
  LanguagesIcon,
  PaletteIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CommandItem, CommandPalette } from "@/components/ui/command-palette";

const settings = [
  {
    id: "appearance",
    name: "Appearance",
    keywords: "theme dark light mode colors",
    icon: PaletteIcon,
  },
  {
    id: "notifications",
    name: "Notifications",
    keywords: "email alerts push digest",
    icon: BellIcon,
  },
  {
    id: "security",
    name: "Security",
    keywords: "password 2fa two-factor passkey sessions",
    icon: KeyRoundIcon,
  },
  {
    id: "language",
    name: "Language & region",
    keywords: "locale timezone date format",
    icon: LanguagesIcon,
  },
];

export default function CommandPaletteKeywords() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline" onPress={() => setOpen(true)}>
        Open settings search
      </Button>
      <p className="text-muted-foreground text-xs">
        Try “dark”, “2fa” or “timezone”
      </p>
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setOpen}
        items={settings}
        placeholder="Search settings…"
      >
        {(s) => (
          <CommandItem textValue={`${s.name} ${s.keywords}`}>
            <s.icon /> {s.name}
          </CommandItem>
        )}
      </CommandPalette>
    </div>
  );
}
