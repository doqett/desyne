"use client";

import { Kbd } from "@/components/ui/kbd";

export default function KbdSizes() {
  return (
    <div className="flex items-center gap-6 text-muted-foreground text-sm">
      <span className="flex items-center gap-2">
        <Kbd size="sm">Esc</Kbd> sm · 18px
      </span>
      <span className="flex items-center gap-2">
        <Kbd size="md">Esc</Kbd> md · 22px
      </span>
    </div>
  );
}
