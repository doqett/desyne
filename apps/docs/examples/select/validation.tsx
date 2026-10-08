"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";

export default function SelectValidation() {
  return (
    <Form
      className="flex w-full max-w-56 flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Select
        label="Plan"
        name="plan"
        placeholder="Choose a plan"
        isRequired
        disabledKeys={["enterprise"]}
      >
        <SelectItem id="free">Free</SelectItem>
        <SelectItem id="pro">Pro</SelectItem>
        <SelectItem id="enterprise">Enterprise (contact sales)</SelectItem>
      </Select>
      <Button type="submit" className="self-start">
        Continue
      </Button>
    </Form>
  );
}
