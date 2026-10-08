"use client";

import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const plans = [
  { id: "starter", name: "Starter", seats: "3", storage: "10 GB", price: "$0" },
  { id: "team", name: "Team", seats: "25", storage: "250 GB", price: "$12" },
  {
    id: "business",
    name: "Business",
    seats: "100",
    storage: "2 TB",
    price: "$24",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    seats: "Unlimited",
    storage: "Custom",
    price: "Talk to us",
  },
];

export default function TableGridless() {
  return (
    <Table aria-label="Plans" divided={false} framed={false} striped>
      <TableHeader>
        <Column isRowHeader>Plan</Column>
        <Column>Seats</Column>
        <Column>Storage</Column>
        <Column className="text-right">Per seat / month</Column>
      </TableHeader>
      <TableBody items={plans}>
        {(p) => (
          <Row>
            <Cell className="font-medium">{p.name}</Cell>
            <Cell className="tabular-nums">{p.seats}</Cell>
            <Cell className="tabular-nums">{p.storage}</Cell>
            <Cell className="text-right tabular-nums">{p.price}</Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
}
