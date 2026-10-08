"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";

const cities = [
  "Amsterdam",
  "Berlin",
  "Kathmandu",
  "Lisbon",
  "Singapore",
  "Tokyo",
].map((name) => ({ id: name, name }));

export default function ComboBoxValidation() {
  return (
    <Form
      className="flex w-full max-w-64 flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <ComboBox
        label="Office"
        name="office"
        placeholder="Choose an office"
        isRequired
        defaultItems={cities}
      >
        {(c) => <ComboBoxItem>{c.name}</ComboBoxItem>}
      </ComboBox>
      <Button type="submit" className="self-start">
        Continue
      </Button>
    </Form>
  );
}
