"use client";

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useContext, useMemo } from "react";
import {
  Button as AriaButton,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarMonthPicker,
  Calendar as CalendarPrimitive,
  type CalendarProps as CalendarPrimitiveProps,
  CalendarStateContext,
  type DateValue,
  Heading,
  type Key,
  RangeCalendar as RangeCalendarPrimitive,
  type RangeCalendarProps as RangeCalendarPrimitiveProps,
  RangeCalendarStateContext,
  Select,
  SelectValue,
  Text,
  useLocale,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ListBox, ListBoxItem } from "./list-box";
import { Popover } from "./popover";

const cellBase = [
  "relative flex size-8 cursor-default items-center justify-center rounded-md text-sm tabular-nums outline-none transition-colors",
  "data-hovered:bg-muted",
  "data-focus-visible:ring-2 data-focus-visible:ring-ring/25",
  "data-outside-month:text-muted-foreground/40",
  "data-today:font-semibold data-today:text-brand data-today:after:absolute data-today:after:bottom-1 data-today:after:size-1 data-today:after:rounded-full data-today:after:bg-brand",
  "data-disabled:pointer-events-none data-disabled:text-muted-foreground/40",
  "data-unavailable:text-muted-foreground/60 data-unavailable:line-through",
  "data-invalid:data-selected:bg-destructive",
].join(" ");

const singleCell = `${cellBase} data-selected:bg-brand data-selected:text-brand-foreground data-selected:data-hovered:bg-brand/90 data-selected:after:bg-brand-foreground data-selected:data-today:text-brand-foreground data-selected:data-today:after:bg-brand-foreground`;

const rangeCell = [
  cellBase,
  "data-selected:rounded-none data-selected:bg-accent data-selected:text-accent-foreground",
  "data-selection-start:rounded-l-md data-selection-start:bg-brand data-selection-start:text-brand-foreground",
  "data-selection-end:rounded-r-md data-selection-end:bg-brand data-selection-end:text-brand-foreground",
  "data-selected:after:bg-current",
  // "Today" styling must not override the selection colours (same specificity otherwise).
  "data-selected:data-today:text-accent-foreground data-selected:data-today:after:bg-current",
  "data-selection-start:data-today:text-brand-foreground data-selection-end:data-today:text-brand-foreground",
].join(" ");

/**
 * How the month and year are shown in the header.
 * - `label`: a heading ("March 2026") between the arrows.
 * - `dropdown`: a month select and a year select.
 * - `dropdown-months`: a month select, the year as text.
 * - `dropdown-years`: the month as text, a year select.
 */
export type CalendarCaptionLayout =
  | "label"
  | "dropdown"
  | "dropdown-months"
  | "dropdown-years";

export interface CalendarCaptionProps {
  captionLayout?: CalendarCaptionLayout;
  /** First year in the year dropdown. Defaults to `minValue`'s year, or 100 years ago. */
  fromYear?: number;
  /** Last year in the year dropdown. Defaults to `maxValue`'s year, or 10 years ahead. */
  toYear?: number;
}

const captionTrigger = [
  "flex h-6 cursor-default items-center gap-0.5 rounded-md border-0 bg-transparent px-1.5 font-medium text-[0.8125rem] outline-none transition-colors",
  "data-hovered:bg-muted data-pressed:bg-muted group-data-open/caption:bg-muted",
  "data-focus-visible:ring-2 data-focus-visible:ring-ring/25",
  "data-disabled:opacity-50",
].join(" ");

function useCalendarState() {
  const single = useContext(CalendarStateContext);
  const range = useContext(RangeCalendarStateContext);
  // biome-ignore lint/style/noNonNullAssertion: always rendered inside a calendar
  return (single ?? range)!;
}

