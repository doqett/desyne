"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonInline() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2 rounded-xl border bg-card p-4 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Balance</span>
        <Skeleton className="inline-block h-[1lh] w-20" />
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Next payout</span>
        <Skeleton className="inline-block h-[1lh] w-24" />
      </div>
      <div className="text-muted-foreground">
        Last synced{" "}
        <Skeleton className="inline-block h-[1em] w-14 align-middle" /> ago.
      </div>
    </div>
  );
}
