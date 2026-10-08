"use client";

import { ArrowUpRightIcon } from "lucide-react";
import { Link } from "react-aria-components";
import { buttonVariants } from "@/components/ui/button";

export default function ButtonAsLink() {
  return (
    <Link
      href="#"
      className={buttonVariants({ variant: "outline", color: "neutral" })}
    >
      Documentation <ArrowUpRightIcon />
    </Link>
  );
}
