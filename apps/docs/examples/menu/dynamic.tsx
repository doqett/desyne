"use client";

import { FolderIcon, FolderInputIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu";

const folders = [
  { id: "inbox", name: "Inbox" },
  { id: "clients", name: "Clients" },
  { id: "invoices", name: "Invoices 2026" },
  { id: "receipts", name: "Receipts" },
  { id: "archive", name: "Archive" },
];

export default function MenuDynamic() {
  const [moved, setMoved] = useState<string>();
  return (
    <div className="flex flex-col items-center gap-3">
      <MenuTrigger>
        <Button variant="outline">
          <FolderInputIcon /> Move to…
        </Button>
        <MenuContent
          items={folders}
          onAction={(key) => setMoved(folders.find((f) => f.id === key)?.name)}
        >
          {(folder) => (
            <MenuItem textValue={folder.name}>
              <FolderIcon /> {folder.name}
            </MenuItem>
          )}
        </MenuContent>
      </MenuTrigger>
      {moved && (
        <p className="text-muted-foreground text-sm">
          Moved 3 files to {moved}
        </p>
      )}
    </div>
  );
}
