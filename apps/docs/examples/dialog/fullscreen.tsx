"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DialogFullscreen() {
  return (
    <DialogTrigger>
      <Button variant="outline">Open editor</Button>
      <DialogContent size="full">
        <DialogHeader>
          <DialogTitle>Edit README.md</DialogTitle>
          <DialogDescription>
            Changes are saved when you press Save.
          </DialogDescription>
        </DialogHeader>
        <textarea
          aria-label="Content"
          defaultValue={
            "# Desyne\n\nAccessible components for your shadcn project."
          }
          className="min-h-0 w-full flex-1 resize-none rounded-lg border bg-muted/40 p-4 font-mono text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20"
        />
        <DialogFooter>
          <DialogClose>Discard</DialogClose>
          <DialogClose variant="solid">Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogTrigger>
  );
}
