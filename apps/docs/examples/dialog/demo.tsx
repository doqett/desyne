"use client";

import { Form } from "react-aria-components";
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
import { TextField } from "@/components/ui/text-field";

export default function DialogDemo() {
  return (
    <DialogTrigger>
      <Button variant="outline">Edit profile</Button>
      <DialogContent>
        {({ close }) => (
          <Form
            className="grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              close();
            }}
          >
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Update how your name appears to your team.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <TextField label="Name" defaultValue="Jordan Lee" autoFocus />
              <TextField label="Username" prefix="@" defaultValue="jordan" />
            </div>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </Form>
        )}
      </DialogContent>
    </DialogTrigger>
  );
}
