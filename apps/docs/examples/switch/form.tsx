"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SwitchForm() {
  const [result, setResult] = useState<string | null>(null);
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setResult(
          JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
        );
      }}
    >
      <Switch name="public" defaultSelected>
        Public repository
      </Switch>
      <Switch name="issues" value="enabled" defaultSelected>
        Enable issues
      </Switch>
      <Switch name="wiki" value="enabled">
        Enable wiki
      </Switch>
      <Button type="submit" className="self-start">
        Save
      </Button>
      {result && (
        <code className="rounded-md bg-muted px-2 py-1 text-xs">{result}</code>
      )}
    </Form>
  );
}
