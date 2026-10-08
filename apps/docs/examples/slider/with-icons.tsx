"use client";

import { SunDimIcon, SunIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function SliderWithIcons() {
  return (
    <div className="flex w-full max-w-xs items-center gap-3">
      <SunDimIcon
        aria-hidden
        className="size-4 shrink-0 text-muted-foreground"
      />
      <Slider
        aria-label="Screen brightness"
        showOutput={false}
        defaultValue={70}
        color="neutral"
        className="flex-1"
      />
      <SunIcon aria-hidden className="size-5 shrink-0 text-muted-foreground" />
    </div>
  );
}
