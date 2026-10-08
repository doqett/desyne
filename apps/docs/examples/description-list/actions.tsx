"use client";

import { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";

const rows = [
  { term: "Full name", value: "Tomás Herrera" },
  { term: "Email", value: "tomas@harborpine.co" },
  {
    term: "Role",
    value: (
      <Badge size="sm" variant="soft">
        Admin
      </Badge>
    ),
  },
  { term: "Time zone", value: "Europe/Madrid (UTC+2)" },
];

export default function DescriptionListActions() {
  return (
    <DescriptionList divided className="w-full max-w-lg">
      {rows.map((r) => (
        <Fragment key={r.term}>
          <DescriptionTerm className="flex items-center">
            {r.term}
          </DescriptionTerm>
          <DescriptionDetails className="flex items-center justify-between gap-4">
            <span className="min-w-0">{r.value}</span>
            <Button
              variant="link"
              size="sm"
              aria-label={`Edit ${r.term.toLowerCase()}`}
            >
              Edit
            </Button>
          </DescriptionDetails>
        </Fragment>
      ))}
    </DescriptionList>
  );
}
