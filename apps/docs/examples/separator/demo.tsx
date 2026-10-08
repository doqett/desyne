"use client";

import { Separator } from "@/components/ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col gap-1">
        <h4 className="font-medium text-sm">Desyne</h4>
        <p className="text-muted-foreground text-sm">
          Accessible React components with shadcn tokens.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>Templates</span>
      </div>
    </div>
  );
}
