"use client";

import { AtSignIcon, MailIcon, SearchIcon } from "lucide-react";
import { TextField } from "react-aria-components";
import { Label } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";

export default function InputGroupIcons() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <TextField aria-label="Search docs">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search docs" />
          <InputGroupAddon>
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </TextField>
      <TextField className="group/field flex flex-col gap-1.5" type="email">
        <Label>Email</Label>
        <InputGroup>
          <InputGroupAddon>
            <MailIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="you@company.com" />
        </InputGroup>
      </TextField>
      <TextField className="group/field flex flex-col gap-1.5">
        <Label>Username</Label>
        <InputGroup>
          <InputGroupAddon>
            <AtSignIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="maya" />
          <InputGroupAddon className="text-xs">12/20</InputGroupAddon>
        </InputGroup>
      </TextField>
    </div>
  );
}
