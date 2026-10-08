"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const permissions = [
  { id: "read", label: "View projects" },
  { id: "write", label: "Edit projects" },
  { id: "delete", label: "Delete projects" },
];

export default function CheckboxIndeterminate() {
  const [selected, setSelected] = useState<string[]>(["read"]);
  const all = selected.length === permissions.length;
  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        isSelected={all}
        isIndeterminate={selected.length > 0 && !all}
        onChange={(checked) =>
          setSelected(checked ? permissions.map((p) => p.id) : [])
        }
      >
        All project permissions
      </Checkbox>
      <div className="flex flex-col gap-3 border-l pl-5">
        {permissions.map((p) => (
          <Checkbox
            key={p.id}
            isSelected={selected.includes(p.id)}
            onChange={(checked) =>
              setSelected((s) =>
                checked ? [...s, p.id] : s.filter((id) => id !== p.id),
              )
            }
          >
            {p.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
