"use client";

import { BellIcon, CheckCheckIcon } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverDialog,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const initial = [
  {
    id: 1,
    name: "Kofi Mensah",
    initials: "KM",
    text: "commented on Pricing page redesign",
    time: "4m",
    unread: true,
  },
  {
    id: 2,
    name: "Laura Weiss",
    initials: "LW",
    text: "assigned you to Fix invoice rounding",
    time: "1h",
    unread: true,
  },
  {
    id: 3,
    name: "Diego Rossi",
    initials: "DR",
    text: "merged #1289 into main",
    time: "3h",
    unread: true,
  },
  {
    id: 4,
    name: "Hana Sato",
    initials: "HS",
    text: "invited you to Growth experiments",
    time: "Yesterday",
    unread: false,
  },
];

export default function PopoverRecipeNotifications() {
  const [items, setItems] = useState(initial);
  const unread = items.filter((n) => n.unread).length;
  return (
    <PopoverTrigger>
      <Button
        variant="outline"
        size="icon"
        aria-label={
          unread ? `Notifications, ${unread} unread` : "Notifications"
        }
        className="relative"
      >
        <BellIcon />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 font-medium text-[0.625rem] text-white tabular-nums">
            {unread}
          </span>
        )}
      </Button>
      <Popover placement="bottom end">
        <PopoverDialog className="w-80 p-0">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <PopoverTitle>Notifications</PopoverTitle>
            <Button
              variant="link"
              size="xs"
              className="h-auto px-0"
              isDisabled={unread === 0}
              onPress={() =>
                setItems((list) => list.map((n) => ({ ...n, unread: false })))
              }
            >
              <CheckCheckIcon /> Mark all read
            </Button>
          </div>
          <ul className="max-h-72 divide-y overflow-y-auto">
            {items.map((n) => (
              <li
                key={n.id}
                className={cn(
                  "flex gap-3 px-4 py-3 text-sm",
                  n.unread && "bg-brand/5",
                )}
              >
                <Avatar size="sm" alt={n.name} fallback={n.initials} colorful />
                <div className="min-w-0 flex-1">
                  <p className="leading-snug">
                    <span className="font-medium">{n.name}</span> {n.text}
                  </p>
                  <p className="mt-0.5 text-muted-foreground text-xs">
                    {n.time}
                  </p>
                </div>
                {n.unread && (
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand" />
                )}
              </li>
            ))}
          </ul>
          <div className="border-t p-2">
            <Button variant="ghost" size="sm" className="w-full">
              View all notifications
            </Button>
          </div>
        </PopoverDialog>
      </Popover>
    </PopoverTrigger>
  );
}
