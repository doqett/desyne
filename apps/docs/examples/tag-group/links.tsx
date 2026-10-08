"use client";

import { Tag, TagGroup } from "@/components/ui/tag-group";

const topics = [
  { id: "forms", name: "Forms", href: "/docs/components/text-field" },
  { id: "dates", name: "Dates", href: "/docs/components/date-picker" },
  { id: "collections", name: "Collections", href: "/docs/components/table" },
  { id: "overlays", name: "Overlays", href: "/docs/components/dialog" },
];

export default function TagGroupLinks() {
  return (
    <TagGroup label="Related topics" items={topics} variant="soft">
      {(t) => (
        <Tag href={t.href} className="cursor-pointer data-hovered:underline">
          {t.name}
        </Tag>
      )}
    </TagGroup>
  );
}
