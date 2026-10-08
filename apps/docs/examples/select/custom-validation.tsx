"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";

export default function SelectCustomValidation() {
  return (
    <Form
      className="flex w-full max-w-64 flex-col gap-4"
      validationBehavior="aria"
      onSubmit={(e) => e.preventDefault()}
    >
      <Select
        label="Retention"
        defaultSelectedKey="7"
        description="How long we keep request logs."
        validate={(key) =>
          key === "7" ? "7 days is below your compliance minimum of 30." : null
        }
      >
        <SelectItem id="7">7 days</SelectItem>
        <SelectItem id="30">30 days</SelectItem>
        <SelectItem id="90">90 days</SelectItem>
        <SelectItem id="365">1 year</SelectItem>
      </Select>
      <Button type="submit" className="self-start">
        Save
      </Button>
    </Form>
  );
}
