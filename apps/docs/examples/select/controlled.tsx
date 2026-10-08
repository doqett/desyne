"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";

export default function SelectControlled() {
  const [status, setStatus] = useState<Key | null>("in-progress");
  return (
    <div className="flex w-full max-w-56 flex-col gap-3">
      <Select label="Status" selectedKey={status} onSelectionChange={setStatus}>
        <SelectItem id="todo">To do</SelectItem>
        <SelectItem id="in-progress">In progress</SelectItem>
        <SelectItem id="done">Done</SelectItem>
      </Select>
      <p className="text-muted-foreground text-sm">
        Selected: <code className="text-foreground">{String(status)}</code>
      </p>
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onPress={() => setStatus(null)}
      >
        Clear
      </Button>
    </div>
  );
}
