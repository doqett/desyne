"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";

export default function CheckboxForm() {
  const [result, setResult] = useState<string | null>(null);
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setResult(
          JSON.stringify({
            toppings: data.getAll("toppings"),
            extraNapkins: data.get("napkins"),
          }),
        );
      }}
    >
      <CheckboxGroup label="Toppings" name="toppings" defaultValue={["cheese"]}>
        <Checkbox value="cheese">Extra cheese</Checkbox>
        <Checkbox value="mushrooms">Mushrooms</Checkbox>
        <Checkbox value="olives">Olives</Checkbox>
      </CheckboxGroup>
      <Checkbox name="napkins" value="yes">
        Extra napkins
      </Checkbox>
      <Button type="submit" className="self-start">
        Place order
      </Button>
      {result && (
        <code className="rounded-md bg-muted px-2 py-1 text-xs">{result}</code>
      )}
    </Form>
  );
}
