"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { TextField } from "@/components/ui/text-field";

export default function LinkRecipeSignIn() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Welcome back. Enter your details to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
          <TextField label="Email" type="email" placeholder="you@company.com" />
          <div className="grid gap-1.5">
            <TextField label="Password" type="password" />
            <Link href="#" className="justify-self-end text-xs">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          <p className="text-center text-muted-foreground text-xs">
            New to Acme? <Link href="#">Create an account</Link>
          </p>
          <p className="text-center text-muted-foreground text-xs leading-relaxed">
            By continuing you agree to the{" "}
            <Link href="#" variant="underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="#" variant="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </Form>
      </CardContent>
    </Card>
  );
}
