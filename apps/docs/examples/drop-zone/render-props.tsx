"use client";

import { DownloadIcon, UploadCloudIcon } from "lucide-react";
import { useState } from "react";
import { Text } from "react-aria-components";
import { DropZone } from "@/components/ui/drop-zone";

export default function DropZoneRenderProps() {
  const [count, setCount] = useState(0);
  return (
    <DropZone
      className="max-w-sm"
      onDrop={(e) => setCount((c) => c + e.items.length)}
    >
      {({ isDropTarget }) => (
        <>
          {isDropTarget ? (
            <DownloadIcon aria-hidden className="size-6 animate-bounce" />
          ) : (
            <UploadCloudIcon
              aria-hidden
              className="size-6 text-muted-foreground"
            />
          )}
          <Text slot="label" className="font-medium">
            {isDropTarget ? "Release to upload" : "Drag files over this area"}
          </Text>
          <span className="text-muted-foreground text-xs">
            {count} item{count === 1 ? "" : "s"} received
          </span>
        </>
      )}
    </DropZone>
  );
}
