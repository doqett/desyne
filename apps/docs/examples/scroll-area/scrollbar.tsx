"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

const tags = [
  "All",
  "Design",
  "Engineering",
  "Marketing",
  "Sales",
  "Support",
  "Finance",
  "Legal",
  "People",
  "Operations",
  "Security",
  "Data",
];

function Row({ scrollbar }: { scrollbar: "thin" | "hover" | "hidden" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-muted-foreground text-xs">
        scrollbar="{scrollbar}"
      </span>
      <ScrollArea
        orientation="horizontal"
        scrollbar={scrollbar}
        aria-label={`Teams (${scrollbar} scrollbar)`}
        className="w-full"
      >
        <div className="flex w-max gap-2 pb-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border bg-card px-3 py-1 text-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default function ScrollAreaScrollbar() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Row scrollbar="thin" />
      <Row scrollbar="hover" />
      <Row scrollbar="hidden" />
    </div>
  );
}
