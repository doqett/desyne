"use client";

import { FolderIcon, FolderOpenIcon } from "lucide-react";
import { useState } from "react";
import {
  type DirectoryDropItem,
  type FileDropItem,
  isDirectoryDropItem,
  isFileDropItem,
  Text,
} from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DropZone, FileTrigger } from "@/components/ui/drop-zone";

/** Recursively lists every file path inside a dropped folder. */
async function listFiles(
  item: DirectoryDropItem | FileDropItem,
  prefix = "",
): Promise<string[]> {
  if (isFileDropItem(item)) return [`${prefix}${item.name}`];
  const paths: string[] = [];
  for await (const entry of item.getEntries()) {
    paths.push(...(await listFiles(entry, `${prefix}${item.name}/`)));
  }
  return paths;
}

export default function DropZoneDirectory() {
  const [paths, setPaths] = useState<string[]>([]);
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <DropZone
        onDrop={async (e) => {
          const items = e.items.filter(
            (item) => isDirectoryDropItem(item) || isFileDropItem(item),
          );
          const nested = await Promise.all(
            items.map((item) => listFiles(item)),
          );
          setPaths(nested.flat());
        }}
      >
        <FolderOpenIcon aria-hidden className="size-6 text-muted-foreground" />
        <Text slot="label" className="font-medium">
          Drop a project folder
        </Text>
        <FileTrigger
          acceptDirectory
          onSelect={(list) =>
            setPaths(
              Array.from(list ?? []).map(
                (file) => file.webkitRelativePath || file.name,
              ),
            )
          }
        >
          <Button variant="outline" size="sm">
            <FolderIcon /> Choose folder
          </Button>
        </FileTrigger>
      </DropZone>
      {paths.length > 0 && (
        <ul className="max-h-40 overflow-auto rounded-md border bg-muted/30 p-2 font-mono text-xs">
          {paths.map((path) => (
            <li key={path} className="truncate py-0.5">
              {path}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
