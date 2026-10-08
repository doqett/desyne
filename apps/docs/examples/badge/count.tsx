"use client";

import { BellIcon, InboxIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BadgeCount() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          aria-label="Notifications, 3 unread"
        >
          <BellIcon />
        </Button>
        <Badge
          aria-hidden
          variant="solid"
          color="danger"
          shape="pill"
          size="sm"
          className="absolute -top-1.5 -right-1.5 min-w-5 px-1 ring-2 ring-background"
        >
          3
        </Badge>
      </div>
      <Button variant="ghost">
        <InboxIcon /> Inbox
        <Badge size="sm" shape="pill" className="ml-1">
          128
        </Badge>
      </Button>
    </div>
  );
}
