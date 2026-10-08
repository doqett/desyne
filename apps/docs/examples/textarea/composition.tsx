"use client";

import { TextField } from "react-aria-components";
import { Description, FieldError, Label } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaComposition() {
  return (
    <TextField
      className="group/field flex w-full max-w-sm flex-col gap-1.5"
      name="instructions"
      maxLength={500}
    >
      <div className="flex items-baseline justify-between">
        <Label>Delivery instructions</Label>
        <span className="text-muted-foreground text-xs">Optional</span>
      </div>
      <Description>Gate codes, where to leave the parcel, pets.</Description>
      <Textarea
        rows={3}
        resize="none"
        placeholder="Leave it with the front desk in building B."
      />
      <FieldError />
    </TextField>
  );
}
