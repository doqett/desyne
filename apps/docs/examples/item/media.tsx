"use client";

import { HashIcon, PenToolIcon, ZapIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export default function ItemMediaExample() {
  return (
    <ItemGroup className="w-full max-w-sm">
      <Item>
        <ItemMedia variant="icon">
          <PenToolIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Icon tile</ItemTitle>
          <ItemDescription>
            variant="icon" · bordered 36px square
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item>
        <ItemMedia variant="round" className="bg-brand text-brand-foreground">
          <HashIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Round mark</ItemTitle>
          <ItemDescription>
            variant="round" · brand-colored circle
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item>
        <ItemMedia variant="image">
          {/* biome-ignore lint/performance/noImgElement: framework-agnostic example */}
          <img src="https://picsum.photos/seed/lisbon/80/80" alt="" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Image thumbnail</ItemTitle>
          <ItemDescription>variant="image" · 40px, cover-fit</ItemDescription>
        </ItemContent>
      </Item>
      <Item>
        <ItemMedia>
          <Avatar colorful alt="" fallback="OM" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Any element</ItemTitle>
          <ItemDescription>variant="default" · e.g. an Avatar</ItemDescription>
        </ItemContent>
      </Item>
      <Item>
        <ItemMedia className="size-9 rounded-lg bg-warning/15 text-warning">
          <ZapIcon className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Custom tint</ItemTitle>
          <ItemDescription>Your own size and colors</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}
