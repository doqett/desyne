"use client";

import { parseDateTime } from "@internationalized/date";
import { I18nProvider } from "react-aria-components";
import { DateField } from "@/components/ui/date-field";

const value = parseDateTime("2027-03-05T16:45");
const locales = [
  { locale: "en-US", name: "English (US)" },
  { locale: "en-GB", name: "English (UK)" },
  { locale: "de-DE", name: "German" },
  { locale: "ja-JP", name: "Japanese" },
  { locale: "ar-EG", name: "Arabic (Egypt)" },
  { locale: "fa-IR-u-ca-persian", name: "Persian calendar" },
];

export default function DateFieldLocales() {
  return (
    <div className="grid w-full max-w-lg gap-5 sm:grid-cols-2">
      {locales.map(({ locale, name }) => (
        <I18nProvider key={locale} locale={locale}>
          <DateField label={name} defaultValue={value} granularity="minute" />
        </I18nProvider>
      ))}
    </div>
  );
}
