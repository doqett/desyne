"use client";

import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";

export default function CheckboxHorizontal() {
  return (
    <CheckboxGroup
      label="Platforms"
      orientation="horizontal"
      defaultValue={["web", "ios"]}
    >
      <Checkbox value="web">Web</Checkbox>
      <Checkbox value="ios">iOS</Checkbox>
      <Checkbox value="android">Android</Checkbox>
      <Checkbox value="desktop">Desktop</Checkbox>
    </CheckboxGroup>
  );
}
