"use client";

import { CreditCardIcon, ShieldIcon, UserIcon } from "lucide-react";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

const tabs = [
  {
    id: "profile",
    label: "Profile",
    icon: UserIcon,
    body: "Your name, avatar and public profile.",
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldIcon,
    body: "Password, passkeys and two-factor authentication.",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCardIcon,
    body: "Plan, invoices and payment methods.",
  },
];

export default function TabsIcons() {
  return (
    <Tabs className="w-full max-w-lg">
      <TabList aria-label="Account settings">
        {tabs.map((t) => (
          <Tab key={t.id} id={t.id}>
            <t.icon /> {t.label}
          </Tab>
        ))}
      </TabList>
      {tabs.map((t) => (
        <TabPanel key={t.id} id={t.id} className="text-muted-foreground">
          {t.body}
        </TabPanel>
      ))}
    </Tabs>
  );
}
