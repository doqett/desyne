"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Radio, RadioGroup } from "@/components/ui/radio-group";

export default function RadioGroupValidation() {
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <RadioGroup
        label="Team size"
        isRequired
        errorMessage="Select your team size to continue."
      >
        <Radio value="1">Just me</Radio>
        <Radio value="2-10">2–10 people</Radio>
        <Radio value="11-50">11–50 people</Radio>
        <Radio value="51+">More than 50</Radio>
      </RadioGroup>
      <Button type="submit" className="self-start">
        Continue
      </Button>
    </Form>
  );
}
