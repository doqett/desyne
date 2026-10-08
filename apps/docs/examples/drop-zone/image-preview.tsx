"use client";

import { ImagePlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { isFileDropItem, Text } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DropZone, FileTrigger } from "@/components/ui/drop-zone";

type Preview = { name: string; url: string };

export default function DropZoneImagePreview() {
  const [previews, setPreviews] = useState<Preview[]>([]);
  const urls = useRef<string[]>([]);

  const add = (files: File[]) => {
    const next = files
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ name: f.name, url: URL.createObjectURL(f) }));
    urls.current.push(...next.map((p) => p.url));
    setPreviews((p) => [...p, ...next]);
  };

  // Release the object URLs when the component unmounts.
  useEffect(
    () => () => {
      for (const url of urls.current) URL.revokeObjectURL(url);
    },
    [],
  );

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <DropZone
        getDropOperation={(types) => (types.has("image/*") ? "copy" : "cancel")}
        onDrop={async (e) => {
          const files = await Promise.all(
            e.items.filter(isFileDropItem).map((item) => item.getFile()),
          );
          add(files);
        }}
      >
        <ImagePlusIcon aria-hidden className="size-6 text-muted-foreground" />
        <Text slot="label" className="font-medium">
          Drop photos to preview
        </Text>
        <FileTrigger
          acceptedFileTypes={["image/*"]}
          allowsMultiple
          onSelect={(list) => add(Array.from(list ?? []))}
        >
          <Button variant="outline" size="sm">
            Choose photos
          </Button>
        </FileTrigger>
      </DropZone>
      {previews.length > 0 && (
        <ul className="grid grid-cols-4 gap-2">
          {previews.map((p) => (
            <li key={p.url}>
              {/* biome-ignore lint/performance/noImgElement: local blob preview */}
              <img
                src={p.url}
                alt={p.name}
                className="aspect-square w-full rounded-md border object-cover"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
