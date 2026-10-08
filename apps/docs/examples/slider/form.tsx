"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function SliderForm() {
  const [result, setResult] = useState<string | null>(null);
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setResult(
          JSON.stringify({
            quality: data.get("quality"),
            ageMin: data.get("ageMin"),
            ageMax: data.get("ageMax"),
            hours: data.getAll("hours"),
          }),
        );
      }}
    >
      <Slider label="Image quality" name="quality" defaultValue={80} />
      <Slider
        label="Audience age"
        name={["ageMin", "ageMax"]}
        defaultValue={[18, 65]}
        minValue={13}
        maxValue={100}
      />
      <Slider
        label="Working hours"
        name="hours"
        defaultValue={[9, 17]}
        minValue={0}
        maxValue={23}
        thumbLabels={["Start", "End"]}
      />
      <Button type="submit" className="self-start">
        Save
      </Button>
      {result && (
        <code className="rounded-md bg-muted px-2 py-1 text-xs">{result}</code>
      )}
    </Form>
  );
}
