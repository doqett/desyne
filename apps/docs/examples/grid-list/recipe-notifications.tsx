"use client";

import {
  AtSignIcon,
  GitPullRequestIcon,
  MessageSquareIcon,
} from "lucide-react";
import { useListData } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  GridList,
  GridListItem,
  GridListItemDescription,
  GridListItemLabel,
} from "@/components/ui/grid-list";
import { cn } from "@/lib/utils";

const icons = {
  mention: AtSignIcon,
  review: GitPullRequestIcon,
  comment: MessageSquareIcon,
};

export default function GridListRecipeNotifications() {
  const list = useListData({
    initialItems: [
      {
        id: "1",
        kind: "review" as const,
        title: "Maya requested your review",
        detail: "feat: usage-based billing · 5m",
        unread: true,
      },
      {
        id: "2",
        kind: "mention" as const,
        title: "Leo mentioned you in #design",
        detail: "“Can you check the empty states?” · 1h",
        unread: true,
      },
      {
        id: "3",
        kind: "comment" as const,
        title: "New comment on Q3 roadmap",
        detail: "Sam: Moved SSO to October · 3h",
        unread: false,
      },
      {
        id: "4",
        kind: "review" as const,
        title: "Your pull request was approved",
        detail: "fix: date picker focus · yesterday",
        unread: false,
      },
    ],
  });
  const unread = list.items.filter((n) => n.unread).length;
  const markRead = (id: string) => {
    const item = list.getItem(id);
    if (item) list.update(id, { ...item, unread: false });
  };

  return (
    <div className="flex w-full max-w-md flex-col overflow-hidden rounded-lg border bg-card shadow-xs">
      <div className="flex items-center justify-between border-b px-4 py-2.5">
        <span className="font-medium text-sm">
          Notifications{unread > 0 && ` (${unread})`}
        </span>
        <Button
          size="xs"
          variant="ghost"
          isDisabled={unread === 0}
          onPress={() => {
            for (const n of list.items) markRead(n.id);
          }}
        >
          Mark all as read
        </Button>
      </div>
      <GridList
        aria-label="Notifications"
        items={list.items}
        variant="separated"
        onAction={(key) => markRead(String(key))}
        className="rounded-none border-0"
      >
        {(n) => {
          const Icon = icons[n.kind];
          return (
            <GridListItem textValue={n.title}>
              <Icon className="size-4 shrink-0 text-muted-foreground" />
              <span className="flex min-w-0 flex-1 flex-col">
                <GridListItemLabel className={cn(!n.unread && "font-normal")}>
                  {n.title}
                </GridListItemLabel>
                <GridListItemDescription>{n.detail}</GridListItemDescription>
              </span>
              {n.unread && (
                <span className="size-2 shrink-0 rounded-full bg-brand">
                  <span className="sr-only">Unread</span>
                </span>
              )}
            </GridListItem>
          );
        }}
      </GridList>
    </div>
  );
}
