"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";
import { Tag, TagGroup } from "@/components/ui/tag-group";

const skills = [
  "Accessibility",
  "Animation",
  "Design systems",
  "Figma",
  "GraphQL",
  "Next.js",
  "Node.js",
  "Performance",
  "React",
  "Testing",
  "TypeScript",
].map((name) => ({ id: name, name }));

export default function ComboBoxRecipeTagPicker() {
  const [selected, setSelected] = useState<string[]>(["React", "TypeScript"]);
  const [input, setInput] = useState("");
  const available = skills.filter((s) => !selected.includes(s.id));

  const add = (key: Key | null) => {
    if (key == null) return;
    setSelected((s) => [...s, String(key)]);
    setInput("");
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <ComboBox
        label="Skills"
        placeholder="Add a skill…"
        items={available.filter((s) =>
          s.name.toLowerCase().includes(input.toLowerCase()),
        )}
        value={null}
        onChange={add}
        inputValue={input}
        onInputChange={setInput}
        emptyMessage="No more matching skills."
      >
        {(s) => <ComboBoxItem>{s.name}</ComboBoxItem>}
      </ComboBox>
      <TagGroup
        aria-label="Selected skills"
        items={selected.map((id) => ({ id }))}
        onRemove={(keys) => setSelected((s) => s.filter((id) => !keys.has(id)))}
        renderEmptyState={() => (
          <span className="text-muted-foreground text-sm">No skills yet.</span>
        )}
      >
        {(item) => <Tag>{item.id}</Tag>}
      </TagGroup>
    </div>
  );
}
