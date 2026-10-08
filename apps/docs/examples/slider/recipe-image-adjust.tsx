"use client";

import { RotateCcwIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const defaults = { brightness: 100, contrast: 100, saturation: 100, blur: 0 };
type Adjustments = typeof defaults;

const controls: {
  key: keyof Adjustments;
  label: string;
  max: number;
}[] = [
  { key: "brightness", label: "Brightness", max: 200 },
  { key: "contrast", label: "Contrast", max: 200 },
  { key: "saturation", label: "Saturation", max: 200 },
  { key: "blur", label: "Blur", max: 10 },
];

export default function SliderRecipeImageAdjust() {
  const [values, setValues] = useState<Adjustments>(defaults);
  const filter = `brightness(${values.brightness}%) contrast(${values.contrast}%) saturate(${values.saturation}%) blur(${values.blur}px)`;

  return (
    <div className="grid w-full max-w-xl gap-5 sm:grid-cols-[1fr_14rem]">
      <div className="aspect-[4/3] overflow-hidden rounded-xl border">
        <div
          className="size-full bg-[linear-gradient(160deg,#fde68a_0%,#f97316_35%,#be185d_65%,#312e81_100%)] transition-[filter]"
          style={{ filter }}
          role="img"
          aria-label="Sunset photo preview"
        />
      </div>
      <div className="flex flex-col gap-4">
        {controls.map((c) => (
          <Slider
            key={c.key}
            label={c.label}
            size="sm"
            color="neutral"
            maxValue={c.max}
            value={values[c.key]}
            onChange={(v) => setValues((s) => ({ ...s, [c.key]: v }))}
          />
        ))}
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          onPress={() => setValues(defaults)}
        >
          <RotateCcwIcon /> Reset
        </Button>
      </div>
    </div>
  );
}
