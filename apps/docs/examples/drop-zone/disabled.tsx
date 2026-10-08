"use client";

import { HardDriveIcon } from "lucide-react";
import { Text } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DropZone, FileTrigger } from "@/components/ui/drop-zone";

export default function DropZoneDisabled() {
  return (
    <DropZone className="max-w-sm" isDisabled>
      <HardDriveIcon aria-hidden className="size-6 text-muted-foreground" />
      <Text slot="label" className="font-medium">
        Storage full
      </Text>
      <span className="text-muted-foreground text-xs">
        You've used 5 GB of 5 GB. Upgrade to upload more files.
      </span>
      <FileTrigger>
        <Button variant="outline" size="sm" isDisabled>
          Browse files
        </Button>
      </FileTrigger>
    </DropZone>
  );
}
