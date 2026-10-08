"use client";

import { Radio, RadioGroup } from "@/components/ui/radio-group";

export default function RadioGroupDemo() {
  return (
    <RadioGroup label="Notifications" defaultValue="mentions">
      <Radio value="all">All new messages</Radio>
      <Radio value="mentions">Direct messages and mentions</Radio>
      <Radio value="none">Nothing</Radio>
    </RadioGroup>
  );
}
