"use client";

import {
  CopyIcon,
  FilePlusIcon,
  LinkIcon,
  MailIcon,
  MoreHorizontalIcon,
  Share2Icon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  SubmenuTrigger,
} from "@/components/ui/menu";

export default function MenuSubmenu() {
  return (
    <MenuTrigger>
      <Button variant="outline" size="icon" aria-label="More actions">
        <MoreHorizontalIcon />
      </Button>
      <MenuContent>
        <MenuItem textValue="New file">
          <FilePlusIcon /> New file
        </MenuItem>
        <MenuItem textValue="Duplicate">
          <CopyIcon /> Duplicate
        </MenuItem>
        <SubmenuTrigger>
          <MenuItem textValue="Share">
            <Share2Icon /> Share
          </MenuItem>
          <MenuContent>
            <MenuItem textValue="Copy link">
              <LinkIcon /> Copy link
            </MenuItem>
            <MenuItem textValue="Email">
              <MailIcon /> Email
            </MenuItem>
            <MenuItem>Slack</MenuItem>
            <MenuItem>Microsoft Teams</MenuItem>
          </MenuContent>
        </SubmenuTrigger>
        <MenuSeparator />
        <MenuItem textValue="Delete" variant="destructive">
          <Trash2Icon /> Delete
        </MenuItem>
      </MenuContent>
    </MenuTrigger>
  );
}
