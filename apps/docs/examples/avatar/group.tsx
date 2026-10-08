"use client";

import { Avatar, AvatarGroup } from "@/components/ui/avatar";

const people = [
  "Olivia Martin",
  "Jackson Lee",
  "Isabella Nguyen",
  "William Kim",
  "Sofia Davis",
  "Lucas Brown",
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export default function AvatarGroupDemo() {
  return (
    <div className="flex flex-col items-start gap-6">
      <AvatarGroup max={4} role="group" aria-label="6 collaborators">
        {people.map((name) => (
          <Avatar key={name} colorful alt={name} fallback={initials(name)} />
        ))}
      </AvatarGroup>
      <AvatarGroup
        max={3}
        size="sm"
        className="-space-x-1.5"
        role="group"
        aria-label="6 reviewers"
      >
        {people.map((name) => (
          <Avatar key={name} colorful alt={name} fallback={initials(name)} />
        ))}
      </AvatarGroup>
    </div>
  );
}
