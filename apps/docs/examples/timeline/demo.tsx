import {
  GitMergeIcon,
  GitPullRequestIcon,
  MessageSquareIcon,
} from "lucide-react";
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

export default function TimelineDemo() {
  return (
    <Timeline className="w-full max-w-md">
      <TimelineItem>
        <TimelineIndicator>
          <GitPullRequestIcon />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>
              <strong>Maya Chen</strong> opened #482
            </TimelineTitle>
            <TimelineTime dateTime="2026-10-02T09:14">Oct 2, 9:14</TimelineTime>
          </TimelineHeader>
          <TimelineDescription>
            Add retry with backoff to the webhook dispatcher.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator>
          <MessageSquareIcon />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>
              <strong>Jonas Weber</strong> left a review
            </TimelineTitle>
            <TimelineTime dateTime="2026-10-02T11:40">
              Oct 2, 11:40
            </TimelineTime>
          </TimelineHeader>
          <TimelineDescription>
            Looks good. Can we cap the delay at 30 seconds?
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator color="brand">
          <GitMergeIcon />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>
              <strong>Maya Chen</strong> merged into main
            </TimelineTitle>
            <TimelineTime dateTime="2026-10-03T08:05">Oct 3, 8:05</TimelineTime>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
