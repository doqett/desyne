"use client";

import { Avatar } from "@/components/ui/avatar";
import { Select, SelectItem } from "@/components/ui/select";

const people = [
  { id: "olivia", name: "Olivia Martin", email: "olivia@acme.dev" },
  { id: "jackson", name: "Jackson Lee", email: "jackson@acme.dev" },
  { id: "isabella", name: "Isabella Nguyen", email: "bella@acme.dev" },
  { id: "william", name: "William Kim", email: "will@acme.dev" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export default function SelectAvatars() {
  return (
    <Select
      className="w-full max-w-64"
      label="Assignee"
      placeholder="Unassigned"
      items={people}
      defaultSelectedKey="jackson"
    >
      {(p) => (
        <SelectItem textValue={p.name}>
          <Avatar size="xs" colorful alt={p.name} fallback={initials(p.name)} />
          {p.name}
        </SelectItem>
      )}
    </Select>
  );
}
