"use client";

import { Slider } from "@/components/ui/slider";

export default function SliderStep() {
  return (
    <Slider
      className="max-w-xs"
      label="Thermostat"
      defaultValue={21.5}
      minValue={16}
      maxValue={28}
      step={0.5}
      formatOptions={{ style: "unit", unit: "celsius" }}
    />
  );
}
