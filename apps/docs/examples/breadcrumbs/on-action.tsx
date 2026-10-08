"use client";

import { FileTextIcon, FolderIcon } from "lucide-react";
import { useState } from "react";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";

const folders: Record<string, string[]> = {
  Drive: ["Design", "Finance"],
  Design: ["Brand", "Product"],
  Finance: ["Invoices"],
  Brand: [],
  Product: [],
  Invoices: [],
};

export default function BreadcrumbsOnAction() {
  const [path, setPath] = useState(["Drive", "Design", "Brand"]);
  const current = path[path.length - 1];

  return (
    <div className="grid w-full max-w-sm gap-3">
      <Breadcrumbs
        items={path.map((name) => ({ id: name }))}
        onAction={(key) =>
          setPath(path.slice(0, path.indexOf(String(key)) + 1))
        }
      >
        {(item) => <Breadcrumb id={item.id}>{item.id}</Breadcrumb>}
      </Breadcrumbs>
      <ul className="grid gap-1 rounded-lg border bg-card p-1 text-sm">
        {folders[current].map((name) => (
          <li key={name}>
            <Button
              variant="ghost"
              className="w-full justify-start font-normal"
              onPress={() => setPath([...path, name])}
            >
              <FolderIcon className="text-muted-foreground" /> {name}
            </Button>
          </li>
        ))}
        {folders[current].length === 0 && (
          <li className="flex h-8 items-center gap-2 px-3 text-muted-foreground">
            <FileTextIcon className="size-4" /> guidelines.pdf
          </li>
        )}
      </ul>
    </div>
  );
}
