"use client";

import { GlobeIcon } from "lucide-react";
import { Select, SelectItem, SelectSection } from "@/components/ui/select";

export default function SelectSections() {
  return (
    <Select
      className="w-full max-w-64"
      label="Timezone"
      placeholder="Select a timezone"
      prefix={<GlobeIcon />}
    >
      <SelectSection title="North America">
        <SelectItem id="est">Eastern Time</SelectItem>
        <SelectItem id="cst">Central Time</SelectItem>
        <SelectItem id="pst">Pacific Time</SelectItem>
      </SelectSection>
      <SelectSection title="Europe">
        <SelectItem id="gmt">Greenwich Mean Time</SelectItem>
        <SelectItem id="cet">Central European Time</SelectItem>
      </SelectSection>
      <SelectSection title="Asia">
        <SelectItem id="ist">India Standard Time</SelectItem>
        <SelectItem id="npt">Nepal Time</SelectItem>
        <SelectItem id="jst">Japan Standard Time</SelectItem>
      </SelectSection>
    </Select>
  );
}
