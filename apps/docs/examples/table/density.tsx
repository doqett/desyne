"use client";

import { useState } from "react";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const rows = [
  { id: 1, host: "api-prod-01", region: "us-east-1", cpu: "42%" },
  { id: 2, host: "api-prod-02", region: "us-east-1", cpu: "38%" },
  { id: 3, host: "worker-01", region: "eu-central-1", cpu: "71%" },
  { id: 4, host: "worker-02", region: "eu-central-1", cpu: "66%" },
];

export default function TableDensity() {
  const [density, setDensity] = useState<"compact" | "default" | "comfortable">(
    "compact",
  );
  return (
    <div className="flex w-full flex-col gap-3">
      <ToggleButtonGroup
        variant="segmented"
        size="sm"
        aria-label="Density"
        selectedKeys={[density]}
        onSelectionChange={(keys) => setDensity([...keys][0] as typeof density)}
        disallowEmptySelection
      >
        <ToggleButton id="compact">Compact</ToggleButton>
        <ToggleButton id="default">Default</ToggleButton>
        <ToggleButton id="comfortable">Comfortable</ToggleButton>
      </ToggleButtonGroup>
      <Table
        aria-label="Hosts"
        density={density}
        striped
        bordered
        className="min-w-[420px]"
      >
        <TableHeader>
          <Column isRowHeader>Host</Column>
          <Column>Region</Column>
          <Column className="text-right">CPU</Column>
        </TableHeader>
        <TableBody items={rows}>
          {(r) => (
            <Row>
              <Cell className="font-mono text-xs">{r.host}</Cell>
              <Cell>{r.region}</Cell>
              <Cell className="text-right tabular-nums">{r.cpu}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
