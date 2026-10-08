"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NumberField } from "@/components/ui/number-field";
import { Slider } from "@/components/ui/slider";

const MIN = 0;
const MAX = 2000;
const prices = [
  49, 89, 120, 149, 199, 249, 299, 349, 420, 499, 599, 699, 799, 899, 999, 1199,
  1499, 1899,
];
const usd = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
} as const;

export default function SliderRecipePriceFilter() {
  const [range, setRange] = useState([100, 900]);
  const [min, max] = range;
  const count = prices.filter((p) => p >= min && p <= max).length;

  return (
    <div className="flex w-full max-w-xs flex-col gap-4 rounded-xl border bg-card p-5">
      <Slider
        label="Price"
        value={range}
        onChange={setRange}
        minValue={MIN}
        maxValue={MAX}
        step={10}
        formatOptions={usd}
      />
      <div className="flex items-center gap-2">
        <NumberField
          aria-label="Minimum price"
          value={min}
          onChange={(v) => setRange([Math.min(v || MIN, max), max])}
          minValue={MIN}
          maxValue={max}
          step={10}
          formatOptions={usd}
          stepper="none"
        />
        <span className="text-muted-foreground">–</span>
        <NumberField
          aria-label="Maximum price"
          value={max}
          onChange={(v) => setRange([min, Math.max(v || MAX, min)])}
          minValue={min}
          maxValue={MAX}
          step={10}
          formatOptions={usd}
          stepper="none"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          className="flex-1"
          onPress={() => setRange([MIN, MAX])}
        >
          Reset
        </Button>
        <Button className="flex-1">Show {count} results</Button>
      </div>
    </div>
  );
}
