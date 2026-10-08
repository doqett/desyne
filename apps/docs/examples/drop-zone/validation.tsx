"use client";

import { FileIcon, UploadIcon } from "lucide-react";
import { useState } from "react";
import { isFileDropItem, Text } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DropZone, FileTrigger } from "@/components/ui/drop-zone";

const MAX_FILES = 3;
const MAX_BYTES = 2 * 1024 * 1024;

export default function DropZoneValidation() {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const add = (incoming: File[]) => {
    const next: string[] = [];
    const ok = incoming.filter((f) => {
      if (f.size > MAX_BYTES) {
        next.push(`${f.name} is larger than 2 MB.`);
        return false;
      }
      return true;
    });
    const room = MAX_FILES - files.length;
    if (ok.length > room) {
      next.push(`You can attach up to ${MAX_FILES} files.`);
    }
    setFiles((f) => [...f, ...ok.slice(0, Math.max(room, 0))]);
    setErrors(next);
  };

  const isFull = files.length >= MAX_FILES;

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <DropZone
        size="sm"
        isDisabled={isFull}
        aria-describedby="upload-rules"
        className={errors.length ? "border-destructive" : undefined}
        onDrop={async (e) =>
          add(
            await Promise.all(
              e.items.filter(isFileDropItem).map((item) => item.getFile()),
            ),
          )
        }
      >
        <UploadIcon aria-hidden className="size-5 text-muted-foreground" />
        <Text slot="label" className="font-medium">
          {isFull ? "File limit reached" : "Drop files or"}
        </Text>
        <FileTrigger allowsMultiple onSelect={(l) => add(Array.from(l ?? []))}>
          <Button variant="outline" size="sm" isDisabled={isFull}>
            Browse
          </Button>
        </FileTrigger>
      </DropZone>
      <p id="upload-rules" className="text-muted-foreground text-xs">
        Up to {MAX_FILES} files, 2 MB each.
      </p>
      <div aria-live="polite">
        {errors.map((error) => (
          <p key={error} className="text-destructive text-xs">
            {error}
          </p>
        ))}
      </div>
      {files.length > 0 && (
        <ul className="grid gap-1.5 text-sm">
          {files.map((f, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: files can share a name
            <li key={`${f.name}-${i}`} className="flex items-center gap-2">
              <FileIcon className="size-4 text-muted-foreground" />
              <span className="flex-1 truncate">{f.name}</span>
              <span className="text-muted-foreground text-xs tabular-nums">
                {(f.size / 1024).toFixed(0)} KB
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
