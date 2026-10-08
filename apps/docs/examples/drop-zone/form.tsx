"use client";

import { PaperclipIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Form, isFileDropItem, Text } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DropZone, FileTrigger } from "@/components/ui/drop-zone";
import { TextField } from "@/components/ui/text-field";

export default function DropZoneForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<string | null>(null);

  return (
    <Form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        for (const file of files) data.append("attachments", file);
        // await fetch("/api/tickets", { method: "POST", body: data });
        setResult(
          JSON.stringify({
            subject: data.get("subject"),
            attachments: data
              .getAll("attachments")
              .map((f) => (f as File).name),
          }),
        );
      }}
    >
      <TextField
        label="Subject"
        name="subject"
        defaultValue="Invoice shows the wrong VAT number"
        isRequired
      />
      <DropZone
        size="sm"
        onDrop={async (e) => {
          const dropped = await Promise.all(
            e.items.filter(isFileDropItem).map((item) => item.getFile()),
          );
          setFiles((f) => [...f, ...dropped]);
        }}
      >
        <Text slot="label" className="text-muted-foreground">
          Drop screenshots or logs
        </Text>
        <FileTrigger
          allowsMultiple
          onSelect={(list) =>
            setFiles((f) => [...f, ...Array.from(list ?? [])])
          }
        >
          <Button variant="outline" size="sm">
            <PaperclipIcon /> Attach files
          </Button>
        </FileTrigger>
      </DropZone>
      {files.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {files.map((file, i) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: files can share a name
              key={`${file.name}-${i}`}
              className="flex h-7 items-center gap-1 rounded-md border bg-muted/40 pr-1 pl-2 text-xs"
            >
              <span className="max-w-40 truncate">{file.name}</span>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={`Remove ${file.name}`}
                onPress={() => setFiles((f) => f.filter((_, j) => j !== i))}
              >
                <XIcon />
              </Button>
            </li>
          ))}
        </ul>
      )}
      <Button type="submit" className="self-start">
        Send request
      </Button>
      {result && (
        <code className="break-all rounded-md bg-muted px-2 py-1 text-xs">
          {result}
        </code>
      )}
    </Form>
  );
}
