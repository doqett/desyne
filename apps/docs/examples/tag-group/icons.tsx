"use client";

import {
  BugIcon,
  GaugeIcon,
  LockIcon,
  SparklesIcon,
  WrenchIcon,
} from "lucide-react";
import { Tag, TagGroup } from "@/components/ui/tag-group";

export default function TagGroupIcons() {
  return (
    <TagGroup
      label="Change type"
      selectionMode="multiple"
      defaultSelectedKeys={["feature"]}
    >
      <Tag id="feature" textValue="Feature" color="brand">
        <SparklesIcon /> Feature
      </Tag>
      <Tag id="fix" textValue="Bug fix" color="danger">
        <BugIcon /> Bug fix
      </Tag>
      <Tag id="perf" textValue="Performance" color="success">
        <GaugeIcon /> Performance
      </Tag>
      <Tag id="security" textValue="Security" color="warning">
        <LockIcon /> Security
      </Tag>
      <Tag id="chore" textValue="Chore" color="neutral">
        <WrenchIcon /> Chore
      </Tag>
    </TagGroup>
  );
}
