"use client";

import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Group } from "react-aria-components";
import { Button } from "@/components/ui/button";

/** Attach buttons by removing inner radii and collapsing shared borders. */
const attached =
  "flex *:rounded-none *:first:rounded-l-md *:last:rounded-r-md *:not-first:-ml-px *:data-focus-visible:z-10";

export default function ButtonGroupDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Group aria-label="Pagination" className={attached}>
        <Button variant="outline" size="icon" aria-label="Previous">
          <ChevronLeftIcon />
        </Button>
        <Button variant="outline">Page 2 of 10</Button>
        <Button variant="outline" size="icon" aria-label="Next">
          <ChevronRightIcon />
        </Button>
      </Group>
      <Group aria-label="Text alignment" className={attached}>
        <Button variant="outline" size="icon" aria-label="Align left">
          <AlignLeftIcon />
        </Button>
        <Button variant="outline" size="icon" aria-label="Align center">
          <AlignCenterIcon />
        </Button>
        <Button variant="outline" size="icon" aria-label="Align right">
          <AlignRightIcon />
        </Button>
      </Group>
    </div>
  );
}
