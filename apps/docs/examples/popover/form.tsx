"use client";

import { LinkIcon } from "lucide-react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverDialog,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TextField } from "@/components/ui/text-field";
import { toast } from "@/components/ui/toast";

export default function PopoverForm() {
  return (
    <PopoverTrigger>
      <Button variant="outline">
        <LinkIcon /> Insert link
      </Button>
      <Popover placement="bottom start">
        <PopoverDialog className="w-80">
          {({ close }) => (
            <Form
              className="grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const url = new FormData(e.currentTarget).get("url");
                close();
                toast.success(`Linked to ${url}`);
              }}
            >
              <PopoverTitle>Insert link</PopoverTitle>
              <TextField
                label="URL"
                name="url"
                type="url"
                isRequired
                autoFocus
                placeholder="https://"
              />
              <TextField
                label="Text to display"
                name="text"
                placeholder="Optional"
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onPress={close}>
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Insert
                </Button>
              </div>
            </Form>
          )}
        </PopoverDialog>
      </Popover>
    </PopoverTrigger>
  );
}
