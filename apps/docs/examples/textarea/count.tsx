"use client";

import { TextareaField } from "@/components/ui/textarea";

export default function TextareaCount() {
  return (
    <TextareaField
      className="w-full max-w-sm"
      label="Bio"
      placeholder="A few words about you"
      defaultValue="Designer in Lisbon."
      maxLength={160}
      showCount
      resize="auto"
      description="Grows with its content."
    />
  );
}
