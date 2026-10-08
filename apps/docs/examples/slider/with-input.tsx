"use client";

import { useState } from "react";
import { NumberField } from "@/components/ui/number-field";
import { Slider } from "@/components/ui/slider";

export default function SliderWithInput() {
  const [value, setValue] = useState(64);
  return (
    <div className="flex w-full max-w-xs items-end gap-3">
      <Slider
        label="Memory (GB)"
        showOutput={false}
        value={value}
        onChange={setValue}
        minValue={8}
        maxValue={256}
        step={8}
        className="flex-1 pb-1.5"
      />
      <NumberField
        aria-label="Memory in GB"
        value={value}
        onChange={(v) => setValue(Number.isNaN(v) ? 8 : v)}
        minValue={8}
        maxValue={256}
        step={8}
        className="w-24"
      />
    </div>
  );
}
