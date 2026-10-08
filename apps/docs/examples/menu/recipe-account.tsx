"use client";

import {
  ChevronsUpDownIcon,
  CreditCardIcon,
  LogOutIcon,
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { Button, Header, type Selection } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
  SubmenuTrigger,
} from "@/components/ui/menu";

export default function MenuRecipeAccount() {
  const [theme, setTheme] = useState<Selection>(new Set(["system"]));
  return (
    <MenuTrigger>
      <Button className="flex w-60 items-center gap-2.5 rounded-lg border bg-card p-2 text-left outline-none data-focus-visible:ring-[3px] data-focus-visible:ring-ring/25 data-hovered:bg-muted data-pressed:bg-muted">
        <Avatar alt="Jordan Blake" fallback="JB" colorful />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-medium text-sm">
            Jordan Blake
          </span>
          <span className="block truncate text-muted-foreground text-xs">
            jordan@lumen.app
          </span>
        </span>
        <ChevronsUpDownIcon className="size-4 text-muted-foreground" />
      </Button>
      <MenuContent placement="top start" popoverClassName="w-(--trigger-width)">
        <MenuSection>
          <Header className="flex items-center gap-2.5 px-2 py-1.5">
            <Avatar size="sm" alt="Jordan Blake" fallback="JB" colorful />
            <span className="min-w-0 text-sm">
              <span className="block truncate font-medium">Jordan Blake</span>
              <span className="block truncate text-muted-foreground text-xs">
                Pro plan
              </span>
            </span>
          </Header>
          <MenuItem textValue="Profile">
            <UserIcon /> Profile <MenuShortcut>⇧⌘P</MenuShortcut>
          </MenuItem>
          <MenuItem textValue="Billing">
            <CreditCardIcon /> Billing
          </MenuItem>
          <MenuItem textValue="Settings">
            <SettingsIcon /> Settings <MenuShortcut>⌘,</MenuShortcut>
          </MenuItem>
          <SubmenuTrigger>
            <MenuItem textValue="Theme">
              <PaletteIcon /> Theme
            </MenuItem>
            <MenuContent
              aria-label="Theme"
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={theme}
              onSelectionChange={setTheme}
            >
              <MenuItem id="light" textValue="Light">
                <SunIcon /> Light
              </MenuItem>
              <MenuItem id="dark" textValue="Dark">
                <MoonIcon /> Dark
              </MenuItem>
              <MenuItem id="system" textValue="System">
                <MonitorIcon /> System
              </MenuItem>
            </MenuContent>
          </SubmenuTrigger>
        </MenuSection>
        <MenuSeparator />
        <MenuItem textValue="Log out" variant="destructive">
          <LogOutIcon /> Log out
        </MenuItem>
      </MenuContent>
    </MenuTrigger>
  );
}
