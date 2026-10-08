"use client";

import { UserPlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Form } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectItem } from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";

type Invite = { email: string; role: string };

export default function DialogRecipeInvite() {
  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState<Invite[]>([
    { email: "olivia@acme.dev", role: "admin" },
  ]);
  return (
    <DialogTrigger>
      <Button>
        <UserPlusIcon /> Invite members
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to Acme</DialogTitle>
          <DialogDescription>
            New members get access to every project in this workspace.
          </DialogDescription>
        </DialogHeader>
        <Form
          className="flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) return;
            setInvites((i) => [...i, { email, role: "member" }]);
            setEmail("");
          }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="name@company.com"
            className="flex-1"
          />
          <Button type="submit" variant="outline">
            Add
          </Button>
        </Form>
        <ul className="grid gap-3">
          {invites.map((inv) => (
            <li key={inv.email} className="flex items-center gap-3">
              <Avatar
                size="sm"
                colorful
                alt={inv.email}
                fallback={inv.email[0].toUpperCase()}
              />
              <span className="min-w-0 flex-1 truncate text-sm">
                {inv.email}
              </span>
              <Select
                aria-label={`Role for ${inv.email}`}
                size="sm"
                defaultSelectedKey={inv.role}
                className="w-28"
              >
                <SelectItem id="admin">Admin</SelectItem>
                <SelectItem id="member">Member</SelectItem>
                <SelectItem id="viewer">Viewer</SelectItem>
              </Select>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove ${inv.email}`}
                onPress={() => setInvites((i) => i.filter((x) => x !== inv))}
              >
                <XIcon />
              </Button>
            </li>
          ))}
        </ul>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <DialogClose variant="solid" isDisabled={invites.length === 0}>
            Send {invites.length} {invites.length === 1 ? "invite" : "invites"}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogTrigger>
  );
}
