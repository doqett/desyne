"use client";

import { HashIcon, LockIcon, Volume2Icon } from "lucide-react";
import { useState } from "react";
import type { Key } from "react-aria-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tree, TreeItem } from "@/components/ui/tree";

const sections = ["general", "product", "voice"];

export default function TreeControlled() {
  const [expanded, setExpanded] = useState<Set<Key>>(new Set(["general"]));
  return (
    <div className="flex w-72 flex-col gap-2">
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="xs"
          onPress={() => setExpanded(new Set(sections))}
        >
          Expand all
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onPress={() => setExpanded(new Set())}
        >
          Collapse all
        </Button>
      </div>
      <Tree
        aria-label="Channels"
        expandedKeys={expanded}
        onExpandedChange={setExpanded}
        variant="bordered"
      >
        <TreeItem id="general" title="General">
          <TreeItem
            id="announcements"
            title="announcements"
            icon={<HashIcon />}
          />
          <TreeItem
            id="random"
            title="random"
            icon={<HashIcon />}
            suffix={
              <Badge size="sm" color="brand">
                4
              </Badge>
            }
          />
        </TreeItem>
        <TreeItem id="product" title="Product">
          <TreeItem id="design" title="design" icon={<HashIcon />} />
          <TreeItem
            id="launch"
            title="launch-q3"
            icon={<LockIcon />}
            suffix={
              <Badge size="sm" color="brand">
                12
              </Badge>
            }
          />
        </TreeItem>
        <TreeItem id="voice" title="Voice">
          <TreeItem id="standup" title="Daily standup" icon={<Volume2Icon />} />
        </TreeItem>
      </Tree>
    </div>
  );
}
