"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { ColorField, ColorPicker } from "@/components/ui/color-picker";

export default function ColorPickerForm() {
  const [result, setResult] = useState<string | null>(null);
  return (
    <Form
      className="flex w-full max-w-60 flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setResult(
          JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
        );
      }}
    >
      <ColorField
        label="Background"
        name="background"
        defaultValue="#f8fafc"
        isRequired
      />
      <div className="flex flex-wrap gap-2">
        <ColorPicker label="Accent" name="accent" defaultValue="#db2777" />
        <ColorPicker
          label="Overlay"
          name="overlay"
          valueFormat="hexa"
          defaultValue="#0f172a80"
        />
      </div>
      <Button type="submit" className="self-start">
        Save theme
      </Button>
      {result && (
        <code className="break-all rounded-md bg-muted px-2 py-1 text-xs">
          {result}
        </code>
      )}
    </Form>
  );
}
