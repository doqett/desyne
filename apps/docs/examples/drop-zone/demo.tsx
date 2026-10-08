"use client";

import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { isFileDropItem, Text } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DropZone, FileTrigger } from "@/components/ui/drop-zone";

export default function DropZoneDemo() {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <DropZone
        onDrop={async (e) => {
          const dropped = e.items
            .filter(isFileDropItem)
            .map((item) => item.name);
          setFiles((f) => [...f, ...dropped]);
        }}
      >
        <UploadIcon aria-hidden className="size-6 text-muted-foreground" />
        <Text slot="label" className="font-medium">
          Drop files here
        </Text>
        <span className="text-muted-foreground text-xs">or</span>
        <FileTrigger
          allowsMultiple
          onSelect={(list) =>
            setFiles((f) => [
              ...f,
              ...Array.from(list ?? []).map((file) => file.name),
            ])
          }
        >
          <Button variant="outline" size="sm">
            Browse files
          </Button>
        </FileTrigger>
      </DropZone>
      {files.length > 0 && (
        <ul className="list-inside list-disc text-muted-foreground text-sm">
          {files.map((name, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: same file can be added twice
            <li key={`${name}-${i}`}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
