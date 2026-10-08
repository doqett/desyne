"use client";

import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyAvatars() {
  return (
    <Empty size="lg">
      <EmptyMedia>
        <AvatarGroup size="lg">
          <Avatar fallback="MC" colorful />
          <Avatar fallback="JW" colorful />
          <Avatar fallback="AS" colorful />
        </AvatarGroup>
      </EmptyMedia>
      <EmptyTitle>Invite your team</EmptyTitle>
      <EmptyDescription>
        You're the only member of Harbor & Pine. Teammates can comment, assign
        tasks and share files.
      </EmptyDescription>
      <EmptyActions>
        <Button>Invite members</Button>
        <Button variant="ghost">Copy invite link</Button>
      </EmptyActions>
    </Empty>
  );
}
