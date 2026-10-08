"use client";

import { Button } from "@/components/ui/button";

const colors = [
  "primary",
  "brand",
  "neutral",
  "danger",
  "success",
  "warning",
  "info",
] as const;
const variants = ["solid", "soft", "outline", "ghost"] as const;

export default function ButtonColors() {
  return (
    <div className="grid grid-cols-[auto_repeat(4,auto)] items-center gap-2 text-xs">
      <span />
      {variants.map((v) => (
        <span key={v} className="text-center text-muted-foreground capitalize">
          {v}
        </span>
      ))}
      {colors.map((color) => (
        <div key={color} className="contents">
          <span className="pr-2 text-muted-foreground capitalize">{color}</span>
          {variants.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              color={color}
              size="sm"
              className="capitalize"
            >
              {color}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
