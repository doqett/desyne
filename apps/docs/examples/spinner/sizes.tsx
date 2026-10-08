"use client";

import { Spinner } from "@/components/ui/spinner";

export default function SpinnerSizes() {
  return (
    <div className="flex items-end gap-8">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Spinner size={size} />
          <code className="text-muted-foreground text-xs">{size}</code>
        </div>
      ))}
    </div>
  );
}
