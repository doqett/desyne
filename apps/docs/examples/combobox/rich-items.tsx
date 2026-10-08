"use client";

import { SearchIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
  ComboBox,
  ComboBoxItem,
  ComboBoxItemDescription,
  ComboBoxItemLabel,
} from "@/components/ui/combobox";

const people = [
  { id: 1, name: "Olivia Martin", email: "olivia@acme.dev" },
  { id: 2, name: "Jackson Lee", email: "jackson@acme.dev" },
  { id: 3, name: "Isabella Nguyen", email: "bella@acme.dev" },
  { id: 4, name: "William Kim", email: "will@acme.dev" },
  { id: 5, name: "Sofia Davis", email: "sofia@acme.dev" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export default function ComboBoxRichItems() {
  return (
    <ComboBox
      className="w-full max-w-72"
      label="Assignee"
      placeholder="Search people…"
      prefix={<SearchIcon />}
      defaultItems={people}
    >
      {(person) => (
        <ComboBoxItem textValue={person.name}>
          <Avatar
            size="sm"
            colorful
            alt={person.name}
            fallback={initials(person.name)}
          />
          <span className="flex min-w-0 flex-col gap-0.5">
            <ComboBoxItemLabel>{person.name}</ComboBoxItemLabel>
            <ComboBoxItemDescription>{person.email}</ComboBoxItemDescription>
          </span>
        </ComboBoxItem>
      )}
    </ComboBox>
  );
}
