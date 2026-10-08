"use client";

import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "For side projects and small teams.",
    features: ["3 projects", "1,000 events / day", "Community support"],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Team",
    price: "$24",
    description: "For growing teams shipping every week.",
    features: [
      "Unlimited projects",
      "250,000 events / day",
      "Role-based access",
      "Email support",
    ],
    cta: "Start free trial",
    featured: true,
  },
];

export default function CardRecipePricing() {
  return (
    <div className="grid w-full max-w-2xl items-start gap-4 sm:grid-cols-2">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          variant={plan.featured ? "elevated" : "outline"}
          size="lg"
          className={plan.featured ? "ring-2 ring-primary" : undefined}
        >
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            {plan.featured && (
              <CardAction>
                <Badge variant="solid" color="primary" shape="pill">
                  Popular
                </Badge>
              </CardAction>
            )}
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <p className="flex items-baseline gap-1">
              <span className="font-semibold text-3xl tabular-nums">
                {plan.price}
              </span>
              <span className="text-muted-foreground text-sm">
                / user / month
              </span>
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-success" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={plan.featured ? "solid" : "outline"}
            >
              {plan.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
