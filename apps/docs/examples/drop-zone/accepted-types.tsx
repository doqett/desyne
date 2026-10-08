"use client";

import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { type FileDropItem, isFileDropItem, Text } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DropZone, FileTrigger } from "@/components/ui/drop-zone";

const accepted = ["image/png", "image/jpeg", "image/webp"];

export default function DropZoneAcceptedTypes() {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <DropZone
        getDropOperation={(types) => (types.has(accepted) ? "copy" : "cancel")}
        onDrop={(e) => {
          const images = e.items.filter(
            (item): item is FileDropItem =>
              isFileDropItem(item) && accepted.includes(item.type),
          );
          setFiles(images.map((item) => item.name));
        }}
      >
        <ImageIcon aria-hidden className="size-6 text-muted-foreground" />
        <Text slot="label" className="font-medium">
          Drop images here
        </Text>
        <span className="text-muted-foreground text-xs">PNG, JPEG or WebP</span>
        <FileTrigger
          acceptedFileTypes={accepted}
          allowsMultiple
          onSelect={(list) =>
            setFiles(Array.from(list ?? []).map((file) => file.name))
          }
        >
          <Button variant="outline" size="sm">
            Choose images
          </Button>
        </FileTrigger>
      </DropZone>
      {files.length > 0 && (
        <p className="text-muted-foreground text-sm">{files.join(", ")}</p>
      )}
    </div>
  );
}
