"use client";

import { useState } from "react";
import { useListData } from "react-aria-components";
import { Tag, TagGroup } from "@/components/ui/tag-group";
import { TextField } from "@/components/ui/text-field";

const MAX_TAGS = 6;

export default function TagGroupRecipeTagInput() {
  const tags = useListData({
    initialItems: [{ id: "billing" }, { id: "enterprise" }],
  });
  const [draft, setDraft] = useState("");
  const value = draft.trim().toLowerCase();
  const duplicate = value !== "" && tags.getItem(value) !== undefined;
  const full = tags.items.length >= MAX_TAGS;

  const add = () => {
    if (!value || duplicate || full) return;
    tags.append({ id: value });
    setDraft("");
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <TextField
        label="Add a label"
        placeholder="e.g. onboarding"
        description={
          full ? `You can add up to ${MAX_TAGS} labels.` : "Press Enter to add."
        }
        value={draft}
        onChange={setDraft}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          }
        }}
        isInvalid={duplicate}
        errorMessage="That label is already added."
        isDisabled={full}
      />
      <TagGroup
        aria-label="Labels"
        items={tags.items}
        onRemove={(keys) => tags.remove(...keys)}
        description={`${tags.items.length} of ${MAX_TAGS} labels`}
        renderEmptyState={() => (
          <span className="text-muted-foreground text-sm">No labels yet.</span>
        )}
      >
        {(t) => <Tag>{t.id}</Tag>}
      </TagGroup>
    </div>
  );
}
