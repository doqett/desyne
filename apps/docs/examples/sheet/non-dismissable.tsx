"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function SheetNonDismissable() {
  const [isOpen, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    setProgress(0);
    const id = setInterval(
      () => setProgress((p) => Math.min(100, p + 10)),
      400,
    );
    return () => clearInterval(id);
  }, [isOpen]);

  const done = progress === 100;

  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        Import contacts
      </Button>
      <SheetContent
        side="bottom"
        isOpen={isOpen}
        onOpenChange={setOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={!done}
        showCloseButton={false}
      >
        <div className="mx-auto w-full max-w-lg">
          <SheetHeader className="border-b-0 pr-5">
            <SheetTitle>
              {done ? "Import complete" : "Importing contacts…"}
            </SheetTitle>
            <SheetDescription>
              {done
                ? "2,480 contacts were added to your audience."
                : "Keep this open until the import finishes."}
            </SheetDescription>
          </SheetHeader>
          <div className="px-5 pb-5">
            <ProgressBar aria-label="Import progress" value={progress} />
          </div>
          <SheetFooter className="border-t-0 pt-0">
            <Button isDisabled={!done} onPress={() => setOpen(false)}>
              Done
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </>
  );
}
