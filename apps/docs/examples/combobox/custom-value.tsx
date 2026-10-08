"use client";

import { useState } from "react";
import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";

export default function ComboBoxCustomValue() {
  const [input, setInput] = useState("");
  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      <ComboBox
        label="Label"
        placeholder="Pick or type a label"
        allowsCustomValue
        inputValue={input}
        onInputChange={setInput}
        description="Type anything to use a new label."
      >
        <ComboBoxItem id="bug">bug</ComboBoxItem>
        <ComboBoxItem id="feature">feature</ComboBoxItem>
        <ComboBoxItem id="docs">docs</ComboBoxItem>
        <ComboBoxItem id="security">security</ComboBoxItem>
      </ComboBox>
      <p className="text-muted-foreground text-sm">
        Value: <code className="text-foreground">{input || "—"}</code>
      </p>
    </div>
  );
}
