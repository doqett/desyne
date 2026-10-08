"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxDescription() {
  return (
    <Checkbox
      className="max-w-xs"
      defaultSelected
      description="Get a weekly digest of activity in your workspace."
    >
      Email notifications
    </Checkbox>
  );
}
