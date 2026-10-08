"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
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

const initial = [
  {
    id: 1,
    who: "Isabella Nguyen",
    initials: "IN",
    what: "requested your review on Billing v2",
    time: "5m ago",
    unread: true,
  },
  {
    id: 2,
    who: "William Kim",
    initials: "WK",
    what: "mentioned you in Incident #214",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    who: "Sofia Davis",
    initials: "SD",
    what: "shared Q4 roadmap with the team",
    time: "Yesterday",
    unread: false,
  },
];

export default function ItemRecipeNotifications() {
  const [items, setItems] = useState(initial);
  const markRead = (id: number) =>
    setItems((list) =>
      list.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );

  return (
    <ItemGroup className="w-full max-w-md">
      {items.map((n) => (
        <Item key={n.id} variant={n.unread ? "muted" : "default"}>
          <ItemMedia>
            <Avatar colorful alt="" fallback={n.initials} />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="block">
              {n.who}{" "}
              <span className="font-normal text-muted-foreground">
                {n.what}
              </span>
            </ItemTitle>
            <ItemDescription>
              {n.unread && <span className="sr-only">Unread. </span>}
              {n.time}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            {n.unread && (
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={`Mark notification from ${n.who} as read`}
                onPress={() => markRead(n.id)}
              >
                <CheckIcon />
              </Button>
            )}
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  );
}
