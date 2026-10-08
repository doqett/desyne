"use client";

import { useState } from "react";
import { type Color, parseColor } from "react-aria-components";
import { ColorPicker } from "@/components/ui/color-picker";

export default function ColorPickerControlled() {
  const [color, setColor] = useState<Color>(parseColor("#0ea5e9"));
  return (
    <div className="flex flex-col items-start gap-3">
      <ColorPicker label="Accent" value={color} onChange={setColor} />
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-xs">
        <dt className="text-muted-foreground">hex</dt>
        <dd>{color.toString("hex")}</dd>
        <dt className="text-muted-foreground">rgb</dt>
        <dd>{color.toString("rgb")}</dd>
        <dt className="text-muted-foreground">hsl</dt>
        <dd>{color.toString("hsl")}</dd>
      </dl>
    </div>
  );
}
