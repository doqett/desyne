"use client";

import {
  AtSignIcon,
  CircleDotIcon,
  PaperclipIcon,
  StarIcon,
} from "lucide-react";
import { useState } from "react";
import { ToggleButton } from "@/components/ui/toggle-button";

type FilterId = "unread" | "starred" | "mentions" | "attachments";

const filters: { id: FilterId; label: string; icon: typeof StarIcon }[] = [
  { id: "unread", label: "Unread", icon: CircleDotIcon },
  { id: "starred", label: "Starred", icon: StarIcon },
  { id: "mentions", label: "Mentions", icon: AtSignIcon },
  { id: "attachments", label: "Has attachment", icon: PaperclipIcon },
];

const messages = [
  {
    from: "Priya Raman",
    subject: "Q3 roadmap review",
    unread: true,
    starred: true,
    mentions: false,
    attachments: true,
  },
  {
    from: "Jonas Weber",
    subject: "@you can you check the invoice?",
    unread: true,
    starred: false,
    mentions: true,
    attachments: false,
  },
  {
    from: "Ana Souza",
    subject: "Design crit notes",
    unread: false,
    starred: true,
    mentions: false,
    attachments: true,
  },
  {
    from: "Leo Park",
    subject: "Lunch on Friday?",
    unread: false,
    starred: false,
    mentions: false,
    attachments: false,
  },
];

export default function ToggleButtonRecipeFilterChips() {
  const [active, setActive] = useState<Set<FilterId>>(new Set(["unread"]));
  const visible = messages.filter((m) => [...active].every((f) => m[f]));

  const toggle = (id: FilterId, on: boolean) =>
    setActive((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <ToggleButton
            key={f.id}
            variant="outline"
            size="sm"
            className="rounded-full"
            isSelected={active.has(f.id)}
            onChange={(on) => toggle(f.id, on)}
          >
            <f.icon /> {f.label}
          </ToggleButton>
        ))}
      </div>
      <ul className="divide-y rounded-lg border bg-card text-sm">
        {visible.map((m) => (
          <li key={m.subject} className="flex items-center gap-3 px-3 py-2.5">
            <span
              className={
                m.unread
                  ? "size-2 shrink-0 rounded-full bg-brand"
                  : "size-2 shrink-0"
              }
            />
            <span className="w-24 shrink-0 truncate font-medium">{m.from}</span>
            <span className="truncate text-muted-foreground">{m.subject}</span>
          </li>
        ))}
        {visible.length === 0 && (
          <li className="px-3 py-6 text-center text-muted-foreground">
            No messages match these filters.
          </li>
        )}
      </ul>
    </div>
  );
}
