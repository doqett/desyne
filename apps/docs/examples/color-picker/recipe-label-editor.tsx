"use client";

import { TagIcon } from "lucide-react";
import { useState } from "react";
import { type Color, parseColor } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/color-picker";
import { Label } from "@/components/ui/field";
import { TextField } from "@/components/ui/text-field";

const colors = [
  "#64748b",
  "#dc2626",
  "#ea580c",
  "#ca8a04",
  "#16a34a",
  "#0891b2",
  "#2563eb",
  "#7c3aed",
  "#db2777",
];

export default function ColorPickerRecipeLabelEditor() {
  const [name, setName] = useState("Needs design");
  const [color, setColor] = useState<Color>(parseColor("#7c3aed"));
  const hex = color.toString("hex");

  return (
    <div className="flex w-full max-w-xs flex-col gap-4 rounded-xl border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <TagIcon className="size-4" /> New label
      </div>
      <TextField label="Name" value={name} onChange={setName} />
      <div className="flex flex-col gap-2">
        <Label id="label-color">Color</Label>
        <ColorSwatchPicker
          aria-labelledby="label-color"
          value={color}
          onChange={setColor}
        >
          {colors.map((c) => (
            <ColorSwatchPickerItem key={c} color={c} />
          ))}
        </ColorSwatchPicker>
      </div>
      <div className="flex items-center justify-between gap-3 border-t pt-4">
        <span
          className="inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 font-medium text-xs"
          style={{
            color: hex,
            borderColor: `${hex}55`,
            backgroundColor: `${hex}14`,
          }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: hex }}
          />
          {name || "Label"}
        </span>
        <Button size="sm" isDisabled={!name.trim()}>
          Create label
        </Button>
      </div>
    </div>
  );
}
