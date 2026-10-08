"use client";

import { useEffect, useState } from "react";
import { SearchField } from "@/components/ui/search-field";
import { Spinner } from "@/components/ui/spinner";

const articles = [
  "Export reports to CSV",
  "Invite teammates to a workspace",
  "Set up single sign-on (SAML)",
  "Rotate API keys",
  "Change your billing email",
  "Configure webhooks",
  "Restore a deleted project",
];

async function searchArticles(query: string, signal: AbortSignal) {
  await new Promise((resolve, reject) => {
    const t = setTimeout(resolve, 500);
    signal.addEventListener("abort", () => {
      clearTimeout(t);
      reject(signal.reason);
    });
  });
  return articles.filter((a) => a.toLowerCase().includes(query.toLowerCase()));
}

export default function SearchFieldAsync() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    searchArticles(query, controller.signal)
      .then((r) => {
        setResults(r);
        setLoading(false);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [query]);

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <SearchField
        label="Help center"
        placeholder="Search articles…"
        value={query}
        onChange={setQuery}
      />
      <div aria-live="polite" className="text-sm">
        {loading ? (
          <p className="flex items-center gap-2 text-muted-foreground">
            <Spinner size="xs" label="Searching" />
            Searching…
          </p>
        ) : query.trim() && results.length === 0 ? (
          <p className="text-muted-foreground">No articles match “{query}”.</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
