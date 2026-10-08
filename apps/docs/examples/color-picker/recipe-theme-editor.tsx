"use client";

import { BellIcon } from "lucide-react";
import { type CSSProperties, useState } from "react";
import { type Color, parseColor } from "react-aria-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";

/** Black or white, whichever reads better on the given color. */
function foregroundFor(color: Color) {
  const rgb = color.toFormat("rgb");
  const [r, g, b] = (["red", "green", "blue"] as const).map((c) =>
    rgb.getChannelValue(c),
  );
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#0a0a0a" : "#ffffff";
}

export default function ColorPickerRecipeThemeEditor() {
  const [brand, setBrand] = useState<Color>(parseColor("#7c3aed"));
  const tone = {
    "--tone": brand.toString("hex"),
    "--tone-fg": foregroundFor(brand),
  } as CSSProperties;

  return (
    <div className="flex w-full max-w-md flex-col gap-5 rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold">Brand color</h3>
          <p className="text-muted-foreground text-sm">
            Used for buttons, links and highlights.
          </p>
        </div>
        <ColorPicker
          label={brand.toString("hex").toUpperCase()}
          value={brand}
          onChange={setBrand}
          swatches={["#7c3aed", "#2563eb", "#0d9488", "#ea580c", "#e11d48"]}
        />
      </div>
      <div
        style={tone}
        className="flex flex-wrap items-center gap-3 rounded-lg border border-dashed p-4"
      >
        <Button style={tone}>Upgrade plan</Button>
        <Button style={tone} variant="soft">
          <BellIcon /> Subscribe
        </Button>
        <Badge style={tone} variant="soft">
          New
        </Badge>
        <span className="font-medium text-(--tone) text-sm">Accent text</span>
      </div>
    </div>
  );
}
