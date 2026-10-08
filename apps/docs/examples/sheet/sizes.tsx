"use client";

import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const sizes = [
  { size: "sm", width: "320px" },
  { size: "md", width: "384px" },
  { size: "lg", width: "576px" },
] as const;

export default function SheetSizes() {
  return (
    <div className="flex gap-2">
      {sizes.map(({ size, width }) => (
        <SheetTrigger key={size}>
          <Button variant="outline" className="uppercase">
            {size}
          </Button>
          <SheetContent size={size}>
            <SheetHeader>
              <SheetTitle>Size {size}</SheetTitle>
              <SheetDescription>
                {width} wide from the sm breakpoint up, and 75% of the screen on
                phones.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </SheetTrigger>
      ))}
    </div>
  );
}
