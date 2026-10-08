"use client";

import { AudioLinesIcon, KeyboardIcon } from "lucide-react";
import { type FocusEvent, type KeyboardEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const countries = [
  "Germany",
  "India",
  "Japan",
  "Nepal",
  "Portugal",
  "United States",
].map((name) => ({ id: name, name }));
const keyNames: Record<string, string> = {
  " ": "Space",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  Escape: "Esc",
  Enter: "Enter",
  Tab: "Tab",
  Backspace: "⌫",
  Home: "Home",
  End: "End",
};

/** A rough screen-reader style description of the focused element. */
function describe(el: Element): string {
  const role =
    el.getAttribute("role") ??
    (
      {
        BUTTON: "button",
        INPUT:
          (el as HTMLInputElement).type === "checkbox"
            ? "checkbox"
            : "text field",
        A: "link",
      } as Record<string, string>
    )[el.tagName] ??
    "group";
  const labelledBy = el.getAttribute("aria-labelledby");
  const label =
    el.getAttribute("aria-label") ??
    (labelledBy
      ? labelledBy
          .split(" ")
          .map((id) => document.getElementById(id)?.textContent ?? "")
          .join(" ")
          .trim()
      : "") ??
    "";
  const text = label || (el.textContent ?? "").trim().slice(0, 40);
  const state: string[] = [];
  if (
    el.getAttribute("aria-checked") === "true" ||
    (el as HTMLInputElement).checked
  )
    state.push("checked");
  if (el.getAttribute("aria-expanded") === "true") state.push("expanded");
  if (el.getAttribute("aria-expanded") === "false") state.push("collapsed");
  if (el.getAttribute("aria-invalid") === "true") state.push("invalid");
  return [text || "Unlabelled", role, ...state].filter(Boolean).join(", ");
}

/** Interactive demo that shows the keys you press and what assistive tech hears. */
export function KeyboardLab() {
  const [keys, setKeys] = useState<{ id: number; k: string }[]>([]);
  const [heard, setHeard] = useState("Press Tab to start");

  const onKey = (e: KeyboardEvent) => {
    const k =
      keyNames[e.key] ?? (e.key.length === 1 ? e.key.toUpperCase() : e.key);
    const combo = `${e.shiftKey && e.key !== "Shift" ? "⇧ " : ""}${k}`;
    if (["Shift", "Meta", "Control", "Alt"].includes(e.key)) return;
    setKeys((ks) => [
      ...ks.slice(-5),
      { id: Date.now() + Math.random(), k: combo },
    ]);
  };
  const onFocus = (e: FocusEvent) => setHeard(describe(e.target));

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl border bg-card [&>*]:min-w-0 lg:grid-cols-[1.3fr_1fr]">
      {/* biome-ignore lint/a11y/noStaticElementInteractions: only observes key presses for the visualiser */}
      <div
        onKeyDown={onKey}
        onFocus={onFocus}
        className="preview-canvas grid gap-5 p-6 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <ComboBox
            label="Ship to"
            defaultItems={countries}
            placeholder="Type a country"
          >
            {(c) => <ComboBoxItem>{c.name}</ComboBoxItem>}
          </ComboBox>
          <DatePicker label="Delivery date" />
        </div>
        <RadioGroup
          label="Speed"
          defaultValue="standard"
          orientation="horizontal"
        >
          <Radio value="standard">Standard</Radio>
          <Radio value="express">Express</Radio>
          <Radio value="overnight">Overnight</Radio>
        </RadioGroup>
        <Switch defaultSelected>Text me tracking updates</Switch>
        <div className="flex gap-2">
          <Button variant="outline">Back</Button>
          <Button color="brand">Continue</Button>
        </div>
      </div>
      <aside className="flex flex-col gap-4 border-t bg-muted/30 p-6 lg:border-t-0 lg:border-l">
        <div>
          <p className="flex items-center gap-2 font-medium text-muted-foreground text-sm">
            <KeyboardIcon className="size-3.5" /> Keys
          </p>
          <div className="mt-3 flex min-h-9 flex-wrap gap-1.5" aria-hidden>
            {keys.length === 0 && (
              <span className="text-muted-foreground text-sm">
                Nothing yet. Try Tab, arrows, Space and Esc.
              </span>
            )}
            {keys.map((k, i) => (
              <kbd
                key={k.id}
                className={cn(
                  "flex h-8 min-w-8 items-center justify-center rounded-md border-b-2 bg-background px-2 font-mono text-xs shadow-xs transition-opacity",
                  i < keys.length - 1 && "opacity-50",
                )}
              >
                {k.k}
              </kbd>
            ))}
          </div>
        </div>
        <div>
          <p className="flex items-center gap-2 font-medium text-muted-foreground text-sm">
            <AudioLinesIcon className="size-3.5" /> A screen reader would say
          </p>
          <p
            className="mt-3 rounded-lg border bg-background px-3 py-2.5 font-medium text-sm"
            aria-live="off"
          >
            “{heard}”
          </p>
        </div>
        <ul className="mt-auto space-y-1.5 text-muted-foreground text-sm">
          <li>Arrow keys move inside radio groups and listboxes.</li>
          <li>Esc closes popovers and returns focus where you were.</li>
          <li>Dates are typed segment by segment, in your locale.</li>
        </ul>
      </aside>
    </div>
  );
}
