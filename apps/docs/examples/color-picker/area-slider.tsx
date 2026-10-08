"use client";

import { ColorPicker as ColorPickerState } from "react-aria-components";
import {
  ColorArea,
  ColorField,
  ColorSlider,
  ColorSwatch,
} from "@/components/ui/color-picker";

export default function ColorAreaSlider() {
  return (
    <ColorPickerState defaultValue="hsl(200, 80%, 50%)">
      <div className="flex w-full max-w-56 flex-col gap-3">
        <ColorArea
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
          className="w-full"
        />
        <ColorSlider label="Hue" colorSpace="hsb" channel="hue" />
        <ColorSlider label="Alpha" colorSpace="hsb" channel="alpha" />
        <div className="flex items-end gap-2">
          <ColorField label="Hex" className="flex-1" />
          <ColorSwatch className="size-8" />
        </div>
      </div>
    </ColorPickerState>
  );
}
