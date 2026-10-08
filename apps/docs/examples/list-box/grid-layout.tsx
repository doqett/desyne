"use client";

import {
  BriefcaseIcon,
  CameraIcon,
  CodeIcon,
  CoffeeIcon,
  FlaskConicalIcon,
  GlobeIcon,
  HeartIcon,
  MusicIcon,
  PaletteIcon,
  RocketIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from "lucide-react";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";

const icons = [
  { id: "rocket", label: "Rocket", icon: RocketIcon },
  { id: "code", label: "Code", icon: CodeIcon },
  { id: "palette", label: "Palette", icon: PaletteIcon },
  { id: "flask", label: "Lab", icon: FlaskConicalIcon },
  { id: "globe", label: "Globe", icon: GlobeIcon },
  { id: "briefcase", label: "Briefcase", icon: BriefcaseIcon },
  { id: "camera", label: "Camera", icon: CameraIcon },
  { id: "music", label: "Music", icon: MusicIcon },
  { id: "coffee", label: "Coffee", icon: CoffeeIcon },
  { id: "heart", label: "Heart", icon: HeartIcon },
  { id: "bag", label: "Shopping", icon: ShoppingBagIcon },
  { id: "sparkles", label: "Sparkles", icon: SparklesIcon },
];

export default function ListBoxGridLayout() {
  return (
    <ListBox
      aria-label="Workspace icon"
      items={icons}
      layout="grid"
      selectionMode="single"
      disallowEmptySelection
      defaultSelectedKeys={["rocket"]}
      className="grid w-fit grid-cols-4 gap-1"
    >
      {(item) => (
        <ListBoxItem
          textValue={item.label}
          aria-label={item.label}
          className="size-12 justify-center p-0 data-selected:ring-2 data-selected:ring-brand [&>span]:hidden"
        >
          <item.icon className="size-5 text-foreground" />
        </ListBoxItem>
      )}
    </ListBox>
  );
}
