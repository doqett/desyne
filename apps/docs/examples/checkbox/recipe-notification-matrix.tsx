"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const channels = [
  { id: "email", label: "Email" },
  { id: "push", label: "Push" },
  { id: "sms", label: "SMS" },
] as const;

const events = [
  { id: "mention", label: "Someone mentions you" },
  { id: "assign", label: "An issue is assigned to you" },
  { id: "deploy", label: "A deploy fails" },
  { id: "invoice", label: "A new invoice is available" },
];

type Channel = (typeof channels)[number]["id"];

export default function CheckboxRecipeNotificationMatrix() {
  const [prefs, setPrefs] = useState<Record<string, Channel[]>>({
    mention: ["email", "push"],
    assign: ["email"],
    deploy: ["email", "push", "sms"],
    invoice: ["email"],
  });

  return (
    <div className="w-full max-w-lg overflow-x-auto rounded-xl border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-muted-foreground text-xs">
            <th className="px-4 py-2.5 text-left font-medium">
              Notify me when
            </th>
            {channels.map((c) => (
              <th key={c.id} className="w-16 px-2 py-2.5 font-medium">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {events.map((event) => (
            <tr key={event.id}>
              <td className="px-4 py-3">{event.label}</td>
              {channels.map((c) => (
                <td key={c.id} className="px-2 py-3">
                  <div className="flex justify-center">
                    <Checkbox
                      aria-label={`${c.label}: ${event.label}`}
                      isSelected={prefs[event.id].includes(c.id)}
                      isDisabled={c.id === "sms" && event.id !== "deploy"}
                      onChange={(checked) =>
                        setPrefs((p) => ({
                          ...p,
                          [event.id]: checked
                            ? [...p[event.id], c.id]
                            : p[event.id].filter((id) => id !== c.id),
                        }))
                      }
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
