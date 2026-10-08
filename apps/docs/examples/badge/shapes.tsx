"use client";

import { Badge } from "@/components/ui/badge";

export default function BadgeShapes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge color="primary">Default</Badge>
      <Badge color="primary" shape="pill">
        Pill
      </Badge>
      <Badge variant="outline" shape="pill">
        v2.4.0
      </Badge>
      <Badge
        variant="solid"
        color="danger"
        shape="pill"
        size="sm"
        className="min-w-5 px-1"
      >
        9
      </Badge>
    </div>
  );
}
