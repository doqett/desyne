"use client";

import { SearchIcon } from "lucide-react";
import { useAsyncList } from "react-aria-components";
import {
  ComboBox,
  ComboBoxItem,
  ComboBoxItemDescription,
  ComboBoxItemLabel,
} from "@/components/ui/combobox";
import { Spinner } from "@/components/ui/spinner";

type Repo = { id: string; name: string; stars: string };

const repos: Repo[] = [
  { id: "facebook/react", name: "facebook/react", stars: "232k" },
  { id: "vercel/next.js", name: "vercel/next.js", stars: "131k" },
  { id: "adobe/react-spectrum", name: "adobe/react-spectrum", stars: "13k" },
  {
    id: "tailwindlabs/tailwindcss",
    name: "tailwindlabs/tailwindcss",
    stars: "86k",
  },
  { id: "shadcn-ui/ui", name: "shadcn-ui/ui", stars: "96k" },
  { id: "vitejs/vite", name: "vitejs/vite", stars: "72k" },
  { id: "microsoft/typescript", name: "microsoft/TypeScript", stars: "104k" },
];

// Stand-in for a real API call.
async function searchRepos(query: string, signal: AbortSignal) {
  await new Promise((resolve, reject) => {
    const t = setTimeout(resolve, 400);
    signal.addEventListener("abort", () => {
      clearTimeout(t);
      reject(signal.reason);
    });
  });
  const q = query.toLowerCase();
  return repos.filter((r) => r.name.toLowerCase().includes(q));
}

export default function ComboBoxAsync() {
  const list = useAsyncList<Repo>({
    async load({ signal, filterText }) {
      return { items: await searchRepos(filterText ?? "", signal) };
    },
  });

  return (
    <ComboBox
      className="w-full max-w-72"
      label="Repository"
      placeholder="Search GitHub…"
      items={list.items}
      inputValue={list.filterText}
      onInputChange={list.setFilterText}
      prefix={list.isLoading ? <Spinner size="xs" /> : <SearchIcon />}
      emptyMessage={list.isLoading ? "Searching…" : "No repositories found."}
    >
      {(repo) => (
        <ComboBoxItem textValue={repo.name}>
          <span className="flex min-w-0 flex-col gap-0.5">
            <ComboBoxItemLabel>{repo.name}</ComboBoxItemLabel>
            <ComboBoxItemDescription>★ {repo.stars}</ComboBoxItemDescription>
          </span>
        </ComboBoxItem>
      )}
    </ComboBox>
  );
}
