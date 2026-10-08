"use client";

import { useFilter } from "react-aria-components";
import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";

const commands = [
  "git add",
  "git branch",
  "git checkout",
  "git commit",
  "git merge",
  "git pull",
  "git push",
  "git rebase",
  "git stash",
].map((name) => ({ id: name, name }));

export default function ComboBoxCustomFilter() {
  const { startsWith } = useFilter({ sensitivity: "base" });
  return (
    <ComboBox
      className="w-full max-w-64"
      label="Command"
      placeholder="git …"
      defaultItems={commands}
      defaultFilter={startsWith}
      description="Matches from the start: “git p” finds pull and push."
    >
      {(c) => <ComboBoxItem className="font-mono">{c.name}</ComboBoxItem>}
    </ComboBox>
  );
}
