"use client";

import { useState } from "react";
import { I18nProvider } from "react-aria-components";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectItem } from "@/components/ui/select";

const locales = [
  { id: "en-US", name: "English (US)" },
  { id: "de-DE", name: "German" },
  { id: "fr-FR", name: "French" },
  { id: "ar-EG", name: "Arabic (Egypt), RTL" },
  { id: "ja-JP-u-ca-japanese", name: "Japanese imperial calendar" },
  { id: "th-TH-u-ca-buddhist", name: "Thai Buddhist calendar" },
  { id: "hi-IN-u-ca-indian", name: "Indian national calendar" },
];

export default function CalendarLocales() {
  const [locale, setLocale] = useState("de-DE");
  return (
    <div className="flex flex-col items-center gap-4">
      <Select
        label="Locale"
        items={locales}
        selectedKey={locale}
        onSelectionChange={(key) => key && setLocale(String(key))}
        className="w-64"
      >
        {(item) => <SelectItem>{item.name}</SelectItem>}
      </Select>
      <I18nProvider locale={locale}>
        <Calendar
          aria-label="Date"
          className="rounded-lg border bg-card shadow-xs"
        />
      </I18nProvider>
    </div>
  );
}
