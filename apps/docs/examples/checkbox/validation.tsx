"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";

export default function CheckboxValidation() {
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <CheckboxGroup
        label="How did you hear about us?"
        isRequired
        errorMessage="Pick at least one option."
      >
        <Checkbox value="search">Search engine</Checkbox>
        <Checkbox value="friend">A friend or colleague</Checkbox>
        <Checkbox value="social">Social media</Checkbox>
      </CheckboxGroup>
      <Checkbox isRequired>I agree to the Terms of Service</Checkbox>
      <Button type="submit" className="self-start">
        Continue
      </Button>
    </Form>
  );
}
