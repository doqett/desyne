"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function ButtonWithKbd() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        className="w-56 justify-start text-muted-foreground"
      >
        <SearchIcon /> Search…
        <KbdGroup className="ml-auto">
          <Kbd size="sm">⌘</Kbd>
          <Kbd size="sm">K</Kbd>
        </KbdGroup>
      </Button>
      <Button>
        Publish
        <Kbd size="sm" className="border-white/20 bg-white/10 text-inherit">
          ⌘↵
        </Kbd>
      </Button>
    </div>
  );
}
