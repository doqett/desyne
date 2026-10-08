"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormActions, FormRow, FormSection } from "@/components/ui/form";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Select, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import { TextareaField } from "@/components/ui/textarea";

export default function FormSettings() {
  const [savedAt, setSavedAt] = useState<string | null>(null);
  return (
    <Form
      gap="lg"
      className="max-w-3xl"
      onSubmit={(e) => {
        e.preventDefault();
        setSavedAt(
          new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        );
      }}
    >
      <FormSection
        layout="aside"
        title="Profile"
        description="Shown on your comments and in the member directory."
      >
        <FormRow>
          <TextField
            label="Display name"
            name="name"
            defaultValue="Maya Chen"
          />
          <TextField
            label="Job title"
            name="title"
            defaultValue="Product designer"
          />
        </FormRow>
        <TextareaField
          label="Bio"
          name="bio"
          rows={3}
          maxLength={160}
          showCount
          defaultValue="Designing calm tools for busy teams."
        />
      </FormSection>
      <Separator />
      <FormSection
        layout="aside"
        title="Regional"
        description="Used for dates, times and reminders."
      >
        <FormRow>
          <Select label="Time zone" name="tz" defaultValue="europe-lisbon">
            <SelectItem id="america-new_york">New York (GMT−5)</SelectItem>
            <SelectItem id="europe-lisbon">Lisbon (GMT+0)</SelectItem>
            <SelectItem id="europe-berlin">Berlin (GMT+1)</SelectItem>
            <SelectItem id="asia-kathmandu">Kathmandu (GMT+5:45)</SelectItem>
          </Select>
          <Select label="Week starts on" name="weekStart" defaultValue="mon">
            <SelectItem id="sun">Sunday</SelectItem>
            <SelectItem id="mon">Monday</SelectItem>
          </Select>
        </FormRow>
      </FormSection>
      <Separator />
      <FormSection
        layout="aside"
        title="Notifications"
        description="Choose what reaches your inbox. Mentions are always on."
      >
        <RadioGroup label="Email digest" name="digest" defaultValue="daily">
          <Radio value="off">Off</Radio>
          <Radio value="daily">Daily summary</Radio>
          <Radio value="weekly">Weekly summary</Radio>
        </RadioGroup>
        <Switch name="productUpdates" defaultSelected>
          Product updates and release notes
        </Switch>
      </FormSection>
      <FormActions separator>
        {savedAt && (
          <span className="mr-auto text-muted-foreground text-sm" role="status">
            Saved at {savedAt}
          </span>
        )}
        <Button type="reset" variant="outline">
          Discard
        </Button>
        <Button type="submit">Save changes</Button>
      </FormActions>
    </Form>
  );
}
