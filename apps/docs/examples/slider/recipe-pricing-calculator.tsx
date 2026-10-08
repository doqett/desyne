"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const PRICE_PER_SEAT = 12;
const PRICE_PER_GB = 0.25;

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function SliderRecipePricingCalculator() {
  const [seats, setSeats] = useState(25);
  const [storage, setStorage] = useState(500);
  const total = seats * PRICE_PER_SEAT + storage * PRICE_PER_GB;

  return (
    <div className="flex w-full max-w-sm flex-col gap-6 rounded-xl border bg-card p-6">
      <div>
        <h3 className="font-semibold">Estimate your bill</h3>
        <p className="text-muted-foreground text-sm">
          {usd.format(PRICE_PER_SEAT)} per seat, $0.25 per GB of storage.
        </p>
      </div>
      <Slider
        label="Team members"
        value={seats}
        onChange={setSeats}
        minValue={1}
        maxValue={200}
        marks={[1, 50, 100, 150, 200]}
      />
      <Slider
        label="Storage"
        value={storage}
        onChange={setStorage}
        minValue={100}
        maxValue={5000}
        step={100}
        formatOptions={{ style: "unit", unit: "gigabyte" }}
      />
      <div className="flex items-end justify-between border-t pt-4">
        <div>
          <p className="text-muted-foreground text-xs">Estimated monthly</p>
          <p className="font-semibold text-2xl tabular-nums">
            {usd.format(total)}
          </p>
        </div>
        <Button>Start free trial</Button>
      </div>
    </div>
  );
}
