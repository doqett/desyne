import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";

const events = [
  {
    title: "Order delivered",
    detail: "Left at the front door · Signed by R. Patel",
    time: "Today, 2:41 PM",
    iso: "2026-10-04T14:41",
    color: "success",
  },
  {
    title: "Out for delivery",
    detail: "Van 14 · Brooklyn depot",
    time: "Today, 8:02 AM",
    iso: "2026-10-04T08:02",
  },
  {
    title: "Arrived at local depot",
    detail: "Brooklyn, NY",
    time: "Oct 3, 9:47 PM",
    iso: "2026-10-03T21:47",
  },
  {
    title: "Shipped",
    detail: "Northfold warehouse, Newark, NJ",
    time: "Oct 2, 4:15 PM",
    iso: "2026-10-02T16:15",
  },
] as const;

export default function TimelineDots() {
  return (
    <Timeline className="w-full max-w-md" aria-label="Shipment history">
      {events.map((e) => (
        <TimelineItem key={e.iso}>
          <TimelineIndicator color={"color" in e ? e.color : undefined} />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle className="font-medium">{e.title}</TimelineTitle>
              <TimelineTime dateTime={e.iso}>{e.time}</TimelineTime>
            </TimelineHeader>
            <TimelineDescription>{e.detail}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
