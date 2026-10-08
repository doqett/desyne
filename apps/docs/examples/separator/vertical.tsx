"use client";

import { BoldIcon, ItalicIcon, LinkIcon, ListIcon } from "lucide-react";
import { Toolbar } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SeparatorVertical() {
  return (
    <Toolbar
      aria-label="Formatting"
      className="flex h-9 items-center gap-1 rounded-lg border bg-card px-1"
    >
      <Button variant="ghost" size="icon-sm" aria-label="Bold">
        <BoldIcon />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Italic">
        <ItalicIcon />
      </Button>
      <Separator orientation="vertical" className="mx-1 my-2" />
      <Button variant="ghost" size="icon-sm" aria-label="Bulleted list">
        <ListIcon />
      </Button>
      <Separator orientation="vertical" className="mx-1 my-2" />
      <Button variant="ghost" size="icon-sm" aria-label="Insert link">
        <LinkIcon />
      </Button>
    </Toolbar>
  );
}
