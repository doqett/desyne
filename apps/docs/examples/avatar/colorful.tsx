"use client";

import { Avatar } from "@/components/ui/avatar";

const people = [
  "Olivia Martin",
  "Jackson Lee",
  "Isabella Nguyen",
  "William Kim",
  "Sofia Davis",
  "Lucas Brown",
  "Amara Okafor",
  "Kenji Tanaka",
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export default function AvatarColorful() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {people.map((name) => (
        <Avatar
          key={name}
          size="lg"
          colorful
          alt={name}
          fallback={initials(name)}
        />
      ))}
    </div>
  );
}
