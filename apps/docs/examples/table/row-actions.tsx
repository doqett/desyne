"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const deployments = [
  {
    id: "dpl_8f2a",
    branch: "main",
    commit: "Fix checkout tax rounding",
    env: "Production",
    age: "4m",
  },
  {
    id: "dpl_71c9",
    branch: "feat/sso",
    commit: "Add SAML metadata endpoint",
    env: "Preview",
    age: "38m",
  },
  {
    id: "dpl_5e10",
    branch: "main",
    commit: "Bump dependencies",
    env: "Production",
    age: "2h",
  },
  {
    id: "dpl_3b44",
    branch: "fix/date-picker",
    commit: "Keep focus in popover",
    env: "Preview",
    age: "5h",
  },
];

export default function TableRowActions() {
  const [opened, setOpened] = useState<Key | null>(null);
  const current = deployments.find((d) => d.id === opened);
  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <Table aria-label="Deployments" onRowAction={setOpened}>
        <TableHeader>
          <Column isRowHeader>Commit</Column>
          <Column>Branch</Column>
          <Column>Environment</Column>
          <Column className="text-right">Age</Column>
        </TableHeader>
        <TableBody items={deployments}>
          {(d) => (
            <Row className="cursor-pointer">
              <Cell className="font-medium">{d.commit}</Cell>
              <Cell className="font-mono text-xs">{d.branch}</Cell>
              <Cell>{d.env}</Cell>
              <Cell className="text-right text-muted-foreground">{d.age}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
      <p className="text-muted-foreground text-xs">
        {current
          ? `Opened ${current.id} (${current.commit})`
          : "Click a row or press Enter to open a deployment."}
      </p>
    </div>
  );
}
