"use client";

import { TriangleAlertIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogIcon,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TextField } from "@/components/ui/text-field";

const NAME = "acme-web";

export default function DialogRecipeTypeToConfirm() {
  const [value, setValue] = useState("");
  return (
    <DialogTrigger onOpenChange={() => setValue("")}>
      <Button variant="soft" color="danger">
        Delete repository
      </Button>
      <DialogContent role="alertdialog" size="sm">
        <div className="flex gap-4">
          <DialogIcon tone="danger">
            <TriangleAlertIcon />
          </DialogIcon>
          <div className="grid gap-1.5">
            <DialogTitle>Delete {NAME}?</DialogTitle>
            <DialogDescription>
              This permanently deletes the repository, its issues and all
              deployments.
            </DialogDescription>
          </div>
        </div>
        <TextField
          label={
            <>
              Type <code className="rounded bg-muted px-1">{NAME}</code> to
              confirm
            </>
          }
          value={value}
          onChange={setValue}
          autoFocus
        />
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <DialogClose
            variant="solid"
            color="danger"
            isDisabled={value !== NAME}
          >
            Delete repository
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogTrigger>
  );
}
