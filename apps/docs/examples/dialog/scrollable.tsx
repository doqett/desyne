"use client";

import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DialogScrollable() {
  return (
    <DialogTrigger>
      <Button variant="outline">Terms of service</Button>
      <DialogContent className="max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>Last updated September 2026.</DialogDescription>
        </DialogHeader>
        <DialogBody className="space-y-3 text-muted-foreground leading-relaxed">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <p key={n}>
              {n}. The content scrolls inside the dialog while the header and
              footer stay put. Long legal text, changelogs and review screens
              work well this way.
            </p>
          ))}
        </DialogBody>
        <DialogFooter>
          <DialogClose>Decline</DialogClose>
          <DialogClose variant="solid">Accept</DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogTrigger>
  );
}
