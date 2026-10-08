import { ScrollArea } from "@/components/ui/scroll-area";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const regions = [
  "North America",
  "South America",
  "Western Europe",
  "Eastern Europe",
  "Middle East",
  "Africa",
  "South Asia",
  "East Asia",
  "Oceania",
  "Caribbean",
  "Central America",
  "Nordics",
];

function revenue(r: number, m: number) {
  return Math.round(40 + ((r * 37 + m * 53) % 90) + m * 3);
}

export default function ScrollAreaBoth() {
  return (
    <ScrollArea
      orientation="both"
      aria-label="Revenue by region"
      className="h-64 w-full max-w-lg rounded-lg border bg-card"
    >
      <table className="w-max border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            <th className="sticky top-0 left-0 z-20 border-b bg-card px-3 py-2 text-left font-medium">
              Region ($k)
            </th>
            {months.map((m) => (
              <th
                key={m}
                className="sticky top-0 z-10 border-b bg-card px-3 py-2 text-right font-medium"
              >
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {regions.map((r, ri) => (
            <tr key={r}>
              <th className="sticky left-0 z-10 border-b bg-card px-3 py-2 text-left font-normal whitespace-nowrap">
                {r}
              </th>
              {months.map((m, mi) => (
                <td
                  key={m}
                  className="border-b px-3 py-2 text-right text-muted-foreground tabular-nums"
                >
                  {revenue(ri, mi)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
}
