"use client";

import { FolderIcon } from "lucide-react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export default function ItemSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Item key={size} size={size} variant="outline">
          <ItemMedia variant="icon">
            <FolderIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Quarterly reports</ItemTitle>
            <ItemDescription>size="{size}" · 14 files</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}
