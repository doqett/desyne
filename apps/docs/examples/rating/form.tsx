"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { TextareaField } from "@/components/ui/textarea";

export default function RatingForm() {
  const [sent, setSent] = useState<string | null>(null);
  return (
    <Form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setSent(`Thanks! You gave ${data.get("rating")} stars.`);
      }}
    >
      <Rating
        name="rating"
        label="Overall experience"
        isRequired
        errorMessage="Choose a rating before submitting."
      />
      <TextareaField name="comment" label="What could we improve?" />
      <Button type="submit" className="self-start">
        Submit review
      </Button>
      {sent && (
        <p role="status" className="text-muted-foreground text-sm">
          {sent}
        </p>
      )}
    </Form>
  );
}
