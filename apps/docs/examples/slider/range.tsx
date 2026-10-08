"use client";

import { Slider } from "@/components/ui/slider";

export default function SliderRange() {
  return (
    <Slider
      className="max-w-xs"
      label="Price range"
      defaultValue={[200, 800]}
      maxValue={1000}
      step={10}
      formatOptions={{
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }}
    />
  );
}
