"use client";

import { Kbd, KbdGroup } from "@/components/ui/kbd";

const groups = [
  {
    title: "Navigation",
    shortcuts: [
      { label: "Open command palette", keys: ["⌘", "K"] },
      { label: "Go to inbox", keys: ["G", "I"], sequence: true },
      { label: "Go to projects", keys: ["G", "P"], sequence: true },
    ],
  },
  {
    title: "Editing",
    shortcuts: [
      { label: "New issue", keys: ["C"] },
      { label: "Assign to me", keys: ["I"] },
      { label: "Save and close", keys: ["⌘", "↵"] },
    ],
  },
];

export default function KbdRecipeShortcuts() {
  return (
    <div className="grid w-full max-w-lg gap-6 sm:grid-cols-2">
      {groups.map((g) => (
        <section key={g.title} aria-labelledby={`shortcuts-${g.title}`}>
          <h3
            id={`shortcuts-${g.title}`}
            className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wide"
          >
            {g.title}
          </h3>
          <dl className="flex flex-col divide-y">
            {g.shortcuts.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between gap-4 py-2 text-sm"
              >
                <dt>{s.label}</dt>
                <dd>
                  <KbdGroup>
                    {s.keys.map((k, i) => (
                      <span key={k} className="inline-flex items-center gap-1">
                        {s.sequence && i > 0 && (
                          <span className="text-muted-foreground text-xs">
                            then
                          </span>
                        )}
                        <Kbd size="sm">{k}</Kbd>
                      </span>
                    ))}
                  </KbdGroup>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
