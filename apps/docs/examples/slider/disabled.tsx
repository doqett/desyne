"use client";

import { Slider } from "@/components/ui/slider";

export default function SliderDisabled() {
  return (
    <Slider
      className="max-w-xs"
      label="Replica count"
      defaultValue={3}
      minValue={1}
      maxValue={10}
      isDisabled
    />
  );
}
