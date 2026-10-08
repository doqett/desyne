"use client";

import { useState } from "react";
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
import { Select, SelectItem } from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";
import { toast } from "@/components/ui/toast";

export default function DialogFormValidation() {
  const [pending, setPending] = useState(false);
  return (
    <DialogTrigger>
      <Button>New API key</Button>
      <DialogContent>
        {({ close }) => (
          <Form
            className="grid gap-5"
            onSubmit={async (e) => {
              e.preventDefault();
              setPending(true);
              await new Promise((r) => setTimeout(r, 1000));
              setPending(false);
              close();
              toast.success("API key created");
            }}
          >
            <DialogHeader>
              <DialogTitle>Create API key</DialogTitle>
              <DialogDescription>
                Keys are shown once. Store it somewhere safe.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <TextField
                label="Name"
                name="name"
                isRequired
                autoFocus
                placeholder="Production server"
                validate={(v) =>
                  v.length > 0 && v.length < 3
                    ? "Use at least 3 characters."
                    : null
                }
              />
              <Select
                label="Permissions"
                name="scope"
                isRequired
                placeholder="Choose access"
              >
                <SelectItem id="read">Read only</SelectItem>
                <SelectItem id="write">Read and write</SelectItem>
                <SelectItem id="admin">Full access</SelectItem>
              </Select>
            </div>
            <DialogFooter>
              <DialogClose isDisabled={pending}>Cancel</DialogClose>
              <Button type="submit" isPending={pending}>
                Create key
              </Button>
            </DialogFooter>
          </Form>
        )}
      </DialogContent>
    </DialogTrigger>
  );
}
