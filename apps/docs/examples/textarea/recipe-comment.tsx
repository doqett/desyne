"use client";

import { AtSignIcon, PaperclipIcon, SmileIcon } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaRecipeComment() {
  const [value, setValue] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const submit = () => {
    if (!value.trim()) return;
    setComments((c) => [...c, value.trim()]);
    setValue("");
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {comments.map((comment, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: append-only demo list
        <div key={i} className="flex gap-3 text-sm">
          <Avatar size="sm" fallback="AL" colorful alt="Ada Lovelace" />
          <p className="whitespace-pre-wrap pt-0.5">{comment}</p>
        </div>
      ))}
      <div className="flex gap-3">
        <Avatar size="sm" fallback="AL" colorful alt="Ada Lovelace" />
        <div className="flex-1 rounded-md border border-input bg-card shadow-xs focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/20 dark:bg-input/20">
          <Textarea
            aria-label="Add a comment"
            placeholder="Add a comment…"
            resize="auto"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                submit();
              }
            }}
            className="min-h-16 border-0 bg-transparent shadow-none data-focused:ring-0 dark:bg-transparent"
          />
          <div className="flex items-center gap-1 px-1.5 pb-1.5">
            <Button size="icon-sm" variant="ghost" aria-label="Attach file">
              <PaperclipIcon />
            </Button>
            <Button size="icon-sm" variant="ghost" aria-label="Mention someone">
              <AtSignIcon />
            </Button>
            <Button size="icon-sm" variant="ghost" aria-label="Add emoji">
              <SmileIcon />
            </Button>
            <span className="ml-auto hidden items-center gap-1 text-muted-foreground text-xs sm:flex">
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">Enter</Kbd>
            </span>
            <Button size="sm" isDisabled={!value.trim()} onPress={submit}>
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
