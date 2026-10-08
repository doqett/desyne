"use client";

import { Select, SelectItem } from "@/components/ui/select";

export default function SelectDemo() {
  return (
    <Select
      className="w-full max-w-56"
      label="Region"
      placeholder="Select a region"
      defaultSelectedKey="us-east"
    >
      <SelectItem id="us-east">US East (Virginia)</SelectItem>
      <SelectItem id="us-west">US West (Oregon)</SelectItem>
      <SelectItem id="eu-central">EU Central (Frankfurt)</SelectItem>
      <SelectItem id="ap-south">Asia Pacific (Mumbai)</SelectItem>
    </Select>
  );
}
