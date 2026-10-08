"use client";

import { ColorPicker } from "@/components/ui/color-picker";

export default function ColorPickerDemo() {
  return (
    <ColorPicker
      label="Brand color"
      defaultValue="#6366f1"
      swatches={[
        "#ef4444",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#06b6d4",
        "#3b82f6",
        "#6366f1",
        "#a855f7",
      ]}
    />
  );
}
