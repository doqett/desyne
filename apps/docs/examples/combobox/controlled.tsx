"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";

const currencies = [
  { id: "USD", name: "US Dollar" },
  { id: "EUR", name: "Euro" },
  { id: "GBP", name: "British Pound" },
  { id: "JPY", name: "Japanese Yen" },
  { id: "NPR", name: "Nepalese Rupee" },
  { id: "INR", name: "Indian Rupee" },
];

export default function ComboBoxControlled() {
  const [value, setValue] = useState<Key | null>("EUR");
  const [input, setInput] = useState("Euro");
  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      <ComboBox
        label="Currency"
        defaultItems={currencies}
        value={value}
        onChange={(key) => {
          setValue(key);
          setInput(currencies.find((c) => c.id === key)?.name ?? "");
        }}
        inputValue={input}
        onInputChange={setInput}
      >
        {(c) => <ComboBoxItem>{c.name}</ComboBoxItem>}
      </ComboBox>
      <p className="text-muted-foreground text-sm">
        value: <code className="text-foreground">{String(value)}</code> · input:{" "}
        <code className="text-foreground">“{input}”</code>
      </p>
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onPress={() => {
          setValue(null);
          setInput("");
        }}
      >
        Clear
      </Button>
    </div>
  );
}
