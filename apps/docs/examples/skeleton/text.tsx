"use client";

import { Skeleton } from "@/components/ui/skeleton";

const widths = ["w-full", "w-[97%]", "w-11/12", "w-[99%]", "w-2/3"];

export default function SkeletonText() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Skeleton className="h-7 w-2/3" />
      <div className="flex flex-col gap-2">
        {widths.map((w) => (
          <Skeleton key={w} className={`h-4 ${w}`} />
        ))}
      </div>
    </div>
  );
}
