"use client";

import { Skeleton } from "@/components/ui/skeleton";

const animations = ["pulse", "shimmer", "none"] as const;

export default function SkeletonAnimations() {
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-3">
      {animations.map((animation) => (
        <div key={animation} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 rounded-xl border p-3">
            <Skeleton animation={animation} className="h-20 w-full" />
            <Skeleton animation={animation} className="h-3 w-3/4" />
            <Skeleton animation={animation} className="h-3 w-1/2" />
          </div>
          <code className="text-center text-muted-foreground text-xs">
            {animation}
          </code>
        </div>
      ))}
    </div>
  );
}
