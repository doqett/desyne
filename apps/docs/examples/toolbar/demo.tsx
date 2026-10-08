"use client";

import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  UnderlineIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/ui/toolbar";

export default function ToolbarDemo() {
  return (
    <Toolbar aria-label="Text formatting" variant="outline">
      <ToolbarGroup aria-label="Style">
        <ToggleButton size="sm" aria-label="Bold" defaultSelected>
          <BoldIcon />
        </ToggleButton>
        <ToggleButton size="sm" aria-label="Italic">
          <ItalicIcon />
        </ToggleButton>
        <ToggleButton size="sm" aria-label="Underline">
          <UnderlineIcon />
        </ToggleButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToggleButtonGroup
        aria-label="Alignment"
        variant="spaced"
        size="sm"
        selectionMode="single"
        disallowEmptySelection
        defaultSelectedKeys={["left"]}
        className="gap-0.5"
      >
        <ToggleButton id="left" aria-label="Align left">
          <AlignLeftIcon />
        </ToggleButton>
        <ToggleButton id="center" aria-label="Align center">
          <AlignCenterIcon />
        </ToggleButton>
        <ToggleButton id="right" aria-label="Align right">
          <AlignRightIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Insert">
        <Button variant="ghost" size="icon-sm" aria-label="Bulleted list">
          <ListIcon />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Numbered list">
          <ListOrderedIcon />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Insert link">
          <LinkIcon />
        </Button>
      </ToolbarGroup>
    </Toolbar>
  );
}
