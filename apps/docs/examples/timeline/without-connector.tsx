import { CheckCircle2Icon, CreditCardIcon, UserPlusIcon } from "lucide-react";
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

export default function TimelineWithoutConnector() {
  return (
    <Timeline
      connector={false}
      className="w-full max-w-md"
      aria-label="Account events"
    >
      <TimelineItem>
        <TimelineIndicator color="success">
          <CheckCircle2Icon />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle className="font-medium">
              Payment received
            </TimelineTitle>
            <TimelineTime dateTime="2026-10-01">Oct 1</TimelineTime>
          </TimelineHeader>
          <TimelineDescription>
            $480.00 for the Team plan, invoice INV-2041.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator color="info">
          <UserPlusIcon />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle className="font-medium">3 seats added</TimelineTitle>
            <TimelineTime dateTime="2026-09-24">Sep 24</TimelineTime>
          </TimelineHeader>
          <TimelineDescription>
            Prorated charge of $36.00 on the next invoice.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator color="warning">
          <CreditCardIcon />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle className="font-medium">
              Card expiring soon
            </TimelineTitle>
            <TimelineTime dateTime="2026-09-15">Sep 15</TimelineTime>
          </TimelineHeader>
          <TimelineDescription>
            Visa ending 4242 expires at the end of October.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
