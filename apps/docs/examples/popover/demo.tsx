"use client";

import { Button } from "@/components/ui/button";
import { NumberField } from "@/components/ui/number-field";
import {
  Popover,
  PopoverDialog,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PopoverDemo() {
  return (
    <PopoverTrigger>
      <Button variant="outline">Dimensions</Button>
      <Popover>
        <PopoverDialog className="grid gap-4">
          <div className="grid gap-1.5">
            <PopoverTitle>Dimensions</PopoverTitle>
            <p className="text-muted-foreground text-sm">
              Set the size of the selected layer.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <NumberField label="Width" defaultValue={1200} minValue={1} />
            <NumberField label="Height" defaultValue={630} minValue={1} />
          </div>
        </PopoverDialog>
      </Popover>
    </PopoverTrigger>
  );
}
