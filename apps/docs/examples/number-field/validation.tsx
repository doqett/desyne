"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { NumberField } from "@/components/ui/number-field";

export default function NumberFieldValidation() {
  return (
    <Form
      className="flex w-full max-w-56 flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <NumberField
        label="Guests"
        name="guests"
        isRequired
        minValue={1}
        maxValue={8}
        commitBehavior="validate"
        description="Up to 8 guests per booking."
      />
      <Button type="submit" className="self-start">
        Book table
      </Button>
    </Form>
  );
}
