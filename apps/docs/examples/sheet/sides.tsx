"use client";

import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const sides = ["top", "right", "bottom", "left"] as const;

export default function SheetSides() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {sides.map((side) => (
        <SheetTrigger key={side}>
          <Button variant="outline" className="capitalize">
            {side}
          </Button>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className="capitalize">{side} sheet</SheetTitle>
              <SheetDescription>
                This sheet slides in from the {side} edge of the screen.
              </SheetDescription>
            </SheetHeader>
            <p className="p-5 text-muted-foreground text-sm">
              Press Esc or click the backdrop to close it.
            </p>
          </SheetContent>
        </SheetTrigger>
      ))}
    </div>
  );
}
