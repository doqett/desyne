"use client";

import { useState } from "react";
import { TextField } from "@/components/ui/text-field";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function TextFieldControlled() {
  const [name, setName] = useState("Q3 Product Launch");
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <TextField label="Project name" value={name} onChange={setName} />
      <p className="text-muted-foreground text-sm">
        URL:{" "}
        <code className="text-foreground">
          acme.dev/p/{slugify(name) || "…"}
        </code>
      </p>
    </div>
  );
}
