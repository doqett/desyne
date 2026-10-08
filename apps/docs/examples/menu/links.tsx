"use client";

import {
  BookOpenIcon,
  CircleHelpIcon,
  ExternalLinkIcon,
  KeyboardIcon,
  MessageCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";

export default function MenuLinks() {
  return (
    <MenuTrigger>
      <Button variant="ghost" size="icon" aria-label="Help">
        <CircleHelpIcon />
      </Button>
      <MenuContent placement="bottom end" className="w-56">
        <MenuItem
          textValue="Documentation"
          href="https://example.com/docs"
          target="_blank"
        >
          <BookOpenIcon /> Documentation
          <ExternalLinkIcon className="ml-auto" />
        </MenuItem>
        <MenuItem textValue="Keyboard shortcuts" href="#keyboard">
          <KeyboardIcon /> Keyboard shortcuts
        </MenuItem>
        <MenuSeparator />
        <MenuItem textValue="Contact support" href="mailto:support@example.com">
          <MessageCircleIcon /> Contact support
        </MenuItem>
      </MenuContent>
    </MenuTrigger>
  );
}
