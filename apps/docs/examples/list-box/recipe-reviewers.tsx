"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ListBox,
  ListBoxItem,
  ListBoxItemDescription,
  ListBoxItemLabel,
  ListBoxSection,
} from "@/components/ui/list-box";

const suggested = [
  { id: "maya", name: "Maya Patel", detail: "Owns 12 changed files" },
  { id: "leo", name: "Leo Fischer", detail: "Recently edited billing/" },
];
const team = [
  { id: "ana", name: "Ana Souza", detail: "Frontend" },
  { id: "kenji", name: "Kenji Watanabe", detail: "Platform" },
  { id: "sam", name: "Sam Okafor", detail: "Payments" },
  { id: "ines", name: "Inès Laurent", detail: "Design systems" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export default function ListBoxRecipeReviewers() {
  const [selected, setSelected] = useState<Selection>(new Set(["maya"]));
  const count =
    selected === "all" ? suggested.length + team.length : selected.size;

  const renderPerson = (p: (typeof team)[number]) => (
    <ListBoxItem key={p.id} id={p.id} textValue={p.name}>
      <Avatar size="sm" colorful alt={p.name} fallback={initials(p.name)} />
      <span className="flex min-w-0 flex-col">
        <ListBoxItemLabel>{p.name}</ListBoxItemLabel>
        <ListBoxItemDescription>{p.detail}</ListBoxItemDescription>
      </span>
    </ListBoxItem>
  );

  return (
    <div className="flex w-full max-w-72 flex-col overflow-hidden rounded-lg border bg-popover shadow-xs">
      <div className="border-b px-3 py-2 font-medium text-sm">
        Request review
      </div>
      <ListBox
        aria-label="Reviewers"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        className="max-h-72 rounded-none border-0"
      >
        <ListBoxSection title="Suggested">
          {suggested.map(renderPerson)}
        </ListBoxSection>
        <ListBoxSection title="Team">{team.map(renderPerson)}</ListBoxSection>
      </ListBox>
      <div className="flex items-center justify-between border-t px-3 py-2">
        <span className="text-muted-foreground text-xs">{count} selected</span>
        <Button size="xs" isDisabled={count === 0}>
          Request
        </Button>
      </div>
    </div>
  );
}
