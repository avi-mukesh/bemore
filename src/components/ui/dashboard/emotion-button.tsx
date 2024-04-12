"use client";
import React from "react";
import { Icons } from "@/components/icons";

type PropsType = {
  variant: "laugh" | "smile" | "meh" | "frown" | "angry";
};

const colors = {
  laugh: "#0e8c30",
  smile: "#23b861",
  meh: "#b89023",
  frown: "#b85223",
  angry: "#b83223",
};

export default function EmotionButton({ variant }: PropsType) {
  let text = "";
  let Icon = Icons[variant];
  let color = colors[variant];

  switch (variant) {
    case "angry":
      text = "Angry";
      break;
    case "frown":
      text = "Sad";
      break;
    case "meh":
      text = "Neutral";
      break;
    case "smile":
      text = "Happy";
      break;
    case "laugh":
      text = "Over the moon";
      break;
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <Icon style={{ color }} />
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  );
}
