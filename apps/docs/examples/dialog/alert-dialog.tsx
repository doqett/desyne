"use client";

import { TriangleAlertIcon } from "lucide-react";
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

export default function AlertDialogDemo() {
  return (
    <DialogTrigger>
      <Button variant="outline" color="danger">
        Delete project
      </Button>
      <DialogContent role="alertdialog" size="sm">
        <div className="flex gap-4">
          <DialogIcon tone="danger">
            <TriangleAlertIcon />
          </DialogIcon>
          <div className="grid gap-1.5">
            <DialogTitle>Delete this project?</DialogTitle>
            <DialogDescription>
              All deployments and logs will be permanently removed. This
              can&apos;t be undone.
            </DialogDescription>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <DialogClose variant="solid" color="danger">
            Delete
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogTrigger>
  );
}
