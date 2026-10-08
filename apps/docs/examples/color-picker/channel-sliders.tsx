"use client";

import { ColorPicker as ColorPickerState } from "react-aria-components";
import { ColorSlider, ColorSwatch } from "@/components/ui/color-picker";

export default function ColorChannelSliders() {
  return (
    <ColorPickerState defaultValue="rgb(234, 88, 12)">
      <div className="flex w-full max-w-60 flex-col gap-4">
        <div className="h-10 w-full">
          <ColorSwatch className="size-full" />
        </div>
        <ColorSlider label="Red" colorSpace="rgb" channel="red" />
        <ColorSlider label="Green" colorSpace="rgb" channel="green" />
        <ColorSlider label="Blue" colorSpace="rgb" channel="blue" />
        <ColorSlider label="Lightness" colorSpace="hsl" channel="lightness" />
      </div>
    </ColorPickerState>
  );
}
