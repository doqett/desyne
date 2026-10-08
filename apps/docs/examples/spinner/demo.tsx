"use client";

import { Spinner } from "@/components/ui/spinner";

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-2 text-muted-foreground text-sm">
      <Spinner aria-hidden />
      Loading your workspace…
    </div>
  );
}
