"use client";

import { Link } from "@/components/ui/link";

export default function LinkExternal() {
  return (
    <p className="max-w-sm text-muted-foreground text-sm leading-relaxed">
      Built on{" "}
      <Link href="https://react-spectrum.adobe.com/react-aria/" isExternal>
        React Aria
      </Link>{" "}
      and styled with{" "}
      <Link href="https://tailwindcss.com" isExternal variant="underline">
        Tailwind CSS
      </Link>
      .
    </p>
  );
}
