"use client";

import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "@/components/ui/menu";

export default function MenuDemo() {
  return (
    <MenuTrigger>
      <Button variant="outline">Open menu</Button>
      <MenuContent className="w-56">
        <MenuSection title="My account">
          <MenuItem textValue="Profile">
            <UserIcon /> Profile <MenuShortcut>⇧⌘P</MenuShortcut>
          </MenuItem>
          <MenuItem textValue="Billing">
            <CreditCardIcon /> Billing <MenuShortcut>⌘B</MenuShortcut>
          </MenuItem>
          <MenuItem textValue="Settings">
            <SettingsIcon /> Settings <MenuShortcut>⌘S</MenuShortcut>
          </MenuItem>
        </MenuSection>
        <MenuSeparator />
        <MenuItem textValue="Log out" variant="destructive">
          <LogOutIcon /> Log out
        </MenuItem>
      </MenuContent>
    </MenuTrigger>
  );
}
