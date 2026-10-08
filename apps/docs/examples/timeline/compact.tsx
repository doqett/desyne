import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";

const log = [
  {
    who: "Ana",
    what: "changed status to In review",
    ago: "2m",
    iso: "2026-10-04T10:58",
  },
  {
    who: "Ana",
    what: "attached spec-v3.pdf",
    ago: "14m",
    iso: "2026-10-04T10:46",
  },
  {
    who: "Leo",
    what: "assigned the issue to Ana",
    ago: "1h",
    iso: "2026-10-04T10:00",
  },
  {
    who: "Leo",
    what: "added the label Billing",
    ago: "1h",
    iso: "2026-10-04T09:58",
  },
  { who: "Sam", what: "created the issue", ago: "3h", iso: "2026-10-04T08:12" },
];

export default function TimelineCompact() {
  return (
    <Timeline
      variant="compact"
      className="w-full max-w-sm"
      aria-label="Activity"
    >
      {log.map((l) => (
        <TimelineItem key={l.iso}>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle className="text-[0.8125rem]">
                <strong>{l.who}</strong>{" "}
                <span className="text-muted-foreground">{l.what}</span>
              </TimelineTitle>
              <TimelineTime dateTime={l.iso}>{l.ago} ago</TimelineTime>
            </TimelineHeader>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
