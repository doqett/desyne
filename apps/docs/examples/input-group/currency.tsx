"use client";

import { NumberField } from "react-aria-components";
import { Description, Label } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function InputGroupCurrency() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <NumberField
        defaultValue={1250}
        minValue={0}
        formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
        className="group/field flex flex-col gap-1.5"
      >
        <Label>Amount</Label>
        <InputGroup>
          <InputGroupAddon>$</InputGroupAddon>
          <InputGroupInput className="tabular-nums" />
          <InputGroupAddon variant="segment">USD</InputGroupAddon>
        </InputGroup>
        <Description>Charged on the 1st of each month.</Description>
      </NumberField>
      <NumberField
        defaultValue={72.5}
        minValue={0}
        maxValue={500}
        className="group/field flex flex-col gap-1.5"
      >
        <Label>Weight</Label>
        <InputGroup>
          <InputGroupInput className="tabular-nums" />
          <InputGroupAddon>kg</InputGroupAddon>
        </InputGroup>
      </NumberField>
    </div>
  );
}
