import { ScrollArea } from "@/components/ui/scroll-area";

const notes = [
  ["v4.12.0", "Bulk edit for invoices"],
  ["v4.11.3", "Multi-currency rounding fix"],
  ["v4.11.2", "Faster workspace search"],
  ["v4.11.0", "Expense approval rules"],
  ["v4.10.4", "Webhook retry backoff"],
  ["v4.10.0", "Dark mode on mobile"],
];

/** Compact scroll area used as the component grid thumbnail. */
export default function ScrollAreaThumb() {
  return (
    <div className="w-full max-w-xs rounded-xl border bg-card">
      <ScrollArea className="h-36" aria-label="Changelog" fade>
        <ul className="divide-y">
          {notes.map(([v, note]) => (
            <li key={v} className="flex items-baseline gap-3 px-3 py-2 text-sm">
              <span className="font-mono text-muted-foreground text-xs">
                {v}
              </span>
              <span className="truncate">{note}</span>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
