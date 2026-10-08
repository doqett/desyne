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

export default function DialogNonDismissable() {
  return (
    <DialogTrigger>
      <Button variant="outline">Accept terms</Button>
      <DialogContent
        isDismissable={false}
        isKeyboardDismissDisabled
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Updated terms of service</DialogTitle>
          <DialogDescription>
            Clicking outside or pressing Esc won’t close this dialog. Choose an
            option to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Decline</DialogClose>
          <DialogClose variant="solid">Accept</DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogTrigger>
  );
}
