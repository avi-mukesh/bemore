"use client";

import React, { useState } from "react";
import EmotionButton from "./emotion-button";
import { Mood } from "@/lib/utils";
import clsx from "clsx";

type PropsType = {
  userId: string;
};

export default function EmotionButtons({ userId }: PropsType) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={clsx("grid grid-cols-5 justify-between")}>
      {["angry", "frown", "meh", "smile", "laugh"].map((mood) => (
        <EmotionButton
          key={mood}
          variant={mood as Mood}
          userId={userId}
          submitted={submitted}
          setSubmitted={setSubmitted}
        />
      ))}
    </div>
  );
}
