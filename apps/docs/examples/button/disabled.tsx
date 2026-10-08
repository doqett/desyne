"use client";

import { Button } from "@/components/ui/button";

export default function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button isDisabled>Solid</Button>
      <Button isDisabled variant="outline">
        Outline
      </Button>
      <Button isDisabled variant="ghost">
        Ghost
      </Button>
    </div>
  );
}
