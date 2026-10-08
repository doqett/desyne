"use client";

import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

export default function ToggleButtonGroupMultiple() {
  return (
    <ToggleButtonGroup
      variant="spaced"
      selectionMode="multiple"
      aria-label="Text formatting"
      defaultSelectedKeys={["bold", "italic"]}
    >
      <ToggleButton id="bold" aria-label="Bold">
        <BoldIcon />
      </ToggleButton>
      <ToggleButton id="italic" aria-label="Italic">
        <ItalicIcon />
      </ToggleButton>
      <ToggleButton id="underline" aria-label="Underline">
        <UnderlineIcon />
      </ToggleButton>
      <ToggleButton id="strike" aria-label="Strikethrough">
        <StrikethroughIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
