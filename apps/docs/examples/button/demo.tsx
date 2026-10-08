"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <PlusIcon /> New project
      </Button>
      <Button variant="outline">Cancel</Button>
    </div>
  );
}
