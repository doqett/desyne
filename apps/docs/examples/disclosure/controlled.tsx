"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

const sections = [
  {
    id: "install",
    title: "1. Install the CLI",
    body: "npm install -g @acme/cli",
  },
  {
    id: "login",
    title: "2. Log in",
    body: "Run acme login and follow the browser prompt.",
  },
  {
    id: "deploy",
    title: "3. Deploy",
    body: "Run acme deploy from your project root.",
  },
];

export default function DisclosureControlled() {
  const [expanded, setExpanded] = useState<Set<Key>>(new Set(["install"]));
  const allOpen = expanded.size === sections.length;

  return (
    <div className="grid w-full max-w-md gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="justify-self-end"
        onPress={() =>
          setExpanded(allOpen ? new Set() : new Set(sections.map((s) => s.id)))
        }
      >
        {allOpen ? "Collapse all" : "Expand all"}
      </Button>
      <DisclosureGroup
        variant="card"
        allowsMultipleExpanded
        expandedKeys={expanded}
        onExpandedChange={setExpanded}
      >
        {sections.map((s) => (
          <Disclosure key={s.id} id={s.id}>
            <DisclosureTrigger>{s.title}</DisclosureTrigger>
            <DisclosurePanel>{s.body}</DisclosurePanel>
          </Disclosure>
        ))}
      </DisclosureGroup>
    </div>
  );
}
