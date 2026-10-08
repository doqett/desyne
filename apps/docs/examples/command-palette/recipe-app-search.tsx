"use client";

import {
  ArrowRightIcon,
  CreditCardIcon,
  FileTextIcon,
  FolderIcon,
  LogOutIcon,
  MoonIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UserPlusIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Key } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  CommandItem,
  CommandPalette,
  CommandSection,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command-palette";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { toast } from "@/components/ui/toast";

const labels: Record<string, string> = {
  "recent-signup": "Opened Signup funnel",
  "recent-board": "Opened Board metrics",
  "new-report": "New report created",
  invite: "Invite dialog opened",
  theme: "Switched to dark mode",
  settings: "Went to Settings",
  billing: "Went to Billing",
  logout: "Signed out",
};

export default function CommandPaletteRecipeAppSearch() {
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

  const run = (key: Key) => {
    toast(labels[String(key)]);
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full max-w-72 justify-start text-muted-foreground"
        onPress={() => setOpen(true)}
      >
        <SearchIcon /> Search or jump to…
        <KbdGroup className="ml-auto">
          <Kbd size="sm">⌘</Kbd>
          <Kbd size="sm">K</Kbd>
        </KbdGroup>
      </Button>
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setOpen}
        onAction={run}
        className="max-w-xl"
      >
        <CommandSection title="Recent">
          <CommandItem id="recent-signup" textValue="Signup funnel">
            <FileTextIcon /> Signup funnel
            <span className="ml-auto text-muted-foreground text-xs">
              Report
            </span>
          </CommandItem>
          <CommandItem id="recent-board" textValue="Board metrics">
            <FolderIcon /> Board metrics
            <span className="ml-auto text-muted-foreground text-xs">
              Project
            </span>
          </CommandItem>
        </CommandSection>
        <CommandSeparator />
        <CommandSection title="Actions">
          <CommandItem id="new-report" textValue="New report">
            <PlusIcon /> New report <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem id="invite" textValue="Invite teammate">
            <UserPlusIcon /> Invite teammate{" "}
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
          <CommandItem id="theme" textValue="Toggle dark mode theme">
            <MoonIcon /> Toggle dark mode <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
        </CommandSection>
        <CommandSeparator />
        <CommandSection title="Navigate">
          <CommandItem id="settings" textValue="Go to settings">
            <SettingsIcon /> Settings <ArrowRightIcon className="ml-auto" />
          </CommandItem>
          <CommandItem id="billing" textValue="Go to billing">
            <CreditCardIcon /> Billing <ArrowRightIcon className="ml-auto" />
          </CommandItem>
          <CommandItem
            id="logout"
            textValue="Sign out log out"
            variant="destructive"
          >
            <LogOutIcon /> Sign out
          </CommandItem>
        </CommandSection>
      </CommandPalette>
    </>
  );
}
