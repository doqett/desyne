"use client";

import { Select, SelectItem } from "@/components/ui/select";

export default function SelectSizes() {
  return (
    <div className="flex w-full max-w-56 flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Select
          key={size}
          size={size}
          aria-label={`Size ${size}`}
          defaultSelectedKey="a"
        >
          <SelectItem id="a">Size {size}</SelectItem>
          <SelectItem id="b">Another option</SelectItem>
        </Select>
      ))}
    </div>
  );
}
