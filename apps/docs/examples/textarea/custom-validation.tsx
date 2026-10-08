"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/textarea";

const wordCount = (value: string) =>
  value.trim() ? value.trim().split(/\s+/).length : 0;

export default function TextareaCustomValidation() {
  return (
    <Form
      className="flex w-full max-w-sm flex-col gap-4"
      validationBehavior="aria"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextareaField
        label="Why are you cancelling?"
        name="reason"
        defaultValue="Too pricey"
        description="At least 5 words, so we can act on it."
        validate={(value) => {
          if (/https?:\/\//.test(value)) return "Links aren't allowed here.";
          const words = wordCount(value);
          return words > 0 && words < 5
            ? `Add ${5 - words} more word${5 - words === 1 ? "" : "s"}.`
            : null;
        }}
      />
      <Button
        type="submit"
        variant="solid"
        color="danger"
        className="self-start"
      >
        Cancel subscription
      </Button>
    </Form>
  );
}
