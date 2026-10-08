"use client";

import {
  CheckCircle2Icon,
  FileTextIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { isFileDropItem, Text } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DropZone, FileTrigger } from "@/components/ui/drop-zone";
import { ProgressBar } from "@/components/ui/progress-bar";

type Upload = { id: string; name: string; size: number; progress: number };

const formatSize = (bytes: number) =>
  bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export default function DropZoneRecipeUploadList() {
  const [uploads, setUploads] = useState<Upload[]>([
    { id: "seed", name: "Q3 board deck.pdf", size: 4_200_000, progress: 100 },
  ]);

  // Simulated upload progress. Replace with XHR/fetch progress events.
  const isUploading = uploads.some((u) => u.progress < 100);
  useEffect(() => {
    if (!isUploading) return;
    const timer = setInterval(() => {
      setUploads((list) =>
        list.map((u) =>
          u.progress < 100
            ? {
                ...u,
                progress: Math.min(100, u.progress + 8 + Math.random() * 12),
              }
            : u,
        ),
      );
    }, 300);
    return () => clearInterval(timer);
  }, [isUploading]);

  const add = (files: File[]) =>
    setUploads((list) => [
      ...list,
      ...files.map((f) => ({
        id: crypto.randomUUID(),
        name: f.name,
        size: f.size,
        progress: 0,
      })),
    ]);

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border bg-card p-5">
      <DropZone
        size="sm"
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
          Drag and drop files, or{" "}
          <FileTrigger
            allowsMultiple
            onSelect={(list) => add(Array.from(list ?? []))}
          >
            <Button variant="link" className="h-auto p-0">
              browse
            </Button>
          </FileTrigger>
        </Text>
      </DropZone>
      <ul className="grid gap-3">
        {uploads.map((u) => {
          const done = u.progress >= 100;
          return (
            <li key={u.id} className="flex items-start gap-3">
              <FileTextIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <span className="truncate font-medium">{u.name}</span>
                  <span className="shrink-0 text-muted-foreground text-xs">
                    {formatSize(u.size)}
                  </span>
                  {done && (
                    <CheckCircle2Icon
                      aria-label="Uploaded"
                      className="ml-auto size-4 shrink-0 text-success"
                    />
                  )}
                </div>
                {!done && (
                  <ProgressBar
                    aria-label={`Uploading ${u.name}`}
                    value={u.progress}
                    size="sm"
                    showValue={false}
                  />
                )}
              </div>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={done ? `Remove ${u.name}` : `Cancel ${u.name}`}
                onPress={() =>
                  setUploads((list) => list.filter((x) => x.id !== u.id))
                }
              >
                <XIcon />
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
