"use client";

import { Slider } from "@/components/ui/slider";

export default function SliderFormatting() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <Slider
        label="Opacity"
        defaultValue={0.8}
        maxValue={1}
        step={0.01}
        formatOptions={{ style: "percent" }}
      />
      <Slider
        label="Monthly budget"
        defaultValue={2500}
        maxValue={10000}
        step={100}
        formatOptions={{
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 0,
        }}
      />
      <Slider
        label="Upload limit"
        defaultValue={250}
        minValue={10}
        maxValue={1000}
        step={10}
        formatOptions={{ style: "unit", unit: "megabyte" }}
      />
    </div>
  );
}
