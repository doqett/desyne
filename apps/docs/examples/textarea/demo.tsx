"use client";

import { TextareaField } from "@/components/ui/textarea";

export default function TextareaDemo() {
  return (
    <TextareaField
      className="w-full max-w-sm"
      label="Feedback"
      placeholder="What could we do better?"
      description="Your feedback goes to the product team."
    />
  );
}
