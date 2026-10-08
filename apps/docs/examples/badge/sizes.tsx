"use client";

import { Badge } from "@/components/ui/badge";

export default function BadgeSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm" color="info">
        Small
      </Badge>
      <Badge size="md" color="info">
        Medium
      </Badge>
      <Badge size="sm" variant="dot" color="success">
        Online
      </Badge>
      <Badge size="md" variant="dot" color="success">
        Online
      </Badge>
    </div>
  );
}
