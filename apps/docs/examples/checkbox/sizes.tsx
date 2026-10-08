"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxSizes() {
  return (
    <div className="flex items-center gap-6">
      <Checkbox size="sm" defaultSelected>
        Small
      </Checkbox>
      <Checkbox size="md" defaultSelected>
        Medium
      </Checkbox>
      <Checkbox size="lg" defaultSelected>
        Large
      </Checkbox>
    </div>
  );
}
