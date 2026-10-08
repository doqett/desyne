"use client";

import { Select, SelectItem } from "@/components/ui/select";

export default function SelectDisabled() {
  return (
    <div className="flex w-full max-w-56 flex-col gap-5">
      <Select label="Region" defaultSelectedKey="eu" isDisabled>
        <SelectItem id="us">United States</SelectItem>
        <SelectItem id="eu">Europe</SelectItem>
      </Select>
      <Select
        label="Plan"
        defaultSelectedKey="pro"
        disabledKeys={["enterprise"]}
        description="Enterprise requires a sales call."
      >
        <SelectItem id="free">Free</SelectItem>
        <SelectItem id="pro">Pro</SelectItem>
        <SelectItem id="enterprise">Enterprise</SelectItem>
      </Select>
    </div>
  );
}
