"use client";

import { useState } from "react";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";

export default function CheckboxGroupControlled() {
  const [value, setValue] = useState<string[]>(["typescript"]);
  return (
    <div className="flex flex-col gap-4">
      <CheckboxGroup label="Languages" value={value} onChange={setValue}>
        <Checkbox value="typescript">TypeScript</Checkbox>
        <Checkbox value="python">Python</Checkbox>
        <Checkbox value="go">Go</Checkbox>
        <Checkbox value="rust">Rust</Checkbox>
      </CheckboxGroup>
      <p className="text-muted-foreground text-sm">
        Selected:{" "}
        <span className="font-medium text-foreground">
          {value.length ? value.join(", ") : "none"}
        </span>
      </p>
    </div>
  );
}
