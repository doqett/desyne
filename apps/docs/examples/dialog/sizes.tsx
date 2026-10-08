"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const sizes = ["sm", "md", "lg", "xl"] as const;

export default function DialogSizes() {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <DialogTrigger key={size}>
          <Button variant="outline" className="uppercase">
            {size}
          </Button>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>Size {size}</DialogTitle>
              <DialogDescription>
                Dialogs grow to fit their content up to this maximum width.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </DialogTrigger>
      ))}
    </div>
  );
}
