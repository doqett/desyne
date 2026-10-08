"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/ui/textarea";

export default function TextareaValidation() {
  return (
    <Form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextareaField
        label="Steps to reproduce"
        name="steps"
        isRequired
        rows={4}
        placeholder={"1. Open the reports page\n2. Click Export\n3. …"}
      />
      <Button type="submit" className="self-start">
        File bug
      </Button>
    </Form>
  );
}
