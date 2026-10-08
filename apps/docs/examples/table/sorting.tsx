"use client";

import { useMemo, useState } from "react";
import type { SortDescriptor } from "react-aria-components";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const countries = [
  {
    id: "de",
    name: "Germany",
    capital: "Berlin",
    population: 84.5,
    area: 357588,
  },
  {
    id: "jp",
    name: "Japan",
    capital: "Tokyo",
    population: 124.5,
    area: 377975,
  },
  {
    id: "br",
    name: "Brazil",
    capital: "Brasília",
    population: 216.4,
    area: 8515767,
  },
  {
    id: "np",
    name: "Nepal",
    capital: "Kathmandu",
    population: 30.9,
    area: 147516,
  },
  {
    id: "ca",
    name: "Canada",
    capital: "Ottawa",
    population: 40.1,
    area: 9984670,
  },
  {
    id: "ke",
    name: "Kenya",
    capital: "Nairobi",
    population: 55.1,
    area: 580367,
  },
];
type Country = (typeof countries)[number];

export default function TableSorting() {
  const [sort, setSort] = useState<SortDescriptor>({
    column: "population",
    direction: "descending",
  });
  const rows = useMemo(() => {
    const key = sort.column as keyof Country;
    return [...countries].sort((a, b) => {
      const x = a[key];
      const y = b[key];
      const cmp =
        typeof x === "number" && typeof y === "number"
          ? x - y
          : String(x).localeCompare(String(y));
      return sort.direction === "descending" ? -cmp : cmp;
    });
  }, [sort]);

  return (
    <div className="w-full max-w-xl">
      <Table
        aria-label="Countries"
        sortDescriptor={sort}
        onSortChange={setSort}
      >
        <TableHeader>
          <Column id="name" isRowHeader allowsSorting>
            Country
          </Column>
          <Column id="capital" allowsSorting>
            Capital
          </Column>
          <Column id="population" allowsSorting className="text-right">
            Population (M)
          </Column>
          <Column id="area" allowsSorting className="text-right">
            Area (km²)
          </Column>
        </TableHeader>
        <TableBody items={rows}>
          {(c) => (
            <Row>
              <Cell className="font-medium">{c.name}</Cell>
              <Cell>{c.capital}</Cell>
              <Cell className="text-right tabular-nums">
                {c.population.toFixed(1)}
              </Cell>
              <Cell className="text-right tabular-nums">
                {c.area.toLocaleString()}
              </Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
