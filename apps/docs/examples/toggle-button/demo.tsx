"use client";

import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { ToggleButton } from "@/components/ui/toggle-button";

export default function ToggleButtonDemo() {
  return (
    <div className="flex gap-1">
      <ToggleButton aria-label="Bold" defaultSelected>
        <BoldIcon />
      </ToggleButton>
      <ToggleButton aria-label="Italic">
        <ItalicIcon />
      </ToggleButton>
      <ToggleButton aria-label="Underline">
        <UnderlineIcon />
      </ToggleButton>
    </div>
  );
}
