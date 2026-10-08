"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import type { Key } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

interface Query {
  id: string;
  name: string;
  sql: string;
}

export default function TabsDynamic() {
  const [queries, setQueries] = useState<Query[]>([
    {
      id: "q1",
      name: "Active users",
      sql: "select count(*) from users where active;",
    },
    {
      id: "q2",
      name: "Top plans",
      sql: "select plan, count(*) from subscriptions group by plan;",
    },
  ]);
  const [selected, setSelected] = useState<Key>("q1");

  function addQuery() {
    const id = `q${queries.length + 1}`;
    setQueries([
      ...queries,
      { id, name: `Untitled ${queries.length + 1}`, sql: "select 1;" },
    ]);
    setSelected(id);
  }

  return (
    <Tabs
      variant="enclosed"
      size="sm"
      selectedKey={selected}
      onSelectionChange={setSelected}
      className="w-full max-w-md gap-0"
    >
      <div className="flex items-end gap-1 border-b">
        <TabList aria-label="Queries" items={queries} className="border-b-0">
          {(q) => <Tab id={q.id}>{q.name}</Tab>}
        </TabList>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="New query"
          className="mb-1"
          onPress={addQuery}
        >
          <PlusIcon />
        </Button>
      </div>
      {queries.map((q) => (
        <TabPanel
          key={q.id}
          id={q.id}
          className="rounded-t-none border border-t-0 p-4 font-mono text-xs"
        >
          {q.sql}
        </TabPanel>
      ))}
    </Tabs>
  );
}
