"use client";

import { Button } from "@/components/ui/button";

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="dashed">Dashed</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
