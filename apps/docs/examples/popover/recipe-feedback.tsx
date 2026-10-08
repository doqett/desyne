"use client";

import {
  AngryIcon,
  FrownIcon,
  LaughIcon,
  MessageSquareHeartIcon,
  SmileIcon,
} from "lucide-react";
import { useState } from "react";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverDialog,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TextareaField } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const moods = [
  { id: "angry", label: "Very unhappy", icon: AngryIcon },
  { id: "sad", label: "Unhappy", icon: FrownIcon },
  { id: "happy", label: "Happy", icon: SmileIcon },
  { id: "delighted", label: "Delighted", icon: LaughIcon },
];

export default function PopoverRecipeFeedback() {
  const [pending, setPending] = useState(false);
  return (
    <PopoverTrigger>
      <Button variant="outline" size="sm">
        <MessageSquareHeartIcon /> Feedback
      </Button>
      <Popover placement="bottom end">
        <PopoverDialog className="w-80">
          {({ close }) => (
            <Form
              className="grid gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                setPending(true);
                await new Promise((r) => setTimeout(r, 800));
                setPending(false);
                close();
                toast.success("Thanks! Your feedback was sent to the team.");
              }}
            >
              <PopoverTitle>Send feedback</PopoverTitle>
              <TextareaField
                aria-label="Feedback"
                name="message"
                rows={4}
                isRequired
                autoFocus
                placeholder="What's working, and what isn't?"
              />
              <div className="flex items-center justify-between gap-2">
                <ToggleButtonGroup
                  variant="spaced"
                  size="sm"
                  aria-label="How do you feel?"
                >
                  {moods.map((m) => (
                    <ToggleButton key={m.id} id={m.id} aria-label={m.label}>
                      <m.icon />
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
                <Button type="submit" size="sm" isPending={pending}>
                  Send
                </Button>
              </div>
            </Form>
          )}
        </PopoverDialog>
      </Popover>
    </PopoverTrigger>
  );
}
