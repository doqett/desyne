"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Radio, RadioGroup } from "@/components/ui/radio-group";

export default function RadioGroupForm() {
  const [result, setResult] = useState<string | null>(null);
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setResult(
          JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
        );
      }}
    >
      <RadioGroup label="Size" name="size" defaultValue="m" isRequired>
        <Radio value="s">Small</Radio>
        <Radio value="m">Medium</Radio>
        <Radio value="l">Large</Radio>
      </RadioGroup>
      <RadioGroup
        label="Milk"
        name="milk"
        orientation="horizontal"
        defaultValue="oat"
      >
        <Radio value="whole">Whole</Radio>
        <Radio value="oat">Oat</Radio>
        <Radio value="none">None</Radio>
      </RadioGroup>
      <Button type="submit" className="self-start">
        Add to order
      </Button>
      {result && (
        <code className="rounded-md bg-muted px-2 py-1 text-xs">{result}</code>
      )}
    </Form>
  );
}
