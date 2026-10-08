import { FileTextIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

export default function TimelineRichContent() {
  return (
    <Timeline className="w-full max-w-md" aria-label="Ticket history">
      <TimelineItem>
        <TimelineIndicator variant="media">
          <Avatar fallback="PR" colorful className="size-full" />
        </TimelineIndicator>
        <TimelineContent className="gap-2">
          <TimelineHeader>
            <TimelineTitle>
              <strong>Priya Raman</strong> replied
            </TimelineTitle>
            <TimelineTime dateTime="2026-10-04T09:30">9:30 AM</TimelineTime>
          </TimelineHeader>
          <div className="rounded-lg border bg-card px-3 py-2.5 text-sm leading-relaxed shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
            I've refunded the duplicate charge. It should show on your statement
            within 5 business days.
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator>
          <FileTextIcon />
        </TimelineIndicator>
        <TimelineContent className="gap-2">
          <TimelineHeader>
            <TimelineTitle>
              <strong>Refund issued</strong>
            </TimelineTitle>
            <TimelineTime dateTime="2026-10-04T09:28">9:28 AM</TimelineTime>
          </TimelineHeader>
          <TimelineDescription className="flex flex-wrap items-center gap-2">
            <Badge size="sm" variant="soft" color="success">
              $129.00
            </Badge>
            to Visa ending 4242
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator variant="media">
          <Avatar fallback="DK" colorful className="size-full" />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>
              <strong>Daniel Kim</strong> opened the ticket
            </TimelineTitle>
            <TimelineTime dateTime="2026-10-03T18:02">Yesterday</TimelineTime>
          </TimelineHeader>
          <TimelineDescription>
            "I was charged twice for my October subscription."
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
