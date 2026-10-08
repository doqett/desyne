"use client";

import { Slider } from "@/components/ui/slider";

export default function SliderSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <Slider label="Small" size="sm" defaultValue={40} />
      <Slider label="Medium" size="md" defaultValue={60} />
    </div>
  );
}
