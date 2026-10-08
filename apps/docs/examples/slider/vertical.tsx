"use client";

import { Slider } from "@/components/ui/slider";

const bands = [
  { label: "60", value: 4 },
  { label: "250", value: 2 },
  { label: "1k", value: -1 },
  { label: "4k", value: 3 },
  { label: "16k", value: 5 },
];

export default function SliderVertical() {
  return (
    <div className="flex items-end gap-8">
      <div className="flex gap-4">
        {bands.map((band) => (
          <Slider
            key={band.label}
            orientation="vertical"
            label={
              <>
                {band.label}
                <span className="sr-only"> Hz</span>
              </>
            }
            defaultValue={band.value}
            minValue={-12}
            maxValue={12}
            fillOffset={0}
            size="sm"
            color="neutral"
            formatOptions={{ signDisplay: "exceptZero" }}
          />
        ))}
      </div>
      <Slider
        orientation="vertical"
        label="Range"
        defaultValue={[20, 80]}
        marks={[0, 50, 100]}
        className="h-56"
      />
    </div>
  );
}
