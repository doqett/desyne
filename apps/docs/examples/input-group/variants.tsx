"use client";

import { LinkIcon } from "lucide-react";
import { TextField } from "react-aria-components";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function InputGroupVariants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {(["outline", "filled", "underlined"] as const).map((variant) => (
        <TextField key={variant} aria-label={`Link (${variant})`}>
          <InputGroup variant={variant}>
            <InputGroupAddon>
              <LinkIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder={`${variant} · paste a link`} />
          </InputGroup>
        </TextField>
      ))}
      {(["sm", "lg"] as const).map((size) => (
        <TextField key={size} aria-label={`Website (${size})`}>
          <InputGroup size={size}>
            <InputGroupAddon variant="segment">https://</InputGroupAddon>
            <InputGroupInput placeholder={`size ${size}`} />
          </InputGroup>
        </TextField>
      ))}
    </div>
  );
}
