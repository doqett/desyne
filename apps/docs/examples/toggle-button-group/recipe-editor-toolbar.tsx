"use client";

import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Toolbar } from "react-aria-components";
import { Separator } from "@/components/ui/separator";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

function Tool({
  id,
  label,
  shortcut,
  children,
}: {
  id: string;
  label: string;
  shortcut?: string;
  children: ReactNode;
}) {
  return (
    <TooltipTrigger>
      <ToggleButton id={id} aria-label={label}>
        {children}
      </ToggleButton>
      <Tooltip>
        {label}
        {shortcut && <span className="ml-2 opacity-60">{shortcut}</span>}
      </Tooltip>
    </TooltipTrigger>
  );
}

export default function ToggleButtonGroupRecipeEditorToolbar() {
  return (
    <Toolbar
      aria-label="Text formatting"
      className="flex flex-wrap items-center gap-1 rounded-lg border bg-card p-1 shadow-xs"
    >
      <ToggleButtonGroup
        variant="spaced"
        size="sm"
        selectionMode="multiple"
        aria-label="Style"
        defaultSelectedKeys={["bold"]}
      >
        <Tool id="bold" label="Bold" shortcut="⌘B">
          <BoldIcon />
        </Tool>
        <Tool id="italic" label="Italic" shortcut="⌘I">
          <ItalicIcon />
        </Tool>
        <Tool id="underline" label="Underline" shortcut="⌘U">
          <UnderlineIcon />
        </Tool>
        <Tool id="strike" label="Strikethrough" shortcut="⌘⇧X">
          <StrikethroughIcon />
        </Tool>
      </ToggleButtonGroup>
      <Separator orientation="vertical" className="mx-1 h-5" />
      <ToggleButtonGroup
        variant="spaced"
        size="sm"
        aria-label="Alignment"
        defaultSelectedKeys={["left"]}
        disallowEmptySelection
      >
        <Tool id="left" label="Align left">
          <AlignLeftIcon />
        </Tool>
        <Tool id="center" label="Align center">
          <AlignCenterIcon />
        </Tool>
        <Tool id="right" label="Align right">
          <AlignRightIcon />
        </Tool>
      </ToggleButtonGroup>
      <Separator orientation="vertical" className="mx-1 h-5" />
      <ToggleButtonGroup variant="spaced" size="sm" aria-label="List">
        <Tool id="bullets" label="Bulleted list">
          <ListIcon />
        </Tool>
        <Tool id="numbers" label="Numbered list">
          <ListOrderedIcon />
        </Tool>
      </ToggleButtonGroup>
    </Toolbar>
  );
}
