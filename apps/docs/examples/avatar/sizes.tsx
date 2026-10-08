"use client";

import { Avatar } from "@/components/ui/avatar";

const sizes = [
  { size: "xs", px: "20px" },
  { size: "sm", px: "24px" },
  { size: "md", px: "32px" },
  { size: "lg", px: "40px" },
  { size: "xl", px: "56px" },
] as const;

export default function AvatarSizes() {
  return (
    <div className="flex items-end gap-4">
      {sizes.map((s) => (
        <div key={s.size} className="flex flex-col items-center gap-2">
          <Avatar size={s.size} colorful alt="Olivia Martin" fallback="OM" />
          <span className="text-muted-foreground text-xs">
            {s.size} · {s.px}
          </span>
        </div>
      ))}
    </div>
  );
}
