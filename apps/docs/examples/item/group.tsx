"use client";

import {
  FileSpreadsheetIcon,
  FileTextIcon,
  PresentationIcon,
} from "lucide-react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";

const files = [
  {
    name: "Q3 board update.pdf",
    meta: "2.4 MB · Edited 2h ago",
    icon: FileTextIcon,
  },
  {
    name: "Revenue model.xlsx",
    meta: "860 KB · Edited yesterday",
    icon: FileSpreadsheetIcon,
  },
  {
    name: "Launch plan.key",
    meta: "18 MB · Edited Sep 24",
    icon: PresentationIcon,
  },
];

export default function ItemGroupExample() {
  return (
    <ItemGroup className="w-full max-w-sm gap-0 rounded-xl border bg-card p-1">
      {files.map((f, i) => (
        <div key={f.name} className="contents">
          {i > 0 && <ItemSeparator />}
          <Item size="sm">
            <ItemMedia variant="icon">
              <f.icon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{f.name}</ItemTitle>
              <ItemDescription>{f.meta}</ItemDescription>
            </ItemContent>
          </Item>
        </div>
      ))}
    </ItemGroup>
  );
}
