"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const roles = ["Viewer", "Editor", "Admin"] as const;
const permissions = [
  { id: "view", name: "View projects", defaults: [true, true, true] },
  { id: "comment", name: "Comment", defaults: [true, true, true] },
  { id: "edit", name: "Edit content", defaults: [false, true, true] },
  { id: "publish", name: "Publish", defaults: [false, false, true] },
  { id: "billing", name: "Manage billing", defaults: [false, false, true] },
];

export default function TableRecipePermissions() {
  const [grants, setGrants] = useState(
    () => new Map(permissions.map((p) => [p.id, p.defaults])),
  );
  const toggle = (id: string, roleIndex: number, value: boolean) =>
    setGrants((prev) => {
      const next = new Map(prev);
      const row = [...(next.get(id) ?? [])];
      row[roleIndex] = value;
      next.set(id, row);
      return next;
    });

  return (
    <div className="w-full max-w-lg">
      <Table aria-label="Role permissions" bordered density="compact">
        <TableHeader>
          <Column isRowHeader>Permission</Column>
          {roles.map((role) => (
            <Column key={role} className="w-20 text-center">
              {role}
            </Column>
          ))}
        </TableHeader>
        <TableBody items={permissions} dependencies={[grants]}>
          {(p) => (
            <Row>
              <Cell>{p.name}</Cell>
              {roles.map((role, i) => (
                <Cell key={role} className="text-center">
                  <Checkbox
                    aria-label={`${p.name} for ${role}`}
                    isSelected={grants.get(p.id)?.[i] ?? false}
                    onChange={(v) => toggle(p.id, i, v)}
                    isDisabled={role === "Admin" && p.id === "view"}
                    className="inline-flex"
                  />
                </Cell>
              ))}
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
