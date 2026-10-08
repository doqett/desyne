"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
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
import { TextareaField } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

export default function SheetForm() {
  const [pending, setPending] = useState(false);
  return (
    <SheetTrigger>
      <Button>New issue</Button>
      <SheetContent size="lg">
        {({ close }) => (
          <Form
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={async (e) => {
              e.preventDefault();
              setPending(true);
              await new Promise((r) => setTimeout(r, 1000));
              setPending(false);
              close();
              toast.success("Issue ENG-482 created");
            }}
          >
            <SheetHeader>
              <SheetTitle>Create issue</SheetTitle>
              <SheetDescription>
                Issues are added to the Engineering backlog.
              </SheetDescription>
            </SheetHeader>
            <div className="grid min-h-0 flex-1 content-start gap-4 overflow-y-auto p-5">
              <TextField
                label="Title"
                name="title"
                isRequired
                autoFocus
                placeholder="Checkout button unresponsive on Safari"
              />
              <TextareaField
                label="Description"
                name="description"
                rows={5}
                placeholder="Steps to reproduce, expected and actual behavior…"
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Priority"
                  name="priority"
                  defaultSelectedKey="medium"
                >
                  <SelectItem id="urgent">Urgent</SelectItem>
                  <SelectItem id="high">High</SelectItem>
                  <SelectItem id="medium">Medium</SelectItem>
                  <SelectItem id="low">Low</SelectItem>
                </Select>
                <Select
                  label="Assignee"
                  name="assignee"
                  isRequired
                  placeholder="Choose"
                >
                  <SelectItem id="dana">Dana Kim</SelectItem>
                  <SelectItem id="omar">Omar Haddad</SelectItem>
                  <SelectItem id="lucia">Lucía Ferrer</SelectItem>
                </Select>
              </div>
            </div>
            <SheetFooter>
              <SheetClose isDisabled={pending}>Cancel</SheetClose>
              <Button type="submit" isPending={pending}>
                Create issue
              </Button>
            </SheetFooter>
          </Form>
        )}
      </SheetContent>
    </SheetTrigger>
  );
}
