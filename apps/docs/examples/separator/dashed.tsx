"use client";

import { Separator } from "@/components/ui/separator";

export default function SeparatorDashed() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Separator variant="dashed" />
      <Separator variant="dashed" label="Today" />
      <div className="flex h-10 items-center justify-center gap-4 text-muted-foreground text-sm">
        <span>Draft</span>
        <Separator orientation="vertical" variant="dashed" />
        <span>Review</span>
        <Separator orientation="vertical" variant="dashed" />
        <span>Published</span>
      </div>
    </div>
  );
}
