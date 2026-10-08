"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/ui/search-field";

export default function SearchFieldForm() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  return (
    <Form
      role="search"
      className="flex w-full max-w-sm flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const q = String(new FormData(e.currentTarget).get("q"));
        setSubmitted(`/search?q=${encodeURIComponent(q)}`);
      }}
    >
      <div className="flex items-start gap-2">
        <SearchField
          aria-label="Search the help center"
          name="q"
          isRequired
          minLength={2}
          placeholder="How do I export data?"
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </div>
      {submitted && (
        <code className="self-start rounded-md bg-muted px-2 py-1 text-xs">
          {submitted}
        </code>
      )}
    </Form>
  );
}
