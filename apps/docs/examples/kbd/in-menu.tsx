"use client";

import { CopyIcon, FilePlusIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";

export default function KbdInMenu() {
  return (
    <MenuTrigger>
      <Button variant="outline">File</Button>
      <MenuContent className="w-56">
        <MenuItem textValue="New file">
          <FilePlusIcon /> New file
          <Kbd size="sm" className="ml-auto">
            ⌘N
          </Kbd>
        </MenuItem>
        <MenuItem textValue="Save">
          <SaveIcon /> Save
          <Kbd size="sm" className="ml-auto">
            ⌘S
          </Kbd>
        </MenuItem>
        <MenuItem textValue="Duplicate">
          <CopyIcon /> Duplicate
          <Kbd size="sm" className="ml-auto">
            ⌘D
          </Kbd>
        </MenuItem>
        <MenuSeparator />
        <MenuItem textValue="Delete" variant="destructive">
          <Trash2Icon /> Delete
          <Kbd size="sm" className="ml-auto">
            ⌫
          </Kbd>
        </MenuItem>
      </MenuContent>
    </MenuTrigger>
  );
}
