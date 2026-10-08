"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";

export default function SelectForm() {
  const [data, setData] = useState<Record<string, FormDataEntryValue> | null>(
    null,
  );
  return (
    <Form
      className="flex w-full max-w-64 flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setData(Object.fromEntries(new FormData(e.currentTarget)));
      }}
    >
      <Select label="Size" name="size" defaultSelectedKey="m" isRequired>
        <SelectItem id="s">Small</SelectItem>
        <SelectItem id="m">Medium</SelectItem>
        <SelectItem id="l">Large</SelectItem>
      </Select>
      <Select
        label="Color"
        name="color"
        placeholder="Choose a color"
        isRequired
      >
        <SelectItem id="black">Black</SelectItem>
        <SelectItem id="sand">Sand</SelectItem>
        <SelectItem id="olive">Olive</SelectItem>
      </Select>
      <Button type="submit" className="self-start">
        Add to cart
      </Button>
      {data && (
        <code className="rounded-md bg-muted px-2 py-1 text-xs">
          {JSON.stringify(data)}
        </code>
      )}
    </Form>
  );
}
