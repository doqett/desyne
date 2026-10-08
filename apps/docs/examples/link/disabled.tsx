"use client";

import { Link } from "@/components/ui/link";

export default function LinkDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm">
      <Link href="#" isDisabled>
        Download invoice
      </Link>
      <Link href="#" variant="subtle" isDisabled>
        View receipt
      </Link>
    </div>
  );
}
