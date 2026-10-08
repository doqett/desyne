"use client";

import { FlameIcon, HeartIcon } from "lucide-react";
import { Rating } from "@/components/ui/rating";

export default function RatingCustomIcon() {
  return (
    <div className="flex flex-col gap-5">
      <Rating
        label="How much did you love it?"
        icon={<HeartIcon />}
        color="danger"
        defaultValue={4}
      />
      <Rating
        label="Spice level"
        icon={<FlameIcon />}
        color="warning"
        maxValue={3}
        defaultValue={2}
        valueLabels={["Mild", "Medium", "Hot"]}
      />
    </div>
  );
}
