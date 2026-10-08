"use client";

import { useState } from "react";
import { Rating } from "@/components/ui/rating";

export default function RatingValueLabels() {
  const [value, setValue] = useState(0);
  return (
    <div className="flex flex-col gap-2">
      <Rating
        label="Rate this article"
        value={value}
        onChange={setValue}
        valueLabels={[
          "Not helpful",
          "Slightly helpful",
          "Helpful",
          "Very helpful",
          "Exactly what I needed",
        ]}
      />
      <p className="text-muted-foreground text-xs">
        {value ? `You rated ${value} of 5.` : "No rating yet."}
      </p>
    </div>
  );
}
