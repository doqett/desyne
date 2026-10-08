"use client";

import { DatabaseIcon, GlobeIcon, SmartphoneIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

const rows = [
  { name: "Web SDK", meta: "2.4M events/day", icon: GlobeIcon, live: true },
  {
    name: "iOS SDK",
    meta: "v3.2.0 · 3 apps",
    icon: SmartphoneIcon,
    live: true,
  },
  {
    name: "Product database",
    meta: "Postgres replica",
    icon: DatabaseIcon,
    live: false,
  },
];

export default function ItemDemo() {
  return (
    <ItemGroup className="w-full max-w-sm">
      {rows.map((r) => (
        <Item key={r.name} size="sm" variant={r.live ? "default" : "muted"}>
          <ItemMedia variant="icon">
            <r.icon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{r.name}</ItemTitle>
            <ItemDescription>{r.meta}</ItemDescription>
          </ItemContent>
          <ItemActions>
            {r.live ? (
              <Badge size="sm" variant="dot" color="success">
                Live
              </Badge>
            ) : (
              <Button variant="outline" size="xs">
                Connect
              </Button>
            )}
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  );
}
