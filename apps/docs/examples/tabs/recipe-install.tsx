"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import type { Key } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

const commands = [
  { id: "pnpm", command: "pnpm dlx shadcn@latest add @desyne/tabs" },
  { id: "npm", command: "npx shadcn@latest add @desyne/tabs" },
  { id: "yarn", command: "yarn dlx shadcn@latest add @desyne/tabs" },
  { id: "bun", command: "bunx --bun shadcn@latest add @desyne/tabs" },
];

export default function TabsRecipeInstall() {
  const [manager, setManager] = useState<Key>("pnpm");
  const [copied, setCopied] = useState(false);
  const command = commands.find((c) => c.id === manager)?.command ?? "";

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-lg border bg-card">
      <Tabs
        variant="segmented"
        size="sm"
        selectedKey={manager}
        onSelectionChange={(key) => {
          setManager(key);
          setCopied(false);
        }}
        className="gap-0"
      >
        <div className="flex items-center justify-between gap-2 border-b px-2 py-1.5">
          <TabList aria-label="Package manager" items={commands}>
            {(c) => <Tab id={c.id}>{c.id}</Tab>}
          </TabList>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={copied ? "Copied" : "Copy command"}
            onPress={() => {
              navigator.clipboard?.writeText(command);
              setCopied(true);
            }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </Button>
        </div>
        {commands.map((c) => (
          <TabPanel key={c.id} id={c.id} className="rounded-none px-4 py-3">
            <code className="block overflow-x-auto whitespace-nowrap font-mono text-foreground text-xs">
              {c.command}
            </code>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
