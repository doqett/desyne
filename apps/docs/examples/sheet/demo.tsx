"use client";

import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TextField } from "@/components/ui/text-field";

export default function SheetDemo() {
  return (
    <SheetTrigger>
      <Button variant="outline">Edit profile</Button>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Changes are visible to everyone in your workspace.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 p-5">
          <TextField label="Name" defaultValue="Sofia Martins" />
          <TextField label="Username" prefix="@" defaultValue="sofiam" />
          <TextField label="Title" defaultValue="Product designer" />
        </div>
        <SheetFooter>
          <SheetClose>Cancel</SheetClose>
          <SheetClose variant="solid">Save changes</SheetClose>
        </SheetFooter>
      </SheetContent>
    </SheetTrigger>
  );
}