function CaptionSelect({
  "aria-label": ariaLabel,
  value,
  onChange,
  items,
  disabledKeys,
  isDisabled,
}: {
  "aria-label": string;
  value: Key;
  onChange: (key: Key | null) => void;
  items: { id: number; formatted: string }[];
  disabledKeys?: Key[];
  isDisabled?: boolean;
}) {
  return (
    <Select
      aria-label={ariaLabel}
      value={value}
      onChange={onChange}
      disabledKeys={disabledKeys}
      isDisabled={isDisabled}
      className="group/caption"
    >
      <AriaButton className={captionTrigger}>
        <SelectValue suppressHydrationWarning />
        <ChevronDownIcon
          aria-hidden
          className="size-3 text-muted-foreground transition-transform duration-150 group-data-open/caption:rotate-180"
        />
      </AriaButton>
      <Popover className="max-h-72 min-w-(--trigger-width)">
        <ListBox items={items} className="max-h-72 border-0 bg-transparent">
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.formatted}>
              <span suppressHydrationWarning>{item.formatted}</span>
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
}

function MonthDropdown() {
  const state = useCalendarState();
  const { minValue, maxValue } = state;
  return (
    <CalendarMonthPicker format="short">
      {({ items, ...aria }) => {
        // Months entirely outside minValue / maxValue can't be picked.
        const disabledKeys = items
          .filter(({ date }) => {
            const start = date.set({ day: 1 });
            const end = start.add({ months: 1 }).subtract({ days: 1 });
            return (
              (minValue != null && end.compare(minValue) < 0) ||
              (maxValue != null && start.compare(maxValue) > 0)
            );
          })
          .map((m) => m.id);
        return (
          <CaptionSelect
            {...aria}
            items={items}
            disabledKeys={disabledKeys}
            isDisabled={state.isDisabled}
          />
        );
      }}
    </CalendarMonthPicker>
  );
}

function YearDropdown({
  fromYear,
  toYear,
}: Omit<CalendarCaptionProps, "captionLayout">) {
  const state = useCalendarState();
  const { focusedDate, minValue, maxValue, timeZone } = state;
  const formatter = useFormatter({
    year: "numeric",
    calendar: focusedDate.calendar.identifier,
    timeZone,
  });
  const ariaLabel = useFieldName("year");
  const thisYear = new Date().getFullYear();
  let first = fromYear ?? minValue?.year ?? thisYear - 100;
  let last = toYear ?? maxValue?.year ?? thisYear + 10;
  // Always include the year that's showing.
  first = Math.min(first, focusedDate.year);
  last = Math.max(last, focusedDate.year);
  const items = [];
  for (let year = first; year <= last; year++) {
    const date = focusedDate.set({ year });
    items.push({
      id: year,
      date,
      formatted: formatter.format(date.toDate(timeZone)),
    });
  }
  return (
    <CaptionSelect
      aria-label={ariaLabel}
      value={focusedDate.year}
      onChange={(key) => {
        if (key == null) return;
        // setFocusedDate clamps to minValue / maxValue.
        state.setFocusedDate(focusedDate.set({ year: Number(key) }));
      }}
      items={items}
      isDisabled={state.isDisabled}
    />
  );
}

function useFormatter(options: Intl.DateTimeFormatOptions) {
  const { locale } = useLocale();
  const { year, month, calendar, timeZone } = options;
  return useMemo(
    () => new Intl.DateTimeFormat(locale, { year, month, calendar, timeZone }),
    [locale, year, month, calendar, timeZone],
  );
}

/** Localized name of a date field ("Year", "Année", …) for the select's label. */
function useFieldName(field: "year") {
  const { locale } = useLocale();
  return useMemo(() => {
    try {
      return (
        new Intl.DisplayNames(locale, { type: "dateTimeField" }).of(field) ??
        "Year"
      );
    } catch {
      return "Year";
    }
  }, [locale, field]);
}

function CaptionText({ part }: { part: "month" | "year" }) {
  const { focusedDate, timeZone } = useCalendarState();
  const formatter = useFormatter(
    part === "month"
      ? {
          month: "short",
          calendar: focusedDate.calendar.identifier,
          timeZone,
        }
      : {
          year: "numeric",
          calendar: focusedDate.calendar.identifier,
          timeZone,
        },
  );
  return (
    <span
      aria-hidden
      className="px-1 font-semibold text-sm"
      suppressHydrationWarning
    >
      {formatter.format(focusedDate.toDate(timeZone))}
    </span>
  );
}

