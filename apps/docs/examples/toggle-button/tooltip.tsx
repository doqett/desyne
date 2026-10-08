"use client";

import { MicIcon, MicOffIcon, VideoIcon, VideoOffIcon } from "lucide-react";
import { useState } from "react";
import { ToggleButton } from "@/components/ui/toggle-button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export default function ToggleButtonTooltip() {
  const [micOff, setMicOff] = useState(false);
  const [cameraOff, setCameraOff] = useState(true);
  return (
    <div className="flex items-center gap-1">
      <TooltipTrigger>
        <ToggleButton
          size="lg"
          aria-label="Mute microphone"
          isSelected={micOff}
          onChange={setMicOff}
        >
          {micOff ? <MicOffIcon /> : <MicIcon />}
        </ToggleButton>
        <Tooltip>Mute microphone</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <ToggleButton
          size="lg"
          aria-label="Turn off camera"
          isSelected={cameraOff}
          onChange={setCameraOff}
        >
          {cameraOff ? <VideoOffIcon /> : <VideoIcon />}
        </ToggleButton>
        <Tooltip>Turn off camera</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
