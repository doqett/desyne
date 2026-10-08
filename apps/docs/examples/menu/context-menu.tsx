"use client";

import {
  CopyIcon,
  DownloadIcon,
  FileTextIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "react-aria-components";
import {
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "@/components/ui/menu";

export default function MenuContextMenu() {
  return (
    <MenuTrigger trigger="contextMenu">
      <Button className="flex w-64 cursor-default flex-col items-center gap-2 rounded-xl border border-dashed bg-card p-6 text-sm outline-none data-focus-visible:ring-[3px] data-focus-visible:ring-ring/25">
        <FileTextIcon className="size-8 text-muted-foreground" />
        <span className="font-medium">Quarterly report.pdf</span>
        <span className="text-muted-foreground text-xs">
          Right-click or long-press
        </span>
      </Button>
      <MenuContent className="w-52">
        <MenuItem textValue="Rename">
          <PencilIcon /> Rename <MenuShortcut>F2</MenuShortcut>
        </MenuItem>
        <MenuItem textValue="Duplicate">
          <CopyIcon /> Duplicate <MenuShortcut>⌘D</MenuShortcut>
        </MenuItem>
        <MenuItem textValue="Download">
          <DownloadIcon /> Download
        </MenuItem>
        <MenuSeparator />
        <MenuItem textValue="Move to trash" variant="destructive">
          <Trash2Icon /> Move to trash <MenuShortcut>⌫</MenuShortcut>
        </MenuItem>
      </MenuContent>
    </MenuTrigger>
  );
}
