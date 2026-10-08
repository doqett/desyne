"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CommandIcon,
  CornerDownLeftIcon,
  DeleteIcon,
} from "lucide-react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function KbdWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
      <KbdGroup>
        <Kbd>
          <CommandIcon aria-hidden />
          <span className="sr-only">Command</span>
        </Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>
          <ArrowUpIcon aria-hidden />
          <span className="sr-only">Up arrow</span>
        </Kbd>
        <Kbd>
          <ArrowDownIcon aria-hidden />
          <span className="sr-only">Down arrow</span>
        </Kbd>
      </KbdGroup>
      <Kbd>
        <CornerDownLeftIcon aria-hidden /> Enter
      </Kbd>
      <Kbd>
        <DeleteIcon aria-hidden />
        <span className="sr-only">Backspace</span>
      </Kbd>
    </div>
  );
}
