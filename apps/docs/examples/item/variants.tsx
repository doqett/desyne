"use client";

import { ChevronRightIcon, FileTextIcon } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

const variants = [
  { variant: "default", note: "Transparent. Rows inside a list or card." },
  { variant: "muted", note: "Muted fill. Selected or featured rows." },
  { variant: "outline", note: "Bordered card surface. Standalone rows." },
] as const;

export default function ItemVariants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {variants.map((v) => (
        <Item key={v.variant} variant={v.variant}>
          <ItemMedia variant="icon">
            <FileTextIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="capitalize">{v.variant}</ItemTitle>
            <ItemDescription>{v.note}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon
              className="size-4 text-muted-foreground"
              aria-hidden
            />
          </ItemActions>
        </Item>
      ))}
    </div>
  );
}
