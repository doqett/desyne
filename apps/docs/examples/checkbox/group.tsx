"use client";

import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";

export default function CheckboxGroupDemo() {
  return (
    <CheckboxGroup
      label="Notify me about"
      description="We'll only email you about the things you pick."
      defaultValue={["mentions", "comments"]}
    >
      <Checkbox value="mentions">Mentions</Checkbox>
      <Checkbox value="comments">Replies to my comments</Checkbox>
      <Checkbox value="assigned">Issues assigned to me</Checkbox>
      <Checkbox value="updates">Product updates</Checkbox>
    </CheckboxGroup>
  );
}
