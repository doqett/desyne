"use client";

import {
  ChevronDownIcon,
  ClockIcon,
  FileTextIcon,
  SendIcon,
} from "lucide-react";
import { Group } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu";

export default function ButtonRecipeSplit() {
  return (
    <Group
      aria-label="Send options"
      className="flex *:first:rounded-r-none *:last:rounded-l-none *:last:border-l *:last:border-l-white/20"
    >
      <Button>
        <SendIcon /> Send now
      </Button>
      <MenuTrigger>
        <Button size="icon" aria-label="More send options">
          <ChevronDownIcon />
        </Button>
        <MenuContent placement="bottom end">
          <MenuItem textValue="Schedule send">
            <ClockIcon /> Schedule send
          </MenuItem>
          <MenuItem textValue="Save as draft">
            <FileTextIcon /> Save as draft
          </MenuItem>
        </MenuContent>
      </MenuTrigger>
    </Group>
  );
}
