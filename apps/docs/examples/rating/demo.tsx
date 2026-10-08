"use client";

import { Rating } from "@/components/ui/rating";

export default function RatingDemo() {
  return (
    <Rating
      label="How was your delivery?"
      description="Your rating is shared with the courier."
      defaultValue={4}
    />
  );
}
