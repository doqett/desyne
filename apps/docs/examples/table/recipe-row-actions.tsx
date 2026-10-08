"use client";

import {
  KeyRoundIcon,
  MoreHorizontalIcon,
  PencilIcon,
  UserMinusIcon,
} from "lucide-react";
import { useListData } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { Select, SelectItem } from "@/components/ui/select";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
};

export default function TableRecipeRowActions() {
  const members = useListData<Member>({
    initialItems: [
      {
        id: "1",
        name: "Olivia Martin",
        email: "olivia@acme.com",
        role: "owner",
        lastActive: "Now",
      },
      {
        id: "2",
        name: "Jackson Lee",
        email: "jackson@acme.com",
        role: "admin",
        lastActive: "2h ago",
      },
      {
        id: "3",
        name: "Isabella Nguyen",
        email: "isabella@acme.com",
        role: "member",
        lastActive: "Yesterday",
      },
      {
        id: "4",
        name: "William Kim",
        email: "will@acme.com",
        role: "viewer",
        lastActive: "Sep 12",
      },
    ],
  });
  return (
    <div className="w-full max-w-2xl">
      <Table aria-label="Team members">
        <TableHeader>
          <Column isRowHeader>Member</Column>
          <Column className="w-36">Role</Column>
          <Column>Last active</Column>
          <Column className="w-12">
            <span className="sr-only">Actions</span>
          </Column>
        </TableHeader>
        <TableBody items={members.items} dependencies={[members.items]}>
          {(m) => (
            <Row>
              <Cell>
                <span className="flex items-center gap-2.5">
                  <Avatar
                    size="sm"
                    colorful
                    alt={m.name}
                    fallback={m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  />
                  <span className="flex flex-col">
                    <span className="font-medium">{m.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {m.email}
                    </span>
                  </span>
                </span>
              </Cell>
              <Cell>
                <Select
                  aria-label={`Role for ${m.name}`}
                  size="sm"
                  variant="filled"
                  selectedKey={m.role}
                  onSelectionChange={(role) =>
                    role && members.update(m.id, { ...m, role: String(role) })
                  }
                  isDisabled={m.role === "owner"}
                >
                  <SelectItem id="owner">Owner</SelectItem>
                  <SelectItem id="admin">Admin</SelectItem>
                  <SelectItem id="member">Member</SelectItem>
                  <SelectItem id="viewer">Viewer</SelectItem>
                </Select>
              </Cell>
              <Cell className="text-muted-foreground">{m.lastActive}</Cell>
              <Cell>
                <MenuTrigger>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    aria-label={`Actions for ${m.name}`}
                  >
                    <MoreHorizontalIcon />
                  </Button>
                  <MenuContent
                    placement="bottom end"
                    disabledKeys={m.role === "owner" ? ["remove"] : []}
                  >
                    <MenuItem id="edit" textValue="Edit profile">
                      <PencilIcon /> Edit profile
                    </MenuItem>
                    <MenuItem id="reset" textValue="Reset password">
                      <KeyRoundIcon /> Reset password
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem
                      id="remove"
                      textValue="Remove from team"
                      variant="destructive"
                      onAction={() => members.remove(m.id)}
                    >
                      <UserMinusIcon /> Remove from team
                    </MenuItem>
                  </MenuContent>
                </MenuTrigger>
              </Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
