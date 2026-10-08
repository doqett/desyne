"use client";

import { useState } from "react";
import { NumberField } from "@/components/ui/number-field";

const pricePerSeat = 12;
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function NumberFieldControlled() {
  const [seats, setSeats] = useState(5);
  return (
    <div className="flex w-full max-w-56 flex-col gap-3">
      <NumberField
        label="Seats"
        stepper="split"
        minValue={1}
        maxValue={100}
        value={seats}
        onChange={setSeats}
      />
      <p className="text-muted-foreground text-sm">
        {Number.isNaN(seats) ? (
          "Enter a number of seats."
        ) : (
          <>
            Total:{" "}
            <span className="font-medium text-foreground tabular-nums">
              {currency.format(seats * pricePerSeat)}
            </span>{" "}
            / month
          </>
        )}
      </p>
    </div>
  );
}
