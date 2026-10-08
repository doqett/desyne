"use client";

import { Select, SelectItem } from "@/components/ui/select";

const items = ["Low", "Medium", "High", "Critical"].map((name) => ({
  id: name.toLowerCase(),
  name,
}));

export default function SelectVariants() {
  return (
    <div className="flex w-full max-w-56 flex-col gap-5">
      {(["outline", "filled", "underlined"] as const).map((variant) => (
        <Select
          key={variant}
          variant={variant}
          label={variant}
          items={items}
          defaultSelectedKey="medium"
          className="capitalize"
        >
          {(item) => <SelectItem>{item.name}</SelectItem>}
        </Select>
      ))}
    </div>
  );
}
