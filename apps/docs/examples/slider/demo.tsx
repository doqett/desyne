"use client";

import { Slider } from "@/components/ui/slider";

export default function SliderDemo() {
  return <Slider className="max-w-xs" label="Volume" defaultValue={60} />;
}
