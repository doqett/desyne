"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";

export default function CardFooterExample() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="border-b">
        <CardTitle>Workspace name</CardTitle>
        <CardDescription>
          Shown in the sidebar, invitations and email notifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TextField
          aria-label="Workspace name"
          defaultValue="Northwind Analytics"
        />
      </CardContent>
      <CardFooter className="justify-between border-t">
        <p className="text-muted-foreground text-xs">Max. 32 characters.</p>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  );
}
