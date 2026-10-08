"use client";

import { Link } from "@/components/ui/link";

export default function LinkVariants() {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm">
      <Link href="#">Default</Link>
      <Link href="#" variant="subtle">
        Subtle
      </Link>
      <Link href="#" variant="underline">
        Underline
      </Link>
    </div>
  );
}
