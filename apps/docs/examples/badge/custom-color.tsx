"use client";

import { Badge } from "@/components/ui/badge";

export default function BadgeCustomColor() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge color="primary" className="[--tone:var(--color-violet-600)]">
        Design
      </Badge>
      <Badge color="primary" className="[--tone:var(--color-teal-600)]">
        Engineering
      </Badge>
      <Badge
        variant="solid"
        color="primary"
        className="[--tone-fg:white] [--tone:var(--color-pink-600)]"
      >
        Marketing
      </Badge>
      <Badge
        variant="dot"
        color="primary"
        className="[--tone:var(--color-orange-500)]"
      >
        Sales
      </Badge>
    </div>
  );
}
