"use client";

import { Avatar } from "@/components/ui/avatar";

const people = [
  { name: "Olivia Martin", initials: "OM", status: "online" },
  { name: "Jackson Lee", initials: "JL", status: "busy" },
  { name: "Isabella Nguyen", initials: "IN", status: "away" },
  { name: "William Kim", initials: "WK", status: "offline" },
] as const;

export default function AvatarStatus() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {people.map((p) => (
        <div key={p.name} className="flex flex-col items-center gap-2">
          <Avatar
            size="lg"
            colorful
            alt={p.name}
            fallback={p.initials}
            status={p.status}
          />
          <span className="text-muted-foreground text-xs capitalize">
            {p.status}
          </span>
        </div>
      ))}
    </div>
  );
}
