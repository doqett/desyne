"use client";

import { FileCodeIcon, FileTextIcon, ImageIcon } from "lucide-react";
import { useState } from "react";
import type { Key } from "react-aria-components";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";

const recent = [
  { id: "readme", name: "README.md", icon: FileTextIcon },
  { id: "config", name: "next.config.mjs", icon: FileCodeIcon },
  { id: "hero", name: "hero@2x.png", icon: ImageIcon },
  { id: "layout", name: "app/layout.tsx", icon: FileCodeIcon },
];

export default function ListBoxActions() {
  const [opened, setOpened] = useState<Key | null>(null);
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <ListBox
        aria-label="Recent files"
        items={recent}
        onAction={(key) => setOpened(key)}
      >
        {(file) => (
          <ListBoxItem textValue={file.name}>
            <file.icon />
            {file.name}
          </ListBoxItem>
        )}
      </ListBox>
      <p className="text-muted-foreground text-xs">
        {opened
          ? `Opened ${recent.find((f) => f.id === opened)?.name}`
          : "Click or press Enter to open a file."}
      </p>
    </div>
  );
}
