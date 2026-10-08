"use client";

import { useListData } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Tag, TagGroup } from "@/components/ui/tag-group";

const initialItems = [
  { id: 1, name: "react" },
  { id: 2, name: "typescript" },
  { id: 3, name: "tailwindcss" },
  { id: 4, name: "react-aria" },
  { id: 5, name: "vitest" },
];

export default function TagGroupRemovable() {
  const list = useListData({ initialItems });
  return (
    <div className="flex w-full max-w-md flex-col items-start gap-3">
      <TagGroup
        label="Skills"
        items={list.items}
        onRemove={(keys) => list.remove(...keys)}
        description="Backspace or Delete removes the focused tag."
        renderEmptyState={() => (
          <span className="text-muted-foreground text-sm">
            No skills added.
          </span>
        )}
      >
        {(item) => <Tag>{item.name}</Tag>}
      </TagGroup>
      {list.items.length < initialItems.length && (
        <Button
          size="xs"
          variant="ghost"
          onPress={() => {
            list.remove(...list.items.map((i) => i.id));
            list.append(...initialItems);
          }}
        >
          Reset
        </Button>
      )}
    </div>
  );
}
