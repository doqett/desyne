"use client";

import { CameraIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { isFileDropItem } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropZone, FileTrigger } from "@/components/ui/drop-zone";

export default function DropZoneRecipeAvatar() {
  const [src, setSrc] = useState<string | undefined>();

  const setFile = (file: File | undefined) => {
    if (!file?.type.startsWith("image/")) return;
    setSrc(URL.createObjectURL(file));
  };

  // Revoke the previous object URL whenever it's replaced or on unmount.
  useEffect(
    () => () => {
      if (src) URL.revokeObjectURL(src);
    },
    [src],
  );

  return (
    <div className="flex w-full max-w-md items-center gap-5 rounded-xl border bg-card p-5">
      <DropZone
        aria-label="Profile photo"
        getDropOperation={(types) => (types.has("image/*") ? "copy" : "cancel")}
        onDrop={async (e) => {
          const item = e.items.find(isFileDropItem);
          setFile(await item?.getFile());
        }}
        className="relative size-20 min-h-0 shrink-0 rounded-full p-0 data-drop-target:ring-4 data-drop-target:ring-brand/20"
      >
        <Avatar
          src={src}
          alt={src ? "Your profile photo" : "No profile photo"}
          fallback={<CameraIcon className="size-6 text-muted-foreground" />}
          className="size-full"
        />
      </DropZone>
      <div className="flex flex-col gap-2">
        <div>
          <p className="font-medium text-sm">Profile photo</p>
          <p className="text-muted-foreground text-xs">
            Drop an image on the circle, or upload one. Square images work best.
          </p>
        </div>
        <div className="flex gap-2">
          <FileTrigger
            acceptedFileTypes={["image/png", "image/jpeg", "image/webp"]}
            onSelect={(list) => setFile(list?.[0])}
          >
            <Button variant="outline" size="sm">
              Upload
            </Button>
          </FileTrigger>
          {src && (
            <Button variant="ghost" size="sm" onPress={() => setSrc(undefined)}>
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
