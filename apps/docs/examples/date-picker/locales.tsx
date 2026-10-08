"use client";

import { I18nProvider } from "react-aria-components";
import { DatePicker } from "@/components/ui/date-picker";

export default function DatePickerLocales() {
  return (
    <div className="flex w-full max-w-60 flex-col gap-5">
      <I18nProvider locale="en-GB">
        <DatePicker label="English (UK)" />
      </I18nProvider>
      <I18nProvider locale="de-DE">
        <DatePicker label="German" />
      </I18nProvider>
      <DatePicker label="Week starts on Monday" firstDayOfWeek="mon" />
    </div>
  );
}
