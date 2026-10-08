"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { NumberField } from "@/components/ui/number-field";

export default function NumberFieldCustomValidation() {
  return (
    <Form
      className="flex w-full max-w-56 flex-col gap-4"
      validationBehavior="aria"
      onSubmit={(e) => e.preventDefault()}
    >
      <NumberField
        label="Batch size"
        name="batch"
        defaultValue={48}
        minValue={8}
        maxValue={512}
        step={8}
        description="A multiple of 8 between 8 and 512."
        validate={(value) =>
          value > 256 ? "Batches over 256 need a GPU plan." : null
        }
      />
      <Button type="submit" className="self-start">
        Start training
      </Button>
    </Form>
  );
}
