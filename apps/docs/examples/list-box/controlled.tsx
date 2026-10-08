"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";

const toppings = [
  { id: "mushroom", name: "Mushrooms" },
  { id: "olive", name: "Black olives" },
  { id: "pepper", name: "Roasted peppers" },
  { id: "onion", name: "Red onion" },
  { id: "basil", name: "Fresh basil" },
  { id: "chili", name: "Chili flakes" },
];

export default function ListBoxControlled() {
  const [selected, setSelected] = useState<Selection>(
    new Set(["olive", "basil"]),
  );
  const names =
    selected === "all"
      ? toppings.map((t) => t.name)
      : toppings.filter((t) => selected.has(t.id)).map((t) => t.name);
  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      <ListBox
        aria-label="Toppings"
        items={toppings}
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
      </ListBox>
      <p className="text-muted-foreground text-xs">
        {names.length ? names.join(", ") : "No toppings"}
      </p>
      <div className="flex gap-2">
        <Button size="xs" variant="outline" onPress={() => setSelected("all")}>
          Select all
        </Button>
        <Button
          size="xs"
          variant="outline"
          onPress={() => setSelected(new Set())}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
