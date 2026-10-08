"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonList() {
  return (
    <div className="w-full max-w-sm divide-y rounded-xl border bg-card">
      {Array.from({ length: 4 }, (_, i) => i).map((i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3">
          <Skeleton className="size-9 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-3.5 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      ))}
    </div>
  );
}
