"use client";

import { Slider } from "@/components/ui/slider";

const colors = [
  "brand",
  "primary",
  "neutral",
  "info",
  "success",
  "warning",
  "danger",
] as const;

export default function SliderColors() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      {colors.map((color, i) => (
        <Slider
          key={color}
          label={color}
          color={color}
          defaultValue={30 + i * 10}
          showOutput={false}
          className="capitalize"
        />
      ))}
    </div>
  );
}
