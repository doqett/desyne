"use client";

import { ColorPicker as ColorPickerState } from "react-aria-components";
import {
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
} from "@/components/ui/color-picker";

export default function ColorPickerDisabled() {
  return (
    <div className="flex w-full max-w-56 flex-col gap-5">
      <ColorPicker label="Locked brand" defaultValue="#0d9488" isDisabled />
      <ColorPickerState defaultValue="#0d9488">
        <div className="flex flex-col gap-3">
          <ColorArea
            colorSpace="hsb"
            xChannel="saturation"
            yChannel="brightness"
            className="w-full"
            isDisabled
          />
          <ColorSlider label="Hue" colorSpace="hsb" channel="hue" isDisabled />
          <ColorField label="Hex" isReadOnly />
        </div>
      </ColorPickerState>
    </div>
  );
}
