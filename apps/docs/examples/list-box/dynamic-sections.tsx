"use client";

import { ListBox, ListBoxItem, ListBoxSection } from "@/components/ui/list-box";

const groups = [
  {
    id: "frontend",
    name: "Frontend",
    children: [
      { id: "web", name: "web-app" },
      { id: "docs", name: "docs-site" },
      { id: "admin", name: "admin-console" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    children: [
      { id: "api", name: "api-gateway" },
      { id: "billing", name: "billing-service" },
      { id: "auth", name: "auth-service" },
    ],
  },
  {
    id: "infra",
    name: "Infrastructure",
    children: [
      { id: "terraform", name: "terraform-modules" },
      { id: "ci", name: "ci-runners" },
    ],
  },
];

export default function ListBoxDynamicSections() {
  return (
    <ListBox
      aria-label="Repositories"
      items={groups}
      selectionMode="multiple"
      defaultSelectedKeys={["api"]}
      className="max-h-72 w-full max-w-64"
    >
      {(group) => (
        <ListBoxSection id={group.id} title={group.name} items={group.children}>
          {(repo) => <ListBoxItem>{repo.name}</ListBoxItem>}
        </ListBoxSection>
      )}
    </ListBox>
  );
}
