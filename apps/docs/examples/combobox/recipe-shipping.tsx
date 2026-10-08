"use client";

import { useState } from "react";
import { Form, type Key } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";
import { TextField } from "@/components/ui/text-field";

const countries = [
  {
    id: "US",
    name: "United States",
    regions: ["California", "New York", "Texas", "Washington"],
    regionLabel: "State",
  },
  {
    id: "CA",
    name: "Canada",
    regions: ["Alberta", "British Columbia", "Ontario", "Quebec"],
    regionLabel: "Province",
  },
  {
    id: "NP",
    name: "Nepal",
    regions: ["Bagmati", "Gandaki", "Koshi", "Lumbini"],
    regionLabel: "Province",
  },
];

export default function ComboBoxRecipeShipping() {
  const [country, setCountry] = useState<Key | null>("NP");
  const [region, setRegion] = useState<Key | null>(null);
  const current = countries.find((c) => c.id === country);

  return (
    <Form
      className="grid w-full max-w-lg gap-4 rounded-xl border bg-card p-5 sm:grid-cols-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <h3 className="font-semibold sm:col-span-2">Shipping address</h3>
      <TextField
        className="sm:col-span-2"
        label="Street address"
        name="street"
        autoComplete="street-address"
        isRequired
      />
      <ComboBox
        label="Country"
        name="country"
        isRequired
        defaultItems={countries}
        value={country}
        onChange={(key) => {
          setCountry(key);
          setRegion(null);
        }}
      >
        {(c) => <ComboBoxItem>{c.name}</ComboBoxItem>}
      </ComboBox>
      <ComboBox
        key={String(country)}
        label={current?.regionLabel ?? "Region"}
        name="region"
        isRequired
        isDisabled={!current}
        defaultItems={(current?.regions ?? []).map((name) => ({
          id: name,
          name,
        }))}
        value={region}
        onChange={setRegion}
      >
        {(r) => <ComboBoxItem>{r.name}</ComboBoxItem>}
      </ComboBox>
      <TextField
        label="City"
        name="city"
        autoComplete="address-level2"
        isRequired
      />
      <TextField
        label="Postal code"
        name="postalCode"
        autoComplete="postal-code"
      />
      <Button type="submit" className="justify-self-start sm:col-span-2">
        Save address
      </Button>
    </Form>
  );
}
