import { ScrollArea } from "@/components/ui/scroll-area";

const releases = [
  ["4.12.0", "Oct 2", "Bulk edit for invoices and a new CSV importer."],
  ["4.11.3", "Sep 26", "Fixed rounding in multi-currency totals."],
  ["4.11.2", "Sep 22", "Faster search on workspaces with 10k+ documents."],
  ["4.11.0", "Sep 15", "Approval rules for expenses over a set amount."],
  ["4.10.4", "Sep 8", "Webhook retries now back off exponentially."],
  ["4.10.0", "Sep 1", "Dark mode for the mobile apps."],
  ["4.9.2", "Aug 25", "Audit log export to S3 and GCS."],
  ["4.9.0", "Aug 18", "Custom fields on vendors and customers."],
  ["4.8.1", "Aug 11", "SAML just-in-time provisioning."],
  ["4.8.0", "Aug 4", "Recurring invoices with proration."],
];

export default function ScrollAreaDemo() {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-card">
      <h3 className="border-b px-4 py-3 font-medium text-sm">Changelog</h3>
      <ScrollArea className="h-64" aria-label="Changelog">
        <ul className="divide-y">
          {releases.map(([version, date, note]) => (
            <li key={version} className="px-4 py-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-medium font-mono text-xs">
                  v{version}
                </span>
                <span className="text-muted-foreground text-xs">{date}</span>
              </div>
              <p className="mt-1 text-muted-foreground text-sm">{note}</p>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
