"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { TextField } from "@/components/ui/text-field";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to continue.
          </CardDescription>
        </CardHeader>
        <Form
          className="flex flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <CardContent className="flex flex-col gap-4">
            <TextField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              isRequired
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              isRequired
            />
            <Checkbox name="remember">Remember me</Checkbox>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <Button variant="link" size="sm">
              Forgot password?
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
