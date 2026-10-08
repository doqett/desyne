"use client";

import { ImageIcon, PaperclipIcon, SendIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { isFileDropItem } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DropZone, FileTrigger } from "@/components/ui/drop-zone";
import { Textarea } from "@/components/ui/textarea";

export default function DropZoneRecipeComposer() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <DropZone
      aria-label="Attach files to comment"
      onDrop={async (e) => {
        const dropped = await Promise.all(
          e.items.filter(isFileDropItem).map((item) => item.getFile()),
        );
        setFiles((f) => [...f, ...dropped]);
      }}
      className="min-h-0 max-w-md items-stretch gap-0 border-solid bg-card p-0 text-left focus-within:border-ring data-drop-target:border-dashed"
    >
      {({ isDropTarget }) => (
        <>
          <Textarea
            aria-label="Comment"
            placeholder={
              isDropTarget
                ? "Drop to attach…"
                : "Leave a comment. Drag files here to attach them."
            }
            rows={3}
            resize="none"
            className="border-0 bg-transparent shadow-none data-focused:ring-0 dark:bg-transparent"
          />
          {files.length > 0 && (
            <ul className="flex flex-wrap gap-1.5 px-3 pb-2">
              {files.map((file, i) => (
                <li
                  // biome-ignore lint/suspicious/noArrayIndexKey: files can share a name
                  key={`${file.name}-${i}`}
                  className="flex h-6 items-center gap-1 rounded-md bg-muted pr-0.5 pl-2 text-xs"
                >
                  <ImageIcon className="size-3 text-muted-foreground" />
                  <span className="max-w-32 truncate">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="size-5"
                    aria-label={`Remove ${file.name}`}
                    onPress={() => setFiles((f) => f.filter((_, j) => j !== i))}
                  >
                    <XIcon />
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex items-center justify-between border-t px-2 py-1.5">
            <FileTrigger
              allowsMultiple
              onSelect={(list) =>
                setFiles((f) => [...f, ...Array.from(list ?? [])])
              }
            >
              <Button variant="ghost" size="icon-sm" aria-label="Attach files">
                <PaperclipIcon />
              </Button>
            </FileTrigger>
            <Button size="sm">
              <SendIcon /> Comment
            </Button>
          </div>
        </>
      )}
    </DropZone>
  );
}
