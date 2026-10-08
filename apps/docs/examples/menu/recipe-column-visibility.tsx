"use client";

import { Columns3Icon } from "lucide-react";
import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu";

const columns = [
  { id: "email", label: "Email" },
  { id: "plan", label: "Plan" },
  { id: "mrr", label: "MRR" },
  { id: "joined", label: "Joined" },
];

const rows = [
  {
    name: "Acme Corp",
    email: "ops@acme.com",
    plan: "Enterprise",
    mrr: "$4,200",
    joined: "Jan 2024",
  },
  {
    name: "Globex",
    email: "it@globex.io",
    plan: "Business",
    mrr: "$890",
    joined: "Jun 2025",
  },
  {
    name: "Initech",
    email: "admin@initech.co",
    plan: "Starter",
    mrr: "$49",
    joined: "Aug 2026",
  },
];

export default function MenuRecipeColumnVisibility() {
  const [visible, setVisible] = useState<Selection>(
    new Set(["email", "plan", "mrr"]),
  );
  const shown = columns.filter((c) => visible === "all" || visible.has(c.id));
  return (
    <div className="w-full max-w-xl space-y-2">
      <div className="flex justify-end">
        <MenuTrigger>
          <Button variant="outline" size="sm">
            <Columns3Icon /> Columns
          </Button>
          <MenuContent
            aria-label="Visible columns"
            placement="bottom end"
            items={columns}
            selectionMode="multiple"
            selectedKeys={visible}
            onSelectionChange={setVisible}
          >
            {(c) => <MenuItem>{c.label}</MenuItem>}
          </MenuContent>
        </MenuTrigger>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b text-muted-foreground text-xs">
            <tr>
              <th className="px-3 py-2 font-medium">Customer</th>
              {shown.map((c) => (
                <th key={c.id} className="px-3 py-2 font-medium">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.name}>
                <td className="px-3 py-2 font-medium">{r.name}</td>
                {shown.map((c) => (
                  <td key={c.id} className="px-3 py-2 text-muted-foreground">
                    {r[c.id as keyof typeof r]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
