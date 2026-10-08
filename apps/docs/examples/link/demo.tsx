"use client";

import { Link } from "@/components/ui/link";

export default function LinkDemo() {
  return (
    <p className="max-w-sm text-muted-foreground text-sm leading-relaxed">
      By continuing you agree to our <Link href="#">Terms of Service</Link> and{" "}
      <Link href="#">Privacy Policy</Link>.
    </p>
  );
}
