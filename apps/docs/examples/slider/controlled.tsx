"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function SliderControlled() {
  const [value, setValue] = useState(40);
  const [committed, setCommitted] = useState(40);
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Slider
        label="Font size (px)"
        value={value}
        onChange={setValue}
        onChangeEnd={setCommitted}
        minValue={12}
        maxValue={72}
      />
      <p className="truncate text-muted-foreground" style={{ fontSize: value }}>
        Aa Bb Cc
      </p>
      <p className="text-muted-foreground text-xs">
        onChange: {value}px · onChangeEnd: {committed}px
      </p>
    </div>
  );
}
