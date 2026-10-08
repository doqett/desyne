"use client";

import { useState } from "react";
import { type Color, parseColor } from "react-aria-components";
import { ColorPicker } from "@/components/ui/color-picker";
import { Slider } from "@/components/ui/slider";

export default function ColorPickerRecipeGradient() {
  const [from, setFrom] = useState<Color>(parseColor("#f97316"));
  const [to, setTo] = useState<Color>(parseColor("#db2777"));
  const [angle, setAngle] = useState(135);
  const css = `linear-gradient(${angle}deg, ${from.toString("hex")}, ${to.toString("hex")})`;

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div
        className="h-32 rounded-xl border"
        style={{ backgroundImage: css }}
        role="img"
        aria-label="Gradient preview"
      />
      <div className="flex flex-wrap gap-2">
        <ColorPicker label="From" value={from} onChange={setFrom} />
        <ColorPicker label="To" value={to} onChange={setTo} />
      </div>
      <Slider
        label="Angle"
        value={angle}
        onChange={setAngle}
        maxValue={360}
        step={5}
        formatOptions={{ style: "unit", unit: "degree" }}
        color="neutral"
      />
      <code className="break-all rounded-md bg-muted px-2 py-1.5 text-xs">
        {`background: ${css};`}
      </code>
    </div>
  );
}
