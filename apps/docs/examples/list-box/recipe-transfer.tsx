"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { type ReactNode, useState } from "react";
import { type Selection, useListData } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";

type Column = { id: string; name: string };

const all: Column[] = [
  { id: "name", name: "Name" },
  { id: "email", name: "Email" },
  { id: "company", name: "Company" },
  { id: "plan", name: "Plan" },
  { id: "mrr", name: "MRR" },
  { id: "country", name: "Country" },
  { id: "signup", name: "Signed up" },
  { id: "lastSeen", name: "Last seen" },
];

function keysOf(selection: Selection, items: Column[]) {
  return selection === "all" ? items.map((i) => i.id) : [...selection];
}

export default function ListBoxRecipeTransfer() {
  const hidden = useListData({ initialItems: all.slice(4) });
  const shown = useListData({ initialItems: all.slice(0, 4) });
  const [hiddenSel, setHiddenSel] = useState<Selection>(new Set());
  const [shownSel, setShownSel] = useState<Selection>(new Set());

  const move = (
    from: typeof hidden,
    to: typeof shown,
    selection: Selection,
    clear: (s: Selection) => void,
  ) => {
    const keys = keysOf(selection, from.items);
    const items = keys
      .map((k) => from.getItem(k))
      .filter((i): i is Column => Boolean(i));
    from.remove(...keys);
    to.append(...items);
    clear(new Set());
  };

  const panel = (title: string, children: ReactNode) => (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <span className="font-medium text-muted-foreground text-xs">{title}</span>
      {children}
    </div>
  );

  return (
    <div className="flex w-full max-w-md items-center gap-2">
      {panel(
        "Available columns",
        <ListBox
          aria-label="Available columns"
          items={hidden.items}
          selectionMode="multiple"
          selectionBehavior="replace"
          selectedKeys={hiddenSel}
          onSelectionChange={setHiddenSel}
          onAction={(key) => move(hidden, shown, new Set([key]), setHiddenSel)}
          renderEmptyState={() => "All columns shown"}
          className="h-56"
        >
          {(c) => <ListBoxItem>{c.name}</ListBoxItem>}
        </ListBox>,
      )}
      <div className="flex flex-col gap-1 pt-5">
        <Button
          size="icon-sm"
          variant="outline"
          aria-label="Show selected columns"
          isDisabled={hiddenSel !== "all" && hiddenSel.size === 0}
          onPress={() => move(hidden, shown, hiddenSel, setHiddenSel)}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          size="icon-sm"
          variant="outline"
          aria-label="Hide selected columns"
          isDisabled={shownSel !== "all" && shownSel.size === 0}
          onPress={() => move(shown, hidden, shownSel, setShownSel)}
        >
          <ChevronLeftIcon />
        </Button>
      </div>
      {panel(
        "Visible columns",
        <ListBox
          aria-label="Visible columns"
          items={shown.items}
          selectionMode="multiple"
          selectionBehavior="replace"
          selectedKeys={shownSel}
          onSelectionChange={setShownSel}
          onAction={(key) => move(shown, hidden, new Set([key]), setShownSel)}
          renderEmptyState={() => "No columns"}
          className="h-56"
        >
          {(c) => <ListBoxItem>{c.name}</ListBoxItem>}
        </ListBox>,
      )}
    </div>
  );
}