function CalendarHeader({
  captionLayout = "label",
  fromYear,
  toYear,
}: CalendarCaptionProps) {
  const dropdown = captionLayout !== "label";
  return (
    <header className="flex items-center justify-between gap-2 pb-3">
      <Button slot="previous" variant="ghost" size="icon-sm">
        <ChevronLeftIcon aria-hidden />
      </Button>
      {/* Month names can be formatted slightly differently by the server's and
          the browser's Intl data (e.g. range dashes), so don't fail hydration. */}
      <Heading
        className={cn("font-semibold text-sm", dropdown && "sr-only")}
        suppressHydrationWarning
      />
      {dropdown && (
        <div data-slot="calendar-caption" className="flex items-center gap-0.5">
          {captionLayout === "dropdown-years" ? (
            <CaptionText part="month" />
          ) : (
            <MonthDropdown />
          )}
          {captionLayout === "dropdown-months" ? (
            <CaptionText part="year" />
          ) : (
            <YearDropdown fromYear={fromYear} toYear={toYear} />
          )}
        </div>
      )}
      <Button slot="next" variant="ghost" size="icon-sm">
        <ChevronRightIcon aria-hidden />
      </Button>
    </header>
  );
}

function CalendarBody({
  cellClassName,
  months = 1,
}: {
  cellClassName: string;
  months?: number;
}) {
  // One grid per visible month (`visibleDuration={{ months: n }}`).
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      {Array.from({ length: months }, (_, i) => (
        <CalendarMonth
          // biome-ignore lint/suspicious/noArrayIndexKey: month offsets are stable
          key={i}
          offset={i}
          cellClassName={cellClassName}
        />
      ))}
    </div>
  );
}

function CalendarMonth({
  cellClassName,
  offset,
}: {
  cellClassName: string;
  offset: number;
}) {
  return (
    <CalendarGrid
      className="border-separate border-spacing-y-0.5"
      weekdayStyle="short"
      offset={offset ? { months: offset } : undefined}
    >
      <CalendarGridHeader>
        {(day) => (
          <CalendarHeaderCell className="size-8 pb-1 font-medium text-muted-foreground text-xs">
            {day}
          </CalendarHeaderCell>
        )}
      </CalendarGridHeader>
      <CalendarGridBody>
        {(date) => <CalendarCell date={date} className={cellClassName} />}
      </CalendarGridBody>
    </CalendarGrid>
  );
}

type CalendarSelectionMode = "single" | "multiple";

export interface CalendarProps<
  T extends DateValue,
  M extends CalendarSelectionMode = "single",
> extends Omit<CalendarPrimitiveProps<T, M>, "children">,
    CalendarCaptionProps {
  errorMessage?: string;
}

export function Calendar<
  T extends DateValue,
  M extends CalendarSelectionMode = "single",
>({
  className,
  errorMessage,
  captionLayout,
  fromYear,
  toYear,
  ...props
}: CalendarProps<T, M>) {
  return (
    <CalendarPrimitive
      data-slot="calendar"
      {...props}
      className={composeTailwindRenderProps(className, "w-fit p-3")}
    >
      <CalendarHeader
        captionLayout={captionLayout}
        fromYear={fromYear}
        toYear={toYear}
      />
      <CalendarBody
        cellClassName={singleCell}
        months={props.visibleDuration?.months}
      />
      {errorMessage && (
        <Text slot="errorMessage" className="text-destructive text-xs">
          {errorMessage}
        </Text>
      )}
    </CalendarPrimitive>
  );
}

export interface RangeCalendarProps<T extends DateValue>
  extends Omit<RangeCalendarPrimitiveProps<T>, "children">,
    CalendarCaptionProps {
  errorMessage?: string;
}

export function RangeCalendar<T extends DateValue>({
  className,
  errorMessage,
  captionLayout,
  fromYear,
  toYear,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <RangeCalendarPrimitive
      data-slot="range-calendar"
      {...props}
      className={composeTailwindRenderProps(className, "w-fit p-3")}
    >
      <CalendarHeader
        captionLayout={captionLayout}
        fromYear={fromYear}
        toYear={toYear}
      />
      <CalendarBody
        cellClassName={rangeCell}
        months={props.visibleDuration?.months}
      />
      {errorMessage && (
        <Text slot="errorMessage" className="text-destructive text-xs">
          {errorMessage}
        </Text>
      )}
    </RangeCalendarPrimitive>
  );
}
