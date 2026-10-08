"use client";

import {
  CheckIcon,
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  SunIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CommandItem, CommandPalette } from "@/components/ui/command-palette";

const themes = [
  { id: "light", name: "Light", icon: SunIcon },
  { id: "dark", name: "Dark", icon: MoonIcon },
  { id: "system", name: "System", icon: MonitorIcon },
];

export default function CommandPaletteRecipeTheme() {
  const [isOpen, setOpen] = useState(false);
  const [theme, setTheme] = useState("system");
  const current = themes.find((t) => t.id === theme);
  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        <PaletteIcon /> Theme: {current?.name}
      </Button>
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setOpen}
        items={themes}
        aria-label="Change theme"
        placeholder="Change theme…"
        className="max-w-sm"
        onAction={(key) => {
          setTheme(String(key));
        }}
      >
        {(t) => (
          <CommandItem textValue={t.name}>
            <t.icon /> {t.name}
            {t.id === theme && (
              <CheckIcon
                aria-label="Current theme"
                className="ml-auto text-foreground"
              />
            )}
          </CommandItem>
        )}
      </CommandPalette>
    </>
  );
}
