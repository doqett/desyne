"use client";

import { useListData } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Tag, TagGroup } from "@/components/ui/tag-group";

const initialFilters = [
  { id: "status:open", field: "Status", value: "Open" },
  { id: "assignee:me", field: "Assignee", value: "Me" },
  { id: "label:bug", field: "Label", value: "bug" },
  { id: "updated:7d", field: "Updated", value: "Last 7 days" },
];

export default function TagGroupRecipeActiveFilters() {
  const filters = useListData({ initialItems: initialFilters });
  return (
    <div className="flex w-full max-w-lg flex-wrap items-center gap-2 rounded-lg border bg-card p-2.5 shadow-xs">
      <span className="px-1 text-muted-foreground text-xs">Filters</span>
      <TagGroup
        aria-label="Active filters"
        items={filters.items}
        variant="soft"
        onRemove={(keys) => filters.remove(...keys)}
        renderEmptyState={() => (
          <span className="text-muted-foreground text-xs">None applied</span>
        )}
        className="flex-1"
      >
        {(f) => (
          <Tag textValue={`${f.field}: ${f.value}`}>
            <span className="text-muted-foreground">{f.field}:</span>
            {f.value}
          </Tag>
        )}
      </TagGroup>
      {filters.items.length > 0 ? (
        <Button
          size="xs"
          variant="ghost"
          onPress={() => filters.remove(...filters.items.map((f) => f.id))}
        >
          Clear all
        </Button>
      ) : (
        <Button
          size="xs"
          variant="ghost"
          onPress={() => filters.append(...initialFilters)}
        >
          Restore
        </Button>
      )}
    </div>
  );
}
