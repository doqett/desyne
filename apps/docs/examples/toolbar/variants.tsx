"use client";

import { ClipboardPasteIcon, CopyIcon, ScissorsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toolbar, ToolbarGroup } from "@/components/ui/toolbar";

const variants = ["plain", "outline", "floating"] as const;

export default function ToolbarVariants() {
  return (
    <div className="flex flex-col items-center gap-6">
      {variants.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-16 text-muted-foreground text-xs">{variant}</span>
          <Toolbar aria-label={`Clipboard (${variant})`} variant={variant}>
            <ToolbarGroup aria-label="Clipboard">
              <Button variant="ghost" size="sm">
                <ScissorsIcon /> Cut
              </Button>
              <Button variant="ghost" size="sm">
                <CopyIcon /> Copy
              </Button>
              <Button variant="ghost" size="sm">
                <ClipboardPasteIcon /> Paste
              </Button>
            </ToolbarGroup>
          </Toolbar>
        </div>
      ))}
    </div>
  );
}
