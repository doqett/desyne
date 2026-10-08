"use client";

import {
  DownloadIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";

const files = [
  { name: "hero-lisbon.jpg", meta: "2.1 MB · 2400 × 1600", seed: "lisbon" },
  { name: "team-offsite.jpg", meta: "3.4 MB · 3000 × 2000", seed: "offsite" },
  { name: "product-shot.png", meta: "860 KB · 1600 × 1200", seed: "product" },
];

export default function ItemRecipeFiles() {
  return (
    <ItemGroup className="w-full max-w-md">
      {files.map((f) => (
        <Item key={f.name} variant="outline" size="sm">
          <ItemMedia variant="image">
            {/* biome-ignore lint/performance/noImgElement: framework-agnostic example */}
            <img src={`https://picsum.photos/seed/${f.seed}/80/80`} alt="" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{f.name}</ItemTitle>
            <ItemDescription>{f.meta}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={`Download ${f.name}`}
            >
              <DownloadIcon />
            </Button>
            <MenuTrigger>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={`More actions for ${f.name}`}
              >
                <MoreHorizontalIcon />
              </Button>
              <MenuContent placement="bottom end">
                <MenuItem textValue="Rename">
                  <PencilIcon /> Rename
                </MenuItem>
                <MenuSeparator />
                <MenuItem textValue="Delete" variant="destructive">
                  <Trash2Icon /> Delete
                </MenuItem>
              </MenuContent>
            </MenuTrigger>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  );
}
