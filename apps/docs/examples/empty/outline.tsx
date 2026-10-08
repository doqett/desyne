"use client";

import { UploadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyOutline() {
  return (
    <Empty variant="outline" className="max-w-md">
      <EmptyMedia variant="round">
        <UploadCloudIcon />
      </EmptyMedia>
      <EmptyTitle>No files in this folder</EmptyTitle>
      <EmptyDescription>
        Upload contracts, invoices or receipts. PDF, PNG and JPG up to 25 MB.
      </EmptyDescription>
      <EmptyActions>
        <Button variant="outline" size="sm">
          Upload files
        </Button>
      </EmptyActions>
    </Empty>
  );
}
