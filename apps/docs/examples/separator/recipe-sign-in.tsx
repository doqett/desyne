"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TextField } from "@/components/ui/text-field";

export default function SeparatorRecipeSignIn() {
  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline">GitHub</Button>
        <Button variant="outline">Google</Button>
      </div>
      <Separator label="or continue with email" />
      <TextField label="Email" type="email" placeholder="you@company.com" />
      <Button type="submit" className="w-full">
        Send magic link
      </Button>
    </form>
  );
}
