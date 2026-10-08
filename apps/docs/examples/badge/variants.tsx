"use client";

import { Badge } from "@/components/ui/badge";

const colors = [
  "primary",
  "brand",
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
] as const;
const variants = ["solid", "soft", "outline", "dot"] as const;

export default function BadgeVariants() {
  return (
    <div className="w-full max-w-2xl overflow-x-auto">
      <div className="grid w-max grid-cols-[auto_repeat(4,auto)] items-center gap-2 text-xs">
        <span />
        {variants.map((v) => (
          <span
            key={v}
            className="text-center text-muted-foreground capitalize"
          >
            {v}
          </span>
        ))}
        {colors.map((color) => (
          <div key={color} className="contents">
            <span className="pr-2 text-muted-foreground capitalize">
              {color}
            </span>
            {variants.map((variant) => (
              <Badge
                key={variant}
                variant={variant}
                color={color}
                className="justify-self-center capitalize"
              >
                {color}
              </Badge>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
