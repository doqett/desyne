"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormActions, FormRow } from "@/components/ui/form";
import { Select, SelectItem } from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";

/*
 * A tiny schema validator with the same shape as Zod's `safeParse`:
 * it returns either the typed data or a map of field errors, which goes
 * straight into <Form validationErrors>.
 */
type Rule = (value: string, all: Record<string, string>) => string | null;
type Schema = Record<string, Rule[]>;

const required =
  (message: string): Rule =>
  (v) =>
    v.trim() ? null : message;
const minLength =
  (n: number, message: string): Rule =>
  (v) =>
    v.length >= n ? null : message;
const matches =
  (re: RegExp, message: string): Rule =>
  (v) =>
    re.test(v) ? null : message;

function safeParse(schema: Schema, data: FormData) {
  const values = Object.fromEntries(
    Object.keys(schema).map((k) => [k, String(data.get(k) ?? "")]),
  );
  const errors: Record<string, string> = {};
  for (const [field, rules] of Object.entries(schema)) {
    for (const rule of rules) {
      const message = rule(values[field], values);
      if (message) {
        errors[field] = message;
        break;
      }
    }
  }
  return Object.keys(errors).length
    ? ({ success: false, errors } as const)
    : ({ success: true, data: values } as const);
}

const shippingSchema: Schema = {
  name: [required("Enter the recipient's name.")],
  address: [
    required("Enter a street address."),
    minLength(5, "That address looks too short."),
  ],
  postcode: [
    required("Enter a postcode."),
    matches(/^\d{5}(-\d{4})?$/, "Use a 5-digit ZIP code, like 94107."),
  ],
  country: [required("Choose a country.")],
};

export default function FormSchema() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, string> | null>(null);
  return (
    <Form
      className="max-w-md"
      validationErrors={errors}
      onSubmit={(e) => {
        e.preventDefault();
        const result = safeParse(shippingSchema, new FormData(e.currentTarget));
        if (result.success) {
          setErrors({});
          setSaved(result.data);
        } else {
          setErrors(result.errors);
          setSaved(null);
        }
      }}
    >
      <TextField label="Full name" name="name" autoComplete="name" />
      <TextField
        label="Street address"
        name="address"
        autoComplete="street-address"
      />
      <FormRow>
        <TextField
          label="ZIP code"
          name="postcode"
          autoComplete="postal-code"
          inputMode="numeric"
        />
        <Select label="Country" name="country" placeholder="Select…">
          <SelectItem id="US">United States</SelectItem>
          <SelectItem id="CA">Canada</SelectItem>
          <SelectItem id="MX">Mexico</SelectItem>
        </Select>
      </FormRow>
      <FormActions align="between">
        <span className="text-muted-foreground text-sm" aria-live="polite">
          {saved ? `Ships to ${saved.name}, ${saved.postcode}.` : null}
        </span>
        <Button type="submit">Save address</Button>
      </FormActions>
    </Form>
  );
}
