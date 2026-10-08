"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import { Select, SelectItem } from "@/components/ui/select";

const regions: Record<string, { id: string; name: string }[]> = {
  us: [
    { id: "us-east-1", name: "Virginia (us-east-1)" },
    { id: "us-west-2", name: "Oregon (us-west-2)" },
  ],
  eu: [
    { id: "eu-central-1", name: "Frankfurt (eu-central-1)" },
    { id: "eu-west-1", name: "Ireland (eu-west-1)" },
  ],
  ap: [
    { id: "ap-south-1", name: "Mumbai (ap-south-1)" },
    { id: "ap-northeast-1", name: "Tokyo (ap-northeast-1)" },
  ],
};

export default function SelectRecipeDependent() {
  const [geo, setGeo] = useState<Key | null>("eu");
  const [region, setRegion] = useState<Key | null>("eu-central-1");
  return (
    <div className="grid w-full max-w-md gap-4 sm:grid-cols-2">
      <Select
        label="Geography"
        selectedKey={geo}
        onSelectionChange={(key) => {
          setGeo(key);
          setRegion(null);
        }}
      >
        <SelectItem id="us">United States</SelectItem>
        <SelectItem id="eu">Europe</SelectItem>
        <SelectItem id="ap">Asia Pacific</SelectItem>
      </Select>
      <Select
        label="Region"
        placeholder="Select a region"
        items={geo ? regions[String(geo)] : []}
        selectedKey={region}
        onSelectionChange={setRegion}
        isDisabled={!geo}
      >
        {(r) => <SelectItem>{r.name}</SelectItem>}
      </Select>
    </div>
  );
}
