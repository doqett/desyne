"use client";

import { ClipboardPasteIcon } from "lucide-react";
import { useState } from "react";
import { isTextDropItem, Text } from "react-aria-components";
import { DropZone } from "@/components/ui/drop-zone";

export default function DropZoneText() {
  const [text, setText] = useState<string | null>(null);
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <DropZone
        size="sm"
        getDropOperation={(types) =>
          types.has("text/plain") ? "copy" : "cancel"
        }
        onDrop={async (e) => {
          const item = e.items.find(isTextDropItem);
          if (item) setText(await item.getText("text/plain"));
        }}
      >
        <ClipboardPasteIcon
          aria-hidden
          className="size-5 text-muted-foreground"
        />
        <Text slot="label" className="font-medium">
          Drop or paste text
        </Text>
        <span className="text-muted-foreground text-xs">
          Click here, then press Ctrl+V or ⌘V
        </span>
      </DropZone>
      {text && (
        <blockquote className="line-clamp-4 border-l-2 pl-3 text-muted-foreground text-sm">
          {text}
        </blockquote>
      )}
    </div>
  );
}
