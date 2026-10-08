"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const releases = [
  {
    version: "3.8.0",
    date: "Sep 24",
    tag: "Feature",
    notes: [
      "Saved views can now be shared with guests.",
      "Added keyboard shortcuts for switching projects.",
      "Export dashboards as PNG.",
    ],
  },
  {
    version: "3.7.2",
    date: "Sep 10",
    tag: "Fix",
    notes: [
      "Fixed timezone drift in recurring reports.",
      "Charts no longer flicker when resizing the sidebar.",
    ],
  },
  {
    version: "3.7.0",
    date: "Aug 28",
    tag: "Feature",
    notes: [
      "New audit log with 90-day retention.",
      "Bulk-edit labels from the table view.",
      "SAML single sign-on for Business plans.",
    ],
  },
  {
    version: "3.6.1",
    date: "Aug 14",
    tag: "Fix",
    notes: [
      "Improved CSV import for files over 50 MB.",
      "Fixed a crash when pasting rich text into comments.",
    ],
  },
  {
    version: "3.6.0",
    date: "Jul 30",
    tag: "Feature",
    notes: [
      "Dark mode for embedded dashboards.",
      "Webhooks now retry with exponential backoff.",
      "Filter by custom fields in search.",
    ],
  },
  {
    version: "3.5.0",
    date: "Jul 12",
    tag: "Feature",
    notes: [
      "Goals: track targets against any metric.",
      "Slack notifications for goal milestones.",
    ],
  },
];

export default function SheetScrollable() {
  return (
    <SheetTrigger>
      <Button variant="outline">What's new</Button>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Changelog</SheetTitle>
          <SheetDescription>
            Everything we shipped this quarter.
          </SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <ol className="grid gap-6">
            {releases.map((r) => (
              <li key={r.version} className="grid gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">v{r.version}</span>
                  <Badge size="sm" color={r.tag === "Fix" ? "warning" : "info"}>
                    {r.tag}
                  </Badge>
                  <span className="ml-auto text-muted-foreground text-xs">
                    {r.date}
                  </span>
                </div>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground text-sm">
                  {r.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
        <SheetFooter>
          <SheetClose className="w-full">Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </SheetTrigger>
  );
}
