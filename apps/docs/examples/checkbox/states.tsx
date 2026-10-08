"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxStates() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultSelected>Checked</Checkbox>
      <Checkbox isIndeterminate>Indeterminate</Checkbox>
      <Checkbox isInvalid>Invalid</Checkbox>
      <Checkbox isDisabled>Disabled</Checkbox>
      <Checkbox isDisabled defaultSelected>
        Disabled checked
      </Checkbox>
      <Checkbox isReadOnly defaultSelected>
        Read-only
      </Checkbox>
      <Checkbox isInvalid defaultSelected>
        Invalid checked
      </Checkbox>
    </div>
  );
}
