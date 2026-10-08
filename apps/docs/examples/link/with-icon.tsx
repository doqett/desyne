"use client";

import { ArrowLeftIcon, DownloadIcon, MailIcon } from "lucide-react";
import { Link } from "@/components/ui/link";

export default function LinkWithIcon() {
  return (
    <div className="flex flex-col items-start gap-3 text-sm">
      <Link href="#" variant="subtle" className="gap-1.5">
        <ArrowLeftIcon className="size-4" /> Back to invoices
      </Link>
      <Link href="#" download="invoice-2026-09.pdf" className="gap-1.5">
        <DownloadIcon className="size-4" /> Download PDF
      </Link>
      <Link href="mailto:support@acme.dev" className="gap-1.5">
        <MailIcon className="size-4" /> support@acme.dev
      </Link>
    </div>
  );
}
