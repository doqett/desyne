"use client";

import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function KbdGroupExample() {
  return (
    <div className="flex flex-col items-start gap-3 text-muted-foreground text-sm">
      <p className="flex items-center gap-2">
        Combination:
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span aria-hidden>+</span>
          <Kbd>Shift</Kbd>
          <span aria-hidden>+</span>
          <Kbd>P</Kbd>
        </KbdGroup>
      </p>
      <p className="flex items-center gap-2">
        Sequence:
        <KbdGroup>
          <Kbd>G</Kbd>
          <span>then</span>
          <Kbd>I</Kbd>
        </KbdGroup>
      </p>
      <p className="flex items-center gap-2">
        Compact:
        <Kbd>⌘⇧P</Kbd>
      </p>
    </div>
  );
}
