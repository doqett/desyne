"use client";

import { Avatar } from "@/components/ui/avatar";

const comments = [
  {
    author: "Isabella Nguyen",
    initials: "IN",
    time: "2h ago",
    body: "The new onboarding checklist tested well. Five of six participants finished setup without help.",
  },
  {
    author: "William Kim",
    initials: "WK",
    time: "1h ago",
    body: "Nice. Can we ship it behind a flag on Thursday and watch activation for a week?",
  },
  {
    author: "Olivia Martin",
    initials: "OM",
    time: "12m ago",
    body: "Flag is ready. I'll turn it on for 20% of new workspaces.",
  },
];

export default function AvatarRecipeComments() {
  return (
    <ol className="flex w-full max-w-md flex-col gap-5">
      {comments.map((c) => (
        <li key={c.time} className="flex gap-3">
          <Avatar colorful alt="" fallback={c.initials} />
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-sm">
              <span className="font-medium">{c.author}</span>{" "}
              <span className="text-muted-foreground text-xs">{c.time}</span>
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {c.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
