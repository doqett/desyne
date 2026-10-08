"use client";

import {
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/color-picker";

const presets = ["#0f172a80", "#2563eb", "#16a34acc", "#f59e0b", "#e11d4899"];

export default function ColorPickerCustomContent() {
  return (
    <ColorPicker label="Overlay" defaultValue="#2563ebb3">
      <ColorArea
        colorSpace="hsb"
        xChannel="saturation"
        yChannel="brightness"
        className="w-full"
      />
      <ColorSlider label="Hue" colorSpace="hsb" channel="hue" />
      <ColorSlider label="Opacity" colorSpace="hsb" channel="alpha" />
      <ColorField aria-label="Hex" />
      <ColorSwatchPicker aria-label="Presets">
        {presets.map((color) => (
          <ColorSwatchPickerItem key={color} color={color} />
        ))}
      </ColorSwatchPicker>
    </ColorPicker>
  );
}
