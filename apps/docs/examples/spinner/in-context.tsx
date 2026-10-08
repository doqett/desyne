"use client";

import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export default function SpinnerInContext() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <Badge color="neutral">
          <Spinner size="xs" /> Syncing
        </Badge>
        <Badge color="info">
          <Spinner size="xs" /> Deploying
        </Badge>
      </div>
      <p className="flex items-center gap-2 text-muted-foreground text-sm">
        <Spinner size="sm" /> Loading results…
      </p>
    </div>
  );
}
