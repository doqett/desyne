"use client";

import { Text } from "react-aria-components";
import { DropZone } from "@/components/ui/drop-zone";

export default function DropZoneSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <DropZone key={size} size={size}>
          <Text slot="label" className="text-muted-foreground">
            Drop files here ({size})
          </Text>
        </DropZone>
      ))}
    </div>
  );
}
