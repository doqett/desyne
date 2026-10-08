"use client";

import {
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandItem,
  CommandPalette,
  CommandSection,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command-palette";
import { Kbd } from "@/components/ui/kbd";

export default function CommandPaletteDemo() {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="text-muted-foreground"
        onPress={() => setOpen(true)}
      >
        Search commands… <Kbd>⌘K</Kbd>
      </Button>
      <CommandPalette isOpen={isOpen} onOpenChange={setOpen}>
        <CommandSection title="Suggestions">
          <CommandItem textValue="Calendar">
            <CalendarIcon /> Calendar
          </CommandItem>
          <CommandItem textValue="Search emoji">
            <SmileIcon /> Search emoji
          </CommandItem>
          <CommandItem textValue="Calculator" isDisabled>
            <CalculatorIcon /> Calculator
          </CommandItem>
        </CommandSection>
        <CommandSeparator />
        <CommandSection title="Settings">
          <CommandItem textValue="Profile">
            <UserIcon /> Profile <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem textValue="Billing">
            <CreditCardIcon /> Billing <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem textValue="Settings">
            <SettingsIcon /> Settings <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandSection>
      </CommandPalette>
    </>
  );
}
