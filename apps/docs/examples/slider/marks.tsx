"use client";

import { Slider } from "@/components/ui/slider";

export default function SliderMarks() {
  return (
    <Slider
      className="max-w-xs"
      label="Retention (days)"
      defaultValue={30}
      maxValue={90}
      step={15}
      marks={[0, 15, 30, 45, 60, 75, 90]}
    />
  );
}
