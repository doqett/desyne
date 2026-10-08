"use client";

import { CreditCardIcon, LandmarkIcon, WalletIcon } from "lucide-react";
import {
  GridList,
  GridListItem,
  GridListItemDescription,
  GridListItemLabel,
} from "@/components/ui/grid-list";

const methods = [
  {
    id: "visa",
    icon: CreditCardIcon,
    name: "Visa ending 4242",
    meta: "Expires 08/28",
  },
  {
    id: "amex",
    icon: CreditCardIcon,
    name: "Amex ending 1005",
    meta: "Expires 02/27",
  },
  {
    id: "bank",
    icon: LandmarkIcon,
    name: "Business checking",
    meta: "ACH · ending 6789",
  },
  {
    id: "wallet",
    icon: WalletIcon,
    name: "Account credit",
    meta: "$120.00 available",
  },
];

export default function GridListSingleSelection() {
  return (
    <GridList
      aria-label="Payment method"
      items={methods}
      selectionMode="single"
      disallowEmptySelection
      defaultSelectedKeys={["visa"]}
      className="w-full max-w-80"
    >
      {(m) => (
        <GridListItem textValue={m.name}>
          <m.icon className="size-4 shrink-0 text-muted-foreground" />
          <span className="flex min-w-0 flex-col">
            <GridListItemLabel>{m.name}</GridListItemLabel>
            <GridListItemDescription>{m.meta}</GridListItemDescription>
          </span>
        </GridListItem>
      )}
    </GridList>
  );
}
