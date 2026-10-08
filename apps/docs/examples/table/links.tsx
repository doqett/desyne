"use client";

import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const components = [
  { id: "button", name: "Button", category: "Actions", parts: 1 },
  { id: "select", name: "Select", category: "Forms", parts: 4 },
  { id: "dialog", name: "Dialog", category: "Overlays", parts: 9 },
  { id: "table", name: "Table", category: "Collections", parts: 6 },
];

export default function TableLinks() {
  return (
    <div className="w-full max-w-xl">
      <Table aria-label="Components">
        <TableHeader>
          <Column isRowHeader>Component</Column>
          <Column>Category</Column>
          <Column className="text-right">Parts</Column>
        </TableHeader>
        <TableBody items={components}>
          {(c) => (
            <Row href={`/docs/components/${c.id}`} className="cursor-pointer">
              <Cell className="font-medium text-brand">{c.name}</Cell>
              <Cell>{c.category}</Cell>
              <Cell className="text-right tabular-nums">{c.parts}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
