"use client";

import { TextField as TextFieldPrimitive } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  Description,
  FieldAddon,
  FieldError,
  FieldGroup,
  FieldInput,
  Label,
} from "@/components/ui/field";

export default function TextFieldComposition() {
  return (
    <TextFieldPrimitive
      className="group/field flex w-full max-w-sm flex-col gap-1.5"
      defaultValue="docs.acme.dev"
      isRequired
    >
      <div className="flex items-center justify-between">
        <Label>Custom domain</Label>
        <span className="text-muted-foreground text-xs">Pro plan</span>
      </div>
      <FieldGroup className="pr-1">
        <FieldAddon>https://</FieldAddon>
        <FieldInput placeholder="docs.example.com" />
        <Button size="xs" variant="soft">
          Verify
        </Button>
      </FieldGroup>
      <Description>Point a CNAME record at cname.acme.dev first.</Description>
      <FieldError />
    </TextFieldPrimitive>
  );
}
