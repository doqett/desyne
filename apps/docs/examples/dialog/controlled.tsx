"use client";

import { MoreHorizontalIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu";
import { TextField } from "@/components/ui/text-field";

/** Open a dialog from a menu item: control it with `isOpen` instead of a trigger. */
export default function DialogControlled() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <MenuTrigger>
        <Button variant="outline" size="icon" aria-label="Actions">
          <MoreHorizontalIcon />
        </Button>
        <MenuContent>
          <MenuItem textValue="Rename" onAction={() => setOpen(true)}>
            <PencilIcon /> Rename…
          </MenuItem>
        </MenuContent>
      </MenuTrigger>

      <DialogContent isOpen={isOpen} onOpenChange={setOpen} size="sm">
        <DialogHeader>
          <DialogTitle>Rename file</DialogTitle>
          <DialogDescription>
            Enter a new name for “roadmap.pdf”.
          </DialogDescription>
        </DialogHeader>
        <TextField
          aria-label="File name"
          defaultValue="roadmap.pdf"
          autoFocus
        />
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button onPress={() => setOpen(false)}>Rename</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
