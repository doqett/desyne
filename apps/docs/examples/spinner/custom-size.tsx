"use client";

import { Spinner } from "@/components/ui/spinner";

export default function SpinnerCustomSize() {
  return (
    <div className="flex items-center gap-8">
      <Spinner className="size-12 border-4" color="brand" />
      <Spinner className="size-6 border-[1.5px] [animation-duration:1.5s]" />
    </div>
  );
}
