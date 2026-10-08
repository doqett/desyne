"use client";

import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";

export default function AvatarRecipeAccountMenu() {
  return (
    <MenuTrigger>
      <Button
        aria-label="Account menu for Olivia Martin"
        className="rounded-full outline-none data-focus-visible:ring-[3px] data-focus-visible:ring-ring/25"
      >
        <Avatar colorful alt="" fallback="OM" status="online" />
      </Button>
      <MenuContent placement="bottom end" className="w-56">
        <MenuSection>
          <MenuItem textValue="Profile" href="#profile">
            <UserIcon /> Profile
          </MenuItem>
          <MenuItem textValue="Billing" href="#billing">
            <CreditCardIcon /> Billing
          </MenuItem>
          <MenuItem textValue="Settings" href="#settings">
            <SettingsIcon /> Settings
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
