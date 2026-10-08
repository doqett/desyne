"use client";

import { ArrowRightIcon, DownloadIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <MailIcon /> Login with email
      </Button>
      <Button variant="outline">
        <DownloadIcon /> Export
      </Button>
      <Button variant="soft">
        Continue <ArrowRightIcon />
      </Button>
    </div>
  );
}
