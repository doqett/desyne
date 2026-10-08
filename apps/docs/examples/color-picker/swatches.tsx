"use client";

import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/color-picker";

const colors = [
  "#0f172a",
  "#dc2626",
  "#ea580c",
  "#16a34a",
  "#0891b2",
  "#2563eb",
  "#7c3aed",
  "#db2777",
];

export default function ColorSwatches() {
  return (
    <ColorSwatchPicker aria-label="Label color" defaultValue="#2563eb">
      {colors.map((color) => (
        <ColorSwatchPickerItem key={color} color={color} />
      ))}
    </ColorSwatchPicker>
  );
}
