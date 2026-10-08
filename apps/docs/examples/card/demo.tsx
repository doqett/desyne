"use client";

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
import { TextField } from "@/components/ui/text-field";

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Welcome back. Enter your details.</CardDescription>
        <CardAction>
          <Button variant="link" size="sm">
            Sign up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-4">
        <TextField label="Email" type="email" placeholder="you@company.com" />
        <TextField label="Password" type="password" />
      </CardContent>
      <CardFooter className="flex-col">
        <Button className="w-full">Sign in</Button>
        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
