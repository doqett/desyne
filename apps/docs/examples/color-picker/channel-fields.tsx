"use client";

import { ColorPicker as ColorPickerState } from "react-aria-components";
import {
  ColorField,
  ColorSlider,
  ColorSwatch,
} from "@/components/ui/color-picker";

export default function ColorChannelFields() {
  return (
    <ColorPickerState defaultValue="#7c3aed">
      <div className="flex w-full max-w-64 flex-col gap-3">
        <div className="flex items-center gap-3">
          <ColorSwatch className="size-8" />
          <ColorSlider
            aria-label="Hue"
            colorSpace="hsl"
            channel="hue"
            className="flex-1"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <ColorField label="R" colorSpace="rgb" channel="red" />
          <ColorField label="G" colorSpace="rgb" channel="green" />
          <ColorField label="B" colorSpace="rgb" channel="blue" />
        </div>
        <ColorField label="Hex" />
      </div>
    </ColorPickerState>
  );
}
