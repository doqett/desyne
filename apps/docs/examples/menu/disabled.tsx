"use client";

import {
  ArchiveIcon,
  ChevronDownIcon,
  CopyIcon,
  PencilIcon,
  SendIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";

export default function MenuDisabled() {
  return (
    <div className="flex items-center gap-3">
      <MenuTrigger>
        <Button variant="outline">
          Invoice INV-2041 <ChevronDownIcon />
        </Button>
        <MenuContent disabledKeys={["edit", "send"]} className="w-52">
          <MenuItem id="edit" textValue="Edit">
            <PencilIcon /> Edit
          </MenuItem>
          <MenuItem id="send" textValue="Send reminder">
            <SendIcon /> Send reminder
          </MenuItem>
          <MenuItem id="duplicate" textValue="Duplicate">
            <CopyIcon /> Duplicate
          </MenuItem>
          <MenuSeparator />
          <MenuItem id="archive" textValue="Archive">
            <ArchiveIcon /> Archive
          </MenuItem>
        </MenuContent>
      </MenuTrigger>
      <span className="text-muted-foreground text-xs">
        Paid invoices are locked
      </span>
    </div>
  );
}
