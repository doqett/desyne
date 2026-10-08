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

const files = [
  {
    id: "1",
    name: "Q3 board deck — final review.pdf",
    owner: "Maya Chen",
    type: "PDF",
    size: 4.2,
    updated: "Oct 2, 2026",
  },
  {
    id: "2",
    name: "Brand guidelines 2027.fig",
    owner: "Tomás Rivera",
    type: "Figma",
    size: 18.6,
    updated: "Sep 30, 2026",
  },
  {
    id: "3",
    name: "Customer interviews — synthesis notes.docx",
    owner: "Hana Kobayashi",
    type: "Doc",
    size: 0.8,
    updated: "Sep 28, 2026",
  },
  {
    id: "4",
    name: "Pricing model v4.xlsx",
    owner: "Arjun Mehta",
    type: "Sheet",
    size: 1.3,
    updated: "Sep 27, 2026",
  },
  {
    id: "5",
    name: "Launch video — 30s cut.mp4",
    owner: "Lena Fischer",
    type: "Video",
    size: 212.4,
    updated: "Sep 21, 2026",
  },
];

export default function TableResizable() {
  const [sort, setSort] = useState<SortDescriptor>({
    column: "updated",
    direction: "descending",
  });
  const [widths, setWidths] = useState<string>("");
  const rows = useMemo(() => {
    const key = sort.column as keyof (typeof files)[number];
    const sorted = [...files].sort((a, b) =>
      key === "size"
        ? a.size - b.size
        : key === "updated"
          ? Date.parse(a.updated) - Date.parse(b.updated)
          : String(a[key]).localeCompare(String(b[key])),
    );
    return sort.direction === "descending" ? sorted.reverse() : sorted;
  }, [sort]);

  return (
    <div className="flex w-full flex-col gap-3">
      <Table
        aria-label="Shared files"
        allowsResizing
        sortDescriptor={sort}
        onSortChange={setSort}
        onResizeEnd={(map) =>
          setWidths(
            [...map.entries()]
              .map(([k, w]) =>
                typeof w === "number"
                  ? `${k}: ${Math.round(w)}px`
                  : `${k}: ${w}`,
              )
              .join(" · "),
          )
        }
      >
        <TableHeader>
          <Column
            id="name"
            isRowHeader
            allowsSorting
            defaultWidth="2fr"
            minWidth={160}
          >
            Name
          </Column>
          <Column id="owner" allowsSorting defaultWidth="1fr" minWidth={120}>
            Owner
          </Column>
          <Column id="type" defaultWidth={96} minWidth={72}>
            Type
          </Column>
          <Column id="size" allowsSorting defaultWidth={104} minWidth={80}>
            Size
          </Column>
          <Column
            id="updated"
            allowsSorting
            defaultWidth={140}
            minWidth={110}
            isResizable={false}
          >
            Updated
          </Column>
        </TableHeader>
        <TableBody items={rows}>
          {(f) => (
            <Row>
              <Cell className="font-medium">{f.name}</Cell>
              <Cell className="text-muted-foreground">{f.owner}</Cell>
              <Cell>{f.type}</Cell>
              <Cell className="tabular-nums">{f.size.toFixed(1)} MB</Cell>
              <Cell className="text-muted-foreground">{f.updated}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
      <p className="text-muted-foreground text-xs" aria-live="polite">
        {widths
          ? `Saved widths — ${widths}`
          : "Drag a column edge, or focus a header and press Enter to resize with the arrow keys."}
      </p>
    </div>
  );
}
