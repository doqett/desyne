"use client";

import {
  CreditCardIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";

export default function ItemActionsExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <CreditCardIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            Visa ending in 4242
            <Badge size="sm">Default</Badge>
          </ItemTitle>
          <ItemDescription>Expires 08/28</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="xs">
            Edit
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="More options for Visa ending in 4242"
          >
            <MoreHorizontalIcon />
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <ShieldCheckIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle id="two-factor-title">Two-factor authentication</ItemTitle>
          <ItemDescription>Require a code at every sign-in.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Switch aria-labelledby="two-factor-title" defaultSelected />
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Invoice INV-1042</ItemTitle>
          <ItemDescription>Paid Sep 1, 2026 · $2,500.00</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="sm">
            <DownloadIcon /> PDF
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
