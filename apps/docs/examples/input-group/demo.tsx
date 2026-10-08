"use client";

import { TextField } from "react-aria-components";
import { Description, Label } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function InputGroupDemo() {
  return (
    <TextField
      defaultValue="harborpine"
      className="group/field flex w-full max-w-sm flex-col gap-1.5"
    >
      <Label>Website</Label>
      <InputGroup>
        <InputGroupAddon variant="segment">https://</InputGroupAddon>
        <InputGroupInput />
        <InputGroupAddon variant="segment">.com</InputGroupAddon>
      </InputGroup>
      <Description>Shown on your public profile.</Description>
    </TextField>
  );
}
