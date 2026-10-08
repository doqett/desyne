"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Radio, RadioGroup } from "@/components/ui/radio-group";

const initial = { profile: "members", messages: "everyone" };

export default function RadioGroupRecipePrivacy() {
  const [saved, setSaved] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const isDirty =
    draft.profile !== saved.profile || draft.messages !== saved.messages;

  return (
    <div className="w-full max-w-md divide-y rounded-xl border bg-card">
      <div className="p-5">
        <h3 className="font-semibold">Privacy</h3>
        <p className="text-muted-foreground text-sm">
          Control who can find you and contact you.
        </p>
      </div>
      <div className="grid gap-6 p-5">
        <RadioGroup
          label="Who can see your profile"
          value={draft.profile}
          onChange={(profile) => setDraft((d) => ({ ...d, profile }))}
        >
          <Radio value="public" description="Anyone, including search engines.">
            Public
          </Radio>
          <Radio
            value="members"
            description="Only people signed in to this workspace."
          >
            Workspace members
          </Radio>
          <Radio value="private" description="Only you and admins.">
            Private
          </Radio>
        </RadioGroup>
        <RadioGroup
          label="Who can message you"
          orientation="horizontal"
          value={draft.messages}
          onChange={(messages) => setDraft((d) => ({ ...d, messages }))}
        >
          <Radio value="everyone">Everyone</Radio>
          <Radio value="team">My team</Radio>
          <Radio value="nobody">Nobody</Radio>
        </RadioGroup>
      </div>
      <div className="flex justify-end gap-2 bg-muted/30 px-5 py-3">
        <Button
          variant="ghost"
          isDisabled={!isDirty}
          onPress={() => setDraft(saved)}
        >
          Discard
        </Button>
        <Button isDisabled={!isDirty} onPress={() => setSaved(draft)}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
