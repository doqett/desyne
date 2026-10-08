"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonShapes() {
  return (
    <div className="grid w-full max-w-sm grid-cols-[auto_1fr] items-center gap-x-6 gap-y-4 text-muted-foreground text-xs">
      <span>Heading</span>
      <Skeleton className="h-6 w-40" />
      <span>Text</span>
      <Skeleton className="h-4 w-full" />
      <span>Avatar</span>
      <Skeleton className="size-10 rounded-full" />
      <span>Thumbnail</span>
      <Skeleton className="size-16 rounded-lg" />
      <span>Button</span>
      <Skeleton className="h-8 w-24" />
      <span>Badge</span>
      <Skeleton className="h-5 w-14 rounded-full" />
    </div>
  );
}
