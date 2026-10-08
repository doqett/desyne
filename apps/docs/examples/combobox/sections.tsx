"use client";

import { GlobeIcon } from "lucide-react";
import {
  ComboBox,
  ComboBoxItem,
  ComboBoxSection,
} from "@/components/ui/combobox";

const zones = [
  {
    name: "Americas",
    items: [
      { id: "America/New_York", name: "New York (UTC−5)" },
      { id: "America/Chicago", name: "Chicago (UTC−6)" },
      { id: "America/Los_Angeles", name: "Los Angeles (UTC−8)" },
      { id: "America/Sao_Paulo", name: "São Paulo (UTC−3)" },
    ],
  },
  {
    name: "Europe",
    items: [
      { id: "Europe/London", name: "London (UTC+0)" },
      { id: "Europe/Berlin", name: "Berlin (UTC+1)" },
      { id: "Europe/Istanbul", name: "Istanbul (UTC+3)" },
    ],
  },
  {
    name: "Asia",
    items: [
      { id: "Asia/Kolkata", name: "Kolkata (UTC+5:30)" },
      { id: "Asia/Kathmandu", name: "Kathmandu (UTC+5:45)" },
      { id: "Asia/Tokyo", name: "Tokyo (UTC+9)" },
    ],
  },
];

export default function ComboBoxSections() {
  return (
    <ComboBox
      className="w-full max-w-72"
      label="Timezone"
      placeholder="Search timezones…"
      prefix={<GlobeIcon />}
      defaultItems={zones}
    >
      {(section) => (
        <ComboBoxSection
          id={section.name}
          title={section.name}
          items={section.items}
        >
          {(zone) => <ComboBoxItem>{zone.name}</ComboBoxItem>}
        </ComboBoxSection>
      )}
    </ComboBox>
  );
}
