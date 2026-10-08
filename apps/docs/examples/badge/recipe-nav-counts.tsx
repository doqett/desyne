"use client";

import {
  ArchiveIcon,
  FileTextIcon,
  InboxIcon,
  SendIcon,
  StarIcon,
} from "lucide-react";
import { Link } from "react-aria-components";
import { Badge } from "@/components/ui/badge";

const items = [
  { label: "Inbox", icon: InboxIcon, count: 24, unread: true, current: true },
  { label: "Starred", icon: StarIcon, count: 3, unread: false },
  { label: "Drafts", icon: FileTextIcon, count: 2, unread: false },
  { label: "Sent", icon: SendIcon },
  { label: "Archive", icon: ArchiveIcon },
];

export default function BadgeRecipeNavCounts() {
  return (
    <nav aria-label="Mailboxes" className="w-full max-w-56">
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={`#${item.label.toLowerCase()}`}
              aria-current={item.current ? "page" : undefined}
              className="flex h-8 items-center gap-2 rounded-md px-2 text-muted-foreground text-sm outline-none data-focus-visible:ring-[3px] data-focus-visible:ring-ring/25 data-hovered:bg-muted data-hovered:text-foreground aria-[current=page]:bg-muted aria-[current=page]:font-medium aria-[current=page]:text-foreground"
            >
              <item.icon className="size-4" aria-hidden />
              <span className="flex-1">{item.label}</span>
              {item.count !== undefined && (
                <Badge
                  size="sm"
                  shape="pill"
                  variant={item.unread ? "solid" : "soft"}
                  color={item.unread ? "primary" : "neutral"}
                >
                  {item.count}
                </Badge>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
