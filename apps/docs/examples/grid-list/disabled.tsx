"use client";

import { Badge } from "@/components/ui/badge";
import {
  GridList,
  GridListItem,
  GridListItemDescription,
  GridListItemLabel,
} from "@/components/ui/grid-list";

const seats = [
  { id: "ana", name: "Ana Souza", email: "ana@northwind.io", owner: true },
  {
    id: "kenji",
    name: "Kenji Watanabe",
    email: "kenji@northwind.io",
    owner: false,
  },
  { id: "sam", name: "Sam Okafor", email: "sam@northwind.io", owner: false },
  {
    id: "ines",
    name: "Inès Laurent",
    email: "ines@northwind.io",
    owner: false,
  },
];

export default function GridListDisabled() {
  return (
    <GridList
      aria-label="Seats to remove"
      items={seats}
      selectionMode="multiple"
      disabledKeys={["ana"]}
      disabledBehavior="selection"
      className="w-full max-w-80"
    >
      {(s) => (
        <GridListItem textValue={s.name}>
          <span className="flex min-w-0 flex-1 flex-col">
            <GridListItemLabel>{s.name}</GridListItemLabel>
            <GridListItemDescription>{s.email}</GridListItemDescription>
          </span>
          {s.owner && <Badge size="sm">Owner</Badge>}
        </GridListItem>
      )}
    </GridList>
  );
}
