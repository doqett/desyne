"use client";

import {
  ChevronDownIcon,
  ImageIcon,
  MinusIcon,
  Redo2Icon,
  TableIcon,
  Undo2Icon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/ui/toolbar";

export default function ToolbarWithMenu() {
  const [last, setLast] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center gap-3">
      <Toolbar aria-label="Document" variant="outline">
        <ToolbarGroup aria-label="History">
          <Button variant="ghost" size="icon-sm" aria-label="Undo">
            <Undo2Icon />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Redo" isDisabled>
            <Redo2Icon />
          </Button>
        </ToolbarGroup>
        <ToolbarSeparator />
        <MenuTrigger>
          <Button variant="ghost" size="sm">
            Insert <ChevronDownIcon />
          </Button>
          <MenuContent
            className="w-44"
            onAction={(key) => setLast(String(key))}
          >
            <MenuItem id="Image" textValue="Image">
              <ImageIcon /> Image
            </MenuItem>
            <MenuItem id="Table" textValue="Table">
              <TableIcon /> Table
            </MenuItem>
            <MenuItem id="Divider" textValue="Divider">
              <MinusIcon /> Divider
            </MenuItem>
          </MenuContent>
        </MenuTrigger>
        <ToolbarSeparator />
        <Button size="sm">Share</Button>
      </Toolbar>
      <p className="text-muted-foreground text-xs" aria-live="polite">
        {last ? `Inserted: ${last}` : "Arrow keys move between controls."}
      </p>
    </div>
  );
}
