"use client";

import { Select, SelectItem } from "@/components/ui/select";

const codes = [
  "AR",
  "AU",
  "AT",
  "BE",
  "BR",
  "CA",
  "CL",
  "CN",
  "CO",
  "DK",
  "EG",
  "FI",
  "FR",
  "DE",
  "GR",
  "IN",
  "ID",
  "IE",
  "IL",
  "IT",
  "JP",
  "KE",
  "MX",
  "NP",
  "NL",
  "NZ",
  "NG",
  "NO",
  "PK",
  "PE",
  "PH",
  "PL",
  "PT",
  "SA",
  "SG",
  "ZA",
  "KR",
  "ES",
  "SE",
  "CH",
  "TH",
  "TR",
  "AE",
  "GB",
  "US",
  "VN",
];
const names = new Intl.DisplayNames(["en"], { type: "region" });
const countries = codes
  .map((id) => ({ id, name: names.of(id) ?? id }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function SelectLongList() {
  return (
    <Select
      className="w-full max-w-64"
      label="Country"
      placeholder="Select a country"
      description="Focus the trigger and start typing to jump."
      items={countries}
    >
      {(c) => <SelectItem>{c.name}</SelectItem>}
    </Select>
  );
}
