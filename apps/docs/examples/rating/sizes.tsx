"use client";

import { Rating } from "@/components/ui/rating";

export default function RatingSizes() {
  return (
    <div className="flex flex-col gap-4">
      <Rating aria-label="Small rating" size="sm" defaultValue={3} />
      <Rating aria-label="Medium rating" size="md" defaultValue={3} />
      <Rating aria-label="Large rating" size="lg" defaultValue={3} />
    </div>
  );
}
