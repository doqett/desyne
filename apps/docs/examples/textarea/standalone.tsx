"use client";

import { Textarea } from "@/components/ui/textarea";

export default function TextareaStandalone() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Textarea aria-label="Message" placeholder="Type your message here." />
      <Textarea
        aria-label="Notes"
        variant="filled"
        resize="none"
        rows={2}
        placeholder="Filled, fixed height"
      />
    </div>
  );
}
