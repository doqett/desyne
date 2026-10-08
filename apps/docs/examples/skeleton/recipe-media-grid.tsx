"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonRecipeMediaGrid() {
  return (
    <section
      aria-busy="true"
      aria-label="Templates"
      className="grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3"
    >
      {Array.from({ length: 6 }, (_, i) => i).map((i) => (
        <div key={i} className="flex flex-col gap-2.5">
          <Skeleton
            animation="shimmer"
            className="aspect-video w-full rounded-lg"
          />
          <div className="flex items-center gap-2">
            <Skeleton
              animation="shimmer"
              className="size-6 shrink-0 rounded-full"
            />
            <Skeleton animation="shimmer" className="h-3.5 flex-1" />
          </div>
          <Skeleton animation="shimmer" className="h-3 w-2/3" />
        </div>
      ))}
    </section>
  );
}
